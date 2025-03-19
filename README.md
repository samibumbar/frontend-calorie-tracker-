# 🎨 Frontend Calories Tracker

Welcome to **Frontend Calories Tracker**, a modern and user-friendly web app built with **React**, **Next.js**, **TypeScript**, and **TailwindCSS**. This frontend interacts with the Backend Calories API, allowing users to track their caloric intake, manage meals, and authenticate securely.

## 🚀 Technologies Used

- **Next.js (App Router)** - Server-side rendering & static site generation.
- **TypeScript** - Type-safe JavaScript.
- **Redux Toolkit** - Global state management.
- **React Query** - Data fetching & caching.
- **TailwindCSS** - Utility-first CSS framework.
- **React Toastify** - User notifications.
- **Axios** - API requests.

## 🔧 Setup & Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/frontend-calories-tracker.git
   ```
2. **Navigate to the directory:**
   ```sh
   cd frontend-calories-tracker
   ```
3. **Install dependencies with Bun:**
   ```sh
   bun install
   ```
4. **Set environment variables:** Create a `.env.local` file and add:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```
5. **Start the development server:**
   ```sh
   bun run dev
   ```

## 📌 Features

### 🔑 Authentication

- **Login** (`/login`) - User login via email & password.
- **Signup** (`/signup`) - New user registration.
- **Protected Routes** - Only accessible when logged in.

### 📆 Dashboard (Authenticated Users)

- **Diary Page** (`/diary`) - Manage daily food intake.
- **Right Sidebar** - Displays calorie goals & progress.
- **Food Search** - Search and log products.

## 📡 API Integration

### 🔑 Authentication

- `POST /api/auth/register` - Register user.
- `POST /api/auth/login` - User login.
- `POST /api/auth/logout` - Logout.
- `POST /api/auth/refresh` - Refresh token.

### 🔥 Caloric Intake

- `GET /api/calories/public` - Public calorie recommendations.
- `GET /api/calories/private` - User-specific calorie data.

### 🥗 Products

- `GET /api/products/search?query=<search_term>` - Search products.

### 📆 Daily Consumption

- `POST /api/days/add` - Add consumed product.
- `DELETE /api/days/remove` - Remove consumed product.
- `GET /api/days/:date` - Get daily food intake.

## 🔐 Security

- **JWT Authentication** - API requests require `Authorization: Bearer <token>`.
- **Secure Storage** - Tokens stored in `localStorage`.

---

_Developed with ❤️ using Bun, Next.js, TypeScript, and TailwindCSS._
