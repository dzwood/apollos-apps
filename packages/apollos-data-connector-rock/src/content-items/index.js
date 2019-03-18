import gql from 'graphql-tag';
import { implementations } from '@apollosproject/data-schema';

export { default as dataSource } from './data-source';
export { default as resolver } from './resolver';

export const schema = gql`
  ${implementations.universalContentItem},
  ${implementations.devotionalContentItem},
  ${implementations.mediaContentItem},
  ${implementations.contentSeriesContentItem},
`;
