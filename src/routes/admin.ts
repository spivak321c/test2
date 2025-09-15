import { Router } from 'express';
import { adminSignIn } from '../controllers/admin.js';

const router = Router();

router.post('/login', adminSignIn);

export default router;