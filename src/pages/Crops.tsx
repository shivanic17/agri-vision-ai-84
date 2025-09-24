import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavLink, Link } from "react-router-dom";
import { 
  Home, Sprout, Globe, Bug, BarChart3, Settings, Bell, 
  MapPin, TrendingUp, Activity, Eye, Camera, Zap, MessageCircle
} from "lucide-react";
import cropHealth from "@/assets/crop-health.jpg";
import SoilChatbot from "@/components/SoilChatbot";
import { ChatbotProvider, useChatbot } from "@/components/shared/ChatbotProvider";

const CropsContent = () => {
  const { toggleChatbot } = useChatbot();

  const sidebarItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Crop Health", url: "/dashboard/crops", icon: Sprout },
    { title: "Soil Condition", url: "/dashboard/soil", icon: Globe },
    { title: "Pest Risks", url: "/dashboard/pests", icon: Bug },
    { title: "AI Assistant", url: "#", icon: MessageCircle, action: "chatbot" },
    { title: "Reports", url: "/reports", icon: BarChart3 },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
  ];

  const cropFields = [
    { 
      id: 1, 
      name: "North Field", 
      crop: "Wheat", 
      health: 92, 
      stage: "Flowering",
      area: 45,
      ndvi: 0.82,
      status: "excellent",
      lastScanned: "2 hours ago"
    },
    { 
      id: 2, 
      name: "South Field", 
      crop: "Corn", 
      health: 76, 
      stage: "Vegetative",
      area: 32,
      ndvi: 0.65,
      status: "good",
      lastScanned: "4 hours ago"
    },
    { 
      id: 3, 
      name: "East Field", 
      crop: "Soybeans", 
      health: 58, 
      stage: "Reproductive",
      area: 28,
      ndvi: 0.45,
      status: "warning",
      lastScanned: "1 day ago"
    },
    { 
      id: 4, 
      name: "West Field", 
      crop: "Rice", 
      health: 34, 
      stage: "Maturity",
      area: 38,
      ndvi: 0.32,
      status: "critical",
      lastScanned: "6 hours ago"
    }
  ];

  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-success";
    if (health >= 60) return "text-warning";
    return "text-destructive";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent": return <Badge className="bg-success/10 text-success border-success/20">Excellent</Badge>;
      case "good": return <Badge className="bg-primary/10 text-primary border-primary/20">Good</Badge>;
      case "warning": return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case "critical": return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Critical</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <Sidebar className="border-r border-border">
          <SidebarContent>
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <Sprout className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">AI Crop Health</span>
              </div>
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        {item.action === 'chatbot' ? (
                          <button 
                            onClick={toggleChatbot}
                            className="w-full flex items-center hover:bg-muted/50 px-2 py-1.5 rounded-md"
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.title}</span>
                          </button>
                        ) : (
                          <NavLink 
                            to={item.url} 
                            end={item.url === "/dashboard"}
                            className={({ isActive }) => 
                              isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50"
                            }
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.title}</span>
                          </NavLink>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <header className="bg-white border-b border-border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Crop Health Monitoring</h1>
                  <p className="text-muted-foreground">AI-powered crop health analysis and recommendations</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Scan Fields
                </Button>
                <Button asChild>
                  <Link to="/reports">View Reports</Link>
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="glass-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Fields</CardTitle>
                  <div className="text-2xl font-bold text-foreground">4</div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">143 acres total</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Health Score</CardTitle>
                  <div className="text-2xl font-bold text-success">78%</div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-success">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+5% this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">NDVI Average</CardTitle>
                  <div className="text-2xl font-bold text-primary">0.69</div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Vegetation index</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Fields At Risk</CardTitle>
                  <div className="text-2xl font-bold text-warning">2</div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Need attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Crop Fields Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cropFields.map((field) => (
                <Card key={field.id} className="glass-card hover:glow-card transition-smooth">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <img src={cropHealth} alt="Field" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            {field.name}
                          </CardTitle>
                          <CardDescription>{field.crop} • {field.area} acres</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(field.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Health Score */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Health Score</span>
                        <span className={`text-lg font-bold ${getHealthColor(field.health)}`}>
                          {field.health}%
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-smooth ${
                            field.health >= 80 ? 'bg-gradient-success' : 
                            field.health >= 60 ? 'bg-gradient-warning' : 'bg-gradient-destructive'
                          }`}
                          style={{ width: `${field.health}%` }}
                        ></div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">NDVI</span>
                          <span className="text-sm font-semibold">{field.ndvi}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Stage</span>
                          <span className="text-sm font-semibold">{field.stage}</span>
                        </div>
                        <div className="flex items-center justify-between col-span-2">
                          <span className="text-sm text-muted-foreground">Last Scan</span>
                          <span className="text-sm font-semibold">{field.lastScanned}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Activity className="w-4 h-4 mr-2" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Insights Panel */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  AI-Powered Insights & Recommendations
                </CardTitle>
                <CardDescription>Smart analysis based on multispectral imaging and historical data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                    <h4 className="font-semibold text-success mb-2">North Field - Excellent Progress</h4>
                    <p className="text-sm text-muted-foreground">
                      Wheat crop showing optimal NDVI values. Continue current irrigation schedule.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                    <h4 className="font-semibold text-warning mb-2">East Field - Stress Detected</h4>
                    <p className="text-sm text-muted-foreground">
                      Soybeans showing signs of nutrient deficiency. Recommend soil test and fertilization.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                    <h4 className="font-semibold text-destructive mb-2">West Field - Immediate Action</h4>
                    <p className="text-sm text-muted-foreground">
                      Rice crop showing disease symptoms. Schedule immediate inspection and treatment.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">Weather Alert</h4>
                    <p className="text-sm text-muted-foreground">
                      Heavy rainfall expected. Prepare drainage and adjust irrigation systems.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* AI Soil Chatbot */}
      <SoilChatbot 
        soilData={{ moisture: 68, temperature: 24, ph: 6.8, nitrogen: 42, phosphorus: 28, potassium: 156 }} 
        cropData={{ totalFields: 4, avgHealthScore: 78, ndviAverage: 0.69, fieldsAtRisk: 2 }}
        pestData={{ activeAlerts: 3, recentPests: ['Aphid', 'Cutworm', 'Spider Mite'], riskLevel: 'medium' }}
      />
    </SidebarProvider>
  );
};

const Crops = () => {
  return (
    <ChatbotProvider>
      <CropsContent />
    </ChatbotProvider>
  );
};

export default Crops;