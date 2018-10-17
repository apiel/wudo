import 'reflect-metadata';
import { In, Not } from 'typeorm';
import {
    Resolver,
    Query,
    Ctx,
    Mutation,
    Arg,
    Authorized,
} from 'type-graphql';
import { difference, uniq } from 'lodash';

import db from '../db';
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
        return db().getRepository(PostEntity)
                    .createQueryBuilder('post')
                    .leftJoin('post.tags', 'tag')
                    .leftJoin('tag.users', 'user')
                    .where('user.active IS NOT NULL')
                    .andWhere('user.accepted IS NOT NULL')
                    .andWhere('user.followerIdUser = :idUser', { idUser: ctx.user.idUser })
                    .orWhere('post.user = :idUser', { idUser: ctx.user.idUser })
                    .orderBy('post.creationDate', 'DESC')
                    .limit(30)
                    .getMany();
    }

    async insertPost(text: string, ctx) {
        console.log('ctx.user insert post', ctx.user);
        const post = new PostEntity;
        post.text = text;
        post.user = ctx.user;
        await db().getRepository(PostEntity).save(post);

        return post;
    }

    @Authorized()
    @Mutation(returns => PostEntity)
    async addPost(@Arg('post') postInput: PostInput, @Ctx() ctx) {
        // we should start a transaction
        const post = await this.insertPost(postInput.text, ctx);

        post.tags = await db().getRepository(TagEntity).find({
            where: {
                idTag: In(<number[]>postInput.tags),
            },
        });
        await db().getRepository(PostEntity).save(post);
        return post;
    }

    async insertTags(missingTags: string[], ctx) {
        const newTags = missingTags.map(name => {
            const tag = new TagEntity;
            tag.name = name;
            return tag;
        });
        await db().getRepository(TagEntity).save(newTags);
        return newTags;
    }

    async insertOpenGraph(openGraph: OpenGraphInput, ctx) {
        const og = await db().getRepository(OpenGraphEntity).findOne({
            where: openGraph,
        });
        if (og) {
            console.log('og', og);
            return og;
        }
        console.log('save openGraph', openGraph);
        await db().getRepository(OpenGraphEntity).save(openGraph);
        return openGraph;
    }

    async processTags(postTagInput: PostTagInput, ctx) {
        const tags = uniq(postTagInput.tags.map(tag => tag.toLocaleLowerCase()));
        const existingTags: TagEntity[] = await db().getRepository(TagEntity).find({
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
            const openGraph = await this.insertOpenGraph(postTagInput.openGraph, ctx);
            post.idOg = openGraph.idOg;
            // console.log('post.idOg', post.idOg);
        }

        const tags = await this.processTags(postTagInput, ctx);
        post.tags = (async () => tags)();

        await db().getRepository(PostEntity).save(post);

        return post;
    }
}
