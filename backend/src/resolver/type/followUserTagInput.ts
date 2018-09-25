import {
    Field,
    InputType,
} from 'type-graphql';

@InputType()
export default class FollowUserTagInput {
  @Field()
  idTag: number;

  @Field()
  idUser: number;

  @Field()
  active: boolean;
}
