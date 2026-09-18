import { useState, useMemo } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { scenarios } from "@/data/scenarios";
import { calculateResults, saveResults, type UserAnswer } from "@/lib/scoring";
import { Shield, ArrowRight, CheckCircle2, XCircle, AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Assessment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const filteredScenarios = useMemo(
    () => categoryFilter ? scenarios.filter((s) => s.category === categoryFilter) : scenarios,
    [categoryFilter]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenario = filteredScenarios[currentIndex];
  const progress = (currentIndex / filteredScenarios.length) * 100;

  const handleSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
    setShowFeedback(true);

    const option = scenario.options.find((o) => o.id === optionId)!;
    setAnswers((prev) => [
      ...prev,
      {
        scenarioId: scenario.id,
        selectedOptionId: optionId,
        points: option.points,
        category: scenario.category,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < filteredScenarios.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      const result = calculateResults([...answers]);
      saveResults([...answers], result);
      navigate("/results");
    }
  };

  const selectedOptionData = scenario.options.find((o) => o.id === selectedOption);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe": return "border-success/60 bg-success/10 text-success";
      case "cautious": return "border-warning/60 bg-warning/10 text-warning";
      case "risky": return "border-destructive/40 bg-destructive/10 text-destructive";
      case "dangerous": return "border-destructive/60 bg-destructive/15 text-destructive";
      default: return "";
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe": return <CheckCircle2 className="h-5 w-5 text-success shrink-0" />;
      case "cautious": return <AlertTriangle className="h-5 w-5 text-warning shrink-0" />;
      default: return <XCircle className="h-5 w-5 text-destructive shrink-0" />;
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">CyberSafe Advisor</span>
          </Link>
          <div className="text-right">
            {categoryFilter && (
              <span className="block text-xs text-primary font-medium">{categoryFilter}</span>
            )}
            <span className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {filteredScenarios.length}
            </span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Progress value={progress} className="mb-8 h-2" />

        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card border-border/50">
              <CardHeader>
                <div className="flex items-center gap-2 text-xs text-primary font-medium uppercase tracking-wider mb-2">
                  {scenario.category}
                </div>
                <CardTitle className="text-xl">{scenario.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-secondary/50 p-4 text-sm leading-relaxed whitespace-pre-line border border-border/30">
                  {scenario.context}
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">What would you do?</p>
                  {scenario.options.map((option, i) => {
                    const isSelected = selectedOption === option.id;
                    const showResult = showFeedback && isSelected;
                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => handleSelect(option.id)}
                        disabled={showFeedback}
                        className={cn(
                          "w-full rounded-lg border p-4 text-left text-sm transition-all",
                          showFeedback && !isSelected && "opacity-40",
                          showResult
                            ? getRiskColor(option.riskLevel)
                            : "border-border/50 hover:border-primary/50 hover:bg-secondary/30",
                          showFeedback && "cursor-default"
                        )}
                      >
                        {option.text}
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {showFeedback && selectedOptionData && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={cn("rounded-lg border p-4 flex gap-3", getRiskColor(selectedOptionData.riskLevel))}
                    >
                      {getRiskIcon(selectedOptionData.riskLevel)}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-1">
                          {selectedOptionData.riskLevel === "safe" ? "Safe Choice!" : selectedOptionData.riskLevel === "cautious" ? "Partially Safe" : "Risky Choice"}
                        </p>
                        <p className="text-sm leading-relaxed text-foreground">{selectedOptionData.feedback}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {showFeedback && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <Button onClick={handleNext} className="w-full gap-2">
                      {currentIndex < filteredScenarios.length - 1 ? (
                        <>Next Scenario <ChevronRight className="h-4 w-4" /></>
                      ) : (
                        <>View Your Results <ArrowRight className="h-4 w-4" /></>
                      )}
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Assessment;
