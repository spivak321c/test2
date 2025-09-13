import { Router } from 'express';
import { adminSignIn } from '../controllers/admin';

const router = Router();

router.post('/login', adminSignIn);

export default router;