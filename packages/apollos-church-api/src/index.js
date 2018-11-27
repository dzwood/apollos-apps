import dotenv from 'dotenv/config'; // eslint-disable-line
import { ApolloEngine } from 'apollo-engine';
import express from 'express';
import config from './config'; // eslint-disable-line
import server from './server';
export { testSchema } from './server'; // eslint-disable-line import/prefer-default-export

// Use the port, if provided.
const { PORT } = process.env;
if (!PORT && process.env.NODE_ENV !== 'test')
  console.warn(
    'Add `ENV=4000` if you are having trouble connecting to the server. By default, PORT is random.'
  );

const engine = new ApolloEngine({
  apiKey: 'service:apollos-church-api:pekUNdjTbRwTYevCafqF3Q',
  logging: {
    level: 'DEBUG', // Engine Proxy logging level. DEBUG, INFO (default), WARN or ERROR.
  },
});

const app = express();
server.applyMiddleware({ app });

engine.listen({ port: PORT, expressApp: app }, () => {
  console.log(`🚀 Server ready at ${PORT}`);
});
