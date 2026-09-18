import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Mail, Globe, Gift, UserX, Link as LinkIcon, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const threats = [
  { icon: Mail, label: "Phishing", desc: "Spot fake emails", category: "Phishing" },
  { icon: Globe, label: "Fake Sites", desc: "Identify scam websites", category: "Fake Websites" },
  { icon: Gift, label: "Scams", desc: "Recognize fraud", category: "Online Scams" },
  { icon: UserX, label: "Data Theft", desc: "Protect your data", category: "Data Theft" },
  { icon: LinkIcon, label: "Social Engineering", desc: "Stay vigilant", category: "Social Engineering" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">CyberSafe Advisor</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/learn">
              <Button variant="ghost" size="sm">
                <BookOpen className="mr-1.5 h-4 w-4" />
                Learn
              </Button>
            </Link>
            <Link to="/assessment">
              <Button size="sm">Start Assessment</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <motion.div
          className="mx-auto max-w-2xl"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Shield className="h-4 w-4" />
            Free Cybersecurity Assessment
          </motion.div>
          <motion.h1 variants={fadeUp} className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Are You Safe
            <span className="block text-primary"> Online?</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mb-10 text-lg text-muted-foreground leading-relaxed">
            Test your cyber awareness with 25 realistic threat simulations across 5 categories. Get a personalized risk score and AI-powered safety recommendations — completely free.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/assessment">
              <Button size="lg" className="text-base px-8 gap-2">
                Start Full Assessment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/learn">
              <Button variant="outline" size="lg" className="text-base px-8">
                Learn About Threats
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Threat Categories */}
      <section className="container mx-auto px-4 pb-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-2 text-center text-2xl font-bold"
        >
          Threats We Cover
        </motion.h2>
        <p className="text-center text-sm text-muted-foreground mb-8">Click a category to start its assessment</p>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          {threats.map((t) => (
            <motion.div key={t.label} variants={fadeUp}>
              <Card
                className="bg-card/50 border-border/50 hover:border-primary/40 transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                onClick={() => navigate(`/assessment?category=${encodeURIComponent(t.category)}`)}
              >
                <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <t.icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  <p className="font-semibold text-sm">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                  <span className="text-[10px] text-primary/70 font-medium mt-1">5 scenarios →</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-4 py-20">
          <h2 className="mb-12 text-center text-2xl font-bold">How It Works</h2>
          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            {[
              { step: "1", title: "Choose a Category", desc: "Pick a threat type or take the full 25-question assessment." },
              { step: "2", title: "Get Your Risk Score", desc: "See your safety score with a detailed breakdown by category." },
              { step: "3", title: "Learn & Improve", desc: "Receive personalized tips and warnings based on your answers." },
            ].map((item) => (
              <motion.div key={item.step} variants={fadeUp} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg"
                >
                  {item.step}
                </motion.div>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>CyberSafe Advisor — Free cybersecurity education for everyone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
