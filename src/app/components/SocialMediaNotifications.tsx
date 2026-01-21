import { useState } from 'react';
import { MessageCircle, Instagram, Twitter, Facebook, Send, CheckCheck, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';

interface SocialNotification {
  id: string;
  platform: 'whatsapp' | 'instagram' | 'twitter' | 'facebook';
  sender: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface SocialMediaNotificationsProps {
  notifications: SocialNotification[];
  onReply: (id: string, message: string, auto: boolean) => void;
  onDismiss: (id: string) => void;
}

const platformIcons = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
};

const platformColors = {
  whatsapp: 'text-green-500',
  instagram: 'text-pink-500',
  twitter: 'text-blue-400',
  facebook: 'text-blue-600',
};

export function SocialMediaNotifications({ notifications, onReply, onDismiss }: SocialMediaNotificationsProps) {
  const [selectedNotification, setSelectedNotification] = useState<SocialNotification | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const handleAutoReply = (notification: SocialNotification) => {
    onReply(notification.id, '', true);
    setSelectedNotification(null);
  };

  const handleManualReply = () => {
    if (selectedNotification && replyMessage.trim()) {
      onReply(selectedNotification.id, replyMessage, false);
      setReplyMessage('');
      setSelectedNotification(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Social Media Messages
            </CardTitle>
            <Badge variant="secondary">
              {notifications.filter(n => !n.read).length} New
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <p className="text-center text-sm text-gray-500 py-4">No new messages</p>
            ) : (
              notifications.map((notification) => {
                const Icon = platformIcons[notification.platform];
                const colorClass = platformColors[notification.platform];

                return (
                  <div
                    key={notification.id}
                    className={`border rounded-lg p-3 ${
                      !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 mt-1 ${colorClass}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm">{notification.sender}</p>
                          <span className="text-xs text-gray-500">
                            {notification.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{notification.message}</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedNotification(notification)}
                          >
                            Reply Manually
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAutoReply(notification)}
                          >
                            Let AI Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDismiss(notification.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to {selectedNotification?.sender}</DialogTitle>
            <DialogDescription>
              Message: "{selectedNotification?.message}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Type your reply..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              rows={4}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setSelectedNotification(null)}>
                Cancel
              </Button>
              <Button onClick={handleManualReply}>
                <Send className="w-4 h-4 mr-2" />
                Send Reply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
