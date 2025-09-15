import adminRoutes from './admin.js';
import categoryRoutes from "./category.js";
import merchantRoutes from "./merchants.js";
import settingsRoutes from "./settings.js";
//import authRoutes from "./auth"
import { requireAdmin } from "../middleware/auth.js";
import { loggingMiddleware } from "../middleware/logging.js";
//import { stripeWebhook } from "../utils/external.js"
export function registerRoutes(app) {
    app.use(loggingMiddleware);
    //app.use("/api/auth", authRoutes)
    app.use('/adminv', adminRoutes);
    app.use("/api/admin/categories", requireAdmin, categoryRoutes);
    app.use("/api/admin/merchants", requireAdmin, merchantRoutes);
    app.use("/api/admin/settings", requireAdmin, settingsRoutes);
    //app.post("/api/webhooks/stripe", stripeWebhook)
    app.get("/health", (req, res) => {
        res.json({
            status: "ok",
            timestamp: new Date().toISOString(),
            version: "1.0.0",
        });
    });
    app.get("/api", (req, res) => {
        res.json({
            name: "Merchant Backend API",
            version: "1.0.0",
            endpoints: {
                auth: {
                    "POST /api/auth/login": "Admin login",
                    "POST /api/auth/admin": "Create admin user",
                    "GET /api/auth/profile": "Get admin profile (requires auth)",
                },
                merchants: {
                    "GET /api/admin/merchants/applications": "Get all applications",
                    "GET /api/admin/merchants/applications/pending": "Get pending applications",
                    "POST /api/admin/merchants/applications/:id/approve": "Approve application",
                    "POST /api/admin/merchants/applications/:id/reject": "Reject application",
                    "POST /api/admin/merchants/applications/:id/more-info": "Request more info",
                    "GET /api/admin/merchants": "Get all merchants",
                    "POST /api/admin/merchants/:id/suspend": "Suspend merchant",
                    "PUT /api/admin/merchants/:id/commission": "Update commission tier",
                },
                categories: {
                    "GET /api/admin/categories": "Get all categories",
                    "POST /api/admin/categories": "Create category",
                    "PUT /api/admin/categories/:id": "Update category",
                    "DELETE /api/admin/categories/:id": "Delete category",
                },
                settings: {
                    "GET /api/admin/settings": "Get settings",
                    "PUT /api/admin/settings": "Update settings",
                },
                // webhooks: {
                //   "POST /api/webhooks/stripe": "Stripe webhook handler",
                // },
            },
        });
    });
    app.use((err, req, res, next) => {
        console.error("Error:", err);
        res.status(500).json({
            message: "Internal Server Error",
            ...(process.env.NODE_ENV === "development" && { error: err.message }),
        });
    });
    app.use("*", (req, res) => {
        res.status(404).json({ message: "Endpoint not found" });
    });
}
//# sourceMappingURL=index.js.map