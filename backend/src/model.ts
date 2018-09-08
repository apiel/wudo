import { graphql, buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
export const schema = buildSchema(`
  type Query {
    hello(count: Int): String
  }
`); // use (count: Int!) to force params

// The root provides a resolver function for each API endpoint
export const root = {
  hello: ({ count }, request) => { // first params is args
    return `Hello ${request.user.name} [${count || 23}]`;
  },
};

// // Run the GraphQL query '{ hello }' and print out the response
// graphql(schema, '{ hello }', root).then((response) => {
//   console.log(response);
// });
