import { createConnection, Connection } from 'typeorm';

let db = null;

createConnection().then(_db => db = _db);

export const waitForDb = (retry = 100) => new Promise((resolve, reject) => {
    const interval = setInterval(() => {
        if (db) {
            // console.log('db is ready...', retry);
            clearInterval(interval);
            resolve(db);
        }
        if (!retry) {
            clearInterval(interval);
            reject();
        }
        retry--;
    }, 10);
});

const waitForDbSync = () => {
    // this is a bit dangerous :p and going against JS pattern
    for(let retry = 1000; retry > 0; retry--) {
        if (db) {
            return;
        }
    }
    throw Error('DB is not initialized!');
}

const getDb = ()/*: Connection*/ => {
    if (!db) {
        waitForDbSync();
    }
    return db;
}

export default getDb;
