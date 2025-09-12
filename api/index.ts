import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/index'; // import your Express app

// Vercel handler that delegates to Express
export default function handler(req: VercelRequest, res: VercelResponse) {
  app(req, res);
}
