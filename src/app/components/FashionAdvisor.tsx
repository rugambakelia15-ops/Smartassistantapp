import { Shirt, Cloud, MapPin, Calendar, Sparkles, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';

interface OutfitSuggestion {
  id: string;
  occasion: string;
  outfit: string[];
  weather: string;
  temperature: string;
  style: string;
  colors: string[];
}

interface FashionAdvisorProps {
  suggestion: OutfitSuggestion;
  todaySchedule: string[];
  onRequestNew: () => void;
}

export function FashionAdvisor({ suggestion, todaySchedule, onRequestNew }: FashionAdvisorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shirt className="w-5 h-5 text-purple-500" />
          Today's Fashion Advisor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Weather & Schedule Context */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-xs text-gray-600">Weather</p>
                <p className="text-sm font-medium">{suggestion.weather}</p>
                <p className="text-xs text-gray-500">{suggestion.temperature}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <div>
                <p className="text-xs text-gray-600">Today's Plan</p>
                <p className="text-sm font-medium">{suggestion.occasion}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Outfit Suggestion */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              AI Recommended Outfit
            </h4>
            <Badge variant="secondary">{suggestion.style}</Badge>
          </div>

          <div className="space-y-2">
            {suggestion.outfit.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white border rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-medium">
                  {index + 1}
                </div>
                <span className="text-sm flex-1">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div>
          <h4 className="text-sm font-medium mb-2">Suggested Colors</h4>
          <div className="flex gap-2">
            {suggestion.colors.map((color, index) => (
              <div
                key={index}
                className="flex-1 h-12 rounded-lg border-2 border-white shadow-md"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        {todaySchedule.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs font-medium text-yellow-900 mb-2">📅 Your Schedule Today:</p>
            <ul className="text-xs text-yellow-800 space-y-1">
              {todaySchedule.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* AI Fashion Tips */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <p className="text-xs font-medium text-purple-900 mb-2">💡 AI Fashion Tips</p>
          <ul className="text-xs text-purple-800 space-y-1">
            <li>• This outfit matches the weather and your schedule perfectly</li>
            <li>• Comfortable for {suggestion.temperature} weather</li>
            <li>• Professional enough for work, casual for after-hours</li>
            <li>• Colors complement your skin tone (from your profile)</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onRequestNew}>
            <Sparkles className="w-4 h-4 mr-2" />
            Different Style
          </Button>
          <Button className="flex-1">
            <ThumbsUp className="w-4 h-4 mr-2" />
            Looks Good!
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          AI learns your style preferences and improves suggestions over time
        </div>
      </CardContent>
    </Card>
  );
}
