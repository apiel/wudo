import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';

@ObjectType({ description: "Object representing the user" })
export default class UserEntity {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  creationDate: Date;
}
