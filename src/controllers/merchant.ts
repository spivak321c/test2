import type { Request, Response } from "express"
import * as merchantService from "../services/merchant_service"
import { v4 as uuid } from 'uuid';



/**
 * @swagger
 * /merchants/applications:
 *   get:
 *     summary: Get all merchant applications
 *     tags: [Merchants]
 *     security:
 *       - AdminAuth: []
 *     responses:
 *       200:
 *         description: List of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   storeName:
 *                     type: string
 *       500:
 *         description: Server error
 */
export const getApplications = async (req: Request, res: Response) => {
  try {
    const applications = await merchantService.getAllApplications()
    res.json(applications)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getPendingApplications = async (req: Request, res: Response) => {
  try {
    const applications = await merchantService.getPendingApplications()
    res.json(applications)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const approveApplication = async (req: Request, res: Response) => {
  try {
    // if (!req.user?.id) {
    //   //return res.status(400).json({ error: "Unauthorized: No user data found" })
    //    const testAdminId = "ff710920-dc5b-4588-8f6e-578406707a55" // Generate valid UUID
    //   req.user = { id: testAdminId, role: "admin", email: "admin@mail.com", username: "admin" };
    // }
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { application, merchant } = await merchantService.approveApplication(req.params.id, req.user.id)
    res.json({ application, merchant })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const rejectApplication = async (req: Request, res: Response) => {
  try {
     if (!req.user) {
       return res.status(401).json({ error: "Unauthorized: No user data found" })
     }
    const { reason } = req.body
    if (!reason) {
      return res.status(400).json({ error: "Reason is required" })
    }
    const application = await merchantService.rejectApplication(req.params.id, reason, req.user.id)
    res.json(application)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const requestMoreInfo = async (req: Request, res: Response) => {
  try {
     if (!req.user) {
       return res.status(401).json({ error: "Unauthorized: No user data found" })
     }
    const { message } = req.body
    if (!message) {
      return res.status(400).json({ error: "Message is required" })
    }
    const application = await merchantService.requestMoreInfo(req.params.id, message, req.user.id)
    res.json(application)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const getMerchants = async (req: Request, res: Response) => {
  try {
    const merchants = await merchantService.getAllMerchants()
    res.json(merchants)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const suspendMerchant = async (req: Request, res: Response) => {
  try {
     if (!req.user) {
       return res.status(401).json({ error: "Unauthorized: No user data found" })
     }
    const { reason } = req.body
    if (!reason) {
      return res.status(400).json({ error: "Reason is required" })
    }
    const merchant = await merchantService.suspendMerchant(req.params.id, reason, req.user.id)
    res.json(merchant)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const updateCommissionTier = async (req: Request, res: Response) => {
  try {
     if (!req.user) {
       return res.status(401).json({ error: "Unauthorized: No user data found" })
     }
    const { tier } = req.body
    if (!tier || !["standard", "premium"].includes(tier)) {
      return res.status(400).json({ error: "Valid tier is required (standard or premium)" })
    }
    const merchant = await merchantService.updateCommissionTier(req.params.id, tier, req.user.id)
    res.json(merchant)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}





