import 'reflect-metadata';
import {
    Resolver,
    Query,
    Ctx,
    Mutation,
    Arg,
    InputType,
    Field,
} from 'type-graphql';

import PostEntity from '../entity/post';

@InputType()
export class PostInput {
  @Field()
  text: string;

  @Field(type => [Number])
  tags: number[];
}

@Resolver(PostEntity)
export default class PostResolver {
    @Query(returns => [PostEntity])
    getPosts(@Ctx() ctx) {
        return ctx.db.getRepository(PostEntity).find();
    }

    @Mutation(returns => PostEntity)
    async addPost(@Arg('post') postInput: PostInput, @Ctx() ctx) {
        const postRepo = ctx.db.getRepository(PostEntity);
        const post = postRepo.create({
            ...postInput,
            user: ctx.user,
        });
        await postRepo.insert(post);

        return post;
    }
}
