import { Battery, HardDrive, Cpu, Signal, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';

interface DiagnosticItem {
  label: string;
  value: number;
  status: 'good' | 'warning' | 'critical';
  icon: React.ElementType;
  unit: string;
}

interface PhoneDiagnosticsProps {
  diagnostics: DiagnosticItem[];
  alerts: string[];
}

export function PhoneDiagnostics({ diagnostics, alerts }: PhoneDiagnosticsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="w-5 h-5" />
          Phone Diagnostics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {diagnostics.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${getStatusColor(item.status)}`} />
                  <span className="text-sm">{item.label}</span>
                </div>
                <span className="text-sm font-medium">
                  {item.value}{item.unit}
                </span>
              </div>
              <Progress value={item.value} className={getProgressColor(item.status)} />
            </div>
          );
        })}

        {alerts.length > 0 && (
          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              Alerts & Recommendations
            </div>
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-600 bg-yellow-50 p-2 rounded">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span>{alert}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
