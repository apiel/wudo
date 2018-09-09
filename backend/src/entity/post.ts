import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';

@ObjectType({ description: "Object representing user post" })
export default class PostEntity {
  @Field()
  text: string;

  @Field(type => [String])
  tags: string[]; // will became tag[]

  @Field()
  user: string; // will became User

  @Field()
  creationDate: Date;
}
