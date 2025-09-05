// Merchant routes
import { Router } from 'express';
import * as controller from '../controllers/merchant';

const router = Router();
router.get('/applications', controller.getApplications);
router.get('/applications/pending', controller.getPendingApplications);
router.post('/applications/:id/approve', controller.approveApplication);
router.post('/applications/:id/reject', controller.rejectApplication);
router.post('/applications/:id/more-info', controller.requestMoreInfo);
router.get('/', controller.getMerchants);
router.post('/:id/suspend', controller.suspendMerchant);
router.put('/:id/commission', controller.updateCommissionTier);

export default router;
