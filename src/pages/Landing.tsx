import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Sprout, Globe, Bug, Bot, ArrowRight, Leaf, BarChart3, Shield, Zap } from "lucide-react";
import heroFarmland from "@/assets/hero-farmland.jpg";
import cropHealth from "@/assets/crop-health.jpg";
import soilCondition from "@/assets/soil-condition.jpg";
import farmerTech from "@/assets/farmer-tech.jpg";

const Landing = () => {
  const features = [
    {
      icon: Sprout,
      title: "Crop Health Monitoring",
      description: "AI-powered analysis of crop conditions using multispectral imaging to detect stress, disease, and nutritional deficiencies.",
      image: cropHealth,
      color: "text-success"
    },
    {
      icon: Globe,
      title: "Soil Condition Analysis",
      description: "Real-time monitoring of soil moisture, pH levels, and nutrient content through IoT sensors and satellite imagery.",
      image: soilCondition,
      color: "text-secondary"
    },
    {
      icon: Bug,
      title: "Pest Risk Assessment",
      description: "Early detection and prediction of pest outbreaks using machine learning algorithms and environmental data.",
      image: "/placeholder.svg",
      color: "text-warning"
    },
    {
      icon: Bot,
      title: "AI Recommendations",
      description: "Intelligent farming suggestions based on comprehensive data analysis to optimize crop yield and sustainability.",
      image: farmerTech,
      color: "text-primary"
    }
  ];

  const benefits = [
    { icon: BarChart3, title: "Increase Yield", description: "Up to 25% yield improvement" },
    { icon: Shield, title: "Reduce Risk", description: "Early pest & disease detection" },
    { icon: Zap, title: "Save Resources", description: "Optimize water & fertilizer usage" },
    { icon: Leaf, title: "Sustainable", description: "Eco-friendly farming practices" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-soft sticky top-0 z-50 border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sprout className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">AI Crop Health</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-smooth">Features</a>
              <a href="#benefits" className="text-muted-foreground hover:text-primary transition-smooth">Benefits</a>
              <Link to="/login" className="text-muted-foreground hover:text-primary transition-smooth">Login</Link>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroFarmland} 
            alt="Lush green farmland with drone technology" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 gradient-hero opacity-80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Smarter Farming with 
              <span className="text-primary-light block">AI-powered Insights</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
              Monitor crop health, soil conditions, and pest risks using advanced multispectral imaging 
              and IoT sensors for maximum yield and sustainability.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="gradient-hero hover:shadow-glow text-lg px-8 py-6">
                <Link to="/dashboard" className="flex items-center gap-2">
                  Explore Dashboard <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-accent/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Comprehensive Crop Monitoring
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform provides real-time insights across all aspects of crop management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-glow transition-smooth border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover hover:scale-105 transition-smooth"
                    />
                  </div>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-nature">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose AI Crop Health Monitoring?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Proven results that transform agricultural productivity and sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-smooth">
                  <benefit.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-earth">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of farmers already using AI to optimize their crops and increase yields.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-secondary hover:bg-white/90 text-lg px-8 py-6">
                <Link to="/signup" className="flex items-center gap-2">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                <Link to="/login">Login to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Sprout className="h-8 w-8 text-primary-light" />
                <span className="text-xl font-bold">AI Crop Health</span>
              </div>
              <p className="text-background/80 mb-4 max-w-md">
                Advanced AI-powered farming solutions for monitoring crop health, soil conditions, 
                and pest risks to maximize agricultural productivity.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-background/80 hover:text-primary-light transition-smooth">Dashboard</Link></li>
                <li><Link to="/reports" className="text-background/80 hover:text-primary-light transition-smooth">Reports</Link></li>
                <li><a href="#features" className="text-background/80 hover:text-primary-light transition-smooth">Features</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-background/80 hover:text-primary-light transition-smooth">Login</Link></li>
                <li><Link to="/signup" className="text-background/80 hover:text-primary-light transition-smooth">Sign Up</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center">
            <p className="text-background/60">
              © 2024 AI Crop Health Monitoring. Smarter farming with AI-powered insights.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;