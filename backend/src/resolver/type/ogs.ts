import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';

@ObjectType({ description: "Open Graph Scraper" })
export default class OgsEntity {
  @Field()
  error: boolean;

  @Field()
  results: string;
}
