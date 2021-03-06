import {
    Field,
    InputType,
} from 'type-graphql';

@InputType()
export default class PostInput {
  @Field()
  text: string;

  @Field(type => [Number])
  tags: number[];
}
