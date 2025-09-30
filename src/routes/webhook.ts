import { Router } from "express"
import crypto from "crypto"
import { config } from "../config/index.js"
import { handleTransferWebhook } from "../services/payout_service.js"
import { logger } from "../utils/logger.js"
import type { Request, Response } from "express"

const router = Router()

// Verify Paystack webhook signature
const verifyPaystackSignature = (req: Request): boolean => {
  const hash = crypto.createHmac("sha512", config.paystack.secretKey).update(JSON.stringify(req.body)).digest("hex")

  return hash === req.headers["x-paystack-signature"]
}

/**
 * @swagger
 * /webhook/paystack:
 *   post:
 *     summary: Paystack webhook endpoint
 *     tags: [Webhook]
 *     description: Receives webhook events from Paystack for transfer status updates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       400:
 *         description: Invalid signature
 */
router.post("/paystack", async (req: Request, res: Response) => {
  try {
    // Verify webhook signature
    if (!verifyPaystackSignature(req)) {
      logger.warn("Invalid Paystack webhook signature")
      return res.status(400).json({ error: "Invalid signature" })
    }

    const event = req.body

    logger.info(`Paystack webhook received: ${event.event}`, {
      event: event.event,
      data: event.data,
    })

    // Handle different event types
    switch (event.event) {
      case "transfer.success":
      case "transfer.failed":
      case "transfer.reversed":
        await handleTransferWebhook(event)
        break

      case "charge.success":
        // Handle successful payment (if needed for order processing)
        logger.info("Charge success event received", { reference: event.data.reference })
        break

      default:
        logger.info(`Unhandled webhook event: ${event.event}`)
    }

    // Always return 200 to acknowledge receipt
    res.status(200).json({ status: "success" })
  } catch (error: any) {
    logger.error("Error processing Paystack webhook:", error)
    // Still return 200 to prevent Paystack from retrying
    res.status(200).json({ status: "error", message: error.message })
  }
})

export default router
