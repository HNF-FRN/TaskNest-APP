import { useState } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/landing/Hero";
import AuthModal from "@/components/auth/AuthModal";
import Dashboard from "@/components/dashboard/Dashboard";
// Add these imports at the top of the file (user should update the paths to their actual mascot images)
import feature1Mascot from '@/assets/feature1.png'; // Seamless Task Management
import feature2Mascot from '@/assets/feature2.png'; // Smart Reminders
import feature3Mascot from '@/assets/feature3.png'; // Collaboration

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">("signin");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignUp = () => {
    setAuthModalTab("signup");
    setIsAuthModalOpen(true);
  };

  const handleSignIn = () => {
    setAuthModalTab("signin");
    setIsAuthModalOpen(true);
  };

  const handleGetStarted = () => {
    setAuthModalTab("signup");
    setIsAuthModalOpen(true);
  };

  // For demo purposes, we'll show the dashboard after auth modal is closed
  // In real implementation, this would be handled by actual authentication
  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    // Demo: automatically "authenticate" user for demonstration
    if (!isAuthenticated) {
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 300);
    }
  };

  if (isAuthenticated) {
    return <Dashboard onBackToHome={() => setIsAuthenticated(false)} />;
  }

  return (
    <div className="min-h-screen">
      <Header onSignUp={handleSignUp} onSignIn={handleSignIn} />
      <Hero onGetStarted={handleGetStarted} />

      {/* Features Section */}
      <section id="features" className="relative py-24 bg-gradient-to-b from-background to-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">Features</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card/80 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <span className="inline-flex items-center justify-center w-28 h-28 mb-4">
                <img src={feature1Mascot} alt="Task Management Mascot" className="w-24 h-24 object-contain" />
              </span>
              <h3 className="font-semibold text-lg mb-2">Seamless Task Management</h3>
              <p className="text-muted-foreground text-sm">Effortlessly create, edit, and organize your tasks with a beautiful, intuitive interface.</p>
            </div>
            <div className="bg-card/80 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <span className="inline-flex items-center justify-center w-28 h-28 mb-4">
                <img src={feature2Mascot} alt="Smart Reminders Mascot" className="w-24 h-24 object-contain" />
              </span>
              <h3 className="font-semibold text-lg mb-2">Smart Reminders</h3>
              <p className="text-muted-foreground text-sm">Stay on top of deadlines with intelligent reminders and progress tracking.</p>
            </div>
            <div className="bg-card/80 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <span className="inline-flex items-center justify-center w-28 h-28 mb-4">
                <img src={feature3Mascot} alt="Collaboration Mascot" className="w-24 h-24 object-contain" />
              </span>
              <h3 className="font-semibold text-lg mb-2">Collaboration</h3>
              <p className="text-muted-foreground text-sm">Work together with your team, assign tasks, and track progress in real time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">About TaskNest</h2>
          <div className="bg-card/70 rounded-2xl shadow-lg p-10 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              <span className="font-semibold text-primary">TaskNest</span> is designed to help you organize your life and work with ease. Our mission is to provide a delightful, powerful, and simple tool for managing your daily tasks and long-term goals.
            </p>
            <p className="text-muted-foreground">
              Whether you’re a student, professional, or team leader, TaskNest adapts to your workflow and helps you stay productive. We believe in beautiful design, intuitive features, and empowering users to achieve more every day.
            </p>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        defaultTab={authModalTab}
      />
    </div>
  );
};

export default Index;
