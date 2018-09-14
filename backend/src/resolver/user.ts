import 'reflect-metadata';
import {
    Resolver,
    FieldResolver,
    Query,
    Ctx,
    Arg,
    Root,
} from 'type-graphql';
import UserEntity from '../entity/user';

import TagEntity from '../entity/tag';

@Resolver(UserEntity)
export default class UserResolver {
    @Query(returns => UserEntity)
    getUser(@Arg('id') id: number, @Ctx() ctx) {
        return ctx.db.getRepository(UserEntity).findOne(id);
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
