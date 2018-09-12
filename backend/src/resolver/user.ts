import 'reflect-metadata';
import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import UserEntity from '../entity/user';

@Resolver(UserEntity)
export default class UserResolver {
    @Query(returns => UserEntity)
    getUser(@Arg('id') id: number, @Ctx() ctx) {
        return ctx.db.getRepository(UserEntity).findOne(id);
    }
}
