
export const schemaEntity = `
type PostEntity {
  text: String!
  tags: [String!]!
  user: String!
}
`; //   creationDate: Date!

// @ObjectType({ description: "Object representing user post" })
export default class PostEntity {
//   @Field()
  text: string;

//   @Field(type => [String])
  tags: string[]; // will became tag[]

//   @Field()
  user: string; // will became User

//   @Field()
  creationDate: Date;
}
