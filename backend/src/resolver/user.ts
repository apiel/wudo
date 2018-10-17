import 'reflect-metadata';
import {
    Resolver,
    FieldResolver,
    Query,
    Ctx,
    Arg,
    Root,
    Authorized
} from 'type-graphql';
import { Like } from 'typeorm';

import db from '../db';
import UserEntity from '../entity/user';
import TagEntity from '../entity/tag';
import UserTagEntity from '../entity/userTag';

@Resolver(UserEntity)
export default class UserResolver {
    @Authorized()
    @Query(returns => UserEntity)
    async getUser(@Arg('id') id: number, @Ctx() ctx) {
        const z = await db().getRepository(UserEntity).findOne(id);
        console.log('zzzzzz', z);
        return z;
    }

    @Authorized()
    @Query(returns => UserEntity)
    getMe(@Ctx() ctx) {
        // console.log('getMe query', ctx.user);
        // console.log('dbdbdbd', db());
        return db().getRepository(UserEntity).findOne(ctx.user.idUser);
    }

    @FieldResolver()
    tags(@Root() user: UserEntity, @Ctx() ctx) {
        return db().getRepository(TagEntity)
            .createQueryBuilder('tag')
            .where('post."idUser" = :idUser', { idUser: user.idUser })
            .leftJoin('tag.posts', 'post')
            .groupBy('tag."idTag"')
            .getMany();
    }

    @Authorized()
    @Query(returns => [UserEntity])
    async findUsers(@Arg('search') search: string, @Ctx() ctx) {
        const userTagRaw = await db().getRepository(UserTagEntity)
                            .createQueryBuilder('ut')
                            .where('ut.follower = :idUser', { idUser: ctx.user.idUser })
                            .getRawMany();
        const ids = userTagRaw.map(user => user.ut_followedIdUser);

        // we could use join instead of previous query
        // we should also not return user that dont have tags
        const query = db().getRepository(UserEntity)
                    .createQueryBuilder('user')
                    .where('LOWER(user.name) LIKE LOWER(:search)', { search })
                    .limit(30);

        if (ids.length) {
            query.andWhere('user.idUser NOT IN (:...ids)', { ids });
        }

        return query.getMany();
    }
}
