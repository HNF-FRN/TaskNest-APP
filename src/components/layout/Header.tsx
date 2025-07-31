import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import mascot from "@/assets/logo.png";

interface HeaderProps {
  onSignUp: () => void;
  onSignIn: () => void;
}

const Header = ({ onSignUp, onSignIn }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={mascot} alt="TaskNest Logo" className="h-8 w-8 object-contain" draggable={false} />
          <span className="text-xl font-bold text-foreground">TaskNest</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <Button variant="ghost" onClick={onSignIn}>
            Sign In
          </Button>
          <Button variant="hero" onClick={onSignUp}>
            Get Started
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="ghost" onClick={onSignIn} className="justify-start">
                Sign In
              </Button>
              <Button variant="hero" onClick={onSignUp} className="justify-start">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;