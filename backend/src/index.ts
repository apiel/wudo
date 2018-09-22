import * as express from 'express';
import * as jwt from 'express-jwt';
import * as graphqlHTTP from 'express-graphql';
import { createConnection } from 'typeorm';

import schema from './schema';
import UserEntity from './entity/user';
import { getPrivateKey } from './lib/auth';

const app = express();

const boot = async () => {
    const db = await createConnection();
    // const user = await db.getRepository(UserEntity).findOne(2);

    const secret = await getPrivateKey();
    app.use(jwt({
        secret,
        credentialsRequired: false,
    })); //.unless({path: ['/token']}));

    const mainMiddleware = (req, res, next) => {
        req.db = db;
        // req.user = user;
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
    app.listen(3030);
}
boot();

export default app;
