import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { createConnection } from 'typeorm';

import schema from './schema';
import UserEntity from './entity/user';

import PostEntity from './entity/post';
import TagEntity from './entity/tag';

const app = express();

const boot = async () => {
    const db = await createConnection();
    const user = await db.getRepository(UserEntity).findOne(1);


    // const postRepo = db.getRepository(PostEntity);
    // const post = postRepo.create({
    //     text: 'testets 123',
    //     user,
    //     // tags: await db.getRepository(TagEntity).find()
    // });
    // await postRepo.insert(post);
    // const yo = await db.getRepository(PostEntity).findOne(post.idPost, { relations: ["tags"] });
    // console.log('blah', yo);
    // // (<TagEntity[]> yo.tags).push(await db.getRepository(TagEntity).findOne(1));
    // (<TagEntity[]> yo.tags) = await db.getRepository(TagEntity).find();
    // await postRepo.save(yo);


    const mainMiddleware = (req, res, next) => {
        req.db = db;
        req.user = user;
        next();
    }

    app.use(mainMiddleware);

    app.get('/', (req, res) => {
        res.send(`Hello ${req.user.name}`);
    });

    const options: graphqlHTTP.OptionsData = {
        schema,
        graphiql: true,
    };
    app.use('/graphql', graphqlHTTP(options));
    app.listen(3000);
}
boot();

export default app;
