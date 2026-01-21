import { Clock, Sun, Moon, Utensils, Dumbbell, Briefcase, GraduationCap, Plus, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';

interface RoutineItem {
  id: string;
  time: string;
  activity: string;
  icon: React.ElementType;
  completed: boolean;
  type: 'morning' | 'afternoon' | 'evening';
}

interface DailyRoutineManagerProps {
  routine: RoutineItem[];
  onToggleComplete: (id: string) => void;
  currentProgress: number;
}

export function DailyRoutineManager({ routine, onToggleComplete, currentProgress }: DailyRoutineManagerProps) {
  const morningTasks = routine.filter(r => r.type === 'morning');
  const afternoonTasks = routine.filter(r => r.type === 'afternoon');
  const eveningTasks = routine.filter(r => r.type === 'evening');

  const TaskList = ({ tasks, title, icon: Icon }: { tasks: RoutineItem[], title: string, icon: React.ElementType }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium mb-3">
        <Icon className="w-4 h-4" />
        {title}
      </div>
      {tasks.map((task) => {
        const TaskIcon = task.icon;
        return (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
              task.completed 
                ? 'bg-green-50 border-green-200 opacity-75' 
                : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => onToggleComplete(task.id)}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
            }`}>
              {task.completed && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <TaskIcon className="w-4 h-4 text-gray-600" />
            <div className="flex-1">
              <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.activity}
              </p>
            </div>
            <span className="text-xs text-gray-500">{task.time}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            Today's Routine
          </CardTitle>
          <Badge variant="secondary">{currentProgress}% Complete</Badge>
        </div>
        <Progress value={currentProgress} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <TaskList tasks={morningTasks} title="Morning" icon={Sun} />
        <TaskList tasks={afternoonTasks} title="Afternoon" icon={Briefcase} />
        <TaskList tasks={eveningTasks} title="Evening" icon={Moon} />

        <Button variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          AI will ask you about new routines
        </Button>
      </CardContent>
    </Card>
  );
}
