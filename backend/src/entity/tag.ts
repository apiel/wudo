import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';

@ObjectType({ description: "Object representing post tag" })
export default class TagEntity {
  @Field()
  idTag: number;

  @Field()
  name: string;

  @Field()
  creationDate: Date;
}
