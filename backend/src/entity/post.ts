import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';

import UserEntity from './user';

@ObjectType({ description: "Object representing user post" })
export default class PostEntity {
  @Field()
  text: string;

  @Field(type => [String])
  tags: string[]; // will became tag[]

  @Field(type => UserEntity)
  user: UserEntity;

  @Field()
  creationDate: Date;
}
