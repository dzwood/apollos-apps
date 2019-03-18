import { featureSchema } from '@apollosproject/data-schema';
import resolver from './resolver';
import dataSource from './data-source';

const { peopleSchema } = featureSchema;
export { resolver, dataSource, peopleSchema as schema };
