import 'reflect-metadata';
import { Resolver, Query, Ctx } from 'type-graphql';

import PostEntity from '../entity/post';

@Resolver(PostEntity)
export default class PostResolver {
    @Query(returns => [PostEntity])
    getPosts(@Ctx() ctx) {
        return ctx.db.getRepository(PostEntity).find();
    }
}
