import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Moon } from "lucide-react";
import { toast } from "sonner";

interface SleepFormProps {
  onSleepLogged: () => void;
}

export const SleepForm = ({ onSleepLogged }: SleepFormProps) => {
  const [sleepTime, setSleepTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");

  const calculateSleepDuration = (sleep: string, wake: string): number => {
    const sleepDate = new Date(`2000-01-01 ${sleep}`);
    let wakeDate = new Date(`2000-01-01 ${wake}`);
    
    if (wakeDate <= sleepDate) {
      wakeDate = new Date(`2000-01-02 ${wake}`);
    }
    
    const diff = wakeDate.getTime() - sleepDate.getTime();
    return diff / (1000 * 60 * 60);
  };

  const getSleepQuality = (hours: number): "Good" | "Moderate" | "Poor" => {
    if (hours >= 7 && hours <= 9) return "Good";
    if (hours >= 5 && hours < 7) return "Moderate";
    return "Poor";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sleepTime || !wakeTime) {
      toast.error("Please enter both sleep and wake times");
      return;
    }

    const duration = calculateSleepDuration(sleepTime, wakeTime);
    const quality = getSleepQuality(duration);
    
    const sleepEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      sleepTime,
      wakeTime,
      duration: parseFloat(duration.toFixed(1)),
      quality,
    };

    const existingData = localStorage.getItem('sleepData');
    const sleepData = existingData ? JSON.parse(existingData) : [];
    sleepData.unshift(sleepEntry);
    localStorage.setItem('sleepData', JSON.stringify(sleepData));

    toast.success(`Sleep logged! ${duration.toFixed(1)} hours - ${quality} quality`);
    setSleepTime("");
    setWakeTime("");
    onSleepLogged();
  };

  return (
    <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-primary" />
          <CardTitle>Log Your Sleep</CardTitle>
        </div>
        <CardDescription>Track your sleep and wake times</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sleepTime">Sleep Time</Label>
            <Input
              id="sleepTime"
              type="time"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wakeTime">Wake Time</Label>
            <Input
              id="wakeTime"
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            Log Sleep
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
