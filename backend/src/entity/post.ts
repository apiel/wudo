import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import UserEntity from './user';
import TagEntity from './tag';

@Entity({name: 'post'})
@ObjectType({ description: "Object representing user post" })
export default class PostEntity {
  @PrimaryGeneratedColumn()
  @Field()
  idPost: number;

  @Column()
  @Field()
  text: string;

  @Field(type => [TagEntity])
  @ManyToMany(type => TagEntity)
  @JoinTable()
  tags: Promise<TagEntity[]>;

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
