import 'express-serve-static-core';
import 'type-graphql/node_modules/@types/graphql/type/schema';

import { Connection } from 'typeorm';

declare module 'express-serve-static-core' {
  export interface Request {
    user: any,
    db: Connection,
  }
}

// extensionASTNodes: Maybe<ReadonlyArray<SchemaExtensionNode>>;

// declare module 'type-graphql/node_modules/@types/graphql/type/schema' {
//   export interface GraphQLSchema {
//     extensionASTNodes: Maybe<ReadonlyArray<SchemaExtensionNode>>;
//   }
// }
