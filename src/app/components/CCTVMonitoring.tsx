import { Camera, AlertTriangle, CheckCircle2, Users, Clock, MapPin, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

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

interface CCTVMonitoringProps {
  alerts: CCTVAlert[];
  cameras: CCTVCamera[];
  onViewFootage: (alertId: string) => void;
  onDismissAlert: (alertId: string) => void;
}

export function CCTVMonitoring({ alerts, cameras, onViewFootage, onDismissAlert }: CCTVMonitoringProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'unknown_person':
        return Users;
      case 'unusual_activity':
        return AlertTriangle;
      case 'all_clear':
        return CheckCircle2;
      default:
        return Camera;
    }
  };

  const homeAlerts = alerts.filter(a => a.location === 'home');
  const workAlerts = alerts.filter(a => a.location === 'work');
  const homeCameras = cameras.filter(c => c.location === 'home');
  const workCameras = cameras.filter(c => c.location === 'work');

  const AlertsList = ({ locationAlerts }: { locationAlerts: CCTVAlert[] }) => (
    <div className="space-y-3">
      {locationAlerts.length === 0 ? (
        <div className="text-center py-6">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-gray-500">All clear - No alerts</p>
        </div>
      ) : (
        locationAlerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          return (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 ${
                alert.severity === 'high' ? 'bg-red-50 border-red-200' :
                alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 mt-1 ${
                  alert.severity === 'high' ? 'text-red-500' :
                  alert.severity === 'medium' ? 'text-yellow-500' :
                  'text-blue-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.type.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <p className="text-sm font-medium mt-1">{alert.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.timestamp.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {alert.location.charAt(0).toUpperCase() + alert.location.slice(1)}
                    </div>
                  </div>
                  {alert.imageUrl && (
                    <img
                      src={alert.imageUrl}
                      alt="Alert snapshot"
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                  )}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewFootage(alert.id)}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      View Footage
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDismissAlert(alert.id)}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );

  const CamerasList = ({ locationCameras }: { locationCameras: CCTVCamera[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {locationCameras.map((camera) => (
        <div key={camera.id} className="border rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-sm">{camera.name}</span>
            </div>
            <Badge variant={camera.status === 'online' ? 'default' : 'secondary'}>
              {camera.status}
            </Badge>
          </div>
          {camera.lastMotion && (
            <p className="text-xs text-gray-500">
              Last motion: {camera.lastMotion.toLocaleTimeString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-purple-500" />
          CCTV Monitoring
        </CardTitle>
        <p className="text-xs text-gray-500">
          AI monitoring your home and work for unusual activity
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="home">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="home">
              Home {homeAlerts.length > 0 && (
                <Badge className="ml-2 bg-red-500">{homeAlerts.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="work">
              Work {workAlerts.length > 0 && (
                <Badge className="ml-2 bg-red-500">{workAlerts.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3">Alerts</h4>
              <AlertsList locationAlerts={homeAlerts} />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3">Cameras ({homeCameras.length})</h4>
              <CamerasList locationCameras={homeCameras} />
            </div>
          </TabsContent>

          <TabsContent value="work" className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3">Alerts</h4>
              <AlertsList locationAlerts={workAlerts} />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3">Cameras ({workCameras.length})</h4>
              <CamerasList locationCameras={workCameras} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
