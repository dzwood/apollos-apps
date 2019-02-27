import gql from 'graphql-tag';

// eslint-disable-next-line
export const testSchema = gql`
  scalar Upload
`;

export coreSchema from './core';
export * as featureSchema from './features';
export * as implementations from './defaultImplementations';
