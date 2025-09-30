# Deployment Guide

## Production Deployment Checklist

### 1. Environment Configuration

```env
# Production environment variables
NODE_ENV=production
PORT=5000

# Database (use connection pooling)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Security
JWT_SECRET=<generate-strong-random-secret>
PAYSTACK_SECRET_KEY=sk_live_xxxxx
PAYSTACK_WEBHOOK_SECRET=<your-webhook-secret>

# Email (use transactional service)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=<sendgrid-api-key>
SMTP_FROM=noreply@yourplatform.com

# Features
ENABLE_SCHEDULERS=true
MERCHANT_LOGIN_URL=https://yourplatform.com/merchant/login
```

### 2. Database Setup

```bash
# Run migrations
npm run db:push

# Create initial super admin
npm run db:seed
```

### 3. Build Application

```bash
# Install production dependencies
npm ci --production

# Build TypeScript
npm run build

# Start application
npm start
```

### 4. Process Management

Use PM2 for process management:

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start dist/index.js --name merchant-platform

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup
```

### 5. Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourplatform.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 6. SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourplatform.com
```

### 7. Monitoring

- Setup application monitoring (e.g., New Relic, Datadog)
- Configure error tracking (e.g., Sentry)
- Setup uptime monitoring
- Configure log aggregation

### 8. Backup Strategy

- Daily database backups
- Backup retention policy (30 days)
- Test restore procedures
- Document recovery process

## Vercel Deployment

### Option 1: Deploy via GitHub

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

```bash
# Build image
docker build -t merchant-platform .

# Run container
docker run -d -p 5000:5000 --env-file .env merchant-platform
```

## Health Checks

Add health check endpoint:

```typescript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})
```

## Performance Optimization

1. Enable gzip compression
2. Use connection pooling for database
3. Implement caching (Redis)
4. Optimize database queries
5. Use CDN for static assets

## Security Hardening

1. Enable HTTPS only
2. Set security headers (helmet.js)
3. Rate limiting
4. Input validation
5. Regular security audits
```
