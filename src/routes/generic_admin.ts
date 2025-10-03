import { Router } from "express";
import {
  list,
  search,
  create,
  show,
  update,
  del,
  bulkDelete,
} from "../controllers/generic_resource.js";
import { authenticateAdmin, requireRole } from "../middleware/auth.js"; // implement requireRole('super_admin') and authenticateAdmin
import { AdminRole } from "../types/roles.js";

const router = Router({ mergeParams: true }); // For {model} param

router.use(authenticateAdmin, requireRole(AdminRole.SUPER_ADMIN)); // Superadmin only

router.get("/:model", list);
router.get("/:model/search", search);
router.post("/:model", create);
router.get("/:model/:id", show);
router.patch("/:model/:id", update);
router.delete("/:model/:id", del);
router.delete("/:model/bulk", bulkDelete);

export default router;
