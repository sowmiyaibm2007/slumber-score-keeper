import { useState, useEffect } from "react";
import { SleepForm } from "@/components/SleepForm";
import { SleepHistory } from "@/components/SleepHistory";
import { SleepStats } from "@/components/SleepStats";
import { Moon, Sparkles } from "lucide-react";

interface SleepEntry {
  id: string;
  date: string;
  sleepTime: string;
  wakeTime: string;
  duration: number;
  quality: "Good" | "Moderate" | "Poor";
}

const Index = () => {
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([]);

  const loadSleepData = () => {
    const data = localStorage.getItem('sleepData');
    if (data) {
      setSleepEntries(JSON.parse(data));
    }
  };

  useEffect(() => {
    loadSleepData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Moon className="w-10 h-10 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Sleep Tracker
            </h1>
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your sleep patterns, analyze your rest quality, and improve your sleep habits
          </p>
        </header>

        {/* Stats Section */}
        <div className="mb-8 animate-in fade-in slide-in-from-top duration-700 delay-100">
          <SleepStats entries={sleepEntries} />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 md:grid-cols-2 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          <div>
            <SleepForm onSleepLogged={loadSleepData} />
          </div>
          <div>
            <SleepHistory entries={sleepEntries} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>💤 Sweet dreams! Aim for 7-9 hours of quality sleep each night.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
