import 'reflect-metadata';
import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import TagEntity from '../entity/tag';

@Resolver(TagEntity)
export default class TagResolver {
    @Query(returns => TagEntity)
    getTag(@Arg('id') id: number, @Ctx() ctx) {
        return ctx.db.getRepository(TagEntity).findOne(id);
    }

    @Query(returns => [TagEntity])
    getTags(@Ctx() ctx) {
        return ctx.db.getRepository(TagEntity).find();
    }
}
