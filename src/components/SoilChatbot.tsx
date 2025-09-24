import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  X, 
  Minimize2, 
  Maximize2,
  Sprout,
  Droplets,
  Activity,
  Leaf,
  Bug
} from "lucide-react";
import { useChatbot } from "@/components/shared/ChatbotProvider";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface SoilData {
  moisture: number;
  temperature: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

interface CropData {
  totalFields: number;
  avgHealthScore: number;
  ndviAverage: number;
  fieldsAtRisk: number;
}

interface PestData {
  activeAlerts: number;
  recentPests: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

interface AgriChatbotProps {
  soilData: SoilData;
  cropData?: CropData;
  pestData?: PestData;
}

const SoilChatbot = ({ soilData, cropData, pestData }: AgriChatbotProps) => {
  const { isOpen: isChatbotOpen, openChatbot, closeChatbot } = useChatbot();
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hi, I'm AgriBot — your AI farming assistant! 🌾

I've analyzed your current farm data and I'm here to help optimize your operations:

🌱 **Farm Overview:**
• Crop Health: ${cropData?.avgHealthScore || 78}% average
• Soil Moisture: ${soilData.moisture}% (${soilData.moisture > 65 ? 'Optimal' : soilData.moisture > 45 ? 'Good' : 'Low'})
• Active Alerts: ${pestData?.activeAlerts || 3} pest/disease alerts
• Fields at Risk: ${cropData?.fieldsAtRisk || 2} requiring attention

How can I help you today? Ask me about crop health, soil conditions, pest management, or general farming recommendations!`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Default farm data
    const defaultCropData = cropData || { totalFields: 4, avgHealthScore: 78, ndviAverage: 0.69, fieldsAtRisk: 2 };
    const defaultPestData = pestData || { activeAlerts: 3, recentPests: ['Aphid', 'Cutworm', 'Spider Mite'], riskLevel: 'medium' as const };
    
    // Analyze current soil conditions
    const issues = [];
    const recommendations = [];
    
    if (soilData.nitrogen < 40) {
      issues.push("low nitrogen levels");
      recommendations.push("Apply nitrogen-rich fertilizer or compost");
    }
    
    if (soilData.moisture < 50) {
      issues.push("low soil moisture");
      recommendations.push("Increase irrigation frequency");
    }
    
    if (soilData.ph < 6.5 || soilData.ph > 7.0) {
      issues.push("pH imbalance");
      recommendations.push(soilData.ph < 6.5 ? "Add lime to raise pH" : "Add sulfur to lower pH");
    }

    // Context-aware responses
    if (message.includes('nitrogen') || message.includes('fertilizer')) {
      return `🌿 **Nitrogen Analysis:**

Your current nitrogen level is ${soilData.nitrogen}ppm. ${soilData.nitrogen < 40 ? 'This is below optimal levels.' : 'This is within good range.'}

${soilData.nitrogen < 40 ? `**Recommendations:**
• Apply nitrogen fertilizer (urea or ammonium nitrate)
• Consider organic options like compost or manure
• Schedule application for early growing season
• Target 50-60ppm for optimal crop growth` : 
`**Maintenance:**
• Monitor levels monthly
• Maintain current fertilization schedule
• Consider slow-release options for steady nutrition`}`;
    }
    
    if (message.includes('moisture') || message.includes('water') || message.includes('irrigation')) {
      return `💧 **Moisture Management:**

Current moisture level: ${soilData.moisture}%

${soilData.moisture < 50 ? 
`**Action needed:** Your soil is too dry
• Increase irrigation frequency
• Apply mulch to retain moisture
• Consider drip irrigation for efficiency
• Check for drainage issues` :
soilData.moisture > 80 ?
`**Caution:** Soil may be too wet
• Reduce watering frequency
• Improve drainage
• Monitor for root rot risks` :
`**Good levels:** Continue current watering schedule
• Monitor daily during hot weather
• Adjust based on crop growth stage`}`;
    }
    
    if (message.includes('ph') || message.includes('acid') || message.includes('alkaline')) {
      return `⚖️ **pH Balance Analysis:**

Current pH: ${soilData.ph}

${soilData.ph < 6.5 ? 
`**Too acidic:** Plants may struggle with nutrient uptake
• Add agricultural lime (2-4 lbs per 100 sq ft)
• Consider wood ash for organic option
• Retest in 2-3 months` :
soilData.ph > 7.0 ?
`**Too alkaline:** May limit nutrient availability
• Add sulfur or organic matter
• Use acidifying fertilizers
• Plant acid-loving cover crops` :
`**Perfect range:** Optimal for most crops
• Maintain with balanced fertilizers
• Monitor monthly during growing season`}`;
    }
    
    if (message.includes('recommendation') || message.includes('suggest') || message.includes('help')) {
      if (recommendations.length > 0) {
        return `🎯 **Priority Recommendations:**

Based on your soil analysis, here's what I suggest:

${recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

**Timeline:**
• Immediate: Address moisture and pH issues
• This week: Apply needed fertilizers
• Monthly: Monitor and adjust as needed

Would you like specific guidance on any of these recommendations?`;
      } else {
        return `✅ **Great News!**

Your soil conditions are looking good! Here's how to maintain them:

• Continue current fertilization schedule
• Monitor moisture levels weekly
• Test soil monthly during growing season
• Maintain pH with balanced amendments

Is there a specific aspect you'd like to focus on?`;
      }
    }

    // Crop Health Analysis
    if (message.includes('crop') || message.includes('health') || message.includes('plant') || message.includes('field')) {
      const healthStatus = defaultCropData.avgHealthScore >= 80 ? 'Excellent' : 
                          defaultCropData.avgHealthScore >= 60 ? 'Good' : 'Needs Attention';
      
      return `🌱 **Crop Health Analysis:**

**Overall Status:** ${healthStatus} (${defaultCropData.avgHealthScore}% average)
**Total Fields:** ${defaultCropData.totalFields}
**NDVI Index:** ${defaultCropData.ndviAverage}
**Fields at Risk:** ${defaultCropData.fieldsAtRisk}

${defaultCropData.avgHealthScore >= 80 ? 
`**Great Performance!**
• Continue current management practices
• Monitor for seasonal changes
• Consider precision agriculture for optimization` :
defaultCropData.avgHealthScore >= 60 ?
`**Room for Improvement:**
• Focus on underperforming fields
• Check nutrient levels and irrigation
• Consider disease/pest prevention measures` :
`**Immediate Action Needed:**
• Inspect fields showing stress symptoms
• Test soil conditions and nutrient levels
• Implement targeted treatment plans
• Consider crop rotation strategies`}

Would you like specific recommendations for individual fields?`;
    }

    // Pest Management
    if (message.includes('pest') || message.includes('bug') || message.includes('disease') || message.includes('alert')) {
      const riskColor = defaultPestData.riskLevel === 'high' ? '🔴' : 
                       defaultPestData.riskLevel === 'medium' ? '🟡' : '🟢';
      
      return `🐛 **Pest Risk Assessment:**

**Current Risk Level:** ${riskColor} ${defaultPestData.riskLevel.toUpperCase()}
**Active Alerts:** ${defaultPestData.activeAlerts}
**Recent Detections:** ${defaultPestData.recentPests.join(', ')}

**Immediate Actions:**
${defaultPestData.riskLevel === 'high' ? 
`• Deploy targeted treatments immediately
• Increase field monitoring frequency
• Apply preventive measures to healthy areas
• Consider biological control methods` :
defaultPestData.riskLevel === 'medium' ?
`• Monitor affected areas closely
• Prepare treatment options
• Check pest population thresholds
• Implement integrated pest management` :
`• Continue regular monitoring
• Maintain preventive measures
• Update pest management calendar
• Review and optimize current practices`}

**Weather Impact:** Check upcoming weather conditions that may affect pest activity.

Need help with specific pest identification or treatment protocols?`;
    }

    // General Farming Recommendations
    if (message.includes('recommendation') || message.includes('suggest') || message.includes('help') || message.includes('advice')) {
      const priorities = [];
      
      if (soilData.nitrogen < 40) priorities.push("Address nitrogen deficiency");
      if (soilData.moisture < 50) priorities.push("Improve irrigation management");
      if (defaultCropData.fieldsAtRisk > 0) priorities.push("Focus on underperforming fields");
      if (defaultPestData.activeAlerts > 2) priorities.push("Implement pest control measures");
      
      return `🎯 **Smart Farming Recommendations:**

**Priority Actions (Next 7 days):**
${priorities.length > 0 ? priorities.map((p, i) => `${i + 1}. ${p}`).join('\n') : '✅ All systems performing well!'}

**Seasonal Strategies:**
• **Soil Management:** Regular testing, organic matter addition
• **Crop Rotation:** Plan for next season to break pest/disease cycles  
• **Technology Integration:** Consider IoT sensors for real-time monitoring
• **Sustainable Practices:** Implement cover crops and companion planting

**Productivity Boosters:**
• Precision fertilizer application based on soil zones
• Weather-based irrigation scheduling  
• Early detection systems for pests and diseases
• Data-driven planting and harvest timing

**Weekly Tasks:**
• Monitor crop development stages
• Check irrigation system efficiency
• Scout for pest and disease symptoms
• Review weather forecasts for planning

Want detailed guidance on any specific area?`;
    }

    if (message.includes('weather') || message.includes('forecast') || message.includes('climate')) {
      return `🌤️ **Weather-Based Recommendations:**

**Current Conditions Impact:**
• Soil temperature optimal for nutrient uptake
• Moisture levels suggest ${soilData.moisture > 65 ? 'reduce irrigation this week' : 'maintain current irrigation schedule'}

**7-Day Planning:**
• **Days 1-3:** Monitor for temperature fluctuations affecting pest activity
• **Days 4-7:** Prepare for potential weather stress on crops

**Seasonal Adjustments:**
• Adjust irrigation based on upcoming precipitation
• Plan field activities around weather windows
• Protect crops from extreme weather events

**Climate Adaptation:**
• Consider drought-resistant crop varieties
• Implement water conservation techniques
• Plan for changing growing seasons

Check local weather forecasts and adjust farm operations accordingly!`;
    }
    
    // Default response with comprehensive analysis
    return `🤖 **AgriBot Analysis:**

I've analyzed your question and here's what I found:

**Farm Health Overview:**
• Crop Performance: ${defaultCropData.avgHealthScore}% ${defaultCropData.avgHealthScore > 75 ? '✅' : '⚠️'}
• Soil Health: ${issues.length === 0 ? 'Good' : 'Needs attention'} ${issues.length === 0 ? '✅' : '⚠️'}
• Pest Status: ${defaultPestData.riskLevel} risk ${defaultPestData.riskLevel === 'low' ? '✅' : '⚠️'}

**Current Issues:** ${issues.length > 0 ? issues.join(', ') : 'No major issues detected'}

**Quick Topics:**
• Ask about "crop health" for field analysis
• Ask about "pest alerts" for risk assessment  
• Ask about "soil conditions" for detailed metrics
• Ask about "recommendations" for action items

How can I help optimize your farming operations?`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: generateAIResponse(inputMessage),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isChatbotOpen) {
    return (
      <Button
        onClick={openChatbot}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg gradient-hero hover:shadow-glow hover-scale transition-smooth z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-card border-border shadow-card z-50 transition-smooth animate-scale-in ${
      isMinimized ? 'h-16' : 'h-[32rem]'
    } sm:w-96 xs:w-[calc(100vw-1.5rem)] xs:right-3 xs:bottom-3`}>
      <CardHeader className="pb-3 bg-gradient-hero text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-lg">AgriBot Assistant</CardTitle>
            <Badge className="bg-white/20 text-white border-white/30">
              <Sprout className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeChatbot}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(32rem-4rem)]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 animate-fade-in">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex animate-fade-in ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 shadow-sm transition-smooth hover:shadow-md ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-8 xs:ml-4'
                        : 'bg-muted text-muted-foreground mr-8 xs:mr-4'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' ? 'bg-white/20' : 'bg-primary/10'
                      }`}>
                        {message.type === 'user' ? 
                          <User className="w-3 h-3" /> : 
                          <Bot className="w-3 h-3 text-primary" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm whitespace-pre-wrap break-words">{message.content}</div>
                        <div className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border bg-muted/30">
            <div className="flex space-x-2 mb-3">
              <Input
                placeholder="Ask me about crops, soil, pests, or farming tips..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm"
              />
              <Button onClick={handleSendMessage} size="icon" className="gradient-hero hover-scale">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 xs:grid-cols-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setInputMessage("Show crop health status")}
                className="text-xs justify-start"
              >
                <Sprout className="w-3 h-3 mr-1" />
                Crop Health
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setInputMessage("Check soil conditions")}
                className="text-xs justify-start"
              >
                <Activity className="w-3 h-3 mr-1" />
                Soil Stats
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setInputMessage("Show pest alerts")}
                className="text-xs justify-start"
              >
                <Bug className="w-3 h-3 mr-1" />
                Pest Alerts
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setInputMessage("Give me farming recommendations")}
                className="text-xs justify-start"
              >
                <Leaf className="w-3 h-3 mr-1" />
                Recommendations
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SoilChatbot;