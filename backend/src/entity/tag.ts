import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name: 'tag'})
@ObjectType({ description: "Object representing post tag" })
export default class TagEntity {
  @PrimaryGeneratedColumn()
  @Field()
  idTag: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  creationDate: Date;
}
