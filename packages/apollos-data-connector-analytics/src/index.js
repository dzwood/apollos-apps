import { featureSchema } from '@apollosproject/data-schema';
import resolver from './resolver';
import dataSource from './data-source';

const { analyticsSchema } = featureSchema;
export { resolver, dataSource, analyticsSchema as schema };
