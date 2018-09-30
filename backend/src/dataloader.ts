import * as DataLoader from 'dataloader';
import { In } from 'typeorm';

import UserEntity from './entity/user';
import TagEntity from './entity/tag';

const loaderMiddleware = (req, res, next) => {
    const user = new DataLoader(async (ids: string[]) => {
        return req.db.getRepository(UserEntity).find({
            where: { idUser: In(ids) },
        });
    });

    const follower = new DataLoader(async (ids: string[]) => {
        return req.db.getRepository(UserEntity).find({
            where: { idUser: In(ids) },
        });
    });

    const followed = new DataLoader(async (ids: string[]) => {
        return req.db.getRepository(UserEntity).find({
            where: { idUser: In(ids) },
        });
    });

    const tag = new DataLoader(async (ids: string[]) => {
        return req.db.getRepository(TagEntity).find({
            where: { idTag: In(ids) },
        });
    });

    req.loader = {
        user,
        tag,
        follower,
        followed,
    };

    next();
}

export default loaderMiddleware;