import 'reflect-metadata';
import {
    Resolver,
    Query,
    Ctx,
    Mutation,
    Arg,
    FieldResolver,
    Root,
} from 'type-graphql';

import PostEntity from '../entity/post';
import UserEntity from '../entity/user';

@Resolver(PostEntity)
export default class PostResolver {
    @Query(returns => [PostEntity])
    getPosts(@Ctx() ctx) {
        return ctx.db.getRepository(PostEntity).find({
            order: {
                creationDate: 'DESC',
            },
            limit: 30,
        });
    }

    @FieldResolver()
    user(@Root() post: PostEntity, @Ctx() ctx) {
        //return dataload.load;
        console.log('user', post.idUser);
        return ctx.loader.load(post.idUser);
    }

    async insertPost(text: string, ctx) {
        console.log('ctx.user insert post', ctx.user);
        const post = new PostEntity;
        post.text = text;
        post.user = ctx.user;
        await ctx.db.getRepository(PostEntity).save(post);

        return post;
    }

    @Mutation(returns => PostEntity)
    async addPost(@Arg('text') text: string, @Ctx() ctx) {
        // we should start a transaction
        const post = await this.insertPost(text, ctx);
        await ctx.db.getRepository(PostEntity).save(post);
        return post;
    }
}
