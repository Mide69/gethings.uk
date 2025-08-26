# Gethings - African Business Directory UK

A fully responsive platform connecting African vendors across the UK with customers seeking authentic products and services.

## Features

### 🏠 **Home Page (Public Access)**
- Searchable and filterable directory of 100+ African businesses
- Featured businesses section
- Location-based search (15+ UK cities)
- Category filtering (17+ service types)
- Mobile-responsive design with African-inspired colors

### 👥 **User Features**
- **Customers**: Browse businesses, contact vendors, manage messages
- **Vendors**: Create business listings, manage profile, respond to messages
- JWT-based authentication with email verification
- Role-based access control

### 🏪 **Business Management**
- Complete CRUD operations for business listings
- Image upload with AI-generated placeholders
- Location-based services across UK cities
- Contact information management
- Featured business promotion

### 💬 **Messaging System**
- Direct vendor-customer communication
- Message management dashboard
- Read/unread status tracking
- Business-specific messaging

### 🎨 **Design & UI**
- African-inspired color scheme (Green, Gold, Red, Black)
- Fully responsive (Desktop, Tablet, Mobile)
- Modern grid-based layout
- Smooth animations and transitions
- Accessibility compliant

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Styled Components** for styling
- **React Router** for navigation
- **React Query** for state management
- **React Hook Form** for form handling
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** authentication
- **Multer** for file uploads
- **Bcrypt** for password hashing
- **Express Validator** for input validation

## Sample Data

The platform comes pre-seeded with 100 diverse African businesses including:

- **Nigerian**: Restaurants, Fashion, Logistics, Groceries
- **Ghanaian**: Jewelry, Textiles, Beauty, Financial Services
- **Kenyan**: Coffee, Crafts, Hair Studios, Spices
- **Ethiopian**: Restaurants, Coffee Houses, Cultural Centers
- **Somali**: Money Transfer, Logistics, Halal Markets
- **South African**: Braai Houses, Diamonds, Sports Bars
- And many more from 50+ African countries

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gethings.uk
   ```

2. **Install dependencies**
   ```bash
   npm run install-deps
   ```

3. **Environment Setup**
   
   Create `server/.env`:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/gethings
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode (both frontend and backend)
   npm run dev
   
   # Or run separately:
   npm run server  # Backend only
   npm run client  # Frontend only
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Deployment on Vercel

### Automatic Deployment

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Environment Variables**
   
   Set in Vercel dashboard:
   ```env
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_production_jwt_secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Manual Deployment

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel**
   - Upload the project to GitHub
   - Connect GitHub repo to Vercel
   - Configure environment variables
   - Deploy automatically

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Businesses
- `GET /api/businesses` - Get all businesses (with filters)
- `GET /api/businesses/:id` - Get single business
- `POST /api/businesses` - Create business (vendors only)
- `PUT /api/businesses/:id` - Update business
- `DELETE /api/businesses/:id` - Delete business
- `GET /api/businesses/vendor/my-businesses` - Get vendor's businesses

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages` - Get messages
- `PUT /api/messages/:id/read` - Mark message as read

## Project Structure

```
gethings.uk/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   ├── styles/         # Styled components
│   │   ├── types/          # TypeScript types
│   │   └── hooks/          # Custom hooks
│   └── public/             # Static assets
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── data/               # Sample data
│   └── uploads/            # File uploads
├── vercel.json             # Vercel configuration
└── README.md
```

## Features in Detail

### Search & Filtering
- **Text Search**: Business name, description, keywords
- **Category Filter**: 17+ business categories
- **Location Filter**: 15+ UK cities
- **Featured Filter**: Highlighted businesses
- **Pagination**: Load more functionality

### Business Categories
- Restaurant & Food
- Fashion & Clothing
- Beauty & Personal Care
- Grocery & Food
- Logistics & Shipping
- Financial Services
- Technology
- Arts & Crafts
- Jewelry & Accessories
- Education & Culture
- Travel & Tourism
- Automotive
- Entertainment
- Community Services
- Music & Instruments
- Industrial Services

### Supported Cities
London, Manchester, Birmingham, Glasgow, Leeds, Liverpool, Edinburgh, Bristol, Sheffield, Leicester, Coventry, Nottingham, Cambridge, and more.

### African Countries Represented
Nigeria, Ghana, Kenya, Ethiopia, Somalia, South Africa, Zimbabwe, Uganda, Tanzania, Rwanda, Cameroon, Senegal, Ivory Coast, Mali, Burkina Faso, and 35+ more.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email info@gethings.uk or create an issue in the repository.

---

**Gethings** - Empowering African businesses across the UK 🌍