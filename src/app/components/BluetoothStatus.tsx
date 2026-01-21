import { Bluetooth, BluetoothConnected } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

interface BluetoothStatusProps {
  isConnected: boolean;
  deviceName?: string;
}

export function BluetoothStatus({ isConnected, deviceName }: BluetoothStatusProps) {
  return (
    <Card className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isConnected ? (
            <BluetoothConnected className="w-6 h-6 text-blue-500 animate-pulse" />
          ) : (
            <Bluetooth className="w-6 h-6 text-gray-400" />
          )}
          <div>
            <p className="font-medium">Bluetooth Status</p>
            <p className="text-sm text-gray-500">
              {isConnected ? `Connected to ${deviceName}` : 'Disconnected'}
            </p>
          </div>
        </div>
        <Badge variant={isConnected ? 'default' : 'secondary'}>
          {isConnected ? 'Active' : 'Inactive'}
        </Badge>
      </div>
    </Card>
  );
}
