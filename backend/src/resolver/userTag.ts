import 'reflect-metadata';
import { Resolver, Query, Ctx } from 'type-graphql';
import { In } from 'typeorm';
import { values } from 'lodash';

import UserTagType, { TagsFollowedByUser, FollowUserTags } from './type/userTag';
import UserTagEntity from '../entity/userTag';
import TagEntity from '../entity/tag';
import UserEntity from '../entity/user';

@Resolver(UserTagType)
export default class UserTagResolver {
    userIds: number[];
    tagIds: number[];
    tagsFollowedByUser: { [idTag: string]: TagsFollowedByUser };
    followUserTags: { [idUser: string]: FollowUserTags };

    init() {
        this.userIds = [];
        this.tagIds = [];
        this.tagsFollowedByUser = {};
        this.followUserTags = {};
    }

    getUserTagRaw = (ctx) => ctx.db.getRepository(UserTagEntity)
                .createQueryBuilder('ut')
                .where('ut.follower = :idUser', { idUser: ctx.user.idUser })
                .orWhere('ut.followed = :idUser', { idUser: ctx.user.idUser })
                .getRawMany();

    parseFollower(row) {
        this.userIds.push(row.ut_followerIdUser);
        if (!this.tagsFollowedByUser[row.ut_tagIdTag]) {
            this.tagsFollowedByUser[row.ut_tagIdTag] = {
                idTag: row.ut_tagIdTag,
                users: [],
            };
        }
        this.tagsFollowedByUser[row.ut_tagIdTag]
            .users.push({
                id: row.ut_followerIdUser,
                accepted: row.ut_accepted,
            });
    }

    parseFollowed(row) {
        this.userIds.push(row.ut_followedIdUser);
        if (!this.followUserTags[row.ut_followedIdUser]) {
            this.followUserTags[row.ut_followedIdUser] = {
                idUser: row.ut_followedIdUser,
                tags: [],
            };
        }
        this.followUserTags[row.ut_followedIdUser]
            .tags.push({
                id: row.ut_tagIdTag,
                accepted: row.ut_accepted,
            });
    }

    parseUserTagRaw(ctx, userTagRaw) {
        userTagRaw.forEach(row => {
            if (row.ut_followerIdUser !== ctx.user.idUser) {
                this.parseFollower(row);
            } else {
                this.parseFollowed(row);
            }
            this.tagIds.push(row.ut_tagIdTag);
        });
    }

    @Query(returns => UserTagType)
    async getFollowers(@Ctx() ctx) {
        this.init();
        const userTagRaw = await this.getUserTagRaw(ctx);
        this.parseUserTagRaw(ctx, userTagRaw);

        const users = await ctx.db.getRepository(UserEntity).find({
            where: { idUser: In(this.userIds) },
        });
        const tags = await ctx.db.getRepository(TagEntity).find({
            where: { idTag: In(this.tagIds) },
        });
        const userTags = {
            tags,
            users,
            tagsFollowedByUser: values(this.tagsFollowedByUser),
            followUserTags: values(this.followUserTags),
        }
        // console.log('userTags', userTags);

        return userTags;
    }
}
