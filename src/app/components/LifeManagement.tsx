import { DailyRoutineManager } from '@/app/components/DailyRoutineManager';
import { SmartCalendar } from '@/app/components/SmartCalendar';
import { MenstrualCycleTracker } from '@/app/components/MenstrualCycleTracker';
import { FashionAdvisor } from '@/app/components/FashionAdvisor';
import { CallManager } from '@/app/components/CallManager';
import { Clock, Utensils, Dumbbell, Briefcase, GraduationCap, Sun, Moon, Gift, Stethoscope, MapPin, Star, Calendar, Heart, Phone, Shirt } from 'lucide-react';

interface LifeManagementProps {
  userProfile: any;
}

export function LifeManagement({ userProfile }: LifeManagementProps) {
  // Daily Routine
  const routine = [
    { id: '1', time: '6:30 AM', activity: 'Wake up & Morning Prayer', icon: Sun, completed: true, type: 'morning' as const },
    { id: '2', time: '7:00 AM', activity: 'Breakfast & Vitamins', icon: Utensils, completed: true, type: 'morning' as const },
    { id: '3', time: '7:30 AM', activity: 'Exercise / Yoga', icon: Dumbbell, completed: false, type: 'morning' as const },
    { id: '4', time: '9:00 AM', activity: 'Start Work', icon: Briefcase, completed: false, type: 'morning' as const },
    { id: '5', time: '12:30 PM', activity: 'Lunch Break', icon: Utensils, completed: false, type: 'afternoon' as const },
    { id: '6', time: '5:00 PM', activity: 'Finish Work', icon: Briefcase, completed: false, type: 'afternoon' as const },
    { id: '7', time: '6:30 PM', activity: 'Dinner with Family', icon: Utensils, completed: false, type: 'evening' as const },
    { id: '8', time: '10:30 PM', activity: 'Sleep', icon: Moon, completed: false, type: 'evening' as const },
  ];

  const routineProgress = Math.round((routine.filter(r => r.completed).length / routine.length) * 100);

  // Calendar Events
  const calendarEvents = [
    {
      id: '1',
      title: "Mom's Birthday 🎂",
      date: new Date(2026, 0, 25),
      time: 'All day',
      type: 'birthday' as const,
      priority: 'high' as const,
      reminder: '1 day before',
      icon: Gift,
    },
    {
      id: '2',
      title: 'Annual Health Checkup',
      date: new Date(2026, 0, 22),
      time: '10:00 AM',
      type: 'medical' as const,
      priority: 'high' as const,
      reminder: '1 day before',
      icon: Stethoscope,
    },
    {
      id: '3',
      title: 'Project Deadline - Q1 Report',
      date: new Date(2026, 0, 20),
      time: '5:00 PM',
      type: 'work' as const,
      priority: 'high' as const,
      reminder: '3 hours before',
      icon: Briefcase,
    },
    {
      id: '4',
      title: 'Ramadan Begins 🌙',
      date: new Date(2026, 2, 1),
      type: 'religious' as const,
      priority: 'high' as const,
      icon: Star,
    },
    {
      id: '5',
      title: 'Team Offsite Meeting',
      date: new Date(2026, 0, 28),
      time: '9:00 AM',
      type: 'work' as const,
      priority: 'medium' as const,
      icon: MapPin,
    },
  ];

  // Menstrual Cycle Data (for female users)
  const cycleData = userProfile?.gender === 'female' ? {
    currentDay: 14,
    cycleLength: 28,
    periodLength: 5,
    nextPeriod: new Date(2026, 0, 26),
    fertile: true,
    ovulation: new Date(2026, 0, 21),
    phase: 'ovulation' as const,
    symptoms: ['Mild cramping', 'Increased energy'],
    mood: '😊 Energetic & Positive',
  } : null;

  // Fashion Suggestion
  const fashionSuggestion = {
    id: '1',
    occasion: 'Work Meeting + Dinner Date',
    outfit: [
      '👔 Navy blue blazer',
      '👕 White silk blouse',
      '👖 Dark gray trousers',
      '👠 Black heeled ankle boots',
      '👜 Brown leather handbag',
      '⌚ Silver watch & simple earrings',
    ],
    weather: 'Partly Cloudy',
    temperature: '18°C / 64°F',
    style: 'Business Casual',
    colors: ['#1e3a5f', '#ffffff', '#4a4a4a', '#000000', '#8b4513'],
  };

  const todaySchedule = [
    '9:00 AM - Team Meeting (Dress professionally)',
    '1:00 PM - Lunch with Client',
    '7:00 PM - Dinner Date (Casual elegant)',
  ];

  // Call Management
  const incomingCall = {
    id: 'call1',
    caller: 'Sarah Johnson',
    phoneNumber: '+1 555-0123',
    importance: 'medium' as const,
    context: 'Friend - Usually calls about weekend plans',
  };

  const recentCalls = [
    {
      id: 'rc1',
      caller: 'Boss - John Smith',
      type: 'incoming' as const,
      timestamp: new Date(Date.now() - 1800000),
      aiHandled: true,
      aiResponse: "I'm in a meeting. I'll call back in 30 minutes.",
    },
    {
      id: 'rc2',
      caller: 'Mom',
      type: 'outgoing' as const,
      timestamp: new Date(Date.now() - 7200000),
      aiHandled: false,
    },
    {
      id: 'rc3',
      caller: 'Unknown Number',
      type: 'missed' as const,
      timestamp: new Date(Date.now() - 10800000),
      aiHandled: false,
    },
  ];

  const handleRoutineToggle = (id: string) => {
    console.log('Toggle routine:', id);
  };

  const handleEventClick = (event: any) => {
    console.log('Event clicked:', event);
  };

  const handleFashionRequest = () => {
    console.log('Request new fashion suggestion');
  };

  const handleAnswerCall = (id: string) => {
    console.log('Answer call:', id);
  };

  const handleDeclineCall = (id: string) => {
    console.log('Decline call:', id);
  };

  const handleAIAnswer = (id: string, response: string) => {
    console.log('AI answer:', id, response);
  };

  return (
    <div className="space-y-4">
      {/* Row 1: Routine and Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DailyRoutineManager
          routine={routine}
          onToggleComplete={handleRoutineToggle}
          currentProgress={routineProgress}
        />
        <SmartCalendar
          events={calendarEvents}
          onEventClick={handleEventClick}
        />
      </div>

      {/* Row 2: Health Tracking and Fashion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MenstrualCycleTracker
          cycleData={cycleData}
          enabled={userProfile?.cycleTracking || false}
        />
        <FashionAdvisor
          suggestion={fashionSuggestion}
          todaySchedule={todaySchedule}
          onRequestNew={handleFashionRequest}
        />
      </div>

      {/* Row 3: Call Manager */}
      <CallManager
        incomingCall={null}
        recentCalls={recentCalls}
        onAnswer={handleAnswerCall}
        onDecline={handleDeclineCall}
        onAIAnswer={handleAIAnswer}
      />

      {/* AI Learning Banner */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🤖</div>
          <div>
            <h4 className="font-medium text-green-900 mb-1">AI is Learning About You</h4>
            <p className="text-sm text-green-800">
              I'm automatically tracking your routines, learning your preferences, and saving important dates 
              from your conversations. You don't need to manually enter anything - I'll ask you questions 
              when I need more information!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
