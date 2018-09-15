import 'reflect-metadata';
// import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import UserEntity from './user';
import TagEntity from './tag';

@Entity({name: 'user_tag'})
// @ObjectType({ description: "Object representing follower and follwed users" })
export default class UserTagEntity {
  @ManyToOne(type => UserEntity, user => user.followUserTags, { primary: true })
  // @Field(type => UserEntity)
  follower: Promise<UserEntity>;

  @ManyToOne(type => UserEntity, user => user.tagsFollowedByUser, { primary: true })
  // @Field(type => UserEntity)
  followed: Promise<UserEntity>;

  // @PrimaryColumn('integer', { name: 'idTag' })
  @ManyToOne(type => TagEntity, tag => tag.users, { primary: true })
  // @Field(type => TagEntity)
  tag: Promise<TagEntity>;

  @Column({ default: 'now()' })
  // @Field()
  creationDate: Date;

  @Column({ nullable: true })
  // @Field({ nullable: true })
  accepted: Date;
}
