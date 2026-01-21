import { Heart, Calendar, TrendingUp, Droplet, AlertCircle, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';

interface CycleData {
  currentDay: number;
  cycleLength: number;
  periodLength: number;
  nextPeriod: Date;
  fertile: boolean;
  ovulation: Date;
  phase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
  symptoms: string[];
  mood: string;
}

interface MenstrualCycleTrackerProps {
  cycleData: CycleData | null;
  enabled: boolean;
}

export function MenstrualCycleTracker({ cycleData, enabled }: MenstrualCycleTrackerProps) {
  if (!enabled || !cycleData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" />
            Cycle Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Heart className="w-12 h-12 text-pink-300 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-4">
              Cycle tracking is not enabled. AI can help you track your menstrual cycle, 
              predict periods, and monitor your health.
            </p>
            <p className="text-xs text-gray-500">
              AI will ask you a few questions to set this up privately and securely.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'menstrual':
        return 'bg-red-500';
      case 'follicular':
        return 'bg-pink-500';
      case 'ovulation':
        return 'bg-purple-500';
      case 'luteal':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPhaseEmoji = (phase: string) => {
    switch (phase) {
      case 'menstrual':
        return '🩸';
      case 'follicular':
        return '🌱';
      case 'ovulation':
        return '🌸';
      case 'luteal':
        return '🌙';
      default:
        return '💫';
    }
  };

  const daysUntilPeriod = Math.ceil((cycleData.nextPeriod.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const cycleProgress = (cycleData.currentDay / cycleData.cycleLength) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          Cycle Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Phase */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getPhaseEmoji(cycleData.phase)}</span>
              <div>
                <h4 className="font-medium capitalize">{cycleData.phase} Phase</h4>
                <p className="text-xs text-gray-600">Day {cycleData.currentDay} of {cycleData.cycleLength}</p>
              </div>
            </div>
            {cycleData.fertile && (
              <Badge className="bg-purple-500">Fertile Window</Badge>
            )}
          </div>
          <Progress value={cycleProgress} className={getPhaseColor(cycleData.phase)} />
        </div>

        {/* Next Period */}
        <div className="grid grid-cols-2 gap-3">
          <div className="border rounded-lg p-3 bg-white">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-red-500" />
              <span className="text-xs text-gray-600">Next Period</span>
            </div>
            <p className="font-medium text-sm">
              {cycleData.nextPeriod.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
            <p className="text-xs text-gray-500">In {daysUntilPeriod} days</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <div className="flex items-center gap-2 mb-1">
              <Droplet className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-gray-600">Ovulation</span>
            </div>
            <p className="font-medium text-sm">
              {cycleData.ovulation.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
            <p className="text-xs text-gray-500">Predicted</p>
          </div>
        </div>

        {/* Mood & Symptoms */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Mood</span>
            <span className="text-sm">{cycleData.mood}</span>
          </div>

          {cycleData.symptoms.length > 0 && (
            <div>
              <span className="text-sm font-medium mb-2 block">Tracked Symptoms</span>
              <div className="flex flex-wrap gap-2">
                {cycleData.symptoms.map((symptom, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Insights */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-blue-900 mb-1">AI Health Insights</p>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Your cycle is regular (28-day average)</li>
                <li>• Drink more water during {cycleData.phase} phase</li>
                {daysUntilPeriod <= 3 && <li>• 🔔 Period starting soon - stocked on supplies?</li>}
                {cycleData.fertile && <li>• You're in your fertile window (ovulation nearby)</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
          <p className="text-xs text-pink-800">
            🔒 <strong>Privacy:</strong> All cycle data is stored securely and privately. 
            AI will send you private reminders and never share this information.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
