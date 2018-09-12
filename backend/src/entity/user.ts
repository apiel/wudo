import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import PostEntity from './post';
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
  @Field()
  email: string;

  @Column()
  @Field()
  creationDate: Date;

  @Column('bytea', { nullable: true })
  avatar: Buffer;

  @Column({ nullable: true })
  avatarChecksum: string;

  @OneToMany(type => PostEntity, post => post.user)
  @Field(type => [PostEntity])
  posts: Promise<PostEntity[]>;
}
