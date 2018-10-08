import 'reflect-metadata';
import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import UserEntity from './user';
import TagEntity from './tag';

@Entity({name: 'user_tag', synchronize: true})
@ObjectType({ description: "Object representing the user tags" })
export default class UserTagEntity {
  @Field(type => UserEntity)
  @ManyToOne(type => UserEntity, user => user.followUserTags, { primary: true })
  follower: Promise<UserEntity>;

  @Column({ primary: true }) // synchronization doesnt work
  followerIdUser: number;

  @Field(type => UserEntity)
  @ManyToOne(type => UserEntity, user => user.tagsFollowedByUser, { primary: true })
  followed: Promise<UserEntity>;

  @Column({ primary: true })
  followedIdUser: number;

  @Field(type => TagEntity)
  @ManyToOne(type => TagEntity, tag => tag.users, { primary: true })
  tag: Promise<TagEntity>;

  @Column({ primary: true })
  tagIdTag: number;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Field({ nullable: true })
  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  accepted: Date;

  @Field({ nullable: true })
  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  active: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  viewed: Date;
}
