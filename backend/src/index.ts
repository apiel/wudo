import * as express from 'express';
import * as jwt from 'express-jwt';
import * as cookieParser from 'cookie-parser';
import * as graphqlHTTP from 'express-graphql';
import * as compression from 'compression';
import { createConnection, Not } from 'typeorm';

import schema from './schema';
import UserEntity from './entity/user';
import { getPrivateKey } from './lib/auth';
import loaderMiddleware from './dataloader';
import api from './api';
import { get } from 'lodash';

import PostEntity from './entity/post';

const app = express();

const boot = async () => {
    const db = await createConnection();
    // const user = await db.getRepository(UserEntity).findOne(2);

    app.use(cookieParser());

    const secret = await getPrivateKey();
    app.use(jwt({
        secret,
        credentialsRequired: false,
        getToken: (req) => get(req, 'cookies.token'),
    }));

    app.use(compression());

    app.use((error, req, res, next) => {
        res.status(error.status).json({ error });
    });

    const mainMiddleware = (req, res, next) => {
        req.db = db;
        // req.user = user;
        next();
    }

    app.use(mainMiddleware, loaderMiddleware);

    app.use('/api', api);

    app.get('/', (req, res) => {
        res.send(`Hello ${req.user.name}`);
    });

    const options: graphqlHTTP.OptionsData = {
        schema,
        graphiql: true,
    };
    app.use('/graphql', graphqlHTTP(options));
    app.listen(3030);
}
boot();

export default app;
