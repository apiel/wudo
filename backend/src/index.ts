import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { createConnection } from 'typeorm';

import schema from './schema';

const app = express();

const boot = async () => {
    const db = await createConnection();
    const mainMiddleware = (req, res, next) => {
        req.db = db;
        req.user = {
            name: 'Alex Youi',
        }
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
