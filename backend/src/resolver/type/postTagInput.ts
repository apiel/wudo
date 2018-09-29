import {
    Field,
    InputType,
} from 'type-graphql';

import OpenGraphInput from './openGraphInput';

@InputType()
export default class PostTagInput {
  @Field()
  text: string;

  @Field(type => [String])
  tags: string[];

  @Field(type => OpenGraphInput, { nullable: true })
  openGraph: OpenGraphInput;
}
