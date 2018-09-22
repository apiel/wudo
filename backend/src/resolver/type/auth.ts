import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';

@ObjectType({ description: "Auth response" })
export default class AuthEntity {
  @Field()
  jwt: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  type: string;
}
