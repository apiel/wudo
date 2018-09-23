import 'reflect-metadata';
import { Resolver, Query, Ctx, Arg, Authorized } from 'type-graphql';
import TagEntity from '../entity/tag';

@Resolver(TagEntity)
export default class TagResolver {
    @Authorized() // not really necessary
    @Query(returns => TagEntity)
    getTag(@Arg('id') id: number, @Ctx() ctx) {
        return ctx.db.getRepository(TagEntity).findOne(id);
    }

    @Authorized() // not really necessary
    @Query(returns => [TagEntity])
    getTags(@Ctx() ctx) {
        return ctx.db.getRepository(TagEntity).find();
    }

    // need to create tag
}
