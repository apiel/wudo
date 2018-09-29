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
import OpenGraphEntity from './openGraph';

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

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  creationDate: Date;

  @Field(type => UserEntity)
  @ManyToOne(type => UserEntity, user => user.posts)
  @JoinColumn({ name: 'idUser' })
  user: Promise<UserEntity>; // | UserEntity;

  // @Field()
  // @Column()
  // idUser: number;

  @Field(type => OpenGraphEntity, { nullable: true })
  @ManyToOne(type => OpenGraphEntity, og => og.posts)
  @JoinColumn({ name: 'idOg' })
  openGraph: Promise<OpenGraphEntity>;
}
