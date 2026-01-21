import { Calendar, Gift, Heart, Star, MapPin, Stethoscope, Plane, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time?: string;
  type: 'birthday' | 'medical' | 'work' | 'school' | 'holiday' | 'religious' | 'personal' | 'cycle';
  priority: 'low' | 'medium' | 'high';
  reminder?: string;
  icon: React.ElementType;
}

interface SmartCalendarProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export function SmartCalendar({ events, onEventClick }: SmartCalendarProps) {
  const getEventColor = (type: string) => {
    switch (type) {
      case 'birthday':
        return 'bg-pink-100 border-pink-300 text-pink-800';
      case 'medical':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'work':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'school':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'holiday':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'religious':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'cycle':
        return 'bg-rose-100 border-rose-300 text-rose-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High Priority</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="text-xs">Medium</Badge>;
      default:
        return null;
    }
  };

  const today = new Date();
  const upcomingEvents = events.filter(e => e.date >= today).sort((a, b) => a.date.getTime() - b.date.getTime());
  const todayEvents = upcomingEvents.filter(e => 
    e.date.toDateString() === today.toDateString()
  );
  const futureEvents = upcomingEvents.filter(e => 
    e.date.toDateString() !== today.toDateString()
  ).slice(0, 5);

  const EventItem = ({ event }: { event: CalendarEvent }) => {
    const Icon = event.icon;
    const daysUntil = Math.ceil((event.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return (
      <div
        className={`p-3 rounded-lg border-2 cursor-pointer hover:shadow-md transition-all ${getEventColor(event.type)}`}
        onClick={() => onEventClick(event)}
      >
        <div className="flex items-start gap-3">
          <Icon className="w-5 h-5 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="font-medium text-sm">{event.title}</h4>
              {getPriorityBadge(event.priority)}
            </div>
            <div className="text-xs space-y-1">
              <p>{event.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
              {event.time && <p className="font-medium">🕐 {event.time}</p>}
              {daysUntil > 0 && daysUntil <= 7 && (
                <p className="text-orange-700 font-medium">📌 In {daysUntil} day{daysUntil > 1 ? 's' : ''}</p>
              )}
              {event.reminder && <p>🔔 {event.reminder}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-500" />
          Smart Calendar & Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Today's Events */}
        {todayEvents.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Today's Schedule
            </h3>
            <div className="space-y-2">
              {todayEvents.map(event => (
                <EventItem key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <div>
          <h3 className="text-sm font-medium mb-3">Upcoming Events</h3>
          {futureEvents.length > 0 ? (
            <div className="space-y-2">
              {futureEvents.map(event => (
                <EventItem key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No upcoming events</p>
          )}
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <p className="text-xs text-purple-800">
            💡 <strong>AI Auto-Learn:</strong> I'll automatically detect and save important dates from your messages, 
            emails, and conversations. You don't need to add them manually!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
