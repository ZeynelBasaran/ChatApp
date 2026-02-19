
# ChatApp Frontend

A modern, responsive frontend for the Real-time Chat Application, built with Next.js and React.

## 🛠️ Tech Stack

*   **Framework:** Next.js 16 (App Router)
*   **Library:** React 19
*   **Styling:** Tailwind CSS v4, DaisyUI 5
*   **State Management:** Zustand
*   **Data Fetching:** TanStack Query (React Query)
*   **HTTP Client:** Axios
*   **Form Handling:** React Hook Form, Zod
*   **Icons:** Lucide React
*   **Notifications:** Sonner
*   **Internationalization:** next-intl
*   **Theme:** next-themes (Dark/Light mode support)

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm

### Installation

1.  Navigate to the frontend directory:
    ```bash
    cd FE
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env.local` file in the `FE` directory and add:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5173/api
    ```

### Running the Application

*   **Development Mode:**
    ```bash
    npm run dev
    ```
    Runs the app on `http://localhost:3000`.

*   **Production Build:**
    ```bash
    npm run build
    npm start
    ```

## 📂 Project Structure

*   `app/`: Next.js App Router pages and layouts.
*   `components/`: Reusable UI components.
*   `lib/`: Configuration files (axios, zod, etc.).
*   `service/`: API service calls.
*   `store/`: Global state management keys (Zustand).
*   `i18n/`: Internationalization configuration.

