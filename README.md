# The Real Estate Games - Website

A dynamic, modern website for "The Real Estate Games" - a first-of-its-kind inter-company sporting and networking event for real estate professionals in Nigeria.

## 🏆 About The Event

The Real Estate Games is a unique, high-energy event designed to bring together top real estate companies in a dynamic and engaging competition. The event combines fun, fitness, strategy, and networking, allowing participating brands to showcase their team spirit, leadership, and creativity in a relaxed, non-corporate environment.

**Event Details:**
- **Date:** 17th & 18th October 2025
- **Venue:** Mobolaji Johnson Stadium (Onikan)
- **Theme:** "Beyond The Game" - Promoting wellness, networking, and unity
- **Expected Participants:** 16 Real Estate Companies
- **Expected Attendance:** 3,000 guests

## 🚀 Features

### Frontend (React TypeScript)
- **Modern UI/UX** with dark theme and lime green accents
- **Smooth Animations** using Framer Motion
- **Responsive Design** for all devices
- **Interactive Forms** with validation
- **Real-time Notifications** using React Hot Toast
- **SEO Optimized** with React Helmet

### Backend (Node.js + Express)
- **RESTful API** with comprehensive endpoints
- **MongoDB Integration** with Mongoose ODM
- **Form Validation** and error handling
- **Security Features** (Helmet, CORS, Rate Limiting)
- **File Upload** support
- **Email Integration** ready

### Key Pages
- **Home** - Hero section with animated logo and event highlights
- **About** - Event overview, objectives, and target audience
- **Registration** - Multi-step form for team registration
- **Events** - Sports activities and event schedule
- **Team** - Meet the Marygold Production team
- **Sponsorship** - Sponsorship packages and benefits
- **Contact** - Contact form and information

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Styled Components** for styling
- **Framer Motion** for animations
- **React Hook Form** with Yup validation
- **React Router** for navigation
- **Lucide React** for icons
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **Nodemailer** for emails
- **Helmet** for security

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd estate_game
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd server && npm install
   
   # Install frontend dependencies
   cd ../client && npm install
   ```

3. **Environment Configuration**
   
   Create `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/real-estate-games
   CLIENT_URL=http://localhost:3000
   JWT_SECRET=your-secret-key-here
   ```
   
   Create `.env` file in the client directory:
   ```env
   REACT_APP_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key_here
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Paystack Setup**
   
   To enable payment processing:
   
   a. **Create a Paystack account** at [paystack.com](https://paystack.com)
   
   b. **Get your API keys** from the Paystack dashboard:
      - Public Key (for frontend)
      - Secret Key (for backend)
   
   c. **Update environment variables**:
      - Replace `pk_test_your_paystack_public_key_here` with your actual public key
      - Replace `sk_test_your_paystack_secret_key_here` with your actual secret key
   
   d. **Test the integration** using Paystack's test cards

4. **Start the development servers**
   ```bash
   # From root directory
   npm run dev
   
   # Or start separately:
   # Backend: npm run server
   # Frontend: npm run client
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🏗️ Project Structure

```
estate_game/
├── client/                 # React TypeScript Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # Global styles
│   │   └── App.tsx        # Main app component
│   └── package.json
├── server/                 # Node.js Backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🎨 Design System

### Colors
- **Primary Green:** #00ff88 (Lime Green)
- **Dark Background:** #1a1a1a
- **Secondary Dark:** #2a2a2a
- **White:** #ffffff
- **Gray:** #cccccc

### Typography
- **Primary Font:** Poppins (Headings)
- **Secondary Font:** Inter (Body text)

### Animations
- Smooth transitions using Framer Motion
- Hover effects and micro-interactions
- Scroll-triggered animations

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 API Endpoints

### Registrations
- `GET /api/registrations` - Get all registrations
- `POST /api/registrations` - Create new registration
- `GET /api/registrations/:id` - Get single registration
- `PUT /api/registrations/:id` - Update registration
- `DELETE /api/registrations/:id` - Delete registration

### Contact
- `POST /api/contact` - Submit contact form

### Sponsors
- `POST /api/sponsors` - Submit sponsorship inquiry

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `client/build` folder

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy the `server` folder
3. Configure MongoDB connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

**Marygold Production**
- Email: marygoldmedia11@gmail.com
- Phone: +234 814 712 8597 / +234 812 290 3836
- Location: Lagos, Nigeria

## 🙏 Acknowledgments

- Marygold Production team
- All event sponsors and partners
- The real estate community in Nigeria

---

**The Real Estate Games** - Beyond The Game 🏆 