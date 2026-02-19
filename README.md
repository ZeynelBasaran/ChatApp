
# Full-Stack Real-time Chat Application

A complete Real-time Chat Application built with a modern implementation of the MERN stack (MongoDB, Express, React/Next.js, Node.js).

## 🌟 Project Overview

This monorepo contains both the Backend (API) and Frontend (Client) applications for the Chat App. It is designed to be scalable, responsive, and easy to develop.

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

## 📂 Repository Structure

*   **`BE/`**: Backend source code (Express API).
*   **`FE/`**: Frontend source code (Next.js App).
*   **`package.json`**: Root configuration for managing the monorepo scripts.

## 📝 Scripts

*   `npm run install-all`: Installs dependencies for both sub-projects.
*   `npm run dev`: Starts both servers in development mode.
*   `npm run start`: Starts the backend production server.
*   `npm run build`: Builds both projects.

---
*Developed by Zeynel Basaran*
