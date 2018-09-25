import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';

import UserEntity from '../../entity/user';
import TagEntity from '../../entity/tag';

@ObjectType()
class UserTagItem {
  @Field()
  idItem: number;

  @Field({ nullable: true })
  accepted: Date;

  @Field({ nullable: true })
  viewed: Date;

  @Field({ nullable: true })
  active: Date;
}

@ObjectType()
export class TagsFollowedByUser {
  @Field()
  idTag: number;

  @Field(type => [UserTagItem])
  users: UserTagItem[];
}

@ObjectType()
export class FollowUserTags {
  @Field()
  idUser: number;

  @Field(type => [UserTagItem])
  tags: UserTagItem[];
}

@ObjectType({ description: "Object representing follower and follwed users" })
export default class UserTagEntity {
  // @Field(type => [TagEntity], { nullable: true })
  // tags: TagEntity[];

  @Field(type => [UserEntity], { nullable: true })
  users: UserEntity[];

  @Field(type => [TagsFollowedByUser])
  tagsFollowedByUser: TagsFollowedByUser[];

  @Field(type => [FollowUserTags])
  followUserTags: FollowUserTags[];
}
