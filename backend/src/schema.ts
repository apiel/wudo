import { buildSchemaSync } from 'type-graphql';

import PostResolver from './resolver/post';
import UserResolver from './resolver/user';
import { test } from './test';

const schema = buildSchemaSync({
  resolvers: [
    PostResolver,
    UserResolver,
  ],
  globalMiddlewares: [test],
});

export default schema;
