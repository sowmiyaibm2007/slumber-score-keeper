import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, Moon, Sun } from "lucide-react";

interface SleepEntry {
  id: string;
  date: string;
  sleepTime: string;
  wakeTime: string;
  duration: number;
  quality: "Good" | "Moderate" | "Poor";
}

interface SleepHistoryProps {
  entries: SleepEntry[];
}

export const SleepHistory = ({ entries }: SleepHistoryProps) => {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Good":
        return "bg-success text-success-foreground";
      case "Moderate":
        return "bg-warning text-warning-foreground";
      case "Poor":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          <CardTitle>Sleep History</CardTitle>
        </div>
        <CardDescription>Your recent sleep records</CardDescription>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No sleep entries yet. Start tracking your sleep!
          </p>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Moon className="w-3.5 h-3.5" />
                      <span>{entry.sleepTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5" />
                      <span>{entry.wakeTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-semibold text-foreground">
                      {entry.duration}h
                    </div>
                  </div>
                  <Badge className={getQualityColor(entry.quality)}>
                    {entry.quality}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
