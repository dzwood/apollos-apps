import { featureSchema } from '@apollosproject/data-schema';
import resolver from './resolver';
import dataSource from './data-source';

const { liveSchema } = featureSchema;
export { resolver, dataSource, liveSchema as schema };
