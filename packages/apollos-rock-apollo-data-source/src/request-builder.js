import withQuery from 'with-query';
import { chunk, flatten } from 'lodash';

// Simple request builder for querying the Rock API.
// Would probably work against most OData APIs, but built to just
// tackle the specific needs of Apollos on top of Rock.
export default class RockRequestBuilder {
  constructor({ connector, resource, defaultOptions = null }) {
    this.connector = connector;
    this.resource = resource;
    if (defaultOptions) {
      this.query = defaultOptions;
    }
  }

  filters = [];

  query = {};

  transforms = [];

  options = {};

  createPath = (filters = null) => {
    let path = [this.resource];
    if (this.resourceId) path.push(this.resourceId);

    const requiredAndChunkedFilters = [
      this.joinFilters(this.requiredFilters),
      filters,
    ].filter((f) => f !== null && f !== '');

    // This is a "vanity ternary" :P
    // If we only have one filter, I like to avoid adding the parens around the outside.
    // That way, instead of having `(Id eq 123)` we get `Id eq 123`
    const filter =
      requiredAndChunkedFilters.length === 1
        ? requiredAndChunkedFilters[0]
        : requiredAndChunkedFilters.map((f) => `(${f})`).join(' and ');

    const query = { ...this.query };

    if (filter) query.$filter = filter;

    path = path.join('/');
    path = withQuery(path, query);
    return path;
  };

  paths() {
    if (this.chunkableFilters.length) {
      return this.chunkedFilters().map(this.createPath);
    }
    return [this.createPath()];
  }

  get chunkableFilters() {
    return this.filters.filter(({ operator }) => operator === 'or');
  }

  get requiredFilters() {
    return this.filters.filter(({ operator }) => operator === 'and');
  }

  joinFilters = (filters) => {
    if (filters.length === 0) return '';

    return filters.reduce((accum, { query, operator }) => {
      // The first pass throgh, we don't prepend the accumulator or the operator.
      const prefix = accum ? `${accum} ${operator} ` : '';
      if (Array.isArray(query)) {
        console.log('resolving deeply...', query);
        return `${prefix}(${this.joinFilters(query)})`;
      }
      return `${prefix}(${query})`;
    }, null);
  };

  seperateNodes = ({ query }) => {
    if (Array.isArray(query)) {
      return flatten(query.map(this.seperateNodes));
    }
    return query.split(/or|and/);
  };

  lengthOfFilter = (filter) =>
    filter.reduce((accum, { query }) => {
      if (Array.isArray(query)) {
        return this.lengthOfFilter(query);
      }
      return accum + 1;
    }, 0);

  nodeLengthForFilters(array) {
    // Very rough formula to calculate the number of OData nodes
    // https://github.com/OData/RESTier/issues/579#issuecomment-326976015
    return flatten(array.map(this.seperateNodes)).length * 5;
  }

  get numberOfChunks() {
    const requiredNodes = this.nodeLengthForFilters(this.requiredFilters);
    const chunkableNodes = this.nodeLengthForFilters(this.chunkableFilters);
    const allowedNodes = 100 - requiredNodes;
    return Math.ceil(chunkableNodes / allowedNodes);
  }

  get chunkSize() {
    return this.lengthOfFilter(this.chunkableFilters) / this.numberOfChunks;
  }

  chunkFilters = (filters) =>
    chunk(
      filters.reduce((accum, filter) => {
        if (Array.isArray(filter.query)) {
          return flatten([...accum, ...this.chunkFilters(filter.query)]);
        }
        return [...accum, filter];
      }, []),
      this.chunkSize
    );

  chunkedFilters = () =>
    this.chunkFilters(this.chunkableFilters).map(this.joinFilters);

  async get(args) {
    const results = await Promise.all(
      this.paths().map((path) => this._get({ path, ...args }))
    );
    return flatten(results);
  }

  /**
   * Sends a GET request to the server, resolves with results
   * @returns promise
   */
  _get = ({ path, options = {}, body = {} } = {}) =>
    this.connector
      .get(path, body, { ...options, ...this.options })
      .then((results) => {
        if (this.transforms.length)
          return this.transforms.reduce(
            (current, transformer) => transformer(current),
            results
          );
        return results;
      });

  /**
   * Ends the request chain, ensuring that the caller of *get* will recieve an empty array.
   * Used in situations where we want to bypass Rock and return nothing.
   */
  empty = () => ({ get: () => Promise.resolve([]) });

  /**
   * Sends a GET request to the server, resolves with the first promise
   * @returns promise
   */
  first = async ({ options = {}, body = {} } = {}) => {
    // Make sure we only get 1 result;
    this.top(1);
    const results = await this.get({ options, body });
    if (results.length) {
      return results[0];
    }
    return null;
  };

  /**
   * Find a single resource by ID
   */
  find = (id) => {
    this.resourceId = id;
    return this;
  };

  /**
   * Filter resources by an odata string
   */
  filter = (filter, { operator } = { operator: 'or' }) => {
    this.filters.push({ operator, query: filter });
    return this;
  };

  andFilter = (filter) => this.filter(filter, { operator: 'and' });

  orFilter = (filter) => this.filter(filter, { operator: 'or' });

  filterOneOf = (filters) => {
    const filter = filters.map((f) => ({ query: f, operator: 'or' }));
    return this.filter(filter);
  };

  cache = ({ ttl }) => {
    this.options.ttl = ttl;
    return this;
  };

  /**
   * Expands resources inline
   */
  expand = (expand) => {
    let { $expand } = this.query;
    if (!$expand) {
      $expand = [];
    } else {
      $expand = $expand.split(',');
    }
    $expand.push(expand);
    this.query.$expand = $expand.join(',');
    return this;
  };

  /**
   * Order resources by a given attribute and direction
   * @param {string} name The name of the attribute to order by
   * @param {string} direction The direction to order results by. Defaults to 'asc'
   */
  orderBy = (name, direction = 'asc') => {
    this.query.$orderby = `${name} ${direction}`;
    return this;
  };

  /**
   * Only return the top N results. Used for pagination
   * @param {number} top
   */
  top = (top) => {
    this.query.$top = top;
    return this;
  };

  /**
   * Skip the first N results. Used for pagination
   * @param {number} skip
   */
  skip = (skip) => {
    this.query.$skip = skip;
    return this;
  };

  /**
   * Select which attributes to return
   * @param {string} select
   */
  select = (select) => {
    this.query.$select = select;
    return this;
  };

  /**
   * Transform the shape of the results.
   * This is ran _after_ data is requested and not
   * affected by other methods that are chained to the request
   */
  transform = (func) => {
    this.transforms.push(func);
    return this;
  };
}
