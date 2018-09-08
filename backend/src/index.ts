import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import { root, schema } from './model';

const app = express();

const user = (req, res, next) => {
    req.user = {
        name: 'Alex Youi',
    }
    next();
}

app.use(user);

app.get('/', (req, res) => {
    res.send(`Hello ${req.user.name}`);
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(3000);

export default app;
