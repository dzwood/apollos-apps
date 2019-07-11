import gql from 'graphql-tag';
import { TEXT_FEATURE_FRAGMENT } from './TextFeature';
import { FILL_IN_THE_BLANK_FEATURE_FRAGMENT } from './FillInTheBlankFeature';

const FEATURES_FRAGMENT = `
  fragment FeaturesFragment on Feature {
    id
    ...TextFeatureFragment
    ...FillInTheBlankFeatureFragment
  }
  ${TEXT_FEATURE_FRAGMENT}
  ${FILL_IN_THE_BLANK_FEATURE_FRAGMENT}
`;

export default gql`
  query contentItemFeatures($contentId: ID!) {
    node(id: $contentId) {
      id
      ... on ContentSeriesContentItem {
        features {
          ...FeaturesFragment
        }
      }
    }
  }
  ${FEATURES_FRAGMENT}
`;
