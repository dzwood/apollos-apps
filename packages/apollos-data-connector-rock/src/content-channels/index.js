import { featureSchema } from '@apollosproject/data-schema';

export { default as dataSource } from './data-source';

const { contentChannelSchema } = featureSchema;

export { contentChannelSchema as schema };
export { default as resolver } from './resolver';
