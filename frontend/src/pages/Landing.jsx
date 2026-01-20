import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Landing/Navbar";
import Hero from "../components/Landing/Hero";
import Integrations from "../components/Landing/Integration";
import MinimalDemo from "../components/Landing/MinimalDemo";
import ExtensionCTA from "../components/Landing/ExtensionCTA";
import InstallationSteps from "../components/Landing/InstallationSteps";
import Features from "../components/Landing/Features";
import Audience from "../components/Landing/Audience";
import FAQ from "../components/Landing/FAQ";
import Footer from "../components/Landing/Footer";

export default function LandingPage() {
  const { user, loading, login } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div
      className="
      min-h-screen font-sans
      bg-zinc-100 text-zinc-900
      dark:bg-zinc-950 dark:text-zinc-200
      selection:bg-black/10 dark:selection:bg-white/20
    "
    >
      <Navbar />
      <Hero />
      <Integrations />
      <MinimalDemo />
      <ExtensionCTA />
      <InstallationSteps />
      <Features />
      <Audience />
      <FAQ />
      <Footer />
    </div>
  );
}
