import { buildSchemaSync } from 'type-graphql';

import authChecker from './authChecker';

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
  authChecker,
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



mutation {
  googleAuth(token: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImEwN2VjN2JkYThjY2M0Mzg1NTY1NWI5ZjIyNDVhNGUyZGUyMGFlNWMifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzQ2NDc4ODA3OTI5LTRocHVndHZjcTlzczY5ZDMxa2c1ZGlsaWYwZHVka3RrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzQ2NDc4ODA3OTI5LTRocHVndHZjcTlzczY5ZDMxa2c1ZGlsaWYwZHVka3RrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA0MjUzNDQzMDk4ODI5OTMwNTY5IiwiZW1haWwiOiJhbGV4YW5kcmUucGllbEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImpkTF8tbzV6YlhxMm9BYmh2UFYxWUEiLCJuYW1lIjoiQWxleGFuZHJlIFBpZWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1iR2Z0RkNXRmcxay9BQUFBQUFBQUFBSS9BQUFBQUFBQUFVTS9TYmVRNF9sRmFjcy9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQWxleGFuZHJlIiwiZmFtaWx5X25hbWUiOiJQaWVsIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1Mzc2NDUyNzgsImV4cCI6MTUzNzY0ODg3OCwianRpIjoiZDE3NjkyYjllN2E2MzNlY2E4ZTAxODJiZmMyNDM2OTBlYWZkMWY2MSJ9.DZBk0eBSA3EC3vgHnpaquZecBciq9LPY0Egv9bqf4zK3s3svEnlcbr0G5tJAX5ml-58Vd13bdX1VdqqodSsPc42dhM7_y0H62yndKtLLl9Av4FA9V90Py1w8caJYZUw2UuXfJG9MKMUqcGGn0QB1TvFmH8ShhhhcHTpWgm1_cCIdWJONz_iOzg99uiycITWJ9i4aTGXYxBT_ph2g8GYLCCvHY5dOzGsZQ6qgGOLCjEER844t8WaLe_ODGiA63nK85xzlMhpOi3fe8WxXGU7LKoBgz8dlpne-9frRfXSw8fXFkyPaGh3M6qR4h2zvMN7fboJTvT6bfREdzGKCNoqGeQ") {
    jwt
    user {
      name
    }
    type
  }
}

mutation {
  followUserTag(userTag: {
    idTag: 86
    idUser: 2
    active: true
  }) {
    accepted
    viewed
    active
  }
}

*/
