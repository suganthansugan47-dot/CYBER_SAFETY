import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { knowledgeTopics } from "@/data/knowledgeBase";
import { Shield, Mail, Globe, Gift, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { ShieldCheck } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Mail,
  Globe,
  Gift,
  Shield: ShieldCheck,
  Lock,
};

const KnowledgeBase = () => {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">CyberSafe Advisor</span>
          </Link>
          <Link to="/assessment">
            <Button size="sm">Start Assessment</Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto max-w-3xl px-4 py-10">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Cyber Safety Knowledge Base</h1>
        <p className="text-muted-foreground mb-10">Everything you need to stay safe online.</p>

        <div className="space-y-6">
          {knowledgeTopics.map((topic) => {
            const Icon = iconMap[topic.icon] || Shield;
            return (
              <Card key={topic.id} className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Icon className="h-5 w-5 text-primary" />
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{topic.summary}</p>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Quick Tips:</p>
                    {topic.tips.map((tip, i) => (
                      <div key={i} className="flex gap-2 items-start text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="details" className="border-border/30">
                      <AccordionTrigger className="text-sm text-primary hover:no-underline">
                        Learn More
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                        {topic.details}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
