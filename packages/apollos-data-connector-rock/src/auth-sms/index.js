import { featureSchema } from '@apollosproject/data-schema';

export dataSource from './data-source';
export resolver from './resolver';

const { authSmsSchema } = featureSchema;

export { authSmsSchema as schema };
