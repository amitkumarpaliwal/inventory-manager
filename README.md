# Inventory Manager

A modern Inventory Management System built using **Next.js 15 App Router**, **Auth.js (NextAuth)**, **JSON Server**, **bcryptjs**, **TypeScript**, and **Tailwind CSS**.

---

## Features

### Authentication

- Admin Registration
- Admin Login
- Password Hashing using bcryptjs
- JWT-based Session Management using Auth.js
- Secure Logout
- Protected Dashboard
- Server-side Session Validation

### Inventory Dashboard

- Product Statistics Overview
- Low Inventory Monitoring
- Product Management Navigation
- Product CRUD operation
- Responsive UI with Tailwind CSS

### Security

- Passwords are never stored in plain text
- Passwords are hashed before storing
- Authentication handled via Auth.js Credentials Provider
- Protected routes validated on the server side
- Session managed through JWT strategy

---

## Technology Stack

### Frontend

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS

### Authentication

- Auth.js (NextAuth)
- bcryptjs
- JWT Session Strategy

### Mock Backend

- JSON Server

---

## Authentication Flow

### Registration Flow

```text
Register Form
      │
      ▼
POST /api/register
      │
      ▼
bcrypt.hash()
      │
      ▼
JSON Server (db.json)
      │
      ▼
Admin Account Created
```

### Login Flow

```text
Login Form
      │
      ▼
signIn('credentials')
      │
      ▼
Auth.js Credentials Provider
      │
      ▼
JSON Server User Lookup
      │
      ▼
bcrypt.compare()
      │
      ▼
JWT Session Created
      │
      ▼
Dashboard
```

---

## Installation

### Clone Repository

```bash
git clone <https://github.com/amitkumarpaliwal/inventory-manager.git>
cd inventory-manager
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a file named `.env.local` in the project root.

```env
NEXTAUTH_URL=http://localhost:3000
JSON_SERVER_URL=http://localhost:3001
```

---

## JSON Server Setup

### Start JSON Server

```bash
npm run json-server
```

Expected URL:

```text
http://localhost:3001
```

---

## Run Application

Open a separate terminal.

```bash
npm run dev
```

Application URL:

```text
http://localhost:3000
```

---

## First Time Setup

### Register Admin User

Navigate to:

```text
http://localhost:3000/login
```

Select:

```text
Register
```

Provide:

```text
Username
Password
Confirm Password
```

Example:

```text
Username: admin
Password: Admin@123
```

Upon successful registration, a new admin record is created in JSON Server.

Example:

```json
{
  "id": 1,
  "username": "admin",
  "passwordHash": "$2b$10$..."
}
```

---

### Login

Navigate to:

```text
http://localhost:3000/login
```

Upon successful login:

- Auth.js creates a JWT session
- User is redirected to Dashboard

---

## Route Protection

Dashboard page is protected using server-side session validation.

Unauthenticated users are automatically redirected to Login.

Example:

```ts
const session = await getServerSession(authOptions);

if (!session) {
  redirect('/login');
}
```

---

## Logout

Logout button calls:

```ts
signOut({
  callbackUrl: '/login',
});
```

Flow:

```text
Logout
   │
   ▼
Auth.js clears session
   │
   ▼
User redirected to Login
```

---

## API Endpoints

### Register Admin

```http
POST /api/register
```

Request:

```json
{
  "username": "admin",
  "password": "Admin@123"
}
```

Response:

```json
{
  "id": 1,
  "username": "admin"
}
```

---

### Auth.js Routes

Generated automatically:

```http
/api/auth/signin
/api/auth/signout
/api/auth/session
/api/auth/callback/credentials
```

---


## Build for Production

### Create Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

---

## Security Notes

### Good Practices Implemented

- Password hashing using bcryptjs
- Server-side authentication
- Session management using Auth.js
- Protected routes
- No localStorage-based authentication
- No plain-text passwords stored

---

## Author

Amit Kumar Paliwal
Prajwal Gowda Magnur Maheshwarappa

Inventory Manager Capstone Project

Built with:

- Next.js 15 App Router
- Auth.js
- JSON Server
- bcryptjs
- Tailwind CSS
- TypeScript