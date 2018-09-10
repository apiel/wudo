import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { createConnection } from 'typeorm';

import schema from './schema';

const app = express();

const user = (req, res, next) => {
    req.user = {
        name: 'Alex Youi',
    }
    next();
}

const db = async (req, res, next) => {
    // req.db = await createConnection(); // need to put this outside let s do boot func
    req.db = 'abc';
    next();
}

app.use(user, db);

app.get('/', (req, res) => {
    res.send(`Hello ${req.user.name}`);
});

const options: graphqlHTTP.OptionsData = {
    schema,
    graphiql: true,
};
app.use('/graphql', graphqlHTTP(options));
app.listen(3000);

export default app;
