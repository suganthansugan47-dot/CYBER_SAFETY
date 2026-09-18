import { scenarios } from "@/data/scenarios";

export interface UserAnswer {
  scenarioId: string;
  selectedOptionId: string;
  points: number;
  category: string;
}

export interface RiskResult {
  overallScore: number;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  categoryScores: { category: string; score: number; maxScore: number }[];
  warnings: string[];
  tips: string[];
  riskyBehaviors: string[];
}

// Map dangerous/risky option IDs to behavior patterns
const behaviorPatterns: Record<string, { behavior: string; warning: string; tip: string }> = {
  // Phishing
  "ph1-1": { behavior: "Clicking links in suspicious emails", warning: "You clicked a phishing link — attackers can steal your credentials this way.", tip: "Always verify emails by contacting the sender through official channels." },
  "ph2-1": { behavior: "Clicking spoofed domain links", warning: "You fell for a spoofed domain (zeros instead of o's).", tip: "Always check URLs character by character for spoofing tricks." },
  "ph3-1": { behavior: "Falling for CEO fraud", warning: "You complied with a Business Email Compromise scam.", tip: "Always verify unusual financial requests through a separate channel." },
  "ph4-1": { behavior: "Paying fake delivery fees", warning: "You entered payment info on a smishing (SMS phishing) link.", tip: "Track deliveries only through official courier websites or apps." },
  "ph5-1": { behavior: "Falling for government impersonation scams", warning: "You paid a fake IRS demand. The IRS communicates via postal mail.", tip: "Government agencies never threaten arrest or demand immediate online payment." },
  // Fake Websites
  "fw1-1": { behavior: "Shopping on unverified websites", warning: "You entered payment info on a scam site with no HTTPS and fake reviews.", tip: "Check for HTTPS, real reviews, and legitimate contact info before purchasing." },
  "fw1-4": { behavior: "Testing suspicious sites with real credentials", warning: "Entering credit card info to 'test' sites exposes your financial data.", tip: "Never enter real payment details on sites you suspect might be fraudulent." },
  "fw2-1": { behavior: "Logging into cloned banking sites", warning: "You entered credentials on a fake bank website.", tip: "Always type your bank's URL directly or use bookmarks — never trust search ads." },
  "fw3-1": { behavior: "Downloading from unofficial sources", warning: "You downloaded malware disguised as free premium software.", tip: "Only download software from official publisher websites." },
  "fw4-1": { behavior: "Entering personal data on rogue WiFi portals", warning: "You gave personal and financial info to a rogue WiFi access point.", tip: "Legitimate WiFi portals never ask for credit card numbers." },
  "fw5-1": { behavior: "Donating to fake charities", warning: "You donated to an unverified charity — your money went to scammers.", tip: "Always donate through established, verified charities like Red Cross." },
  // Online Scams
  "os1-1": { behavior: "Falling for advance-fee scams", warning: "Paying 'processing fees' for prizes is a classic scam.", tip: "Legitimate prizes never require upfront payment." },
  "os1-4": { behavior: "Sharing scam links with others", warning: "Sharing scam links spreads the attack to friends and family.", tip: "Never share suspicious links. Report them instead." },
  "os2-1": { behavior: "Sending money to online strangers", warning: "You wired money to a romance scammer.", tip: "Never send money to someone you haven't met in person." },
  "os3-1": { behavior: "Investing in unregulated platforms", warning: "You invested in a fraudulent crypto scheme.", tip: "No legitimate investment guarantees returns. Check financial authority registrations." },
  "os4-1": { behavior: "Calling fake tech support numbers", warning: "You called a scam tech support line from a browser pop-up.", tip: "Microsoft never shows virus warnings with phone numbers in browsers." },
  "os5-1": { behavior: "Paying for fake job opportunities", warning: "You paid fees and shared SSN for a nonexistent job.", tip: "Legitimate jobs never charge fees or ask for SSN before hiring." },
  // Data Theft
  "dt1-1": { behavior: "Sharing passwords with unsolicited callers", warning: "You gave your password to a social engineering scammer.", tip: "No legitimate company will ever ask for your password over the phone." },
  "dt1-4": { behavior: "Granting remote access to strangers", warning: "Remote access gives attackers full control of your computer.", tip: "Never grant remote access to unsolicited callers." },
  "dt2-1": { behavior: "Revealing security question answers", warning: "You gave away your security question answers through a fake survey.", tip: "Never share answers to common security questions in surveys." },
  "dt3-1": { behavior: "Plugging in unknown USB drives", warning: "You plugged in a potentially malicious USB drive.", tip: "Turn unknown USB drives over to IT security — never plug them in." },
  "dt4-1": { behavior: "Granting excessive app permissions", warning: "You gave a simple app access to all your personal data.", tip: "Review app permissions carefully — deny anything not essential to the app's function." },
  // Social Engineering
  "se1-1": { behavior: "Clicking links without verifying the sender", warning: "You clicked a link from a likely compromised account.", tip: "Verify unexpected messages through a different communication channel." },
  "se2-1": { behavior: "Allowing tailgating through secure doors", warning: "You let an unverified person into a secure building.", tip: "Always ask unrecognized people to badge in or contact reception." },
  "se3-1": { behavior: "Sharing credentials via email", warning: "You emailed your password in response to a pretexting attack.", tip: "IT departments NEVER ask for passwords via email." },
  "se4-1": { behavior: "Accepting free services from strangers", warning: "You gave remote access for 'free antivirus' — a quid pro quo attack.", tip: "Never give access in exchange for unsolicited free offers." },
  "se5-1": { behavior: "Ignoring browser security warnings", warning: "You ignored a browser warning about a compromised website.", tip: "Browser security warnings exist for good reason — always heed them." },
};

