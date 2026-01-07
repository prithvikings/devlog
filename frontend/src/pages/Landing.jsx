// src/pages/Landing.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Landing() {
  const { user, loading, login } = useAuth();

  if (loading) return null; // Or a minimal spinner
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-50 p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tighter text-white">
            DevLog AI
          </h1>
          <p className="text-lg text-zinc-400 font-medium">
            Stop writing cringe. <br /> Let your code write your posts.
          </p>
        </div>

        <div className="pt-4">
          <Button
            onClick={login}
            size="lg"
            className="w-full font-medium bg-white text-black hover:bg-zinc-200"
          >
            <Github className="mr-2 h-4 w-4" />
            Login with GitHub
          </Button>
          <p className="text-xs text-zinc-600 mt-4">
            Read-only access to public activity. We don't steal your code.
          </p>
        </div>
      </div>
    </div>
  );
}
