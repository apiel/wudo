import {
    Field,
    InputType,
} from 'type-graphql';

@InputType()
export default class PostTagInput {
  @Field()
  text: string;

  @Field(type => [String])
  tags: string[];
}
