import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import UserEntity from './user';

@Entity({name: 'post'})
@ObjectType({ description: "Object representing user post" })
export default class PostEntity {
  @PrimaryGeneratedColumn()
  @Field()
  idPost: number;

  @Column()
  @Field()
  text: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  creationDate: Date;

  @Field(type => UserEntity)
  @ManyToOne(type => UserEntity, user => user.posts)
  @JoinColumn({ name: 'idUser' })
  user: Promise<UserEntity>; // | UserEntity;

  @Column()
  idUser: number;
}
