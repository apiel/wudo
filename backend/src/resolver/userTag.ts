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
import { In } from 'typeorm';
import { values } from 'lodash';

// import UserTagType, { TagsFollowedByUser, FollowUserTags, UserTagItem } from './type/userTag';
import { UserTagItem } from './type/userTag';
import UserTagEntity from '../entity/userTag';
import TagEntity from '../entity/tag';
import UserEntity from '../entity/user';
import FollowUserTagInput from './type/followUserTagInput';
import AllowFollowerInput from './type/allowFollowerInput';

// @Resolver(UserTagType)
@Resolver(UserTagEntity)
export default class UserTagResolver {
    @FieldResolver()
    follower(@Root() userTag: UserTagEntity, @Ctx() ctx) {
        // console.log('userTag', userTag);
        // console.log('userTag.followerIdUser', userTag.followerIdUser);
        return ctx.loader.load(userTag.followerIdUser);
    }

    @FieldResolver()
    followed(@Root() userTag: UserTagEntity, @Ctx() ctx) {
        // console.log('userTag', userTag);
        // console.log('userTag.followedIdUser', userTag.followedIdUser);
        return ctx.loader.load(userTag.followedIdUser);
    }

    // userIds: number[];
    // tagIds: number[];
    // tagsFollowedByUser: { [idTag: string]: TagsFollowedByUser };
    // followUserTags: { [idUser: string]: FollowUserTags };

    // init() {
    //     this.userIds = [];
    //     this.tagIds = [];
    //     this.tagsFollowedByUser = {};
    //     this.followUserTags = {};
    // }

    // getUserTagRaw = (ctx) => ctx.db.getRepository(UserTagEntity)
    //             .createQueryBuilder('ut')
    //             .where('ut.follower = :idUser', { idUser: ctx.user.idUser })
    //             .orWhere('ut.followed = :idUser', { idUser: ctx.user.idUser })
    //             .getRawMany();

    // parseFollower(row) {
    //     this.userIds.push(row.ut_followerIdUser);
    //     if (!this.tagsFollowedByUser[row.ut_tagIdTag]) {
    //         this.tagsFollowedByUser[row.ut_tagIdTag] = {
    //             idTag: row.ut_tagIdTag,
    //             users: [],
    //         };
    //     }
    //     this.tagsFollowedByUser[row.ut_tagIdTag]
    //         .users.push({
    //             idItem: row.ut_followerIdUser,
    //             accepted: row.ut_accepted,
    //             viewed: row.ut_viewed,
    //             active: row.ut_active,
    //         });
    // }

    // parseFollowed(row) {
    //     this.userIds.push(row.ut_followedIdUser);
    //     if (!this.followUserTags[row.ut_followedIdUser]) {
    //         this.followUserTags[row.ut_followedIdUser] = {
    //             idUser: row.ut_followedIdUser,
    //             tags: [],
    //         };
    //     }
    //     this.followUserTags[row.ut_followedIdUser]
    //         .tags.push({
    //             idItem: row.ut_tagIdTag,
    //             accepted: row.ut_accepted,
    //             viewed: row.ut_viewed,
    //             active: row.ut_active,
    //         });
    // }

    // parseUserTagRaw(ctx, userTagRaw) {
    //     userTagRaw.forEach(row => {
    //         if (row.ut_followerIdUser !== ctx.user.idUser) {
    //             this.parseFollower(row);
    //         } else {
    //             this.parseFollowed(row);
    //         }
    //         this.tagIds.push(row.ut_tagIdTag);
    //     });
    // }

    // @Authorized()
    // @Query(returns => UserTagType)
    // async getFollowers(@Ctx() ctx) {
    //     this.init();
    //     const userTagRaw = await this.getUserTagRaw(ctx);
    //     this.parseUserTagRaw(ctx, userTagRaw);

    //     const users = await ctx.db.getRepository(UserEntity).find({
    //         where: { idUser: In(this.userIds) },
    //     });
    //     // const tags = await ctx.db.getRepository(TagEntity).find({
    //     //     where: { idTag: In(this.tagIds) },
    //     // });
    //     const userTags = {
    //         // tags,
    //         users,
    //         tagsFollowedByUser: values(this.tagsFollowedByUser),
    //         followUserTags: values(this.followUserTags),
    //     }
    //     // console.log('userTags', userTags);

    //     return userTags;
    // }

    @Authorized()
    @Mutation(returns => UserTagItem)
    async followUserTag(@Arg('userTag') input: FollowUserTagInput, @Ctx() ctx) {
        const where = {
            follower: ctx.user,
            followed: await ctx.db.getRepository(UserEntity).findOne(input.idUser),
            tag: await ctx.db.getRepository(TagEntity).findOne(input.idTag),
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
    @Mutation(returns => UserTagItem)
    async allowFollower(@Arg('userTag') input: AllowFollowerInput, @Ctx() ctx) {
        const where = {
            followed: ctx.user,
            follower: await ctx.db.getRepository(UserEntity).findOne(input.idUser),
            tag: await ctx.db.getRepository(TagEntity).findOne(input.idTag),
        };
        const params = { accepted: input.allow ? new Date : null };
        await ctx.db.getRepository(UserTagEntity).update(where, params);

        return ctx.db.getRepository(UserTagEntity).findOne({ where });
    }
}
