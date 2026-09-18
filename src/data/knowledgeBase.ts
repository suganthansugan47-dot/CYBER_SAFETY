export interface KnowledgeTopic {
  id: string;
  title: string;
  icon: string;
  summary: string;
  tips: string[];
  details: string;
}

export const knowledgeTopics: KnowledgeTopic[] = [
  {
    id: "phishing",
    title: "How to Spot Phishing Emails",
    icon: "Mail",
    summary: "Phishing emails trick you into revealing sensitive information by impersonating trusted organizations.",
    tips: [
      "Check the sender's email domain carefully for misspellings",
      "Hover over links before clicking to see the real URL",
      "Be suspicious of urgent language demanding immediate action",
      "Look for generic greetings like 'Dear Customer' instead of your name",
      "Never download attachments from unknown senders",
    ],
    details: "Phishing is one of the most common cyber attacks. Attackers send emails that appear to come from legitimate sources like banks, social media platforms, or government agencies. They create urgency to make you act without thinking. Always verify suspicious communications through official channels — call the company directly using a number from their official website or your account statements.",
  },
  {
    id: "fake-websites",
    title: "Verifying Website Authenticity",
    icon: "Globe",
    summary: "Fake websites mimic legitimate ones to steal your credentials and financial information.",
    tips: [
      "Check for HTTPS and a padlock icon in the address bar",
      "Verify the domain name is spelled correctly",
      "Look for contact information and a physical address",
      "Be wary of sites with only gift card or wire transfer payments",
      "Check for a privacy policy and terms of service",
    ],
    details: "Scam websites often look identical to legitimate ones. They may use similar logos, colors, and layouts. Key indicators of fake sites include: no HTTPS encryption, recently registered domains, missing contact info, unrealistic prices, and poor grammar. Use tools like WHOIS lookup to check when a domain was registered — scam sites are often very new.",
  },
  {
    id: "scams",
    title: "Common Online Scam Patterns",
    icon: "Gift",
    summary: "Online scams use psychological manipulation to trick you into giving away money or information.",
    tips: [
      "If an offer seems too good to be true, it probably is",
      "Legitimate prizes never require upfront payment",
      "Be cautious of unsolicited investment opportunities",
      "Verify charity organizations before donating",
      "Never send money to someone you've only met online",
    ],
    details: "Common scam types include advance-fee fraud (pay now to receive a larger amount later), romance scams, fake tech support, lottery/prize scams, and investment fraud. Scammers exploit emotions like greed, fear, and loneliness. They create artificial urgency to prevent you from thinking critically. Always take time to research before making financial decisions based on unsolicited offers.",
  },
  {
    id: "data-protection",
    title: "Protecting Your Personal Data",
    icon: "Shield",
    summary: "Your personal data is valuable. Protecting it prevents identity theft and financial fraud.",
    tips: [
      "Never share passwords or PINs with anyone, including 'support' staff",
      "Use different passwords for different accounts",
      "Enable two-factor authentication wherever possible",
      "Be careful what you share on social media",
      "Regularly review your account statements for unauthorized activity",
    ],
    details: "Personal data like your SSN, date of birth, and financial details can be used for identity theft. Criminals combine information from multiple sources to build profiles. Minimize your digital footprint by limiting what you share publicly, using privacy settings on social media, and being cautious about which apps and services you grant access to your data.",
  },
  {
    id: "passwords",
    title: "Password Security Best Practices",
    icon: "Lock",
    summary: "Strong, unique passwords are your first line of defense against unauthorized access.",
    tips: [
      "Use at least 12 characters with mixed case, numbers, and symbols",
      "Never reuse passwords across different sites",
      "Use a reputable password manager",
      "Enable two-factor authentication (2FA) on all accounts",
      "Change passwords immediately if a breach is reported",
    ],
    details: "Weak passwords are responsible for a huge percentage of data breaches. Avoid common patterns like 'Password123' or personal info like birthdays. Passphrases (e.g., 'correct-horse-battery-staple') are both strong and memorable. A password manager generates and stores complex passwords so you only need to remember one master password. Combined with 2FA, this approach makes your accounts extremely difficult to breach.",
  },
];
