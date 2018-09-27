import {
    Field,
    InputType,
} from 'type-graphql';

@InputType()
export default class AllowFollowerInput {
  @Field()
  idTag: number;

  @Field()
  idUser: number;

  @Field()
  allow: boolean;
}
