// Main router that mounts domain routers
import { Express } from 'express';
import { createServer } from 'http';
import categoryRoutes from './category';
import disputeRoutes from './dispute';
import merchantRoutes from './merchant';
import payoutRoutes from './payout';
import settingsRoutes from './settings';
import announcementRoutes from './announcement';
import { requireAdmin } from '../middleware/auth';
import { loggingMiddleware } from '../middleware/logging';
import { rateLimiter } from '../middleware/rate_limit';
import { stripeWebhook } from '../utils/external'; // For webhook handling

export async function registerRoutes(app: Express) {
  // Apply global middleware
  app.use(loggingMiddleware);
  app.use(rateLimiter);

  // Mount domain routes with admin auth
  app.use('/api/admin/categories', requireAdmin, categoryRoutes);
  app.use('/api/admin/disputes', requireAdmin, disputeRoutes);
  app.use('/api/admin/merchants', requireAdmin, merchantRoutes);
  app.use('/api/admin/payouts', requireAdmin, payoutRoutes);
  app.use('/api/admin/settings', requireAdmin, settingsRoutes);
  app.use('/api/admin/announcements', requireAdmin, announcementRoutes);

  // Shared routes (e.g., for customers/merchants, with their auth)
  app.use('/api/disputes', disputeRoutes); // Customer/merchant dispute actions

  // Payment webhook (no auth, but signature verification)
  app.post('/api/webhooks/stripe', stripeWebhook);

  // Error handler
  app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).json({ message: 'Internal Server Error' });
  });

  const port = config.port;
  const server = createServer(app);
  server.listen(port, () => console.log(`Server on port ${port}`));
  return server;
}
