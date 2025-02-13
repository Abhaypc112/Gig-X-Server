# Freelance Marketplace - Backend

## Introduction

This is the backend for a Freelance Marketplace built using MERN Stack + TypeScript. It supports:

🛒 Payment Integration (Razorpay)

🔐 Google OAuth Authentication

🖼 Image Uploading (Cloudinary)

💬 Real-time Chat (Socket.io)

🛠 Role-based Access Control (Admin, Freelancer, User)

## Tech Stack

+ Backend: Node.js, Express.js, TypeScript

+ Database: MongoDB + Mongoose

+ Authentication: JWT, Google OAuth

+ Real-time Communication: Socket.io

+ File Storage: Cloudinary

+ Payment Gateway: Razorpay

+ Deployment: Atlas (Database), Netlify (Frontend), Render (Backend)

## .env
+ PORT=5000
+ EMAIL=your_email
+ SESSION_SECRET= your_secret
+ MONGO_URI=your_mongodb_uri
+ JWT_SECRET=your_jwt_secret
+ APP_NAME = app_name
+ APP_PASSWORD = app_password
+ GOOGLE_CLIENT_ID=your_google_client_id
+ GOOGLE_CLIENT_SECRET=your_google_client_secret
+ RAZORPAY_KEY_ID=your_razorpay_key_id
+ RAZORPAY_KEY_SECRET=your_razorpay_key_secret
+ CLOUDINARY_CLOUD_NAME=your_cloudinary_name
+ CLOUDINARY_API_KEY=your_cloudinary_api_key
+ CLOUDINARY_API_SECRET=your_cloudinary_api_secret

``` git clone https://github.com/yourusername/freelance-marketplace-backend.git ```
```cd freelance-marketplace-backend ```
```npm install```
