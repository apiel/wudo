import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';

import UserEntity from '../../entity/user';

@ObjectType({ description: "Auth response" })
export default class AuthEntity {
  @Field()
  jwt: string;

  @Field()
  type: string;

  @Field(type => UserEntity)
  user: UserEntity;
}
