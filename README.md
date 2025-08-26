# Gethings - African Business Directory UK

A platform connecting African vendors across the UK with customers.

## Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm run install-deps
   ```

2. **Setup environment**
   ```bash
   cp .env.example server/.env
   ```

3. **Start MongoDB** (if using local)
   ```bash
   mongod
   ```

4. **Run application**
   ```bash
   npm run dev
   ```

5. **Access**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   vercel
   ```

2. **Set environment variables in Vercel dashboard:**
   - `MONGODB_URI` - MongoDB Atlas connection string
   - `JWT_SECRET` - Random secret key
   - `NODE_ENV` - production

3. **Deploy**
   ```bash
   vercel --prod
   ```

## Features

- 100+ African businesses across UK
- Search & filter by location/category
- User authentication (customers/vendors)
- Business management dashboard
- Messaging system
- Mobile responsive design

## Tech Stack

- **Frontend**: React 18, TypeScript, Styled Components
- **Backend**: Node.js, Express, MongoDB
- **Deployment**: Vercel