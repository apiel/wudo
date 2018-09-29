import 'reflect-metadata';
import { In } from 'typeorm';
import {
    Resolver,
    Query,
    Ctx,
    Mutation,
    Arg,
    Authorized,
} from 'type-graphql';
import { difference, uniq } from 'lodash';

import PostEntity from '../entity/post';
import TagEntity from '../entity/tag';
import OpenGraphEntity from '../entity/openGraph';
import PostInput from './type/postInput';
import PostTagInput from './type/postTagInput';
import OpenGraphInput from './type/openGraphInput';

@Resolver(PostEntity)
export default class PostResolver {
    @Authorized()
    @Query(returns => [PostEntity])
    getPosts(@Ctx() ctx) {
        return ctx.db.getRepository(PostEntity).find({
            order: {
                creationDate: 'DESC',
            },
            limit: 30,
        });
    }

    async insertPost(text: string, ctx) {
        console.log('ctx.user insert post', ctx.user);
        const post = new PostEntity;
        post.text = text;
        post.user = ctx.user;
        await ctx.db.getRepository(PostEntity).save(post);

        return post;
    }

    @Authorized()
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

    async insertOpenGraph(openGraph: OpenGraphInput, ctx) {
        const og = await ctx.db.getRepository(OpenGraphEntity).findOne({
            where: openGraph,
        });
        if (og) {
            console.log('og', og);
            return og;
        }
        console.log('save openGraph', openGraph);
        await ctx.db.getRepository(OpenGraphEntity).save(openGraph);
        return openGraph;
    }

    async processTags(postTagInput: PostTagInput, ctx) {
        const tags = uniq(postTagInput.tags.map(tag => tag.toLocaleLowerCase()));
        const existingTags: TagEntity[] = await ctx.db.getRepository(TagEntity).find({
            select: ['name', 'idTag'],
            where: {
                name: In(tags),
            },
        });

        const existingTagNames = existingTags.map(tag => tag.name);
        const missingTags = difference(tags, existingTagNames);
        const newTags:TagEntity[] = missingTags ? await this.insertTags(missingTags, ctx) : [];

        return [...existingTags, ...newTags];
    }

    @Authorized()
    @Mutation(returns => PostEntity)
    async addPostAndTag(@Arg('post') postTagInput: PostTagInput, @Ctx() ctx) {
        // we should start a transaction
        const post = await this.insertPost(postTagInput.text, ctx);

        if (postTagInput.openGraph) {
            post.openGraph = this.insertOpenGraph(postTagInput.openGraph, ctx);

            console.log('post.openGraph', post.openGraph);
        }

        const tags = await this.processTags(postTagInput, ctx);
        post.tags = (async () => tags)();

        await ctx.db.getRepository(PostEntity).save(post);

        return post;
    }
}
