import { featureSchema } from '@apollosproject/data-schema';
import resolver from './resolver';
import dataSource from './data-source';

const { campusSchema } = featureSchema;
export { resolver, dataSource, campusSchema as schema };
