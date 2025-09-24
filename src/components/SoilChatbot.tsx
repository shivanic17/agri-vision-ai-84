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
  Leaf
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

interface SoilChatbotProps {
  soilData: SoilData;
}

const SoilChatbot = ({ soilData }: SoilChatbotProps) => {
  const { isOpen: isChatbotOpen, openChatbot, closeChatbot } = useChatbot();
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hello! I'm your AI soil specialist. I've analyzed your current soil conditions:
      
🌱 **Current Status:**
• Moisture: ${soilData.moisture}% (${soilData.moisture > 65 ? 'Optimal' : soilData.moisture > 45 ? 'Good' : 'Low'})
• pH: ${soilData.ph} (${soilData.ph >= 6.5 && soilData.ph <= 7.0 ? 'Optimal' : 'Needs attention'})
• Nitrogen: ${soilData.nitrogen}ppm (${soilData.nitrogen > 40 ? 'Good' : 'Low'})

How can I help you optimize your soil conditions today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
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
    
    if (message.includes('crop') || message.includes('plant')) {
      return `🌱 **Crop-Specific Guidance:**

Based on your current soil conditions, here are suitable crops:

**Excellent matches:**
• Leafy greens (lettuce, spinach, kale)
• Root vegetables (carrots, radishes)
• Herbs (basil, parsley, cilantro)

**Good with amendments:**
• Tomatoes (need higher nitrogen)
• Corn (requires more nutrients)
• Beans (fix their own nitrogen)

What crops are you planning to grow? I can provide specific soil preparation advice.`;
    }
    
    // Default response with current analysis
    return `🤖 **Soil Health Summary:**

I've analyzed your question and here's what I found:

**Current Issues:** ${issues.length > 0 ? issues.join(', ') : 'No major issues detected'}

**Key Metrics:**
• Moisture: ${soilData.moisture}% ${soilData.moisture > 65 ? '✅' : '⚠️'}
• pH: ${soilData.ph} ${soilData.ph >= 6.5 && soilData.ph <= 7.0 ? '✅' : '⚠️'}
• Nitrogen: ${soilData.nitrogen}ppm ${soilData.nitrogen > 40 ? '✅' : '⚠️'}

Try asking about specific aspects like "nitrogen levels", "moisture management", or "pH balance" for detailed guidance!`;
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
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg gradient-hero hover:shadow-glow transition-smooth z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-96 bg-card border-border shadow-card z-50 transition-smooth ${
      isMinimized ? 'h-16' : 'h-[32rem]'
    }`}>
      <CardHeader className="pb-3 bg-gradient-hero text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-lg">Soil AI Assistant</CardTitle>
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
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-12'
                        : 'bg-muted text-muted-foreground mr-12'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.type === 'user' ? 'bg-white/20' : 'bg-primary/10'
                      }`}>
                        {message.type === 'user' ? 
                          <User className="w-3 h-3" /> : 
                          <Bot className="w-3 h-3 text-primary" />
                        }
                      </div>
                      <div className="flex-1">
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
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

          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about soil conditions, fertilizers, pH levels..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon" className="gradient-hero">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex space-x-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setInputMessage("What are my soil's main issues?")}
              >
                <Activity className="w-3 h-3 mr-1" />
                Issues
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setInputMessage("How can I improve nitrogen levels?")}
              >
                <Leaf className="w-3 h-3 mr-1" />
                Nitrogen
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setInputMessage("Moisture management tips")}
              >
                <Droplets className="w-3 h-3 mr-1" />
                Water
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SoilChatbot;