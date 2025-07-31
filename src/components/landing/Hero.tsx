import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Star, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import mascot from "@/assets/scot.png";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Organize Your Tasks,{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Achieve Your Goals
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              TaskNest helps you manage your tasks efficiently with a beautiful, intuitive interface. 
              Track progress, set deadlines, and stay organized like never before.
            </p>
          </div>

          {/* Mascot Animation */}
          <div className="flex justify-center mb-12">
            <img
              src={mascot}
              alt="TaskNest Mascot"
              className="w-48 h-48 object-contain animate-bounce-rotate drop-shadow-2xl"
              draggable={false}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="hero" onClick={onGetStarted} className="text-lg px-8 py-6">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              View Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;