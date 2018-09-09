import { buildSchemaSync } from 'type-graphql';

import PostResolver from './resolver/post';
import UserResolver from './resolver/user';

const schema = buildSchemaSync({
  resolvers: [
    PostResolver,
    UserResolver,
  ],
});

export default schema;

/*

{
  getPosts {
    text
    tags
    user {
      name
      email
    }
    creationDate
  }
  getUser {
    id
    name
    email
    creationDate
  }
}

*/
