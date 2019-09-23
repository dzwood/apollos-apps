import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { ErrorCard, ThemeMixin } from '@apollosproject/ui-kit';

import { TrackEventWhenLoaded } from '@apollosproject/ui-analytics';

import NavigationHeader from '../content-single/NavigationHeader';
import UniversalContentItem from '../content-single/UniversalContentItem';
import GET_EVENT from './getEvent';

class Event extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      push: PropTypes.func,
    }),
  };

  static navigationOptions = {
    header: NavigationHeader,
    headerTransparent: true,
    headerMode: 'float',
  };

  get eventId() {
    return this.props.navigation.getParam('eventId', []);
  }

  get queryVariables() {
    return { eventId: this.eventId };
  }

  renderContent = ({ content, loading, error }) => {
    let { __typename } = content;
    if (!__typename && this.itemId) {
      [__typename] = this.itemId.split(':');
    }
    return (
      <UniversalContentItem
        id={this.itemId}
        content={content}
        loading={loading}
        error={error}
      />
    );
  };

  renderWithData = ({ loading, error, data }) => {
    if (error) return <ErrorCard error={error} />;

    const content = data.node || {};

    const { theme = {}, id } = content;

    return (
      <ThemeMixin
        mixin={{
          type: get(theme, 'type', 'light').toLowerCase(),
          colors: get(theme, 'colors'),
        }}
      >
        <TrackEventWhenLoaded
          loaded={!!(!loading && content.title)}
          eventName={'View Event'}
          properties={{
            title: content.name,
            eventId: this.eventId,
          }}
        />
        {this.renderContent({ content, loading, error })}
      </ThemeMixin>
    );
  };

  render() {
    return (
      <Query
        query={GET_EVENT}
        fetchPolicy="network-only"
        variables={this.queryVariables}
      >
        {this.renderWithData}
      </Query>
    );
  }
}

export default Event;
