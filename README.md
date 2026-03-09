
# Full-Stack Real-time Chat Application

A complete Real-time Chat Application built with a modern implementation of the MERN stack (MongoDB, Express, React/Next.js, Node.js).

## 🌟 Project Overview

This monorepo contains both the Backend (API) and Frontend (Client) applications for the Chat App. It is designed to be scalable, responsive, and easy to develop.

### ✨ Key Features

*   **Real-time Messaging:** Build using Socket.io for instant message delivery.
*   **User Authentication:** Secure JWT-based auth stored in HttpOnly cookies.
*   **Media Sharing:** Upload and share images within chats using Cloudinary.
*   **Responsive UI:** Fully responsive design that works seamlessly on Desktop and Mobile.
*   **Theme Support:** Built-in Light and Dark mode variations.
*   **Internationalization (i18n):** Multi-language capabilities out-of-the-box.

### 🏗️ Tech Stack Summary

#### **Frontend (FE)**
*   **Next.js 16** & **React 19** 
*   **Tailwind CSS 4** & **DaisyUI 5**
*   **Zustand** & **TanStack Query**
*   **Socket.io Client**

#### **Backend (BE)**
*   **Node.js** & **Express.js v5**
*   **MongoDB** & **Mongoose**
*   **Socket.io** (Real-time communication)
*   **JWT Authentication**

## 🚀 Quick Start (Run Both concurrently)

To run both the Frontend and Backend servers simultaneously from the root directory:

1.  **Install All Dependencies:**
    (Run this in the root directory)
    ```bash
    npm run install-all
    ```
    *This command installs dependencies for both `BE` and `FE` folders.*

2.  **Start Development Servers:**
    ```bash
    npm run dev
    ```
    *This command uses `concurrently` to start both servers:*
    *   **Frontend:** `http://localhost:3000`
    *   **Backend:** `http://localhost:5173`

## 🧪 Test Accounts

You can use the following pre-configured credentials to log in and test the application features without creating a new user:

| Role/Name    | Email               | Password   |
| :---         | :---                | :---       |
| Test User 1  | `test@test.com`     | `123456`   |
| Test User 2  | `test1@test1.com`   | `123456`   |

*(Note: Passwords are assumed to be a standard placeholder like `123456`, please update them if your test accounts use different passwords!)*

## 📂 Repository Structure

*   **`BE/`**: Backend source code (Express API).
*   **`FE/`**: Frontend source code (Next.js App).
*   **`package.json`**: Root configuration for managing the monorepo scripts.

## ⚙️ Environment Variables

Before running the application, you need to set up environment variables for both the Backend and Frontend projects. Create the appropriate `.env` files without any sensitive data and fill them using your own credentials.

### Backend (`BE/.env`)

```env
# Server Port
PORT=5173

# MongoDB Connection String (e.g., mongodb+srv://...)
MONGO_URI=your_mongodb_connection_string

# JWT Secret for Auth Tokens
JWT_SECRET=your_jwt_secret

# Node Environment
NODE_ENV=development

# Resend (Email Provider)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM="onboarding@resend.dev"
EMAIL_FROM_NAME="ChatApp Team"

# Frontend URLs for CORS & Redirects
CLIENT_URL=http://localhost:3000
FE_URL=https://your_frontend_deployment_url.com

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (`FE/.env.local`)

```env
# Client-side API URL (Browser)
NEXT_PUBLIC_API_URL=http://localhost:5173/api

# Server-side API URL (Node / Server Actions)
API_URL=http://localhost:5173/api

NODE_ENV=development
```

## 📝 Scripts

*   `npm run install-all`: Installs dependencies for both sub-projects.
*   `npm run dev`: Starts both servers in development mode.
*   `npm run start`: Starts the backend production server.
*   `npm run build`: Builds both projects.

---
*Developed by Zeynel Basaran*
