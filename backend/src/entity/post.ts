import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import UserEntity from './user';
import TagEntity from './tag';
import PostTagsEntity from './postTags';

@Entity({name: 'post'})
@ObjectType({ description: "Object representing user post" })
export default class PostEntity {
  @PrimaryGeneratedColumn()
  @Field()
  idPost: number;

  @Column()
  @Field()
  text: string;

  // @Column('integer[]')
  // @Column({ type: 'integer', array: true })
  // @OneToMany(type => TagEntity, tag => tag.idTag)
  @OneToMany(type => PostTagsEntity, tag => tag.post)
  // @Field(type => [TagEntity])
  // tags: number[];
  tags: PostTagsEntity[];

  // @Column('string')
  // @Field(type => UserEntity)
  // user: UserEntity;
  @Column()
  @Field()
  user: string;

  @Column()
  @Field()
  creationDate: Date;
}
