// Async notifications job
import { sendNotification } from '../services/notification_service';

// Queue notifications (mock interval)
setInterval(async () => {
  // Process queue (placeholder)
  await sendNotification('example', {});
}, 60 * 1000); // Every minute
