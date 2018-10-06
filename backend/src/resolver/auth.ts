import 'reflect-metadata';
import { Resolver, Mutation, Ctx, Arg } from 'type-graphql';
import fetch from 'node-fetch';
import * as sharp from 'sharp';
import * as crypto from 'crypto';

import AuthEntity from './type/auth';
import UserEntity from '../entity/user';
import { generateToken, expiresIn } from '../lib/auth';

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
            await ctx.db.getRepository(UserEntity).save(user);
        } // else if different we could update

        const jwt = await generateToken(user);
        const cookieOptions = {
            maxAge: expiresIn * 1000,
            httpOnly: true,
            // signed: true, // ? req.signedCookies
        };
        ctx.res.cookie('token', jwt, cookieOptions);

        const auth: AuthEntity = {
            user,
            type,
        }
        return auth;
    }
}
