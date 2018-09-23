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
import UserEntity from '../entity/user';

import TagEntity from '../entity/tag';

@Resolver(UserEntity)
export default class UserResolver {
    @Authorized()
    @Query(returns => UserEntity)
    async getUser(@Arg('id') id: number, @Ctx() ctx) {
        const z = await ctx.db.getRepository(UserEntity).findOne(id);
        console.log('zzzzzz', z);
        return z;
    }

    @Authorized()
    @Query(returns => UserEntity)
    getMe(@Ctx() ctx) {
        // console.log('getMe query', ctx.user);
        return ctx.db.getRepository(UserEntity).findOne(ctx.user.idUser);
    }

    @FieldResolver()
    tags(@Root() user: UserEntity, @Ctx() ctx) {
        return ctx.db.getRepository(TagEntity)
            .createQueryBuilder('tag')
            .where('post."idUser" = :idUser', { idUser: user.idUser })
            .leftJoin('tag.posts', 'post')
            .groupBy('tag."idTag"')
            .getMany();
    }

    // @FieldResolver()
    // email(@Root() user: UserEntity, @Ctx() ctx) {
    //     return ctx.user.idUser === user.idUser ? user.email : null;
    // }
}
