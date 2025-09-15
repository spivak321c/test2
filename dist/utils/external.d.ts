import Stripe from 'stripe';
import { Request, Response } from 'express';
export declare const stripe: Stripe;
export declare const stripeWebhook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=external.d.ts.map