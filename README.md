# WTF.youdo

__What the f*** you do__ is an open source plateform to share interest. Instead to follow someone, user follow some hashtag, since new posts should contain at least one hashtag.

### run dev environment

```
sudo apt-get install postgresql postgresql-contrib
sudo -i -u postgres
pgsql
\password postgres
```

When you do `yarn install`, you might get some issue with the types. To fix it, run `yarn fix-package`

~~The first time you run the backend, the table will be generated automatically. Before that change the in `backend/src/entity/userTag.ts` `synchronize` to true and comment lines with `@Column({ primary: true })`

Now the table are there, you can revert the change and run again. There is a little issue with typeorm and table with multiple primary keys.~~


Start backend:

```
cd backend
yarn generate-private-key
yarn build
yarn start
```

`generate-private-key` has to be done once to generate the private key for signing the JWT.

Start backend in dev mode:

```
yarn build-watch
yarn dev
```

Refresh ssl certificate:

```
sudo certbot --config /etc/letsencrypt/configs/youdo.wtf.conf certonly
```

To run the frontend:

```
yarn start
```

### Todo and possible idea

- new tag & trend tag
- search by tag

- we tag followed and so on, show user that something happen
- add tooltip for explaining how to use youdo.wtf

- login 
-- pinterest
-- facebook
-- github
-- twitter

- share_target <-- not yet possible
- activate notification for specified tags
- notification for new follower?

- tag mention / autocomplete
- @tag for user?
- tag for location?

- see more post than 30?

- like ... smiley
- share post
