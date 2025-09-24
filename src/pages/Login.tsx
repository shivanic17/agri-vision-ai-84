import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Sprout, Mail, Lock, ArrowLeft } from "lucide-react";
import farmerTech from "@/assets/farmer-tech.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle authentication
    console.log("Login attempt:", { email, password, rememberMe });
    // For demo purposes, redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <Link to="/" className="inline-flex items-center space-x-3 text-foreground hover:text-primary transition-smooth">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to home</span>
            </Link>
            
            <div className="flex justify-center">
              <div className="p-4 rounded-full gradient-hero shadow-glow">
                <Sprout className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
              <p className="text-muted-foreground">Sign in to access your farm dashboard</p>
            </div>
          </div>

          {/* Login Form */}
          <Card className="shadow-card border-0 bg-white">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center">Sign in to your account</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your farming insights
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="farmer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground">
                      Remember me
                    </Label>
                  </div>
                  
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:text-primary-dark transition-smooth"
                  >
                    Forgot password?
                  </Link>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full h-12 gradient-hero hover:shadow-glow text-base">
                  Sign In
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary hover:text-primary-dark font-medium transition-smooth">
                    Sign up for free
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>

          {/* Demo Credentials */}
          <Card className="bg-accent/30 border-accent">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-sm text-foreground mb-2">Demo Credentials:</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Email: demo@farmtech.com</p>
                <p>Password: demo123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden lg:block lg:flex-1 relative">
        <img 
          src={farmerTech} 
          alt="Farmer using technology in field" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-earth opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white max-w-md">
            <h2 className="text-3xl font-bold mb-4">
              Smart Farming Technology
            </h2>
            <p className="text-xl text-white/90">
              Monitor your crops with AI-powered insights and make data-driven decisions for better harvests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;