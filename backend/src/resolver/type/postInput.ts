import {
    Field,
    InputType,
} from 'type-graphql';

import TagEntity from '../../entity/tag';

@InputType()
export default class PostInput {
  @Field()
  text: string;

  @Field(type => [Number])
  tags: number[] | TagEntity[];
}
