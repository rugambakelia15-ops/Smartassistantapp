import { Brain, Shield, Zap, HeadphonesIcon, Settings, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

interface Capability {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const capabilities: Capability[] = [
  {
    title: 'Full Phone Control',
    description: 'Control all apps and settings remotely via voice or text commands',
    icon: Settings,
    color: 'text-blue-500',
  },
  {
    title: 'Conversational AI',
    description: 'Have natural conversations and feel like someone is always with you',
    icon: HeadphonesIcon,
    color: 'text-purple-500',
  },
  {
    title: 'Smart Diagnostics',
    description: 'Monitor phone health and get alerts about repairs or updates needed',
    icon: Activity,
    color: 'text-green-500',
  },
  {
    title: 'Intelligent Assistance',
    description: 'Execute tasks, manage apps, and automate routines on your behalf',
    icon: Brain,
    color: 'text-pink-500',
  },
  {
    title: 'Privacy Protection',
    description: 'Secure Bluetooth connection with encrypted communication',
    icon: Shield,
    color: 'text-orange-500',
  },
  {
    title: 'Instant Response',
    description: 'Real-time execution of commands and proactive suggestions',
    icon: Zap,
    color: 'text-yellow-500',
  },
];

export function AICapabilities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          AI Capabilities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={index}
                className="flex gap-3 p-3 rounded-lg border bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-shadow"
              >
                <div className={`flex-shrink-0 ${capability.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{capability.title}</h4>
                  <p className="text-xs text-gray-600">{capability.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
