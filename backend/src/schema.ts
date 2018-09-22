import { buildSchemaSync } from 'type-graphql';

import PostResolver from './resolver/post';
import UserResolver from './resolver/user';
import TagResolver from './resolver/tag';
import UserTagResolver from './resolver/userTag';
import OgsResolver from './resolver/ogs';
import AuthResolver from './resolver/auth';
import { test } from './test';

const schema = buildSchemaSync({
  resolvers: [
    PostResolver,
    UserResolver,
    TagResolver,
    UserTagResolver,
    OgsResolver,
    AuthResolver,
  ],
  globalMiddlewares: [test],
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

{
  getTag(id: 1) {
    idTag
    name
    creationDate
  }
}

{
  getPosts {
    text
    creationDate
    tags {
      name
    }
  }
}

{
  getUser {
    idUser
    name
    email
    creationDate
    posts { 
      idPost
      text
    }
  }
  
  getPosts {
    text
    user {
      name
    }
  }
}

{
  getUser(id: 1) {
    idUser
    name
    email
    creationDate
    posts { 
      idPost
      text
    }
  }
}

{
  getUser(id: 2) {
    idUser
    name
    tags {
      name
    }
    tagsFollowedByUser {
      follower {
        name
      }
      accepted
    }
  }
}


{
  getFollowers {
    users {
      name
    }
    tags {
      name
    }
    tagsFollowedByUser {
      idTag
      users {
        id
        accepted
      }
    }
    followUserTags {
      idUser
      tags {
        id
        accepted
      }
    }
  }
}

mutation {
  addPost(
    post: {
      text: "yo"
      tags: [1,2]
    }
  ) {
    idPost
  }
}

mutation {
  addPostAndTag(
    post: {
      text: "yo"
      tags: ["ouioui","javascript2","yo","hello"]
    }
  ) {
    idPost
  }
}


*/
