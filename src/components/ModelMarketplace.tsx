import { useState } from "react";
import { Search, SlidersHorizontal, Copy, Bell, Book, CreditCard, User, ChevronDown, ChevronUp, Grid3X3, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
const qiniuLogoUrl = "https://dn-mars-assets.qbox.me/qiniulogo/img-horizontal-blue-cn.png";

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
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    publisher: "Anthropic",
    inputPrice: 3.0,
    outputPrice: 15.0,
    contextLength: "200K",
    description: "平衡性能与成本的Claude模型，适用于大多数任务",
    features: ["思维推理", "视觉输入"],
    logo: "🎭"
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    publisher: "OpenAI",
    inputPrice: 0.5,
    outputPrice: 1.5,
    contextLength: "16K",
    description: "经济实惠的GPT模型，响应快速，适合简单对话",
    features: ["工具调用"],
    logo: "⚡"
  },
  {
    id: "gemini-ultra",
    name: "Gemini Ultra",
    publisher: "Google",
    inputPrice: 5.0,
    outputPrice: 10.0,
    contextLength: "128K",
    description: "Google最强大的多模态模型，在复杂推理任务中表现卓越",
    features: ["工具调用", "视觉输入", "联网搜索", "思维推理"],
    logo: "💎"
  },
  {
    id: "qwen-max",
    name: "通义千问 Max",
    publisher: "Alibaba",
    inputPrice: 2.0,
    outputPrice: 6.0,
    contextLength: "32K",
    description: "阿里巴巴大模型，专为中文场景优化，理解力强",
    features: ["工具调用", "视觉输入"],
    logo: "🔮"
  },
  {
    id: "baichuan2-13b",
    name: "百川2-13B",
    publisher: "Baidu",
    inputPrice: 1.0,
    outputPrice: 2.0,
    contextLength: "8K",
    description: "百度开发的中文大模型，在中文理解方面表现优异",
    features: ["工具调用"],
    logo: "🌊"
  },
  {
    id: "chatglm3-6b",
    name: "ChatGLM3-6B",
    publisher: "Tsinghua",
    inputPrice: 0.0,
    outputPrice: 0.0,
    contextLength: "32K",
    description: "清华开源对话模型，支持中英双语，完全免费",
    features: ["工具调用"],
    logo: "🎓"
  },
  {
    id: "doubao-pro",
    name: "豆包 Pro",
    publisher: "ByteDance",
    inputPrice: 1.5,
    outputPrice: 3.0,
    contextLength: "64K",
    description: "字节跳动的对话AI，擅长创意写作和逻辑推理",
    features: ["工具调用", "思维推理"],
    logo: "🎪"
  },
  {
    id: "hunyuan-large",
    name: "混元大模型",
    publisher: "Tencent",
    inputPrice: 2.5,
    outputPrice: 5.0,
    contextLength: "128K",
    description: "腾讯混元大模型，多模态能力强，支持长文本理解",
    features: ["工具调用", "视觉输入", "思维推理"],
    logo: "🌀"
  }
];

const ModelMarketplace = () => {
  const { theme, setTheme } = useTheme();
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

  // Render filters content
  const FiltersContent = () => (
    <div className="space-y-8">
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
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Mobile filters trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden transition-smooth hover:bg-primary/20">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-6">
                <FiltersContent />
              </SheetContent>
            </Sheet>
            
            <img src={qiniuLogoUrl} alt="七牛云" className="h-6 sm:h-8" />
          </div>
          
          <nav className="flex items-center space-x-2 sm:space-x-6">
            <Button variant="ghost" size="sm" className="hidden sm:flex transition-smooth hover:bg-primary/20">
              <Bell className="h-4 w-4 mr-2" />
              消息
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex transition-smooth hover:bg-primary/20">
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  产品
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-card">
                <DropdownMenuItem>对象存储</DropdownMenuItem>
                <DropdownMenuItem>CDN</DropdownMenuItem>
                <DropdownMenuItem>AI服务</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" className="hidden sm:flex transition-smooth hover:bg-primary/20">
              <Book className="h-4 w-4 mr-2" />
              文档
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex transition-smooth hover:bg-primary/20">
              <CreditCard className="h-4 w-4 mr-2" />
              费用
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="transition-smooth hover:bg-primary/20"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-primary text-white text-sm">U</AvatarFallback>
            </Avatar>
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-80 glass-card m-4 p-6 rounded-2xl noise">
          <FiltersContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6 sm:mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索模型..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-card border-white/20 focus:border-primary/50 transition-smooth"
              />
            </div>
            
            <div className="flex gap-2 sm:gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 sm:w-40 glass-card border-white/20">
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
                <SelectTrigger className="w-20 sm:w-24 glass-card border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  <SelectItem value="desc">降序</SelectItem>
                  <SelectItem value="asc">升序</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Model Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {mockModels.map(model => (
              <Card key={model.id} className="glass-card p-4 sm:p-6 transition-smooth hover:glow hover:scale-[1.02] noise">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="text-xl sm:text-2xl flex-shrink-0">{model.logo}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-sm sm:text-base truncate">{model.name}</h3>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyModelId(model.id)}
                          className="h-6 w-6 p-0 hover:bg-primary/10 transition-smooth flex-shrink-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {model.publisher} / {model.inputPrice === 0 ? "免费" : `${model.inputPrice}元`} - {model.outputPrice === 0 ? "免费" : `${model.outputPrice}元`}
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                  {model.description}
                </p>
                
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {model.features.map(feature => (
                    <Badge key={feature} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-smooth text-xs">
                      {feature}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="border-muted text-muted-foreground text-xs">
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