import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      toast({
        title: "Reset Link Sent",
        description: "Check your email for password reset instructions.",
      });
      setIsLoading(false);
      setEmail("");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">R</span>
            </div>
            <h1 className="ml-3 text-3xl font-bold text-foreground">RakeOpti-Plan</h1>
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Reset Your Password</h2>
          <p className="mt-2 text-muted-foreground">
            Enter your email address and we will send you a link to reset your password.
          </p>
        </div>

        {/* Reset Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-foreground font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="planner@yoursteelco.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 bg-card border-border text-foreground"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 text-lg font-medium"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Login
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 RakeOpti-Plan. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;