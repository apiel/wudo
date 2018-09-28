import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { createConnection, In } from 'typeorm';
import * as DataLoader from 'dataloader';

import schema from './schema';
import UserEntity from './entity/user';

const app = express();

const boot = async () => {
    const db = await createConnection();
    const user = await db.getRepository(UserEntity).findOne(1);

    app.use((error, req, res, next) => {
        res.status(error.status).json({ error });
    });

    const mainMiddleware = (req, res, next) => {
        req.db = db;
        req.user = user;
        next();
    }

    const loaderMiddleware = (req, res, next) => {
        req.loader = new DataLoader((ids: string[]) => {
            return db.getRepository(UserEntity).find({
                where: { breederId: In(ids) },
            });
        });
        next();
    }

    app.use(mainMiddleware, loaderMiddleware);

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
