import { buildSchemaSync } from 'type-graphql';

import PostResolver from './resolver/post';

const schema = buildSchemaSync({
  resolvers: [PostResolver],
});

export default schema;
