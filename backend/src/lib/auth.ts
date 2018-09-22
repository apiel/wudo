import { sign } from 'jsonwebtoken';
import { fs } from 'mz';

import UserEntity from '../entity/user';

export type JsonWebToken = {
    email: string;
};

export async function generateToken(user: UserEntity): Promise<string> {
    const secretkey: string = await getPrivateKey();
    const jwt: JsonWebToken = {
        email: user.email,
    };
    return sign(jwt , secretkey, { expiresIn: '12h' });
}

let privateKey: string;
async function getPrivateKey(): Promise<string> {
    if (!privateKey) {
        // need to find a better way to load the private key file
        // right now it is taking the path from where we execute the npm run command
        const privateKeyBuffer: Buffer = await fs.readFile('./private.key');
        privateKey = privateKeyBuffer.toString();
    }
    return privateKey;
}
