# 🔐 NextAuth App — Full Stack Authentication System

A **production-style full stack authentication system** built using **Next.js App Router**, designed to implement **secure, real-world authentication workflows** such as **email verification**, **JWT-based login**, **password reset**, and **route protection via middleware**.

This project focuses on **how authentication is actually implemented in industry applications**, not just UI-level login/signup forms.

---

## 🚀 Features

### 🔑 Authentication
- User Signup with hashed passwords
- Secure Login using JWT (httpOnly cookies)
- Logout with cookie invalidation
- Authenticated user session handling

### 📧 Email-Based Flows (Mailtrap)
- Email Verification after signup
- Forgot Password (email-based reset link)
- Reset Password with token & expiry handling
- One-time token invalidation after use

### 🛡️ Security
- Password hashing using **bcrypt**
- JWT authentication with expiration
- Tokens stored in **httpOnly cookies**
- Protected routes using **Next.js Middleware**
- Environment-based secret management

### 🧭 Routing & UX
- Built using **Next.js App Router (`/app`)**
- Automatic redirects after verification
- Public vs protected route separation
- Prevents authenticated users from accessing auth pages
- Clean and predictable authentication UX

---

## 🧠 Tech Stack

- **Frontend:** Next.js 14+, TypeScript, Tailwind CSS
- **Backend:** Next.js Route Handlers (API)
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT, bcrypt
- **Email Service:** Nodemailer + Mailtrap
- **Middleware:** Route-level authentication guards

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── signup/
│   │       ├── login/
│   │       ├── logout/
│   │       ├── verifyemail/
│   │       ├── forgotpassword/
│   │       └── resetpassword/
│   │
│   ├── login/
│   ├── signup/
│   ├── profile/
│   ├── verifyemail/
│   ├── forgotpassword/
│   └── resetpassword/
│
├── models/
│   └── userModel.js
│
├── dbConfig/
│   └── dbConfig.ts
├── helpers/
├── lib /
├ 
├── middleware.ts
│
├── utils/
│   └── mailer.ts
```

---

## 🔄 Authentication Flow

### 📝 Signup & Verification
1. User signs up
2. Verification email is sent
3. User clicks verification link
4. Account is marked as verified
5. User is redirected to login

### 🔓 Login
- Credentials are validated
- JWT is generated
- Token is stored in httpOnly cookie
- Protected routes become accessible

### 🔁 Forgot Password
1. User requests password reset
2. Reset email is sent with token
3. User sets new password
4. Token is invalidated after use

---

## 🛡️ Middleware Logic

The middleware acts as a **global route guard**:

- Redirects unauthenticated users from protected routes
- Prevents authenticated users from accessing login/signup pages
- Handles `/` route based on auth state
- Allows public access to:
  - `/login`
  - `/signup`
  - `/verifyemail`
  - `/forgotpassword`
  - `/resetpassword`

This ensures **clean navigation & security** across the app.

---

## 🔐 Environment Variables

Create a `.env` file:

- MONGO_URI=your_mongodb_connection_string
- TOKEN_SECRET=your_jwt_secret
- DOMAIN=http://localhost:3000
- MAILTRAP_USER=your_mailtrap_user
- MAILTRAP_PASS=your_mailtrap_password


---

## ▶️ Running Locally

```bash
npm install
npm run dev

Visit : http://localhost:3000
```

👤 Author

- Nikhil
- Aspiring Full Stack Developer
- Focused on building real-world, production-style applications