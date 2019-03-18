import { featureSchema } from '@apollosproject/data-schema';
import resolver from './resolver';
import dataSource from './data-source';

const { pushSchema } = featureSchema;

export { resolver, dataSource, pushSchema as schema };
