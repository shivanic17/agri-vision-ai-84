import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Calendar, TrendingUp, Sprout, Globe, Bug, BarChart3 } from "lucide-react";

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: "Weekly Crop Health Summary",
      type: "Crop Health",
      date: "March 15, 2024",
      status: "completed",
      description: "Comprehensive analysis of crop conditions across all field zones",
      icon: Sprout,
      color: "text-success"
    },
    {
      id: 2,
      title: "Soil Analysis Report",
      type: "Soil Condition",
      date: "March 14, 2024",
      status: "completed",
      description: "Detailed soil composition and nutrient level analysis",
      icon: Globe,
      color: "text-secondary"
    },
    {
      id: 3,
      title: "Pest Risk Assessment",
      type: "Pest Management",
      date: "March 13, 2024",
      status: "completed",
      description: "Current pest threat levels and recommended interventions",
      icon: Bug,
      color: "text-warning"
    },
    {
      id: 4,
      title: "Monthly Performance Analytics",
      type: "Performance",
      date: "March 1, 2024",
      status: "completed",
      description: "Farm productivity metrics and trend analysis for February",
      icon: BarChart3,
      color: "text-primary"
    },
  ];

  const summaryStats = [
    { label: "Reports Generated", value: "48", period: "This month" },
    { label: "Avg Processing Time", value: "2.3m", period: "Last 30 days" },
    { label: "Export Downloads", value: "124", period: "This month" },
    { label: "Data Accuracy", value: "99.2%", period: "Overall" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
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
                <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
                <p className="text-muted-foreground">View and download detailed farm performance reports</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Report
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryStats.map((stat, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.period}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary opacity-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reports Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Recent Reports</h2>
            <Button variant="outline" size="sm">View All Reports</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="shadow-card hover:shadow-glow transition-smooth">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-accent">
                        <report.icon className={`w-5 h-5 ${report.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-foreground">
                          {report.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {report.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{report.date}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      className={
                        report.status === "completed" 
                          ? "bg-success/10 text-success border-success/20" 
                          : "bg-warning/10 text-warning border-warning/20"
                      }
                    >
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {report.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      Generated {report.date}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Report Categories */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Report Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-card hover:shadow-soft transition-smooth cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Sprout className="w-12 h-12 mx-auto mb-4 text-success group-hover:scale-110 transition-smooth" />
                <h3 className="font-semibold text-foreground mb-2">Crop Health</h3>
                <p className="text-sm text-muted-foreground">Monitor plant health and growth patterns</p>
                <Button variant="ghost" size="sm" className="mt-4 w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-soft transition-smooth cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Globe className="w-12 h-12 mx-auto mb-4 text-secondary group-hover:scale-110 transition-smooth" />
                <h3 className="font-semibold text-foreground mb-2">Soil Analysis</h3>
                <p className="text-sm text-muted-foreground">Analyze soil composition and nutrients</p>
                <Button variant="ghost" size="sm" className="mt-4 w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-soft transition-smooth cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Bug className="w-12 h-12 mx-auto mb-4 text-warning group-hover:scale-110 transition-smooth" />
                <h3 className="font-semibold text-foreground mb-2">Pest Management</h3>
                <p className="text-sm text-muted-foreground">Track pest risks and interventions</p>
                <Button variant="ghost" size="sm" className="mt-4 w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-soft transition-smooth cursor-pointer group">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-smooth" />
                <h3 className="font-semibold text-foreground mb-2">Performance</h3>
                <p className="text-sm text-muted-foreground">Overall farm productivity metrics</p>
                <Button variant="ghost" size="sm" className="mt-4 w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;