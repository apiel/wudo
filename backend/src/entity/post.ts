import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
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
  tags: Promise<TagEntity[]>; // | TagEntity[];

  @Column({ default: 'now()' })
  @Field()
  creationDate: Date;

  // @Column()
  // // @Field()
  // idUser: string;

  @Field(type => UserEntity)
  @ManyToOne(type => UserEntity, user => user.posts)
  @JoinColumn({ name: "idUser" })
  user: Promise<UserEntity>; // | UserEntity;
}
