import 'reflect-metadata';
import {
    Resolver,
    Query,
    Ctx,
    Arg,
} from 'type-graphql';

import UserEntity from '../entity/user';

@Resolver(UserEntity)
export default class UserResolver {
    @Query(returns => UserEntity)
    async getUser(@Arg('id') id: number, @Ctx() ctx) {
        const z = await ctx.db.getRepository(UserEntity).findOne(id);
        console.log('zzzzzz', z);
        return z;
    }

    @Query(returns => UserEntity)
    getMe(@Ctx() ctx) {
        // console.log('getMe query', ctx.user);
        return ctx.db.getRepository(UserEntity).findOne(ctx.user.idUser);
    }
}
