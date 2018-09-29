import {
    Field,
    InputType,
} from 'type-graphql';

@InputType()
export default class openGraphInput {
  @Field()
  url: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  video: string;

  @Field()
  image: string;
}
