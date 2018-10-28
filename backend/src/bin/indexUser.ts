import { Client } from 'elasticsearch';

import db, { waitForDb } from '../db';
import UserEntity from '../entity/user';

const client = new Client({
    host: 'localhost:9200',
    log: 'trace'
});

const boot = async () => {
    await waitForDb();
    const users = await db().getRepository(UserEntity).find();
    console.log('users', users);

    const body = [];
    users.forEach(user => {
        body.push({ index:  { _index: 'user', _type: 'user', _id: user.idUser }});
        body.push({ name: user.name });
    });

    const deleteResult = await client.indices.delete({ index: 'user' });
    console.log('deleteResult:', deleteResult);

    const result = await client.bulk({ body });
    console.log('result:', result);
}
boot();
