import 'reflect-metadata';
import {
    Resolver,
    Query,
    Ctx,
    Authorized,
    Mutation,
    Arg,
    FieldResolver,
    Root,
} from 'type-graphql';
// import { In } from 'typeorm';
// import { values } from 'lodash';

// import UserTagType, { TagsFollowedByUser, FollowUserTags, UserTagItem } from './type/userTag';
// import { UserTagItem } from './type/userTag';
import UserTagEntity from '../entity/userTag';
// import TagEntity from '../entity/tag';
// import UserEntity from '../entity/user';
import FollowUserTagInput from './type/followUserTagInput';
import AllowFollowerInput from './type/allowFollowerInput';

// @Resolver(UserTagType)
@Resolver(UserTagEntity)
export default class UserTagResolver {
    @FieldResolver()
    follower(@Root() userTag: UserTagEntity, @Ctx() ctx) {
        return ctx.loader.follower.load(userTag.followerIdUser);
    }

    @FieldResolver()
    followed(@Root() userTag: UserTagEntity, @Ctx() ctx) {
        return ctx.loader.followed.load(userTag.followedIdUser);
    }

    @FieldResolver()
    tag(@Root() userTag: UserTagEntity, @Ctx() ctx) {
        return ctx.loader.tag.load(userTag.tagIdTag);
    }

    @Authorized()
    @Query(returns => [UserTagEntity])
    getFollowers(@Ctx() ctx) {
        return ctx.db.getRepository(UserTagEntity).find({
            where: {
                followedIdUser: ctx.user.idUser,
            }
        });
    }

    @Authorized()
    @Query(returns => [UserTagEntity])
    getTagsFollowed(@Ctx() ctx) {
        return ctx.db.getRepository(UserTagEntity).find({
            where: {
                followerIdUser: ctx.user.idUser,
            }
        });
    }

    @Authorized()
    @Mutation(returns => UserTagEntity)
    async followUserTag(@Arg('userTag') input: FollowUserTagInput, @Ctx() ctx) {
        const where = {
            followerIdUser: ctx.user.idUser,
            followedIdUser: input.idUser,
            tagIdTag: input.idTag,
        };
        const userTag = await ctx.db.getRepository(UserTagEntity).findOne({ where });
        const params = { active: input.active ? new Date : null };

        if (userTag) {
            await ctx.db.getRepository(UserTagEntity).update(where, params);
        } else {
            await ctx.db.getRepository(UserTagEntity).insert({...where, ...params})
        }

        return ctx.db.getRepository(UserTagEntity).findOne({ where });
    }

    @Authorized()
    @Mutation(returns => UserTagEntity)
    async allowFollower(@Arg('userTag') input: AllowFollowerInput, @Ctx() ctx) {
        const where = {
            followerIdUser: input.idUser,
            followedIdUser: ctx.user.idUser,
            tagIdTag: input.idTag,
        };
        const params = { accepted: input.allow ? new Date : null };
        await ctx.db.getRepository(UserTagEntity).update(where, params);

        return ctx.db.getRepository(UserTagEntity).findOne({ where });
    }
}
