import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Moon, Award } from "lucide-react";

interface SleepEntry {
  id: string;
  date: string;
  sleepTime: string;
  wakeTime: string;
  duration: number;
  quality: "Good" | "Moderate" | "Poor";
}

interface SleepStatsProps {
  entries: SleepEntry[];
}

export const SleepStats = ({ entries }: SleepStatsProps) => {
  const calculateAverageSleep = () => {
    if (entries.length === 0) return 0;
    const total = entries.reduce((sum, entry) => sum + entry.duration, 0);
    return (total / entries.length).toFixed(1);
  };

  const getQualityCount = (quality: "Good" | "Moderate" | "Poor") => {
    return entries.filter(entry => entry.quality === quality).length;
  };

  const last7Days = entries.slice(0, 7);
  const weeklyAverage = last7Days.length > 0 
    ? (last7Days.reduce((sum, entry) => sum + entry.duration, 0) / last7Days.length).toFixed(1)
    : "0.0";

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Sleep</CardTitle>
          <Moon className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{calculateAverageSleep()}h</div>
          <p className="text-xs text-muted-foreground">
            All time average
          </p>
        </CardContent>
      </Card>

      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
          <TrendingUp className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{weeklyAverage}h</div>
          <p className="text-xs text-muted-foreground">
            Last 7 days
          </p>
        </CardContent>
      </Card>

      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
          <Award className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{getQualityCount("Good")}</div>
          <p className="text-xs text-muted-foreground">
            Good nights ({entries.length} total)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
