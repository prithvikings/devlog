import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Integrations from "../components/landing/Integration";
import MinimalDemo from "../components/landing/MinimalDemo";
import ExtensionCTA from "../components/landing/ExtensionCTA";
import InstallationSteps from "../components/landing/InstallationSteps";
import Features from "../components/landing/Features";
import Audience from "../components/landing/Audience";
import FAQ from "../components/landing/Faq";
import Footer from "../components/landing/Footer";
import LandingSkeleton from "../components/Skeltons/LandingSkeleton";

export default function LandingPage() {
  const { user, loading, login } = useAuth();

  if (loading) {
    return <LandingSkeleton />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

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
