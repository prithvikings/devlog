import React, { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Landing from "./pages/Landing"; // Keep Landing eager for fast LCP

// --- OPTIMIZATION: Lazy Load the Dashboard ---
const Dashboard = lazy(() => import("./pages/Dashboard"));

// Minimal Loader (Linear Style)
const PageLoader = () => (
  <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
    <div className="w-5 h-5 border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-100 rounded-full animate-spin" />
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show the loader while checking session state
  if (loading) return <PageLoader />;

  return user ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing loads instantly */}
            <Route path="/" element={<Landing />} />

            {/* Dashboard loads only when needed */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<PageLoader />}>
                    <Dashboard />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
