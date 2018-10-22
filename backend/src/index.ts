import * as express from 'express';
import * as jwt from 'express-jwt';
import * as cookieParser from 'cookie-parser';
import * as graphqlHTTP from 'express-graphql';
import * as compression from 'compression';
import { get } from 'lodash';

import schema from './schema';
import { getPrivateKey } from './lib/auth';
import loaderMiddleware from './dataloader';
import api from './api';
import { waitForDb } from './db';

const app = express();

const boot = async () => {
    await waitForDb();
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

    app.use(loaderMiddleware);

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


/*
SELECT accepted, "tagIdTag", public.tag.name, public.user.name, "followerIdUser", "followedIdUser"
FROM public.user_tag, public.tag, public.user
where "idTag" = "tagIdTag" and "idUser" = "followerIdUser"
ORDER BY "followedIdUser" ASC,  "tagIdTag" ASC
*/

