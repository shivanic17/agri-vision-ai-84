import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { Sprout, Mail, Lock, User, MapPin, ArrowLeft } from "lucide-react";
import heroFarmland from "@/assets/hero-farmland.jpg";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    farmName: "",
    location: "",
    farmSize: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    if (!acceptTerms) {
      alert("Please accept the terms and conditions.");
      return;
    }

    // Here you would typically handle user registration
    console.log("Sign up attempt:", { ...formData, acceptTerms, acceptMarketing });
    // For demo purposes, redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Background Image */}
      <div className="hidden lg:block lg:flex-1 relative">
        <img 
          src={heroFarmland} 
          alt="Lush green farmland" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white max-w-md">
            <h2 className="text-3xl font-bold mb-4">
              Join the Future of Farming
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Get AI-powered insights to optimize your crops, reduce risks, and increase yields sustainably.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">25%</div>
                <div className="text-white/80">Yield Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">40%</div>
                <div className="text-white/80">Risk Reduction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
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
              <h1 className="text-3xl font-bold text-foreground">Start your journey</h1>
              <p className="text-muted-foreground">Create your account to access smart farming tools</p>
            </div>
          </div>

          {/* Sign Up Form */}
          <Card className="shadow-card border-0 bg-white">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center">Create your account</CardTitle>
              <CardDescription className="text-center">
                Join thousands of farmers optimizing their crops with AI
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@farmexample.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                {/* Farm Information */}
                <div className="space-y-2">
                  <Label htmlFor="farmName" className="flex items-center gap-2">
                    <Sprout className="w-4 h-4" />
                    Farm Name
                  </Label>
                  <Input
                    id="farmName"
                    type="text"
                    placeholder="Smith Family Farm"
                    value={formData.farmName}
                    onChange={(e) => handleInputChange("farmName", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="Iowa, USA"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmSize">Farm Size</Label>
                    <Select onValueChange={(value) => handleInputChange("farmSize", value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Under 50 acres</SelectItem>
                        <SelectItem value="medium">50-200 acres</SelectItem>
                        <SelectItem value="large">200-1000 acres</SelectItem>
                        <SelectItem value="xlarge">Over 1000 acres</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Password Fields */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:text-primary-dark">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:text-primary-dark">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="marketing"
                      checked={acceptMarketing}
                      onCheckedChange={(checked) => setAcceptMarketing(checked === true)}
                      className="mt-1"
                    />
                    <Label htmlFor="marketing" className="text-sm text-muted-foreground leading-relaxed">
                      I'd like to receive farming tips and product updates via email
                    </Label>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full h-12 gradient-hero hover:shadow-glow text-base">
                  Create Account
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:text-primary-dark font-medium transition-smooth">
                    Sign in here
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;