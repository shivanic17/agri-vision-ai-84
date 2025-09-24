import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Bug, 
  Shield, 
  AlertTriangle, 
  Eye, 
  MapPin,
  TrendingUp,
  Calendar,
  Camera,
  Zap,
  Target,
  Activity
} from "lucide-react";

const Pests = () => {
  const pestAlerts = [
    {
      id: 1,
      type: "Aphids",
      severity: "high",
      zone: "Field Zone A",
      confidence: 94,
      detectedAt: "2 hours ago",
      description: "High concentration of aphids detected in northern section",
      treatment: "Neem oil spray recommended within 24 hours",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      imageCount: 12
    },
    {
      id: 2,
      type: "Caterpillars",
      severity: "medium",
      zone: "Field Zone B",
      confidence: 87,
      detectedAt: "6 hours ago",
      description: "Moderate caterpillar activity observed on corn stalks",
      treatment: "Biological control agents can be deployed",
      coordinates: { lat: 40.7580, lng: -73.9855 },
      imageCount: 8
    },
    {
      id: 3,
      type: "Spider Mites",
      severity: "low",
      zone: "Greenhouse 1",
      confidence: 76,
      detectedAt: "1 day ago",
      description: "Early signs of spider mite infestation detected",
      treatment: "Increase humidity and monitor closely",
      coordinates: { lat: 40.7489, lng: -73.9857 },
      imageCount: 5
    }
  ];

  const preventionMetrics = [
    { label: "Detection Accuracy", value: 94, unit: "%" },
    { label: "Response Time", value: 2.4, unit: "hrs" },
    { label: "Treatment Success", value: 89, unit: "%" },
    { label: "Pest Reduction", value: 67, unit: "%" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive/10 border-destructive/20";
      case "medium": return "bg-warning/10 border-warning/20";
      case "low": return "bg-success/10 border-success/20";
      default: return "bg-muted/10 border-muted/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Pest Management
                </h1>
                <p className="text-muted-foreground">AI-powered pest detection and treatment recommendations</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-primary/20 hover:bg-primary/5">
                <Camera className="w-4 h-4 mr-2" />
                Capture Images
              </Button>
              <Button className="bg-gradient-to-r from-primary to-primary/80 shadow-lg hover:shadow-primary/25">
                <Zap className="w-4 h-4 mr-2" />
                Auto Scan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {preventionMetrics.map((metric, index) => (
            <Card key={index} className="shadow-soft border-0 bg-white/60 backdrop-blur-sm hover:shadow-glow transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <p className="text-3xl font-bold text-foreground">
                      {metric.value}
                      <span className="text-lg text-muted-foreground ml-1">{metric.unit}</span>
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-primary/30" />
                </div>
                <Progress value={metric.value} className="mt-3 h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Pest Alerts */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Active Pest Alerts</h2>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {pestAlerts.length} Active
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {pestAlerts.map((alert) => (
              <Card key={alert.id} className="shadow-elegant border-0 bg-white/70 backdrop-blur-sm hover:shadow-glow transition-smooth overflow-hidden">
                <div className={`h-1 ${alert.severity === 'high' ? 'bg-destructive' : alert.severity === 'medium' ? 'bg-warning' : 'bg-success'}`} />
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${getSeverityBg(alert.severity)}`}>
                        <Bug className={`w-6 h-6 ${getSeverityColor(alert.severity)}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl font-bold text-foreground">
                            {alert.type}
                          </CardTitle>
                          <Badge className={getSeverityBg(alert.severity)}>
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {alert.zone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {alert.detectedAt}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {alert.confidence}% confidence
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-accent/10">
                        <Camera className="w-3 h-3 mr-1" />
                        {alert.imageCount} images
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Detection Details
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {alert.description}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Recommended Treatment
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {alert.treatment}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-accent/5 rounded-lg p-4 border border-border/20">
                        <h5 className="font-medium text-foreground mb-2">Confidence Level</h5>
                        <Progress value={alert.confidence} className="h-3" />
                        <p className="text-xs text-muted-foreground mt-1">{alert.confidence}% detection accuracy</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-primary/80">
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          Location
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Prevention & Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-elegant border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="w-5 h-5 text-success" />
                Prevention Strategies
              </CardTitle>
              <CardDescription>
                Proactive measures to prevent pest infestations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Regular Monitoring", status: "Active", progress: 85 },
                { title: "Beneficial Insects", status: "Deployed", progress: 72 },
                { title: "Crop Rotation", status: "Planned", progress: 60 },
                { title: "Natural Barriers", status: "Active", progress: 90 }
              ].map((strategy, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-border/10">
                  <div>
                    <p className="font-medium text-foreground">{strategy.title}</p>
                    <p className="text-xs text-muted-foreground">{strategy.status}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={strategy.progress} className="w-20 h-2" />
                    <span className="text-sm font-medium text-muted-foreground">{strategy.progress}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <TrendingUp className="w-5 h-5 text-primary" />
                Detection Trends
              </CardTitle>
              <CardDescription>
                Pest activity patterns over the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { pest: "Aphids", trend: "↑", change: "+23%", color: "text-destructive" },
                { pest: "Caterpillars", trend: "↓", change: "-12%", color: "text-success" },
                { pest: "Spider Mites", trend: "→", change: "0%", color: "text-muted-foreground" },
                { pest: "Thrips", trend: "↓", change: "-8%", color: "text-success" }
              ].map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-border/10">
                  <div className="flex items-center space-x-3">
                    <Bug className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{trend.pest}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{trend.trend}</span>
                    <span className={`font-medium ${trend.color}`}>{trend.change}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pests;