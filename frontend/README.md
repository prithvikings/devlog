# DevLog Frontend

A modern, high-performance web application built for seamless developer logging and management.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **Animations:** [Motion](https://motion.dev/) (formerly Framer Motion)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Notifications:** [Sonner](https://sonner.stevenly.me/)
- **Theme Management:** [next-themes](https://github.com/pacocoursey/next-themes)

## ✨ Features

- **Performance First:** Lazy-loaded routes and optimized asset delivery for fast initial loads (LCP).
- **Smooth UX:** High-quality micro-animations and transitions powered by Motion.
- **Dynamic Theming:** Seamless switching between Light and Dark modes.
- **Secure Routing:** Built-in `ProtectedRoute` to handle authentication states and redirect unauthorized users.
- **Modular Architecture:** Clean, component-based structure using atomic design principles.
- **Responsive Design:** Fully mobile-responsive layout designed with a professional aesthetic.

## 📁 Project Structure

```text
frontend/
├── src/
│   ├── api.js          # Axios instance & global API configuration
│   ├── App.jsx         # Root component with routing logic
│   ├── components/     # UI & Feature-specific components
│   │   ├── landing/    # Components specific to the Landing page
│   │   └── ui/         # Reusable UI primitives (Buttons, Cards, etc.)
│   ├── context/        # React Context providers (Auth, Theme)
│   ├── lib/            # Utility functions and library helpers
│   ├── pages/          # Main application views (Landing, Dashboard)
│   └── main.jsx        # Application entry point
├── public/             # Static assets
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist/` folder.

## 📝 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.
