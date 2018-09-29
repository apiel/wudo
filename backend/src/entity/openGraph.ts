import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import PostEntity from './post';

@Entity({name: 'opengraph'})
@ObjectType({ description: "Object representing open graph" })
export default class OpenGraphEntity {
  @PrimaryGeneratedColumn()
  @Field()
  idOg: number;

  @Column()
  @Field()
  url: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  video: string;

  @Column()
  @Field()
  image: string;

  @OneToMany(type => PostEntity, post => post.openGraph)
  @Field(type => [PostEntity])
  posts: Promise<PostEntity[]>;
}
