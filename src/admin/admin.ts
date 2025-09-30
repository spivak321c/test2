import AdminJS from "adminjs"
import AdminJSExpress from "@adminjs/express"
import { Database, Resource } from "adminjs-drizzle/pg"
import bcrypt from "bcrypt"
import { db } from "../config/database.js"
import { admins } from "../models/admins.js"
import { merchants } from "../models/merchant.js"
import { merchantApplication } from "../models/merchant_applications.js"
import { eq } from "drizzle-orm"
import { categories } from "../models/category.js"
import { config } from "../config/index.js"
import { orders } from "../models/order.js"
import { orderMerchantSplits } from "../models/order_merchant_split.js"
import { payouts } from "../models/payout.js"
import { merchantBankDetails } from "../models/bank_details.js"
import { componentLoader } from "./component-loader.js"

process.env.ADMIN_JS_TMP_DIR = process.env.ADMIN_JS_TMP_DIR || "/tmp"
console.log("🔍 AdminJS bundle dir:", process.env.ADMIN_JS_TMP_DIR)

AdminJS.registerAdapter({ Database, Resource })

const adminJs = new AdminJS({
  resources: [
    {
      resource: { table: admins, db },
      options: {
        properties: {
          password: { isVisible: { list: false, show: false, edit: true, filter: false } },
        },
        navigation: {
          name: "User Management",
          icon: "User",
        },
      },
    },
    {
      resource: { table: merchants, db },
      options: {
        properties: {
          password: { isVisible: { list: false, show: false, edit: true, filter: false } },
          storeName: { isTitle: true },
        },
        actions: {
          show: {
            component: componentLoader.add("MerchantDetails", "./components/MerchantDetails"),
          },
        },
        navigation: {
          name: "Merchants",
          icon: "Store",
        },
      },
    },
    {
      resource: { table: merchantApplication, db },
      options: {
        properties: {
          storeName: { isTitle: true },
          status: {
            availableValues: [
              { value: "pending", label: "Pending" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
              { value: "more_info", label: "More Info Needed" },
            ],
          },
        },
        navigation: {
          name: "Merchants",
          icon: "FileText",
        },
      },
    },
    { resource: { table: categories, db }, options: { navigation: { name: "Catalog", icon: "Tag" } } },
    { resource: { table: orders, db }, options: { navigation: { name: "Orders", icon: "ShoppingCart" } } },
    {
      resource: { table: orderMerchantSplits, db },
      options: {
        navigation: {
          name: "Payouts",
          icon: "DollarSign",
        },
      },
    },
    {
      resource: { table: payouts, db },
      options: {
        actions: {
          process: {
            actionType: "record",
            component: componentLoader.add("ProcessPayoutAction", "./components/ProcessPayoutAction"),
            handler: async (request, response, context) => {
              const { record, currentAdmin } = context
              // Call the payout service
              const { processPayout } = await import("../services/payout_service.js")
              try {
                await processPayout(record.id(), currentAdmin?.id)
                return {
                  record: record.toJSON(currentAdmin),
                  notice: {
                    message: "Payout processing initiated successfully",
                    type: "success",
                  },
                }
              } catch (error: any) {
                return {
                  record: record.toJSON(currentAdmin),
                  notice: {
                    message: `Failed to process payout: ${error.message}`,
                    type: "error",
                  },
                }
              }
            },
          },
        },
        navigation: {
          name: "Payouts",
          icon: "CreditCard",
        },
      },
    },
    {
      resource: { table: merchantBankDetails, db },
      options: {
        properties: {
          accountNumber: { isVisible: { list: false, show: true, edit: true, filter: false } },
        },
        navigation: {
          name: "Merchants",
          icon: "DollarSign",
        },
      },
    },
  ],
  rootPath: "/admin",
  branding: {
    companyName: "Merchant Admin Platform",
    logo: false,
    theme: {
      colors: {
        primary100: "#4F46E5",
        primary80: "#6366F1",
        primary60: "#818CF8",
      },
    },
  },
  dashboard: {
    component: componentLoader.add("Dashboard", "./components/Dashboard"),
  },
  componentLoader,
})

// Auth handler
const authenticate = async (email: string, password: string) => {
  if (!email || !password) return null

  const [admin] = await db.select().from(admins).where(eq(admins.email, email))
  if (!admin) return null

  const isValid = await bcrypt.compare(password, admin.password)
  if (!isValid) return null

  return {
    id: admin.id,
    username: admin.username,
    email: admin.email,
    role: admin.role,
  }
}

export const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate,
  cookiePassword: config.jwt.secret,
})

export { adminJs }
