import 'express-serve-static-core';
import 'type-graphql/node_modules/@types/graphql/type/schema';

declare module 'express-serve-static-core' {
  export interface Request {
    user: any
  }
}

// extensionASTNodes: Maybe<ReadonlyArray<SchemaExtensionNode>>;

// declare module 'type-graphql/node_modules/@types/graphql/type/schema' {
//   export interface GraphQLSchema {
//     extensionASTNodes: Maybe<ReadonlyArray<SchemaExtensionNode>>;
//   }
// }
