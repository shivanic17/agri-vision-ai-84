import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavLink, Link } from "react-router-dom";
import { 
  Home, Sprout, Globe, Bug, BarChart3, Settings, Bell, 
  Droplets, Thermometer, Activity, AlertTriangle, CheckCircle2, 
  ArrowUp, ArrowDown, TrendingUp, Leaf, MapPin, MessageCircle
} from "lucide-react";
import cropHealth from "@/assets/crop-health.jpg";
import soilCondition from "@/assets/soil-condition.jpg";
import SoilChatbot from "@/components/SoilChatbot";
import { ChatbotProvider, useChatbot } from "@/components/shared/ChatbotProvider";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useDashboardTTS } from "@/hooks/useDashboardTTS";

const DashboardContent = () => {
  const { toggleChatbot } = useChatbot();
  const { t } = useLanguage();
  const { speakText } = useDashboardTTS();

  const sidebarItems = [
    { title: t('nav.dashboard'), url: "/dashboard", icon: Home },
    { title: t('nav.cropHealth'), url: "/dashboard/crops", icon: Sprout },
    { title: t('nav.soilCondition'), url: "/dashboard/soil", icon: Globe },
    { title: t('nav.pestRisks'), url: "/dashboard/pests", icon: Bug },
    { title: t('nav.aiAssistant'), url: "#", icon: MessageCircle, action: "chatbot" },
    { title: t('nav.reports'), url: "/reports", icon: BarChart3 },
    { title: t('nav.settings'), url: "/dashboard/settings", icon: Settings },
  ];

  const cropZones = [
    { id: 1, name: "North Field", health: "healthy", status: "Good", trend: "up", acres: 45 },
    { id: 2, name: "South Field", health: "warning", status: "Stressed", trend: "down", acres: 32 },
    { id: 3, name: "East Field", health: "healthy", status: "Excellent", trend: "up", acres: 28 },
    { id: 4, name: "West Field", health: "critical", status: "Disease", trend: "down", acres: 38 },
  ];

  const soilMetrics = [
    { label: t('soil.moisture'), value: "68%", status: "optimal", icon: Droplets },
    { label: t('soil.temperature'), value: "24°C", status: "good", icon: Thermometer },
    { label: t('soil.phLevel'), value: "6.8", status: "optimal", icon: Activity },
    { label: t('soil.nitrogen'), value: "42ppm", status: "low", icon: Leaf },
  ];

  const pestAlerts = [
    { id: 1, type: "Aphid", severity: "high", zone: "South Field", detected: "2 hours ago" },
    { id: 2, type: "Cutworm", severity: "medium", zone: "West Field", detected: "1 day ago" },
    { id: 3, type: "Spider Mite", severity: "low", zone: "North Field", detected: "3 days ago" },
  ];

  const aiRecommendations = [
    { id: 1, action: "Increase irrigation in South Field", priority: "high", icon: Droplets },
    { id: 2, action: "Apply nitrogen fertilizer to West Field", priority: "medium", icon: Leaf },
    { id: 3, action: "Scout for aphids in affected zones", priority: "high", icon: Bug },
    { id: 4, action: "Monitor soil temperature trends", priority: "low", icon: Thermometer },
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case "healthy": return "text-success";
      case "warning": return "text-warning";
      case "critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getHealthBadge = (health: string) => {
    switch (health) {
      case "healthy": return <Badge className="bg-success/10 text-success border-success/20">{t('status.healthy')}</Badge>;
      case "warning": return <Badge className="bg-warning/10 text-warning border-warning/20">{t('status.warning')}</Badge>;
      case "critical": return <Badge className="bg-destructive/10 text-destructive border-destructive/20">{t('status.critical')}</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-destructive bg-destructive/5";
      case "medium": return "border-l-warning bg-warning/5";
      case "low": return "border-l-success bg-success/5";
      default: return "border-l-muted";
    }
  };

  // Soil data for the AI chatbot
  const currentSoilData = {
    moisture: 68,
    temperature: 24,
    ph: 6.8,
    nitrogen: 42,
    phosphorus: 28,
    potassium: 156
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        {/* Sidebar */}
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

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white border-b border-border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-foreground" data-tts-announce>{t('dashboard.title')}</h1>
                  <p className="text-muted-foreground" data-tts-announce>{t('dashboard.subtitle')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  {t('dashboard.alerts')}
                </Button>
                <Button asChild>
                  <Link to="/reports">{t('dashboard.viewReports')}</Link>
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground card-title">{t('dashboard.totalArea')}</CardTitle>
                  <div className="flex items-center space-x-2" data-tts-announce>
                    <span className="text-2xl font-bold text-foreground metric-value">143</span>
                    <span className="text-sm text-muted-foreground">acres</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-success">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    <span>5% from last season</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground card-title">{t('dashboard.healthyCrops')}</CardTitle>
                  <div className="flex items-center space-x-2" data-tts-announce>
                    <span className="text-2xl font-bold text-foreground metric-value">78%</span>
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-success">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>12% improvement</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground card-title">{t('dashboard.activeAlerts')}</CardTitle>
                  <div className="flex items-center space-x-2" data-tts-announce>
                    <span className="text-2xl font-bold text-foreground metric-value">3</span>
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-warning">
                    <ArrowDown className="w-4 h-4 mr-1" />
                    <span>2 from yesterday</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground card-title">{t('dashboard.avgYield')}</CardTitle>
                  <div className="flex items-center space-x-2" data-tts-announce>
                    <span className="text-2xl font-bold text-foreground metric-value">85%</span>
                    <span className="text-sm text-muted-foreground">capacity</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-success">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    <span>3% increase</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Crop Health Panel */}
              <Card className="lg:col-span-2 shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Sprout className="w-5 h-5 text-primary" />
                        Crop Health Status
                      </CardTitle>
                      <CardDescription>Real-time health monitoring across all field zones</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cropZones.map((zone) => (
                      <div key={zone.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-smooth">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <img src={cropHealth} alt="Crop" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              {zone.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">{zone.acres} acres</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {getHealthBadge(zone.health)}
                          <div className="flex items-center text-sm">
                            {zone.trend === "up" ? (
                              <ArrowUp className="w-4 h-4 text-success" />
                            ) : (
                              <ArrowDown className="w-4 h-4 text-destructive" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Soil Conditions */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-secondary" />
                    Soil Conditions
                  </CardTitle>
                  <CardDescription>Current soil metrics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {soilMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <metric.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{metric.label}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold">{metric.value}</span>
                          <Badge 
                            variant={metric.status === "optimal" ? "default" : metric.status === "good" ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {metric.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <img src={soilCondition} alt="Soil layers" className="w-full h-24 object-cover rounded-md" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pest Risk Alerts */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bug className="w-5 h-5 text-warning" />
                    Pest Risk Alerts
                  </CardTitle>
                  <CardDescription>Recent pest detection and risk assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pestAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div>
                          <h4 className="font-medium text-foreground">{alert.type}</h4>
                          <p className="text-sm text-muted-foreground">{alert.zone} • {alert.detected}</p>
                        </div>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    AI Recommendations
                  </CardTitle>
                  <CardDescription>Smart farming suggestions based on current data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiRecommendations.map((rec) => (
                      <div key={rec.id} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(rec.priority)}`}>
                        <div className="flex items-start space-x-3">
                          <rec.icon className="w-4 h-4 mt-0.5 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{rec.action}</p>
                            <p className="text-xs text-muted-foreground mt-1">Priority: {rec.priority}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* AI Soil Chatbot */}
      <SoilChatbot 
        soilData={currentSoilData} 
        cropData={{ totalFields: 4, avgHealthScore: 78, ndviAverage: 0.69, fieldsAtRisk: 2 }}
        pestData={{ activeAlerts: 3, recentPests: ['Aphid', 'Cutworm', 'Spider Mite'], riskLevel: 'medium' }}
      />
    </SidebarProvider>
  );
};

const Dashboard = () => {
  return (
    <LanguageProvider>
      <ChatbotProvider>
        <DashboardContent />
      </ChatbotProvider>
    </LanguageProvider>
  );
};

export default Dashboard;