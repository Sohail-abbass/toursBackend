# Tours & Packages Backend API

A robust Express.js + MongoDB backend for the Tours & Packages booking system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
# Copy the env-config.txt to .env
cp env-config.txt .env

# Edit .env with your MongoDB URI
```

4. **Start MongoDB** (if using local):
```bash
# On Ubuntu/Debian
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

5. **Seed the database with initial data:**
```bash
npm run seed
```

6. **Start the development server:**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Tours
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/tours` | Get all tours | Public |
| GET | `/api/tours/featured` | Get featured tours | Public |
| GET | `/api/tours/:slug` | Get tour by slug | Public |
| POST | `/api/tours` | Create tour | Admin |
| PUT | `/api/tours/:id` | Update tour | Admin |
| DELETE | `/api/tours/:id` | Delete tour | Admin |

### Packages
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/packages` | Get all packages | Public |
| GET | `/api/packages/:slug` | Get package by slug | Public |
| POST | `/api/packages` | Create package | Admin |
| PUT | `/api/packages/:id` | Update package | Admin |
| DELETE | `/api/packages/:id` | Delete package | Admin |

### Bookings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/bookings` | Create booking | Public |
| GET | `/api/bookings` | Get all bookings | Admin |
| GET | `/api/bookings/stats` | Get booking stats | Admin |
| PUT | `/api/bookings/:id` | Update booking | Admin |
| DELETE | `/api/bookings/:id` | Delete booking | Admin |

### Destinations
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/destinations` | Get all destinations | Public |
| GET | `/api/destinations/featured` | Get featured | Public |
| GET | `/api/destinations/:slug` | Get by slug | Public |

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |
| PUT | `/api/auth/profile` | Update profile | Private |

### Legacy Routes (Backward Compatible)
These match the old json-server endpoints:
- `GET /tours` - Get all tours
- `GET /packages` - Get all packages
- `GET /destinations` - Get all destinations

## 🔐 Default Admin Credentials
After running `npm run seed`:
- **Email:** admin@tours.com
- **Password:** admin123

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts      # MongoDB connection
│   ├── controllers/
│   │   ├── tourController.ts
│   │   ├── packageController.ts
│   │   ├── bookingController.ts
│   │   ├── destinationController.ts
│   │   └── authController.ts
│   ├── models/
│   │   ├── Tour.ts
│   │   ├── Package.ts
│   │   ├── Booking.ts
│   │   ├── Destination.ts
│   │   └── User.ts
│   ├── routes/
│   │   ├── tourRoutes.ts
│   │   ├── packageRoutes.ts
│   │   ├── bookingRoutes.ts
│   │   ├── destinationRoutes.ts
│   │   └── authRoutes.ts
│   ├── middleware/
│   │   ├── auth.ts          # JWT authentication
│   │   └── errorHandler.ts  # Error handling
│   ├── utils/
│   │   └── seedData.ts      # Database seeder
│   └── server.ts            # Express app
├── .env                     # Environment variables
├── package.json
└── tsconfig.json
```

## 🛠️ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run seed` | Seed database with initial data |

## 🔧 Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tours_db
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

## 📝 Query Parameters

### Tours & Packages
- `?featured=true` - Filter featured items
- `?status=active` - Filter by status
- `?search=hunza` - Text search
- `?sort=price` or `?sort=-price` - Sort by price
- `?page=1&limit=10` - Pagination

### Bookings
- `?status=pending` - Filter by status
- `?bookingType=tour` - Filter by type

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Set production environment variables

3. Start the server:
```bash
npm start
```

## 📄 License

ISC

