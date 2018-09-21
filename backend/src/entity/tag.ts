import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  Unique,
} from 'typeorm';

import PostEntity from './post';
import UserTagEntity from './userTag';

@Entity({name: 'tag'})
@Unique(['name'])
@ObjectType({ description: "Object representing post tag" })
export default class TagEntity {
  @PrimaryGeneratedColumn()
  @Field()
  idTag: number;

  @Column()
  @Field()
  name: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  creationDate: Date;

  @ManyToMany(type => PostEntity)
  @JoinTable({ name: 'post_tags_tag' })
  posts: Promise<PostEntity[]>;

  @OneToMany(type => UserTagEntity, userTag => userTag.tag)
  // @Field(type => [UserTagEntity]) // Maximum call stack size exceeded
  users: Promise<UserTagEntity[]>;
}
