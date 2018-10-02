import { Router } from 'express';

import avatar from './avatar';

const router = Router();

router.get('/', (req, res) => {
    res.send('api v1');
});

router.get('/avatar/:idUser', avatar);

export default router;
