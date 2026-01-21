import { useState, useEffect } from 'react';
import { Smartphone, Power, Radio, Bell, TrendingUp, Shield, Languages, Calendar, Heart, Phone, Shirt } from 'lucide-react';
import { BluetoothStatus } from '@/app/components/BluetoothStatus';
import { PhoneDiagnostics } from '@/app/components/PhoneDiagnostics';
import { AppControl } from '@/app/components/AppControl';
import { ChatInterface } from '@/app/components/ChatInterface';
import { AICapabilities } from '@/app/components/AICapabilities';
import { SocialMediaNotifications } from '@/app/components/SocialMediaNotifications';
import { TrendingNews } from '@/app/components/TrendingNews';
import { CCTVMonitoring } from '@/app/components/CCTVMonitoring';
import { LanguageTranslation } from '@/app/components/LanguageTranslation';
import { DailyRoutineManager } from '@/app/components/DailyRoutineManager';
import { SmartCalendar } from '@/app/components/SmartCalendar';
import { MenstrualCycleTracker } from '@/app/components/MenstrualCycleTracker';
import { FashionAdvisor } from '@/app/components/FashionAdvisor';
import { CallManager } from '@/app/components/CallManager';
import { AIOnboarding } from '@/app/components/AIOnboarding';
import { LifeManagement } from '@/app/components/LifeManagement';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { toast } from 'sonner';
import { Toaster } from '@/app/components/ui/sonner';
import { Battery, HardDrive, Cpu, Signal, Clock, Utensils, Dumbbell, Briefcase, GraduationCap, Sun, Moon, Gift, Stethoscope, MapPin, Star } from 'lucide-react';
import { useSpeech } from '@/app/hooks/useSpeech';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface SocialNotification {
  id: string;
  platform: 'whatsapp' | 'instagram' | 'twitter' | 'facebook';
  sender: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface TrendingItem {
  id: string;
  title: string;
  category: string;
  source: string;
  trending: number;
  language: string;
}

interface CCTVAlert {
  id: string;
  location: 'home' | 'work';
  type: 'unknown_person' | 'unusual_activity' | 'motion_detected' | 'all_clear';
  description: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  imageUrl?: string;
}

interface CCTVCamera {
  id: string;
  name: string;
  location: 'home' | 'work';
  status: 'online' | 'offline';
  lastMotion?: Date;
}

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [bluetoothDevice, setBluetoothDevice] = useState<any>(null);
  
  // Initialize Speech APIs
  const speech = useSpeech();
  
  // Play welcome sound on mount
  useEffect(() => {
    speech.playNotificationSound('success');
    // Auto-speak the first message after a delay
    setTimeout(() => {
      const firstMessage = messages[0];
      if (firstMessage) {
        speech.speak(firstMessage.text, currentLanguage);
      }
    }, 1000);
  }, []);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI life companion. I'll learn about you, manage your daily routine, track your health, remind you of important dates, give fashion advice, handle calls, and be here whenever you need to talk. Let's get started!",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  const [socialNotifications, setSocialNotifications] = useState<SocialNotification[]>([
    {
      id: '1',
      platform: 'whatsapp',
      sender: 'Mom',
      message: '¿Llegaste bien a casa? (Did you get home safely?)',
      timestamp: new Date(Date.now() - 300000),
      read: false,
    },
    {
      id: '2',
      platform: 'instagram',
      sender: '@friend_sarah',
      message: 'Loved your latest post! We should catch up soon 🎉',
      timestamp: new Date(Date.now() - 600000),
      read: false,
    },
    {
      id: '3',
      platform: 'twitter',
      sender: '@tech_news',
      message: 'You were mentioned in a conversation about AI assistants',
      timestamp: new Date(Date.now() - 900000),
      read: false,
    },
  ]);

  const [trendingTopics, setTrendingTopics] = useState<TrendingItem[]>([
    {
      id: '1',
      title: 'New AI Breakthroughs in Healthcare Technology',
      category: 'Technology',
      source: 'Tech Today',
      trending: 45000,
      language: 'en',
    },
    {
      id: '2',
      title: 'Global Climate Summit Announces Major Policy Changes',
      category: 'Environment',
      source: 'World News',
      trending: 38000,
      language: 'en',
    },
    {
      id: '3',
      title: 'Smartphone Security: New Bluetooth Vulnerabilities Found',
      category: 'Security',
      source: 'CyberWatch',
      trending: 32000,
      language: 'en',
    },
    {
      id: '4',
      title: 'Stock Markets React to Tech Innovation Wave',
      category: 'Finance',
      source: 'Market Insider',
      trending: 28000,
      language: 'en',
    },
  ]);

  const [cctvAlerts, setCctvAlerts] = useState<CCTVAlert[]>([
    {
      id: '1',
      location: 'home',
      type: 'unknown_person',
      description: 'Unknown person detected at front door. Not recognized in database.',
      timestamp: new Date(Date.now() - 1200000),
      severity: 'high',
      imageUrl: 'https://images.unsplash.com/photo-1767059439630-ca3844d07d77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwc2VjdXJpdHklMjBtb25pdG9yaW5nfGVufDF8fHx8MTc2ODgzOTczNnww&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: '2',
      location: 'work',
      type: 'unusual_activity',
      description: 'Motion detected in office after hours (10:45 PM)',
      timestamp: new Date(Date.now() - 3600000),
      severity: 'medium',
      imageUrl: 'https://images.unsplash.com/photo-1672073311074-f60c4a5e7b92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGNhbWVyYSUyMHN1cnZlaWxsYW5jZXxlbnwxfHx8fDE3Njg3NzEzNTN8MA&ixlib=rb-4.1.0&q=80&w=400',
    },
  ]);

  const [cctvCameras] = useState<CCTVCamera[]>([
    {
      id: 'c1',
      name: 'Front Door',
      location: 'home',
      status: 'online',
      lastMotion: new Date(Date.now() - 1200000),
    },
    {
      id: 'c2',
      name: 'Backyard',
      location: 'home',
      status: 'online',
      lastMotion: new Date(Date.now() - 7200000),
    },
    {
      id: 'c3',
      name: 'Garage',
      location: 'home',
      status: 'online',
    },
    {
      id: 'c4',
      name: 'Main Office',
      location: 'work',
      status: 'online',
      lastMotion: new Date(Date.now() - 3600000),
    },
    {
      id: 'c5',
      name: 'Reception',
      location: 'work',
      status: 'online',
    },
  ]);

  const [diagnostics] = useState([
    { label: 'Battery Health', value: 85, status: 'good' as const, icon: Battery, unit: '%' },
    { label: 'Storage Available', value: 45, status: 'warning' as const, icon: HardDrive, unit: '%' },
    { label: 'CPU Performance', value: 92, status: 'good' as const, icon: Cpu, unit: '%' },
    { label: 'Signal Strength', value: 75, status: 'good' as const, icon: Signal, unit: '%' },
  ]);

  const [alerts] = useState([
    'Storage is running low. Consider backing up photos and clearing cache.',
    'Battery health has decreased by 5% in the last month. Service may be needed soon.',
  ]);

  // Language greetings
  const languageGreetings: Record<string, string> = {
    en: "Hello! How can I assist you today?",
    es: "¡Hola! ¿Cómo puedo ayudarte hoy?",
    fr: "Bonjour! Comment puis-je vous aider aujourd'hui?",
    de: "Hallo! Wie kann ich Ihnen heute helfen?",
    zh: "你好！我今天能帮你什么？",
    ja: "こんにちは！今日はどのようにお手伝いできますか？",
    ar: "مرحبا! كيف يمكنني مساعدتك اليوم؟",
    hi: "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूं?",
    pt: "Olá! Como posso ajudá-lo hoje?",
    ru: "Привет! Чем я могу помочь вам сегодня?",
  };

  const handleConnect = async () => {
    if (!isConnected) {
      toast.loading('Connecting to device via Bluetooth...');
      speech.playNotificationSound('listen');
      
      setTimeout(() => {
        setIsConnected(true);
        setDeviceName('iPhone 15 Pro');
        speech.playNotificationSound('success');
        toast.success('Successfully connected to your device!');
        speech.speak('Successfully connected to your device!', currentLanguage);
      }, 2000);
    } else {
      setIsConnected(false);
      setDeviceName('');
      speech.playNotificationSound('complete');
      toast.info('Disconnected from device');
    }
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    const greeting = languageGreetings[language] || languageGreetings.en;
    speech.playNotificationSound('success');
    toast.success(`Language changed! ${greeting}`);
    
    const aiMessage: Message = {
      id: Date.now().toString(),
      text: `Language updated to ${language.toUpperCase()}. ${greeting}`,
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);
    
    // Speak in the new language
    speech.speak(greeting, language);
  };

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';

      const lowerText = text.toLowerCase();

      if (lowerText.includes('social') || lowerText.includes('message') || lowerText.includes('notification')) {
        const unreadCount = socialNotifications.filter(n => !n.read).length;
        aiResponse = `You have ${unreadCount} unread social media messages. Would you like me to read them to you or respond automatically?`;
      } else if (lowerText.includes('trending') || lowerText.includes('news') || lowerText.includes('what\'s happening')) {
        aiResponse = `Top trending now: \"${trendingTopics[0].title}\" with ${trendingTopics[0].trending.toLocaleString()} mentions. Would you like to hear more trending topics?`;
      } else if (lowerText.includes('home') || lowerText.includes('security') || lowerText.includes('cctv') || lowerText.includes('camera')) {
        const homeAlerts = cctvAlerts.filter(a => a.location === 'home');
        if (homeAlerts.length > 0) {
          aiResponse = `⚠️ ALERT: ${homeAlerts[0].description} I've captured the footage. Would you like me to show you or call the authorities?`;
        } else {
          aiResponse = 'All cameras at home are online and no unusual activity detected. Your home is secure! 🏠✅';
        }
      } else if (lowerText.includes('work') || lowerText.includes('office')) {
        const workAlerts = cctvAlerts.filter(a => a.location === 'work');
        if (workAlerts.length > 0) {
          aiResponse = `⚠️ ALERT: ${workAlerts[0].description} This is unusual. Should I notify security?`;
        } else {
          aiResponse = 'All cameras at work are functioning normally. No alerts. 🏢✅';
        }
      } else if (lowerText.includes('translate')) {
        aiResponse = `I can translate between ${Object.keys(languageGreetings).length}+ languages! Just tell me what you want translated and to which language.`;
      } else if (lowerText.includes('battery') || lowerText.includes('charge')) {
        aiResponse = "Your battery is at 85% health and currently at 67% charge. That's pretty good! I recommend avoiding extreme temperatures to maintain battery health.";
      } else if (lowerText.includes('storage') || lowerText.includes('space')) {
        aiResponse = "You have 45% storage available. I've detected 2.3GB of cache that can be cleared. Would you like me to help clean up your storage?";
      } else if (lowerText.includes('repair') || lowerText.includes('fix')) {
        aiResponse = "Based on diagnostics, your phone is functioning well. However, I've noticed the battery health declining. If it drops below 80%, I'd recommend getting it serviced at an authorized center.";
      } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
        aiResponse = languageGreetings[currentLanguage] || "Hello! I'm always here for you.";
      } else {
        aiResponse = `I understand. I can help with: 📱 Social media messages, 📰 Trending news, 🎥 Security monitoring, 🌐 Translation, 📊 Phone diagnostics, and 💬 Companionship. What interests you?`;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      
      // Speak the AI response with sound
      speech.playNotificationSound('speak');
      speech.speak(aiResponse, currentLanguage);
    }, 1000);
  };

  const handleVoiceInput = () => {
    if (!speech.isSupported) {
      toast.error('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }
    
    setIsListening(true);
    toast.info('🎤 Listening... Speak now!');
    
    speech.listen(
      (transcript) => {
        setIsListening(false);
        toast.success(`You said: "${transcript}"`);
        handleSendMessage(transcript);
      },
      (error) => {
        setIsListening(false);
        toast.error('Could not recognize speech. Please try again.');
        console.error('Speech recognition error:', error);
      }
    );
  };

  const handleAppLaunch = (appName: string) => {
    if (!isConnected) {
      toast.error('Please connect to your device first');
      return;
    }
    toast.success(`Launching ${appName} on your phone...`);

    const aiMessage: Message = {
      id: Date.now().toString(),
      text: `I've opened ${appName} on your phone. Is there anything specific you'd like me to do with it?`,
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleSocialReply = (id: string, message: string, auto: boolean) => {
    const notification = socialNotifications.find(n => n.id === id);
    if (!notification) return;

    setSocialNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));

    if (auto) {
      toast.success(`AI replied to ${notification.sender} automatically`);
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: `I've sent an intelligent auto-reply to ${notification.sender} on ${notification.platform}. The message was contextual and friendly based on their message.`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } else {
      toast.success(`Reply sent to ${notification.sender}`);
    }
  };

  const handleDismissNotification = (id: string) => {
    setSocialNotifications(prev => prev.filter(n => n.id !== id));
    toast.info('Notification dismissed');
  };

  const handleViewFootage = (alertId: string) => {
    const alert = cctvAlerts.find(a => a.id === alertId);
    if (alert) {
      toast.info(`Loading ${alert.location} camera footage...`);
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: `I'm pulling up the footage from ${alert.location}. The incident occurred at ${alert.timestamp.toLocaleTimeString()}. Would you like me to save this footage or share it with security?`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }
  };

  const handleDismissAlert = (alertId: string) => {
    setCctvAlerts(prev => prev.filter(a => a.id !== alertId));
    toast.info('Alert dismissed');
  };

  const handleOnboardingComplete = (data: any) => {
    setUserProfile(data);
    setShowOnboarding(false);
    toast.success(`Welcome ${data.name}! I'm ready to be your life companion! 🎉`);
    
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `Great to meet you, ${data.name}! I've learned about your preferences and I'm here to help manage your life. Click on the "Life 📅" tab to see your personalized dashboard with daily routines, calendar, ${data.gender === 'female' && data.cycleTracking ? 'cycle tracking, ' : ''}fashion advice, and more!`,
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, welcomeMessage]);
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    setUserProfile({ name: 'User', gender: 'other', cycleTracking: false });
    toast.info('You can always set up your profile later in settings.');
  };

  const unreadNotifications = socialNotifications.filter(n => !n.read).length;
  const activeAlerts = cctvAlerts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Toaster position="top-center" />
      
      {/* AI Onboarding Modal */}
      {showOnboarding && (
        <AIOnboarding 
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
      
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold">AI Phone Companion</h1>
                <p className="text-xs text-gray-500">Your intelligent mobile assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {activeAlerts > 0 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {activeAlerts} Security Alert{activeAlerts > 1 ? 's' : ''}
                </Badge>
              )}
              <Button
                onClick={handleConnect}
                variant={isConnected ? 'outline' : 'default'}
                className="gap-2"
              >
                {isConnected ? (
                  <>
                    <Power className="w-4 h-4" />
                    Disconnect
                  </>
                ) : (
                  <>
                    <Radio className="w-4 h-4" />
                    Connect Bluetooth
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Bluetooth Status */}
          <BluetoothStatus isConnected={isConnected} deviceName={deviceName} />

          {/* Tabs */}
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="chat">AI Chat</TabsTrigger>
              <TabsTrigger value="life">Life 📅</TabsTrigger>
              <TabsTrigger value="notifications" className="relative">
                Messages
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {unreadNotifications}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="security" className="relative">
                Security
                {activeAlerts > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {activeAlerts}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="language">Language</TabsTrigger>
              <TabsTrigger value="control">Control</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4 mt-6">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                onVoiceInput={handleVoiceInput}
              />
              <AICapabilities />
            </TabsContent>

            <TabsContent value="life" className="space-y-4 mt-6">
              <LifeManagement userProfile={userProfile} />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 mt-6">
              <SocialMediaNotifications
                notifications={socialNotifications}
                onReply={handleSocialReply}
                onDismiss={handleDismissNotification}
              />
              
              {!isConnected && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Connect to your device via Bluetooth to receive real-time notifications.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="trending" className="space-y-4 mt-6">
              <TrendingNews trends={trendingTopics} userLanguage={currentLanguage} />
              
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Stay Informed 24/7</h4>
                <p className="text-sm text-gray-600">
                  AI automatically curates trending topics based on your interests and language preference. 
                  Ask me "What's trending?" anytime!
                </p>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 mt-6">
              <CCTVMonitoring
                alerts={cctvAlerts}
                cameras={cctvCameras}
                onViewFootage={handleViewFootage}
                onDismissAlert={handleDismissAlert}
              />
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900 mb-1">AI Security Monitoring Active</h4>
                    <p className="text-sm text-red-800">
                      Your AI continuously monitors all CCTV cameras and will immediately alert you of:
                      Unknown persons, Unusual activity, Motion after hours, or Equipment failures.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="language" className="space-y-4 mt-6">
              <LanguageTranslation
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </TabsContent>

            <TabsContent value="control" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AppControl onAppLaunch={handleAppLaunch} />
                <PhoneDiagnostics diagnostics={diagnostics} alerts={alerts} />
              </div>
              
              {!isConnected && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Connect to your device via Bluetooth to enable app control.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Info Footer */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
            <div className="text-center">
              <h3 className="font-medium mb-2">Your AI is Always Learning & Protecting</h3>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                This AI companion monitors your device, social media, home security, and trending news. 
                It speaks all languages, translates instantly, and provides companionship while keeping 
                you safe and informed 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;