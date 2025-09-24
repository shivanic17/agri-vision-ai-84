import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavLink, Link } from "react-router-dom";
import { 
  Home, Sprout, Globe, Bug, BarChart3, Settings, Bell, 
  Droplets, Thermometer, Activity, Leaf, Beaker, Zap, TrendingUp, ArrowUp, MessageCircle
} from "lucide-react";
import soilCondition from "@/assets/soil-condition.jpg";
import SoilChatbot from "@/components/SoilChatbot";
import { ChatbotProvider, useChatbot } from "@/components/shared/ChatbotProvider";

const SoilContent = () => {
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

  // Soil data for the AI chatbot
  const currentSoilData = {
    moisture: 68,
    temperature: 24,
    ph: 6.8,
    nitrogen: 42,
    phosphorus: 28,
    potassium: 156
  };

  const soilMetrics = [
    { 
      label: "Moisture Level", 
      value: "68%", 
      status: "optimal", 
      icon: Droplets,
      trend: "+5%",
      description: "Ideal for current crop stage"
    },
    { 
      label: "Temperature", 
      value: "24°C", 
      status: "good", 
      icon: Thermometer,
      trend: "+2°C",
      description: "Stable soil temperature"
    },
    { 
      label: "pH Level", 
      value: "6.8", 
      status: "optimal", 
      icon: Activity,
      trend: "0.1",
      description: "Perfect for nutrient uptake"
    },
    { 
      label: "Nitrogen (N)", 
      value: "42ppm", 
      status: "low", 
      icon: Leaf,
      trend: "-8ppm",
      description: "Below recommended levels"
    },
    { 
      label: "Phosphorus (P)", 
      value: "28ppm", 
      status: "good", 
      icon: Beaker,
      trend: "+3ppm",
      description: "Adequate for root development"
    },
    { 
      label: "Potassium (K)", 
      value: "156ppm", 
      status: "optimal", 
      icon: Zap,
      trend: "+12ppm",
      description: "Excellent for plant vigor"
    }
  ];

  const fieldZones = [
    {
      id: 1,
      name: "North Field Zone A",
      moisture: 72,
      ph: 6.9,
      nitrogen: 45,
      status: "excellent",
      lastTested: "2 hours ago"
    },
    {
      id: 2,
      name: "North Field Zone B", 
      moisture: 65,
      ph: 6.7,
      nitrogen: 38,
      status: "good",
      lastTested: "2 hours ago"
    },
    {
      id: 3,
      name: "South Field Zone A",
      moisture: 58,
      ph: 6.5,
      nitrogen: 32,
      status: "warning",
      lastTested: "4 hours ago"
    },
    {
      id: 4,
      name: "East Field Zone A",
      moisture: 45,
      ph: 6.2,
      nitrogen: 28,
      status: "critical",
      lastTested: "1 day ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": case "excellent": return "text-success";
      case "good": return "text-primary";
      case "warning": return "text-warning";
      case "low": case "critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "optimal": case "excellent": return <Badge className="bg-success/10 text-success border-success/20">Optimal</Badge>;
      case "good": return <Badge className="bg-primary/10 text-primary border-primary/20">Good</Badge>;
      case "warning": return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case "low": case "critical": return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Critical</Badge>;
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
                  <h1 className="text-2xl font-bold text-foreground">Soil Condition Monitoring</h1>
                  <p className="text-muted-foreground">Real-time soil analysis and nutrient management</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Activity className="w-4 h-4 mr-2" />
                  Run Test
                </Button>
                <Button asChild>
                  <Link to="/reports">View Reports</Link>
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Soil Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {soilMetrics.map((metric, index) => (
                <Card key={index} className="glass-card hover:glow-card transition-smooth">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <metric.icon className="w-8 h-8 text-primary" />
                      {getStatusBadge(metric.status)}
                    </div>
                    <CardTitle className="text-lg">{metric.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                      <div className="flex items-center text-sm">
                        <ArrowUp className="w-4 h-4 mr-1 text-success" />
                        <span className="text-success">{metric.trend}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{metric.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Field Zone Analysis */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-secondary" />
                  Field Zone Analysis
                </CardTitle>
                <CardDescription>Detailed soil conditions across different field zones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fieldZones.map((zone) => (
                    <div key={zone.id} className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-smooth">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-foreground">{zone.name}</h4>
                        {getStatusBadge(zone.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          <span className="text-muted-foreground">Moisture:</span>
                          <span className="font-semibold">{zone.moisture}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-green-500" />
                          <span className="text-muted-foreground">pH:</span>
                          <span className="font-semibold">{zone.ph}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Leaf className="w-4 h-4 text-yellow-600" />
                          <span className="text-muted-foreground">Nitrogen:</span>
                          <span className="font-semibold">{zone.nitrogen}ppm</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">Last tested:</span>
                          <span className="font-semibold">{zone.lastTested}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Soil Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Soil Layer Analysis</CardTitle>
                  <CardDescription>Visual representation of soil composition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <img src={soilCondition} alt="Soil layers" className="w-full h-48 object-cover rounded-lg" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Top Soil:</span>
                        <div className="font-semibold">Rich organic matter</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Sub Soil:</span>
                        <div className="font-semibold">Clay with minerals</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Depth:</span>
                        <div className="font-semibold">45cm analyzed</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Drainage:</span>
                        <div className="font-semibold">Moderate drainage</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>AI-powered soil management suggestions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                      <h4 className="font-semibold text-destructive mb-1">High Priority</h4>
                      <p className="text-sm text-muted-foreground">
                        Apply nitrogen fertilizer to North and South fields. Current levels are below optimal range.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                      <h4 className="font-semibold text-warning mb-1">Medium Priority</h4>
                      <p className="text-sm text-muted-foreground">
                        Monitor moisture levels in East field. Consider adjusting irrigation schedule.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                      <h4 className="font-semibold text-success mb-1">Maintenance</h4>
                      <p className="text-sm text-muted-foreground">
                        pH levels are optimal across all fields. Continue current soil management practices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* AI Soil Chatbot */}
      <SoilChatbot soilData={currentSoilData} />
    </SidebarProvider>
  );
};

const Soil = () => {
  return (
    <ChatbotProvider>
      <SoilContent />
    </ChatbotProvider>
  );
};

export default Soil;