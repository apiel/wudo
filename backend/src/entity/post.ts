import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';

import UserEntity from './user';
import TagEntity from './tag';

@ObjectType({ description: "Object representing user post" })
export default class PostEntity {
  @Field()
  text: string;

  @Field(type => [TagEntity])
  tags: TagEntity[];

  @Field(type => UserEntity)
  user: UserEntity;

  @Field()
  creationDate: Date;
}
