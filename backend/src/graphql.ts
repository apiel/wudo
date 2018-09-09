import { buildSchema } from 'graphql';

import PostResolver, { postSchema } from './resolver/post';

// Construct a schema, using GraphQL schema language
export const schema = buildSchema(`
  ${postSchema}

  type Query {
    hello(count: Int): String
    post: PostResolver
  }
`); // use (count: Int!) to force params

// The root provides a resolver function for each API endpoint
export const rootValue = {
  hello: ({ count }, request) => { // first params is args
    return `Hello ${request.user.name} [${count || 23}]`;
  },
  post: () => new PostResolver,
};

// // Run the GraphQL query '{ hello }' and print out the response
// graphql(schema, '{ hello }', root).then((response) => {
//   console.log(response);
// });
