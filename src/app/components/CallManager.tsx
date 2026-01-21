import { Phone, PhoneIncoming, PhoneMissed, PhoneForwarded, MessageSquare, X, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';

interface IncomingCall {
  id: string;
  caller: string;
  phoneNumber: string;
  avatar?: string;
  importance: 'high' | 'medium' | 'low';
  context?: string;
}

interface CallHistory {
  id: string;
  caller: string;
  type: 'incoming' | 'outgoing' | 'missed';
  timestamp: Date;
  aiHandled: boolean;
  aiResponse?: string;
}

interface CallManagerProps {
  incomingCall: IncomingCall | null;
  recentCalls: CallHistory[];
  onAnswer: (id: string) => void;
  onDecline: (id: string) => void;
  onAIAnswer: (id: string, response: string) => void;
}

export function CallManager({ incomingCall, recentCalls, onAnswer, onDecline, onAIAnswer }: CallManagerProps) {
  const handleAIAnswer = (call: IncomingCall) => {
    let response = '';
    if (call.importance === 'low') {
      response = "I'm currently unavailable. Can I call you back later?";
    } else if (call.context?.includes('meeting')) {
      response = "I'm in a meeting right now. I'll call you back in an hour.";
    } else {
      response = "I can't take your call right now. Is it urgent?";
    }
    onAIAnswer(call.id, response);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-green-500" />
          Call Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Incoming Call */}
        {incomingCall && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg p-4 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-12 h-12 border-2 border-green-500">
                <AvatarFallback className="bg-green-500 text-white">
                  {incomingCall.caller.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{incomingCall.caller}</p>
                <p className="text-sm text-gray-600">{incomingCall.phoneNumber}</p>
                {incomingCall.context && (
                  <p className="text-xs text-blue-600 mt-1">💡 {incomingCall.context}</p>
                )}
              </div>
              <Badge variant={
                incomingCall.importance === 'high' ? 'destructive' : 
                incomingCall.importance === 'medium' ? 'default' : 'secondary'
              }>
                {incomingCall.importance}
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => onDecline(incomingCall.id)}
              >
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50"
                onClick={() => handleAIAnswer(incomingCall)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Answer
              </Button>
              <Button
                className="flex-1 bg-green-500 hover:bg-green-600"
                onClick={() => onAnswer(incomingCall.id)}
              >
                <Check className="w-4 h-4 mr-2" />
                Answer
              </Button>
            </div>
          </div>
        )}

        {/* Recent Calls */}
        <div>
          <h4 className="text-sm font-medium mb-3">Recent Calls</h4>
          <div className="space-y-2">
            {recentCalls.length > 0 ? (
              recentCalls.map((call) => (
                <div key={call.id} className="flex items-center gap-3 p-3 bg-white border rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    call.type === 'incoming' ? 'bg-green-100' :
                    call.type === 'outgoing' ? 'bg-blue-100' : 'bg-red-100'
                  }`}>
                    {call.type === 'incoming' ? (
                      <PhoneIncoming className="w-4 h-4 text-green-600" />
                    ) : call.type === 'outgoing' ? (
                      <PhoneForwarded className="w-4 h-4 text-blue-600" />
                    ) : (
                      <PhoneMissed className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{call.caller}</p>
                    <p className="text-xs text-gray-500">
                      {call.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {call.aiHandled && call.aiResponse && (
                      <div className="mt-1 bg-blue-50 rounded px-2 py-1">
                        <p className="text-xs text-blue-800">
                          🤖 AI: "{call.aiResponse}"
                        </p>
                      </div>
                    )}
                  </div>
                  {call.aiHandled && (
                    <Badge variant="secondary" className="text-xs">AI Handled</Badge>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No recent calls</p>
            )}
          </div>
        </div>

        {/* AI Call Settings */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-medium text-blue-900 mb-2">🤖 AI Call Intelligence</p>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• AI identifies caller importance from your contacts</li>
            <li>• Smart responses based on your current schedule</li>
            <li>• Can answer calls with custom voice messages</li>
            <li>• Transcribes messages and alerts you of urgent calls</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
