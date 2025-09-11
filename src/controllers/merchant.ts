// Controllers for merchant vetting, approval, suspension

// import { Request, Response } from 'express';
// import * as merchantService from '../services/merchant_service';
/*
export const getPendingApplications = async (req: Request, res: Response) => {
  const applications = await merchantService.getPendingApplications();
  res.json(applications);
};

// Approve application
export const approveApplication = async (req: Request, res: Response) => {
  const { application, merchant } = await merchantService.approveApplication(req.params.id, req.user.id);
  res.json({ application, merchant });
};

// Reject application
export const rejectApplication = async (req: Request, res: Response) => {
  const application = await merchantService.rejectApplication(req.params.id, req.body.reason, req.user.id);
  res.json(application);
};


// Get all merchant applications
export const getApplications = async (req: Request, res: Response) => {
  // Fetch all applications for admin review
  const applications = await merchantService.getAllApplications();
  res.json(applications);
};

// Get pending applications
export const getPendingApplications = async (req: Request, res: Response) => {
  // Fetch pending applications
  const applications = await merchantService.getPendingApplications();
  res.json(applications);
};

// Approve application
export const approveApplication = async (req: Request, res: Response) => {
  // Approve application, create account, send temp password, log action
  const { application, merchant } = await merchantService.approveApplication(req.params.id, req.user.id);
  res.json({ application, merchant });
};

// Reject application
export const rejectApplication = async (req: Request, res: Response) => {
  // Reject application with reason, send email, log action
  const application = await merchantService.rejectApplication(req.params.id, req.body.reason, req.user.id);
  res.json(application);
};

// Request more info
export const requestMoreInfo = async (req: Request, res: Response) => {
  // Set status to more_info, send email, log action
  const application = await merchantService.requestMoreInfo(req.params.id, req.body.message, req.user.id);
  res.json(application);
};

// Get all merchants (admin list view)
export const getMerchants = async (req: Request, res: Response) => {
  // List all merchants
  const merchants = await merchantService.getAllMerchants();
  res.json(merchants);
};

// Suspend merchant
export const suspendMerchant = async (req: Request, res: Response) => {
  // Suspend merchant, log action
  const merchant = await merchantService.suspendMerchant(req.params.id, req.body.reason, req.user.id);
  res.json(merchant);
};

// Update commission tier
export const updateCommissionTier = async (req: Request, res: Response) => {
  // Update merchant's commission tier, log action
  const merchant = await merchantService.updateCommissionTier(req.params.id, req.body.tier, req.user.id);
  res.json(merchant);
};
*/





// Get all pending merchant applications
// export const getPendingApplications = async (req: Request, res: Response) => {
//   try {
//     const applications = await merchantService.getPendingApplications();
//     res.json(applications);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Approve application
// export const approveApplication = async (req: Request, res: Response) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ error: 'Unauthorized: No user data found' });
//     }
//     const { application, merchant } = await merchantService.approveApplication(req.params.id, req.user.id);
//     res.json({ application, merchant });
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Reject application
// export const rejectApplication = async (req: Request, res: Response) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ error: 'Unauthorized: No user data found' });
//     }
//     const application = await merchantService.rejectApplication(req.params.id, req.body.reason, req.user.id);
//     res.json(application);
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// };








































import { Request, Response } from "express";
import * as merchantService from "../services/merchant_service";

export const getApplications = async (req: Request, res: Response) => {
  try {
    const applications = await merchantService.getAllApplications();
    res.json(applications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPendingApplications = async (req: Request, res: Response) => {
  try {
    const applications = await merchantService.getPendingApplications();
    res.json(applications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const approveApplication = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user data found" });
    }
    const { application, merchant } = await merchantService.approveApplication(req.params.id, req.user.id);
    res.json({ application, merchant });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const rejectApplication = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user data found" });
    }
    const { reason } = req.body;
    if (!reason) {
      return res.status(400).json({ error: "Reason is required" });
    }
    const application = await merchantService.rejectApplication(req.params.id, reason, req.user.id);
    res.json(application);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const requestMoreInfo = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user data found" });
    }
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    const application = await merchantService.requestMoreInfo(req.params.id, message, req.user.id);
    res.json(application);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMerchants = async (req: Request, res: Response) => {
  try {
    const merchants = await merchantService.getAllMerchants();
    res.json(merchants);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const suspendMerchant = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user data found" });
    }
    const { reason } = req.body;
    if (!reason) {
      return res.status(400).json({ error: "Reason is required" });
    }
    const merchant = await merchantService.suspendMerchant(req.params.id, reason, req.user.id);
    res.json(merchant);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCommissionTier = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user data found" });
    }
    const { tier } = req.body;
    if (!tier || !["standard", "premium"].includes(tier)) {
      return res.status(400).json({ error: "Valid tier is required (standard or premium)" });
    }
    const merchant = await merchantService.updateCommissionTier(req.params.id, tier, req.user.id);
    res.json(merchant);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};