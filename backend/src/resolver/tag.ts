import 'reflect-metadata';
import { Resolver, Query, Ctx, Arg, Authorized } from 'type-graphql';
import { Connection } from 'typeorm';
import TagEntity from '../entity/tag';

import db from '../db';

@Resolver(TagEntity)
export default class TagResolver {
    @Authorized() // not really necessary
    @Query(returns => TagEntity)
    getTag(@Arg('id') id: number, @Ctx() ctx) {
        return db().getRepository(TagEntity).findOne(id);
    }

    @Authorized() // not really necessary
    @Query(returns => [TagEntity])
    getLastTags(@Ctx() ctx) {
        const db: Connection = db;
        return db().getRepository(TagEntity).find({
            take: 10,
            order: { creationDate: 'DESC' }
        });
    }

    // getMostFollowedTags
    // getMostPostedTags
}
