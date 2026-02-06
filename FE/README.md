# Next.js 16 Template

Modern, production-ready Next.js 16 template with React 19, Tailwind CSS 4, Zustand, React Query, and more.

## 🚀 Features

- ✅ **Next.js 16** with App Router
- ✅ **React 19** - Latest React features
- ✅ **Tailwind CSS 4** - Modern utility-first CSS
- ✅ **TypeScript Ready** - JSDoc comments for better IDE support
- ✅ **Dark Mode** - next-themes integration
- ✅ **State Management** - Zustand for global state
- ✅ **Data Fetching** - React Query (TanStack Query) for server state
- ✅ **API Client** - Axios with interceptors
- ✅ **Error Handling** - Error boundaries and error pages
- ✅ **Loading States** - Loading components
- ✅ **Reusable UI Components** - Button, Loading, Error components
- ✅ **Utilities** - Helper functions and constants
- ✅ **SEO Ready** - Metadata support
- ✅ **Font Optimization** - Next.js font optimization

## 📦 Tech Stack

- **Framework:** Next.js 16.0.1
- **React:** 19.2.0
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand 5.0.8
- **Data Fetching:** @tanstack/react-query 5.90.7
- **HTTP Client:** Axios 1.13.2
- **Theme:** next-themes 0.4.6

## 🏗️ Project Structure

```
nextjstemplate/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   ├── error.js           # Error boundary
│   ├── loading.js         # Loading state
│   ├── not-found.js       # 404 page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Loading.jsx
│   │   └── Error.jsx
│   ├── Navbar/           # Navigation components
│   └── Providers/        # Context providers
├── lib/                  # Libraries and configurations
│   └── axios.js          # Axios instance
├── store/                # Zustand stores
│   └── Auth.js           # Auth store example
├── service/              # API services
│   └── getService.js     # API service example
├── utils/                # Utility functions
│   ├── constants.js      # App constants
│   └── helpers.js        # Helper functions
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nextjstemplate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Next.js Template
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# App Configuration
NEXT_PUBLIC_APP_NAME=Next.js Template
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Analytics
# NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 🎨 Styling

This template uses Tailwind CSS 4 with custom theme configuration. Custom colors and fonts are defined in `app/globals.css`.

### Custom Colors
- `primary`, `secondary`, `three`, `fourth`, `five`
- Custom breakpoints: `screen12` (1200px)

### Custom Fonts
- Orbitron (heading font)
- Montserrat (body font)

## 🔧 Configuration

### Axios Configuration

API client is configured in `lib/axios.js`. It includes:
- Request interceptors for authentication
- Response interceptors for error handling
- Base URL configuration
- Timeout settings

### Zustand Store

Example store is in `store/Auth.js`. You can create additional stores following the same pattern.

### React Query

React Query is configured in `components/Providers/Query.jsx` with:
- Default query options
- Stale time configuration
- Retry logic

## 📚 Usage Examples

### Using Zustand Store

```jsx
"use client"
import { useAuthStore } from "@/store/Auth"

export default function MyComponent() {
  const count = useAuthStore((state) => state.count);
  const increase = useAuthStore((state) => state.increase);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increase}>Increase</button>
    </div>
  );
}
```

### Using React Query

```jsx
"use client"
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/service/getService";

export default function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
}
```

### Server Component with API Call

```jsx
import fetchData from "@/service/getService";

export default async function MyPage() {
  const data = await fetchData();
  
  return <div>{JSON.stringify(data)}</div>;
}
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📦 Building for Production

```bash
npm run build
npm run start
```

## 🚢 Deployment

This template is ready to deploy on Vercel, Netlify, or any platform that supports Next.js.

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js Team
- Vercel
- Tailwind CSS
- Zustand
- TanStack Query

## 📞 Support

For support, please open an issue on GitHub.

---

Made with ❤️ using Next.js 16
