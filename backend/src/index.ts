import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import schema from './schema';

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

const options: graphqlHTTP.OptionsData = {
    schema,
    graphiql: true,
};
app.use('/graphql', graphqlHTTP(options));
app.listen(3000);

export default app;
