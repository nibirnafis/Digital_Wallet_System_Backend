# 💳 Digital Wallet System Backend

A secure and scalable backend API for a **Digital Wallet System**, allowing users to send money, cash in/out via agents, and transfer money from their bank accounts. Built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

Live Link: https://digital-wallet-system-backend-znuw.onrender.com/

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Zod for Validation**
- **Bcrypt for Hashing**

---

## 🛠 Deploy

- **Render**

---

## 🚀 Key Features

### 👥 Roles
- **Super Admin**
- **Admin**
- **User**
- **Agent**

### 🔑 Authentication
- Secure login/logout using JWT
- Refresh token mechanism
- Role-based access control

### 👤 Admin Capabilities
- Create Admins
- Manage user accounts (view, update status, delete)
- View wallet and transaction info

### 👨‍💼 User Capabilities
- Self registration and login
- Transfer money to other users
- Cash in (from agent) / cash out (to agent)
- Bank transfer (add money from bank)
- View transaction history
- Reset pincode

---

## 📂 API Endpoints Overview

### 🔐 Auth Routes (`/api/v1/auth`)
- `POST /login` (phone, pin)
- `POST /logout`

### 👤 User Routes (`/api/v1/user`)
- `POST /create-user` (phone, pin)
- `POST /create-admin` (phone, pin)
- `GET /get-user`
- `GET /get-user/:id`
- `GET /get-info-me`
- `PATCH /update-status/:id` (isBlocked: true/false)
- `PATCH /delete-user/:id` 
- `PATCH /reset-pin` (oldPin, newPin)

### 💼 Wallet Routes (`/api/v1/wallet`)
- `GET /get-wallet`
- `GET /get-wallet/:walletId`
- `GET /get-wallet-me`
- `PATCH /update-status/:userId` (status: 'ACTIVE' or 'INACTIVE' or 'PENDING' or 'BLOCKED' or 'SUSPENDED')

### 💸 Transaction Routes (`/api/v1/transaction`)
- `POST /send-money` (phone, amount)
- `POST /cash-in` (phone, amount)
- `POST /cash-out` (phone, amount)
- `POST /add-money/bank-transfer` (amount)
- `GET /get-transaction`
- `GET /get-transaction/:userId`
- `GET /get-transaction-me`

---

## 🧪 Environment Setup

Create a `.env` file in the root directory and configure the following variables:

```env
# Application
PORT= 3000

# MongoDB
DB_URL= your mongodb:url

# Bcrypt
BCRYPT_SALT_ROUND=10

# JWT Configuration
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_ACCESS_TOKEN_EXPIRE=1d
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
JWT_REFRESH_TOKEN_EXPIRE=10d

# Super Admin Setup
SUPER_ADMIN_PHONE= # Must be a 13-digit phone number
SUPER_ADMIN_PIN= # Must be a 6-digit pin

---

##  Folder Structure

src/
├── app
│   ├── config/
│   ├── ErrorHelpers/
│   ├── middlewares/
│   ├── modules/            
│   │   ├── auth/        
│   │   ├── transaction/    
│   │   ├── wallet/         
│   │   └── user/           
│   ├── routes/             
│   └── utils/            
├── app.ts                
└── server.ts

---