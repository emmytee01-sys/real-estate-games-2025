# 🚀 Real Estate Games - Deployment Guide

## **Frontend (Already Deployed)**
✅ **Firebase Hosting**: https://dev-realestategames.web.app

## **Backend Deployment Options**

### **Option 1: Railway (Recommended - Free)**
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set environment variables:
   - `NODE_ENV=production`
   - `PORT=5001`
   - `MONGODB_URI=your_mongodb_atlas_connection_string`

### **Option 2: Render (Free)**
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables

### **Option 3: Heroku (Free tier discontinued)**
1. Go to [Heroku.com](https://heroku.com)
2. Create new app
3. Connect GitHub repository
4. Deploy

## **Database Setup (MongoDB Atlas)**

### **Step 1: Create MongoDB Atlas Account**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for free account
3. Create new cluster (M0 Free tier)

### **Step 2: Get Connection String**
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `realestategames`

### **Step 3: Update Environment Variables**
Add the MongoDB connection string to your backend environment variables.

## **Environment Variables**

### **Backend (.env)**
```env
PORT=5001
NODE_ENV=production
MONGODB_URI=mongodb+srv://[username]:[password]@[cluster].mongodb.net/realestategames?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
```

### **Frontend (.env)**
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

## **Features Implemented**

### ✅ **Frontend**
- Modern React TypeScript UI
- Package selection (Silver, Gold, Platinum)
- Team registration form
- Payment reference generation
- Bank transfer modal with FCMB details
- Receipt upload functionality
- Ticket booking system
- Responsive design with animations

### ✅ **Backend**
- Express.js API with MongoDB
- Registration endpoints
- File upload for receipts
- Payment reference generation
- Admin endpoints for management
- CORS configuration
- Security middleware

### ✅ **Payment System**
- Bank transfer (FCMB)
- Account: Marygold Production
- Account Number: 2001999834
- Unique payment references
- Receipt upload and verification

## **Next Steps**

1. **Deploy Backend**: Choose one of the deployment options above
2. **Set up MongoDB Atlas**: Create free database
3. **Update Frontend API URL**: Point to deployed backend
4. **Test Complete Flow**: Registration → Payment → Receipt Upload
5. **Admin Panel**: Set up admin access for payment verification

## **Testing**

### **Local Testing**
```bash
# Backend
cd server
npm start

# Frontend
cd client
npm start
```

### **Production Testing**
1. Test registration form
2. Verify payment reference generation
3. Test receipt upload
4. Check admin panel functionality

## **Support**

For issues or questions:
- Check the console logs
- Verify environment variables
- Ensure MongoDB connection is working
- Test API endpoints with Postman/curl 