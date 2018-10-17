import db from '../db';
import UserEntity from '../entity/user';

const avatar = async (req, res) => {
    const user: UserEntity = await db().getRepository(UserEntity)
                                     .findOne(req.params.idUser);
    if (!user) throw new Error('User does not exists');
    if (!user.avatar) throw new Error('User does not have avatar');

    res.writeHead(200);
    res.write(user.avatar);
    res.end();
}

export default avatar;
