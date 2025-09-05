// Payout routes
import { Router } from 'express';
import * as controller from '../controllers/payout';

const router = Router();
router.get('/', controller.getPayouts);
router.get('/:merchantId', controller.getMerchantPayouts);
router.post('/trigger', controller.triggerPayout);

export default router;
