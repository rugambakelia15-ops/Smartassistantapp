import { MessageSquare, Phone, Mail, Camera, Music, Map, Calendar, Settings, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';

interface AppControlProps {
  onAppLaunch: (appName: string) => void;
}

const apps = [
  { name: 'Messages', icon: MessageSquare, color: 'text-green-500' },
  { name: 'Phone', icon: Phone, color: 'text-blue-500' },
  { name: 'Email', icon: Mail, color: 'text-red-500' },
  { name: 'Camera', icon: Camera, color: 'text-purple-500' },
  { name: 'Music', icon: Music, color: 'text-pink-500' },
  { name: 'Maps', icon: Map, color: 'text-orange-500' },
  { name: 'Calendar', icon: Calendar, color: 'text-cyan-500' },
  { name: 'Settings', icon: Settings, color: 'text-gray-500' },
];

export function AppControl({ onAppLaunch }: AppControlProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>App Control</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <Button
                key={app.name}
                variant="outline"
                className="justify-start h-auto p-3"
                onClick={() => onAppLaunch(app.name)}
              >
                <Icon className={`w-5 h-5 mr-2 ${app.color}`} />
                <span className="flex-1 text-left">{app.name}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
