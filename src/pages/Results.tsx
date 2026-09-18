import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadResults, clearResults, type RiskResult } from "@/lib/scoring";
import { Shield, RotateCcw, BookOpen, AlertTriangle, CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const riskColors: Record<string, string> = {
  Low: "text-success",
  Medium: "text-warning",
  High: "text-destructive",
  Critical: "text-destructive",
};

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<RiskResult | null>(null);

  useEffect(() => {
    const data = loadResults();
    if (!data) {
      navigate("/assessment");
      return;
    }
    setResult(data.result);
  }, [navigate]);

  if (!result) return null;

  const radarData = result.categoryScores.map((c) => ({
    category: c.category,
    score: Math.round((c.score / c.maxScore) * 100),
    fullMark: 100,
  }));

  const handleRetake = () => {
    clearResults();
    navigate("/assessment");
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">CyberSafe Advisor</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto max-w-3xl px-4 py-10 space-y-8">
        {/* Overall Score */}
        <Card className="bg-card border-border/50 text-center">
          <CardContent className="pt-8 pb-8">
            <p className="text-sm text-muted-foreground mb-2">Your Cyber Safety Score</p>
            <div className="text-7xl font-extrabold tracking-tight mb-2">{result.overallScore}</div>
            <p className="text-sm text-muted-foreground mb-1">out of 100</p>
            <span className={cn("text-lg font-bold", riskColors[result.riskLevel])}>
              Risk Level: {result.riskLevel}
            </span>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Advisor - Warnings */}
        {result.warnings.length > 0 && (
          <Card className="bg-card border-destructive/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Risky Behaviors Detected
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.warnings.map((w, i) => (
                <div key={i} className="flex gap-3 items-start text-sm">
                  <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <p>{w}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* AI Advisor - Tips */}
        <Card className="bg-card border-primary/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Personalized Safety Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {result.tips.map((t, i) => (
              <div key={i} className="flex gap-3 items-start text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p>{t}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleRetake} variant="outline" className="flex-1 gap-2">
            <RotateCcw className="h-4 w-4" /> Retake Assessment
          </Button>
          <Link to="/learn" className="flex-1">
            <Button className="w-full gap-2">
              <BookOpen className="h-4 w-4" /> Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;
