import 'reflect-metadata';
import { Resolver, Mutation, Ctx, Arg } from 'type-graphql';
import fetch from 'node-fetch';
import * as sharp from 'sharp';
import * as crypto from 'crypto';

import AuthEntity from './type/auth';
import UserEntity from '../entity/user';

@Resolver(AuthEntity)
export default class AuthResolver {
    @Mutation(returns => AuthEntity)
    async googleAuth(@Arg('token') token: string, @Ctx() ctx) {
        const fetchResponse = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
        const google = await fetchResponse.json();

        if (!google || !google.email) {
            throw new Error('Something went wrong with Google auth.');
        }
        let user: UserEntity = await ctx.db.getRepository(UserEntity).findOne({ email: google.email });
        let type = 'signin';

        if (!user) {
            type = 'signup';
            user = new UserEntity;
            user.email = google.email;
            user.name = google.name;
            const avatar = await fetch(google.picture);
            const bufferAvatar = await avatar.buffer();
            user.avatar = await sharp(bufferAvatar).resize(100).toBuffer();
            const hash = crypto.createHash('sha1');
            hash.update(user.avatar);
            user.avatarChecksum = hash.digest('hex');
            // await ctx.db.entityManager.persist(user);
            await ctx.db.getRepository(UserEntity).save(user);
        }

        const auth: AuthEntity = {
            jwt: 'lol',
            email: user.email,
            name: user.name,
            type,
        }
        return auth;
    }
}
