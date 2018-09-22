import { sign } from 'jsonwebtoken';
import { fs } from 'mz';

import UserEntity from '../entity/user';

export type JsonWebToken = {
    idUser: number;
    email: string;
    name: string; // to remove when we use session verification
};

export async function generateToken(user: UserEntity): Promise<string> {
    const secretkey: string = await getPrivateKey();
    const jwt: JsonWebToken = {
        idUser: user.idUser,
        email: user.email,
        name: user.name,
    };
    return sign(jwt , secretkey, { expiresIn: '12h' });
}

let privateKey: string;
export async function getPrivateKey(): Promise<string> {
    if (!privateKey) {
        // need to find a better way to load the private key file
        // right now it is taking the path from where we execute the npm run command
        const privateKeyBuffer: Buffer = await fs.readFile('./private.key');
        privateKey = privateKeyBuffer.toString();
    }
    return privateKey;
}