export function calculateResults(answers: UserAnswer[]): RiskResult {
  const maxPossible = answers.length * 10;
  const totalPoints = answers.reduce((sum, a) => sum + a.points, 0);
  const overallScore = Math.round((totalPoints / maxPossible) * 100);

  const categoryMap = new Map<string, { score: number; max: number }>();
  for (const answer of answers) {
    const current = categoryMap.get(answer.category) || { score: 0, max: 0 };
    current.score += answer.points;
    current.max += 10;
    categoryMap.set(answer.category, current);
  }

  const categoryScores = Array.from(categoryMap.entries()).map(([category, { score, max }]) => ({
    category,
    score,
    maxScore: max,
  }));

  let riskLevel: RiskResult["riskLevel"];
  if (overallScore >= 80) riskLevel = "Low";
  else if (overallScore >= 60) riskLevel = "Medium";
  else if (overallScore >= 35) riskLevel = "High";
  else riskLevel = "Critical";

  const warnings: string[] = [];
  const tips: string[] = [];
  const riskyBehaviors: string[] = [];

  for (const answer of answers) {
    const pattern = behaviorPatterns[answer.selectedOptionId];
    if (pattern) {
      riskyBehaviors.push(pattern.behavior);
      warnings.push(pattern.warning);
      tips.push(pattern.tip);
    }
  }

  if (warnings.length === 0) {
    tips.push("Great job! Keep staying vigilant and continue learning about cyber threats.");
  }

  return { overallScore, riskLevel, categoryScores, warnings, tips, riskyBehaviors };
}

export function saveResults(answers: UserAnswer[], result: RiskResult) {
  localStorage.setItem("cyberAdvisor_answers", JSON.stringify(answers));
  localStorage.setItem("cyberAdvisor_result", JSON.stringify(result));
}

export function loadResults(): { answers: UserAnswer[]; result: RiskResult } | null {
  const a = localStorage.getItem("cyberAdvisor_answers");
  const r = localStorage.getItem("cyberAdvisor_result");
  if (a && r) return { answers: JSON.parse(a), result: JSON.parse(r) };
  return null;
}

export function clearResults() {
  localStorage.removeItem("cyberAdvisor_answers");
  localStorage.removeItem("cyberAdvisor_result");
}
