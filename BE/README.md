
# ChatApp Backend

A robust Node.js backend for the Real-time Chat Application.

## 🛠️ Tech Stack

*   **Runtime:** Node.js
*   **Framework:** Express.js (v5 Beta)
*   **Database:** MongoDB & Mongoose
*   **Authentication:** JWT (JSON Web Tokens), bcryptjs, Cookie Parser
*   **Real-time Communication:** Socket.io (via Express server)
*   **File Storage:** Cloudinary
*   **Email Service:** Resend
*   **Utility:** Dotenv, CORS, Express Rate Limit

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm
*   MongoDB Atlas Account
*   Cloudinary Account
*   Resend Account

### Installation

1.  Navigate to the backend directory:
    ```bash
    cd BE
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the `BE` directory and add the following:
    ```env
    PORT=5173
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    RESEND_API_KEY=your_resend_api_key
    CLIENT_URL=http://localhost:3000
    ```

### Running the Server

*   **Development Mode:**
    ```bash
    npm run dev
    ```
    (Uses `nodemon` for auto-reloading)

*   **Production Mode:**
    ```bash
    npm start
    ```

## 📂 Project Structure

*   `server.js`: Logic entry point.
*   `src/controllers`: Request handlers.
*   `src/routes`: API route definitions.
*   `src/models`: Mongoose schemas.
*   `src/middleware`: Auth and error handling middleware.
*   `src/lib`: Utility functions (db connection, cloudinary, etc.).

