import {
  ContentItem as BaseContentItem,
  Features as BaseFeatures,
} from '@apollosproject/data-connector-rock';
import { get } from 'lodash';
import { createGlobalId } from '@apollosproject/server-core';

const parseKeyValueAttribute = (text) => {
  const entries = text.split('|');
  return entries.map((e) => {
    const [key, value] = e.split('^');
    return { key, value };
  });
};

class EnhancedContentItem extends BaseContentItem.dataSource {
  getFeatures({ attributeValues }) {
    const { Features } = this.context.dataSources;
    const features = [];

    const text = get(attributeValues, 'textFeature.value', '');
    if (text !== '') {
      features.push(
        Features.createTextFeature({ text, id: attributeValues.textFeature.id })
      );
    }

    const keyValues = get(attributeValues, 'fillInTheBlank.value', '');
    if (keyValues !== '') {
      const fillInTheBlankObjects = parseKeyValueAttribute(keyValues);
      const fillInTheBlankFeatures = fillInTheBlankObjects.map(
        ({ key, value }, i) =>
          Features.createFillInTheBlankFeature({
            body: value,
            header: key,
            id: `${attributeValues.fillInTheBlank.id}-${i}`,
          })
      );
      fillInTheBlankFeatures.forEach((f) => features.push(f));
    }

    return features;
  }
}

class EnhancedFeatures extends BaseFeatures.dataSource {
  // eslint-disable-next-line class-methods-use-this
  createFillInTheBlankFeature({ body, header, id }) {
    return {
      __typename: 'FillInTheBlankFeature',
      body,
      header,
      id: createGlobalId(id, 'FillInTheBlankFeature'),
    };
  }
}
const schema = `
type FillInTheBlankFeature implements Feature & Node {
  id: ID!
  order: Int

  body: String
  header: String
}
`;

const FillInTheBlankFeature = { schema };
const ContentItem = { ...BaseContentItem, dataSource: EnhancedContentItem };
const Features = { ...BaseFeatures, dataSource: EnhancedFeatures };

export { ContentItem, Features, FillInTheBlankFeature as default };
