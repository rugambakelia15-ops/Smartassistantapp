import { useState } from 'react';
import { Bot, User, Heart, Calendar, Briefcase, Clock, MapPin, Church, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';
import { Progress } from '@/app/components/ui/progress';

interface OnboardingData {
  name: string;
  gender: string;
  workSchedule: string;
  schoolSchedule: string;
  wakeUpTime: string;
  sleepTime: string;
  religion: string;
  hobbies: string[];
  importantDates: Array<{ event: string; date: string }>;
  cycleTracking: boolean;
  lastPeriodDate?: string;
}

interface AIOnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

export function AIOnboarding({ onComplete, onSkip }: AIOnboardingProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<OnboardingData>>({
    hobbies: [],
    importantDates: [],
  });

  const totalSteps = 8;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onComplete(data as OnboardingData);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const updateData = (field: string, value: any) => {
    setData({ ...data, [field]: value });
  };

  const steps = [
    {
      title: "Let's Get Acquainted! 👋",
      icon: User,
      content: (
        <div className="space-y-4">
          <div>
            <Label>What should I call you?</Label>
            <Input
              placeholder="Your name"
              value={data.name || ''}
              onChange={(e) => updateData('name', e.target.value)}
            />
          </div>
          <div>
            <Label>Gender (for personalized health tracking)</Label>
            <Select value={data.gender} onValueChange={(v) => updateData('gender', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      title: "Your Daily Schedule ⏰",
      icon: Clock,
      content: (
        <div className="space-y-4">
          <div>
            <Label>What time do you usually wake up?</Label>
            <Input
              type="time"
              value={data.wakeUpTime || ''}
              onChange={(e) => updateData('wakeUpTime', e.target.value)}
            />
          </div>
          <div>
            <Label>What time do you go to bed?</Label>
            <Input
              type="time"
              value={data.sleepTime || ''}
              onChange={(e) => updateData('sleepTime', e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500">
            I'll use this to create your optimal daily routine and remind you at the right times!
          </p>
        </div>
      ),
    },
    {
      title: "Work & School 💼",
      icon: Briefcase,
      content: (
        <div className="space-y-4">
          <div>
            <Label>Work Schedule (if applicable)</Label>
            <Input
              placeholder="e.g., Monday-Friday 9AM-5PM"
              value={data.workSchedule || ''}
              onChange={(e) => updateData('workSchedule', e.target.value)}
            />
          </div>
          <div>
            <Label>School/University Schedule</Label>
            <Input
              placeholder="e.g., Monday, Wednesday, Friday 8AM-2PM"
              value={data.schoolSchedule || ''}
              onChange={(e) => updateData('schoolSchedule', e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500">
            Leave blank if not applicable. I'll remind you and manage your schedule automatically!
          </p>
        </div>
      ),
    },
    {
      title: "Health Tracking 💗",
      icon: Heart,
      content: (
        <div className="space-y-4">
          {data.gender === 'female' && (
            <>
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <Label className="flex items-center gap-2 mb-3">
                  <Heart className="w-4 h-4 text-pink-500" />
                  Would you like me to track your menstrual cycle?
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant={data.cycleTracking === true ? 'default' : 'outline'}
                    onClick={() => updateData('cycleTracking', true)}
                    className="flex-1"
                  >
                    Yes, Please
                  </Button>
                  <Button
                    variant={data.cycleTracking === false ? 'default' : 'outline'}
                    onClick={() => updateData('cycleTracking', false)}
                    className="flex-1"
                  >
                    No, Thanks
                  </Button>
                </div>
              </div>
              
              {data.cycleTracking && (
                <div>
                  <Label>When was your last period? (First day)</Label>
                  <Input
                    type="date"
                    value={data.lastPeriodDate || ''}
                    onChange={(e) => updateData('lastPeriodDate', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    🔒 This data is private and secure. I'll predict your next cycle and send gentle reminders.
                  </p>
                </div>
              )}
            </>
          )}
          {data.gender !== 'female' && (
            <div className="text-center py-6">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-600">
                I'll help you track general health metrics, exercise, and wellness goals!
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Beliefs & Culture 🙏",
      icon: Church,
      content: (
        <div className="space-y-4">
          <div>
            <Label>Your Religion/Beliefs (optional)</Label>
            <Select value={data.religion} onValueChange={(v) => updateData('religion', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select or skip" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="christianity">Christianity</SelectItem>
                <SelectItem value="islam">Islam</SelectItem>
                <SelectItem value="hinduism">Hinduism</SelectItem>
                <SelectItem value="buddhism">Buddhism</SelectItem>
                <SelectItem value="judaism">Judaism</SelectItem>
                <SelectItem value="sikhism">Sikhism</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="none">No religious affiliation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-gray-500">
            I'll remind you of important religious dates, festivals, and prayer times based on your faith!
          </p>
        </div>
      ),
    },
    {
      title: "Important Dates 📅",
      icon: Calendar,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            I'll automatically learn birthdays and important dates from your messages, but you can add some now:
          </p>
          <div className="space-y-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Event (e.g., Mom's Birthday)"
                  value={data.importantDates?.[index]?.event || ''}
                  onChange={(e) => {
                    const dates = [...(data.importantDates || [])];
                    dates[index] = { ...dates[index], event: e.target.value, date: dates[index]?.date || '' };
                    updateData('importantDates', dates);
                  }}
                />
                <Input
                  type="date"
                  value={data.importantDates?.[index]?.date || ''}
                  onChange={(e) => {
                    const dates = [...(data.importantDates || [])];
                    dates[index] = { ...dates[index], event: dates[index]?.event || '', date: e.target.value };
                    updateData('importantDates', dates);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Your Interests 🎨",
      icon: Sparkles,
      content: (
        <div className="space-y-4">
          <Label>What are your hobbies and interests?</Label>
          <Textarea
            placeholder="e.g., Reading, Gaming, Cooking, Sports, Fashion..."
            rows={4}
            value={data.hobbies?.join(', ') || ''}
            onChange={(e) => updateData('hobbies', e.target.value.split(',').map((h: string) => h.trim()))}
          />
          <p className="text-xs text-gray-500">
            I'll use this to give you personalized recommendations, fashion tips, and conversation topics!
          </p>
        </div>
      ),
    },
    {
      title: "All Set! 🎉",
      icon: Bot,
      content: (
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-medium text-lg">I'm Ready to Be Your Companion!</h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 text-left">
            <p className="text-sm font-medium mb-2">Here's what I'll do for you:</p>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>✅ Manage your daily routine and reminders</li>
              <li>✅ Track your health and wellness</li>
              <li>✅ Handle calls and messages intelligently</li>
              <li>✅ Give you fashion and style advice</li>
              <li>✅ Remember important dates and birthdays</li>
              <li>✅ Monitor your home security</li>
              <li>✅ Keep you updated on trending topics</li>
              <li>✅ Be your companion whenever you need to talk</li>
            </ul>
          </div>
          <p className="text-xs text-gray-500">
            Don't worry! I'll keep learning about you and you can always update your preferences anytime.
          </p>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-purple-500" />
              {currentStep.title}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onSkip}>
              Skip Setup
            </Button>
          </div>
          <Progress value={progress} className="mt-2" />
          <p className="text-xs text-gray-500 mt-2">
            Step {step + 1} of {totalSteps}
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            {currentStep.content}
          </div>

          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button className="flex-1" onClick={handleNext}>
              {step === totalSteps - 1 ? "Let's Go! 🚀" : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
