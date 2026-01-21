import { TrendingUp, Globe, Newspaper, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

interface TrendingItem {
  id: string;
  title: string;
  category: string;
  source: string;
  trending: number;
  language: string;
}

interface TrendingNewsProps {
  trends: TrendingItem[];
  userLanguage: string;
}

export function TrendingNews({ trends, userLanguage }: TrendingNewsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          Trending Now
        </CardTitle>
        <p className="text-xs text-gray-500">Based on your language: {userLanguage}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trends.map((trend, index) => (
            <div
              key={trend.id}
              className="flex gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-medium text-sm line-clamp-2">{trend.title}</h4>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {trend.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{trend.source}</span>
                  <div className="flex items-center gap-1 text-xs text-orange-500">
                    <TrendingUp className="w-3 h-3" />
                    {trend.trending.toLocaleString()} mentions
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
