import { useState } from "react";
import { Search, SlidersHorizontal, Copy, Bell, Book, CreditCard, User, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import qiniuLogo from "@/assets/qiniu-logo.png";

const mockPublishers = [
  "OpenAI", "Anthropic", "Google", "Meta", "Baidu", "Alibaba", "ByteDance", "Tencent"
];

const mockModels = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    publisher: "OpenAI",
    inputPrice: 3.0,
    outputPrice: 6.0,
    contextLength: "128K",
    description: "最新的 GPT-4 模型，具有更高的准确性和更快的响应速度",
    features: ["工具调用", "视觉输入"],
    logo: "🤖"
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    publisher: "Anthropic",
    inputPrice: 4.5,
    outputPrice: 12.0,
    contextLength: "200K",
    description: "Anthropic 最强大的语言模型，擅长复杂推理和创作",
    features: ["思维推理", "视觉输入"],
    logo: "🧠"
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    publisher: "Google",
    inputPrice: 2.0,
    outputPrice: 4.0,
    contextLength: "32K",
    description: "Google 的多模态大语言模型，支持文本和图像理解",
    features: ["工具调用", "视觉输入", "联网搜索"],
    logo: "💎"
  },
  {
    id: "llama-2-70b",
    name: "LLaMA 2 70B",
    publisher: "Meta",
    inputPrice: 0.0,
    outputPrice: 0.0,
    contextLength: "4K",
    description: "Meta 开源的大语言模型，性能强劲且完全免费",
    features: ["工具调用"],
    logo: "🦙"
  }
];

const ModelMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMorePublishers, setShowMorePublishers] = useState(false);
  const [contextLength, setContextLength] = useState([32]);
  const [inputPrice, setInputPrice] = useState([0, 6]);
  const [outputPrice, setOutputPrice] = useState([0, 24]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("time");
  const [sortOrder, setSortOrder] = useState("desc");

  const features = ["工具调用", "思维推理", "视觉输入", "联网搜索"];

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const togglePublisher = (publisher: string) => {
    setSelectedPublishers(prev => 
      prev.includes(publisher) 
        ? prev.filter(p => p !== publisher)
        : [...prev, publisher]
    );
  };

  const copyModelId = (modelId: string) => {
    navigator.clipboard.writeText(modelId);
  };

  return (
    <div className="min-h-screen bg-gradient-glow">
      {/* Header */}
      <header className="glass border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={qiniuLogo} alt="七牛云" className="h-8" />
            <span className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
              AI大模型服务
            </span>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Button variant="ghost" size="sm" className="transition-smooth hover:bg-primary/10">
              <Bell className="h-4 w-4 mr-2" />
              消息
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="transition-smooth hover:bg-primary/10">
                  产品 <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-card">
                <DropdownMenuItem>对象存储</DropdownMenuItem>
                <DropdownMenuItem>CDN</DropdownMenuItem>
                <DropdownMenuItem>AI服务</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" className="transition-smooth hover:bg-primary/10">
              <Book className="h-4 w-4 mr-2" />
              文档
            </Button>
            <Button variant="ghost" size="sm" className="transition-smooth hover:bg-primary/10">
              <CreditCard className="h-4 w-4 mr-2" />
              费用
            </Button>
            <Avatar>
              <AvatarFallback className="bg-gradient-primary text-white">U</AvatarFallback>
            </Avatar>
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 glass-card m-4 p-6 space-y-8 noise">
          <h2 className="text-lg font-semibold">模型筛选</h2>
          
          {/* Publishers */}
          <div className="space-y-4">
            <h3 className="font-medium">发行商</h3>
            <div className="space-y-2">
              {mockPublishers.slice(0, showMorePublishers ? undefined : 3).map(publisher => (
                <label key={publisher} className="flex items-center space-x-2 cursor-pointer group">
                  <Checkbox 
                    checked={selectedPublishers.includes(publisher)}
                    onCheckedChange={() => togglePublisher(publisher)}
                    className="transition-smooth group-hover:border-primary"
                  />
                  <span className="text-sm transition-smooth group-hover:text-primary">{publisher}</span>
                </label>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowMorePublishers(!showMorePublishers)}
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                {showMorePublishers ? (
                  <>收起 <ChevronUp className="h-4 w-4 ml-1" /></>
                ) : (
                  <>更多... <ChevronDown className="h-4 w-4 ml-1" /></>
                )}
              </Button>
            </div>
          </div>

          {/* Context Length */}
          <div className="space-y-4">
            <h3 className="font-medium">上下文长度</h3>
            <div className="px-2">
              <Slider
                value={contextLength}
                onValueChange={setContextLength}
                max={1024}
                min={4}
                step={4}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>4K</span>
                <span className="text-primary font-medium">{contextLength[0]}K</span>
                <span>1M</span>
              </div>
            </div>
          </div>

          {/* Input Price */}
          <div className="space-y-4">
            <h3 className="font-medium">输入价格 (元/M)</h3>
            <div className="px-2">
              <Slider
                value={inputPrice}
                onValueChange={setInputPrice}
                max={6}
                min={0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>免费</span>
                <span className="text-primary font-medium">{inputPrice[0]} - {inputPrice[1]}元</span>
                <span>6元</span>
              </div>
            </div>
          </div>

          {/* Output Price */}
          <div className="space-y-4">
            <h3 className="font-medium">输出价格 (元/M)</h3>
            <div className="px-2">
              <Slider
                value={outputPrice}
                onValueChange={setOutputPrice}
                max={24}
                min={0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>免费</span>
                <span className="text-primary font-medium">{outputPrice[0]} - {outputPrice[1]}元</span>
                <span>24元</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-medium">功能</h3>
            <div className="space-y-3">
              {features.map(feature => (
                <label key={feature} className="flex items-center space-x-2 cursor-pointer group">
                  <Checkbox 
                    checked={selectedFeatures.includes(feature)}
                    onCheckedChange={() => toggleFeature(feature)}
                    className="transition-smooth group-hover:border-primary"
                  />
                  <span className="text-sm transition-smooth group-hover:text-primary">{feature}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Search and Sort */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索模型..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-card border-white/20 focus:border-primary/50 transition-smooth"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 glass-card border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card">
                <SelectItem value="time">按时间</SelectItem>
                <SelectItem value="input-price">按输入价格</SelectItem>
                <SelectItem value="output-price">按输出价格</SelectItem>
                <SelectItem value="context">按上下文长度</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-24 glass-card border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card">
                <SelectItem value="desc">降序</SelectItem>
                <SelectItem value="asc">升序</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Model Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockModels.map(model => (
              <Card key={model.id} className="glass-card p-6 transition-smooth hover:glow hover:scale-[1.02] noise">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{model.logo}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{model.name}</h3>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyModelId(model.id)}
                          className="h-6 w-6 p-0 hover:bg-primary/10 transition-smooth"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {model.publisher} / {model.inputPrice === 0 ? "免费" : `${model.inputPrice}元`} - {model.outputPrice === 0 ? "免费" : `${model.outputPrice}元`}
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {model.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {model.features.map(feature => (
                    <Badge key={feature} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-smooth">
                      {feature}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="border-muted text-muted-foreground">
                    {model.contextLength}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModelMarketplace;