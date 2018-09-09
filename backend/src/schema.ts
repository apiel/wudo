import { buildSchemaSync } from 'type-graphql';

import PostResolver from './resolver/post';
import UserResolver from './resolver/user';
import TagResolver from './resolver/tag';

const schema = buildSchemaSync({
  resolvers: [
    PostResolver,
    UserResolver,
    TagResolver,
  ],
});

export default schema;

/*

{
  getPosts {
    text
    tags {
      name
    }
    user {
      name
      email
    }
    creationDate
  }
  getUser {
    idUser
    name
    email
    creationDate
  }
  getTag {
    idTag
    name
    creationDate
  }
}

*/
