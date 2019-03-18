import { featureSchema } from '@apollosproject/data-schema';
import dataSource from './data-source';
import resolver from './resolver';

const { followingsSchema } = featureSchema;

export { resolver, dataSource, followingsSchema as schema };
