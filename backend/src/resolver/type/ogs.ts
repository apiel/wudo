import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class OgsMediaEntity {
  @Field({ nullable: true })
  url: string;

  @Field({ nullable: true })
  width: number;

  @Field({ nullable: true })
  height: number;

  @Field({ nullable: true })
  type: string;
}

@ObjectType({ description: "Open Graph Scraper" })
export default class OgsEntity {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => OgsMediaEntity, { nullable: true })
  video?: OgsMediaEntity;

  @Field(type => OgsMediaEntity, { nullable: true })
  image?: OgsMediaEntity;

  @Field({ nullable: true })
  error?: string;
}
