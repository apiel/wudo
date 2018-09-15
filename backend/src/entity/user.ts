import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import PostEntity from './post';
import TagEntity from './tag';
import FollowUserTagEntity from './userTag';

@Entity('user')
@ObjectType({ description: "Object representing the user" })
export default class UserEntity {
  @PrimaryGeneratedColumn()
  @Field()
  idUser: number;

  @Column()
  @Field()
  name: string;

  @Column()
  // @Field({ nullable: true })
  email: string;

  @Column({ default: 'now()' })
  // @Field()
  creationDate: Date;

  @Column('bytea', { nullable: true })
  avatar: Buffer;

  @Column({ nullable: true })
  avatarChecksum: string;

  @OneToMany(type => PostEntity, post => post.user)
  @Field(type => [PostEntity])
  posts: Promise<PostEntity[]>;

  @Field(type => [TagEntity], { nullable: true })
  tags: TagEntity[];

  @OneToMany(type => FollowUserTagEntity, userTag => userTag.followed)
  // @Field(type => [FollowUserTagEntity]) // Maximum call stack size exceeded
  tagsFollowedByUser: Promise<FollowUserTagEntity[]>;

  @OneToMany(type => FollowUserTagEntity, userTag => userTag.follower)
  // @Field(type => [FollowUserTagEntity]) // Maximum call stack size exceeded
  followUserTags: Promise<FollowUserTagEntity[]>;
}
