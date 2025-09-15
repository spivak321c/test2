import { log } from '../utils/logger.js';
// Logging middleware
export const loggingMiddleware = (req, res, next) => {
    // Log request details
    log(`${req.method} ${req.url} - ${req.ip}`);
    // Audit log for sensitive actions (expand as needed)
    if (req.url.includes('/financial')) {
        log(`Audit: Financial action by user ${req.user?.id}`);
    }
    next();
};
//# sourceMappingURL=logging.js.map