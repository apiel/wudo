import 'reflect-metadata';
import { Resolver, Query, Ctx } from 'type-graphql';

import PostEntity from '../entity/post';
import UserResolver from '../resolver/user';
import TagResolver from '../resolver/tag';

@Resolver(PostEntity)
export default class PostResolver {
    @Query(returns => [PostEntity])
    getPosts(@Ctx() ctx) {
        return ctx.db.getRepository(PostEntity).find({
            relations: ['tags'], // we should use lazy loading
        });
    }
}
