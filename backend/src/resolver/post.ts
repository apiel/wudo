import 'reflect-metadata';
import { In } from 'typeorm';
import {
    Resolver,
    Query,
    Ctx,
    Mutation,
    Arg,
} from 'type-graphql';
import { difference } from 'lodash';

import PostEntity from '../entity/post';
import TagEntity from '../entity/tag';
import PostInput from './type/postInput';
import PostTagInput from './type/postTagInput';

@Resolver(PostEntity)
export default class PostResolver {
    @Query(returns => [PostEntity])
    getPosts(@Ctx() ctx) {
        return ctx.db.getRepository(PostEntity).find({
            order: {
                creationDate: 'DESC',
            },
        });
    }

    async insertPost(text: string, ctx) {
        const post = new PostEntity;
        post.text = text;
        post.user = ctx.user;
        await ctx.db.getRepository(PostEntity).save(post);

        return post;
    }

    @Mutation(returns => PostEntity)
    async addPost(@Arg('post') postInput: PostInput, @Ctx() ctx) {
        // we should start a transaction
        const post = await this.insertPost(postInput.text, ctx);

        post.tags = await ctx.db.getRepository(TagEntity).find({
            where: {
                idTag: In(<number[]>postInput.tags),
            },
        });
        await ctx.db.getRepository(PostEntity).save(post);
        return post;
    }

    async insertTags(missingTags: string[], ctx) {
        const newTags = missingTags.map(name => {
            const tag = new TagEntity;
            tag.name = name;
            return tag;
        });
        await ctx.db.getRepository(TagEntity).save(newTags);
        return newTags;
    }

    @Mutation(returns => PostEntity)
    async addPostAndTag(@Arg('post') postTagInput: PostTagInput, @Ctx() ctx) {
        // we should start a transaction
        const post = await this.insertPost(postTagInput.text, ctx);

        const tags = postTagInput.tags.map(tag => tag.toLocaleLowerCase());
        const existingTags: TagEntity[] = await ctx.db.getRepository(TagEntity).find({
            select: ['name', 'idTag'],
            where: {
                name: In(tags),
            },
        });
        const existingTagNames = existingTags.map(tag => tag.name);
        const missingTags = difference(tags, existingTagNames);
        const newTags:TagEntity[] = missingTags ? await this.insertTags(missingTags, ctx) : [];

        post.tags = (async () => [...existingTags, ...newTags])();
        await ctx.db.getRepository(PostEntity).save(post);

        return post;
    }
}
