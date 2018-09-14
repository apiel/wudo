import 'reflect-metadata';
import { In } from 'typeorm';
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
import TagEntity from '../entity/tag';

// need to move this somewhere
@InputType()
export class PostInput {
  @Field()
  text: string;

  @Field(type => [Number])
  tags: number[] | TagEntity[];
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

        console.log('yoyoyoyo', postInput.tags);
        (<TagEntity[]> post.tags) = await ctx.db.getRepository(TagEntity).find({
            where: {
                idTag: In(<number[]>postInput.tags),
            }
        });
        await postRepo.save(post);
        return post;
    }
}
