import { createConnection, Connection } from 'typeorm';

let db = null;

createConnection().then(_db => db = _db);


const waitForDb = () => {
    // this is a bit dangerous :p and going against JS pattern
    for(let retry = 1000; retry > 0; retry--) {
        if (db) {
            return;
        }
    }
    throw Error('DB is not initialized!');
}

const getDb = () => {
    if (!db) {
        waitForDb();
    }
    return db;
}

export default getDb;
