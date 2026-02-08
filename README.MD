# 🔐 NextAuth App — Full Stack Authentication System

A **production-style authentication system** built using **Next.js App Router**, implementing secure and modern auth flows such as **email verification**, **JWT-based login**, **password reset**, and **route protection using middleware**.

This project focuses on **real-world authentication problems**, not just UI or basic login forms.

---

## 🚀 Features

### 🔑 Authentication
- User Signup with hashed passwords
- Secure Login using JWT (httpOnly cookies)
- Logout with cookie invalidation

### 📧 Email-Based Flows (Mailtrap)
- Email Verification after signup
- Forgot Password (email-based reset link)
- Reset Password with token & expiry handling

### 🛡️ Security
- Password hashing using **bcrypt**
- JWT stored in **httpOnly cookies**
- Token expiration for verification & reset
- Protected routes using **Next.js Middleware**

### 🧭 Routing & UX
- App Router (`/app`) architecture
- Auto-redirect after email verification
- Public vs protected route handling
- Prevents logged-in users from accessing auth pages
- Clean auth UX (Forgot Password links, redirects)

---

## 🧠 Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js Route Handlers (API)
- **Database**: MongoDB + Mongoose
- **Auth**: JWT, bcrypt
- **Email**: Nodemailer + Mailtrap
- **Middleware**: Route-level auth protection

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
│
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