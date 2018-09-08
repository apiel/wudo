import * as express from "express";

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

app.listen(3000);

export default app;
