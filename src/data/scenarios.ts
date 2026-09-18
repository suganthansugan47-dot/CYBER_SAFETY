export interface ScenarioOption {
  id: string;
  text: string;
  riskLevel: "safe" | "cautious" | "risky" | "dangerous";
  points: number;
  feedback: string;
}

export interface Scenario {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  context: string;
  options: ScenarioOption[];
}

export const scenarios: Scenario[] = [
  // ==================== PHISHING (5) ====================
  {
    id: "ph-email",
    title: "Suspicious Bank Email",
    category: "Phishing",
    icon: "Mail",
    description: "You receive an urgent email from your bank.",
    context: `You receive an email with the subject line "URGENT: Your account has been compromised!" from "security@bankk-alerts.com". The email says:\n\n"Dear Customer, We detected unauthorized access to your account. Click the link below immediately to verify your identity and secure your account, or your funds will be frozen within 24 hours.\n\nVerify Now: http://bankk-secure-login.sketchy-site.com/verify"\n\nThe email has a generic greeting, a typo in the sender domain, and creates urgency.`,
    options: [
      { id: "ph1-1", text: "Click the link immediately to protect my account", riskLevel: "dangerous", points: 0, feedback: "Never click links in unsolicited emails! The misspelled domain 'bankk-alerts.com' and the suspicious URL are major red flags." },
      { id: "ph1-2", text: "Reply to the email asking for more details", riskLevel: "risky", points: 3, feedback: "Replying confirms your email is active and gives scammers more info. Never engage with suspicious emails directly." },
      { id: "ph1-3", text: "Call my bank using the number on my card to verify", riskLevel: "safe", points: 10, feedback: "Excellent! Always verify through official channels. Calling the number on your physical card ensures you're talking to your real bank." },
      { id: "ph1-4", text: "Forward it to friends to warn them", riskLevel: "cautious", points: 5, feedback: "While warning others is thoughtful, forwarding phishing emails can accidentally spread the threat. Report it to your bank instead." },
    ],
  },
  {
    id: "ph-social",
    title: "Social Media Password Reset",
    category: "Phishing",
    icon: "Mail",
    description: "You receive a password reset email you didn't request.",
    context: `You receive an email from "noreply@faceb00k-security.com" saying:\n\n"Someone requested a password reset for your account. If this wasn't you, click here to secure your account immediately: http://faceb00k-security.com/reset?id=83921"\n\nYou didn't request a password reset. The email looks almost like a real Facebook email, but the domain has zeros instead of 'o's.`,
    options: [
      { id: "ph2-1", text: "Click the link to secure my account right away", riskLevel: "dangerous", points: 0, feedback: "The domain 'faceb00k' uses zeros instead of o's — a classic spoofing technique. You'd be giving your credentials to attackers." },
      { id: "ph2-2", text: "Ignore the email and delete it", riskLevel: "cautious", points: 7, feedback: "Ignoring is safer than clicking, but you should also report it as phishing to protect other users." },
      { id: "ph2-3", text: "Go directly to facebook.com and check my account security settings", riskLevel: "safe", points: 10, feedback: "Perfect! Navigating directly to the official site (not through the email link) is the safest way to check your account." },
      { id: "ph2-4", text: "Reply asking if this is legitimate", riskLevel: "risky", points: 3, feedback: "Replying to phishing emails confirms your email address is active and monitored, making you a bigger target." },
    ],
  },
  {
    id: "ph-boss",
    title: "CEO Fraud Email",
    category: "Phishing",
    icon: "Mail",
    description: "Your boss urgently needs gift cards.",
    context: `You receive an email appearing to be from your company's CEO:\n\n"Hi, I'm in a confidential meeting and can't talk. I need you to urgently purchase 5 Amazon gift cards worth $100 each for a client. Buy them and send me the codes via email ASAP. Don't tell anyone — it's a surprise. — Sent from my iPhone"\n\nThe email address is ceo.name@company-mail.net instead of the usual @company.com.`,
    options: [
      { id: "ph3-1", text: "Buy the gift cards — the CEO needs them urgently", riskLevel: "dangerous", points: 0, feedback: "This is a Business Email Compromise (BEC) scam! No legitimate CEO asks employees to buy gift cards via email." },
      { id: "ph3-2", text: "Call or message the CEO directly to verify the request", riskLevel: "safe", points: 10, feedback: "Excellent! Always verify unusual requests through a separate communication channel, especially involving money." },
      { id: "ph3-3", text: "Email back asking for more details", riskLevel: "risky", points: 3, feedback: "Replying to the scammer just engages them further. They'll pressure you harder. Use a different channel to verify." },
      { id: "ph3-4", text: "Check the sender's email domain carefully before deciding", riskLevel: "cautious", points: 7, feedback: "Good instinct! The domain mismatch (@company-mail.net vs @company.com) is a giveaway. But always verify through another channel too." },
    ],
  },
  {
    id: "ph-delivery",
    title: "Fake Delivery Notification",
    category: "Phishing",
    icon: "Mail",
    description: "A delivery notification asks for payment.",
    context: `You receive a text message: "Your package from DHL could not be delivered. A customs fee of $2.99 is required. Pay now to reschedule delivery: http://dhl-delivery-pay.info/customs"\n\nYou did recently order something online, but you're not sure which courier was used.`,
    options: [
      { id: "ph4-1", text: "Pay the $2.99 — it's a small fee and I am expecting a package", riskLevel: "dangerous", points: 0, feedback: "This is a smishing (SMS phishing) scam! The small fee is bait to steal your credit card info. Legitimate couriers don't collect customs via text links." },
      { id: "ph4-2", text: "Click the link just to see if it looks legitimate", riskLevel: "risky", points: 3, feedback: "Even visiting scam links can expose you to malware or browser exploits. Don't click suspicious links at all." },
      { id: "ph4-3", text: "Go to the official DHL website and track my package there", riskLevel: "safe", points: 10, feedback: "Smart! Always track deliveries through the official courier website or app, never through links in unsolicited messages." },
      { id: "ph4-4", text: "Check with the store I ordered from about the courier", riskLevel: "cautious", points: 7, feedback: "Good thinking! Verifying with the original seller is a smart step, though going to the official courier site directly is even faster." },
    ],
  },
  {
    id: "ph-tax",
    title: "IRS Tax Scam",
    category: "Phishing",
    icon: "Mail",
    description: "The IRS threatens legal action via email.",
    context: `You receive an email from "irs-collections@gov-tax-notice.com" with the subject "FINAL WARNING: Legal Action Pending":\n\n"Our records show you owe $4,327 in unpaid taxes. If payment is not received within 48 hours, a warrant will be issued for your arrest. Click below to make an immediate payment and avoid prosecution.\n\nPay Now: http://irs-payment-portal.com/pay"`,
    options: [
      { id: "ph5-1", text: "Pay immediately — I don't want to get arrested!", riskLevel: "dangerous", points: 0, feedback: "The IRS never threatens arrest via email or demands immediate payment through links. This is a fear-based phishing scam." },
      { id: "ph5-2", text: "Close the email and contact the IRS through irs.gov directly", riskLevel: "safe", points: 10, feedback: "Perfect! The IRS communicates primarily through postal mail for tax issues. Always verify through the official irs.gov website." },
      { id: "ph5-3", text: "Forward the email to a friend who's a lawyer", riskLevel: "cautious", points: 5, feedback: "Seeking advice is reasonable, but forwarding phishing emails spreads risk. Check irs.gov directly or call the IRS." },
      { id: "ph5-4", text: "Click the link to check if my tax records show anything owed", riskLevel: "dangerous", points: 0, feedback: "The domain 'gov-tax-notice.com' is not a real government site. Clicking could lead to credential theft or malware." },
    ],
  },

  // ==================== FAKE WEBSITES (5) ====================
  {
    id: "fw-shop",
    title: "Fake Shopping Site",
    category: "Fake Websites",
    icon: "Globe",
    description: "An online store offers incredible deals.",
    context: `You find a website called "MegaDeals-Store.com" advertising brand-name electronics at 80% off. You notice:\n\n• The URL starts with "http://" (not "https://")\n• No contact information or physical address listed\n• Payment only accepted via wire transfer or gift cards\n• Product reviews all posted on the same day with similar wording\n• The "About Us" page has stock photos and lorem ipsum text`,
    options: [
      { id: "fw1-1", text: "Buy now — the deals are too good to pass up!", riskLevel: "dangerous", points: 0, feedback: "This website has every hallmark of a scam: no HTTPS, suspicious payment methods, fake reviews, and unrealistic prices." },
      { id: "fw1-2", text: "Search for reviews of this website before purchasing", riskLevel: "cautious", points: 7, feedback: "Good instinct to research! The red flags here are already numerous enough to avoid the site entirely." },
      { id: "fw1-3", text: "Close the site — too many red flags", riskLevel: "safe", points: 10, feedback: "Perfect judgment! No HTTPS, wire-transfer-only payments, fake reviews, and unrealistic prices are textbook scam indicators." },
      { id: "fw1-4", text: "Enter my credit card to see if it's legit", riskLevel: "dangerous", points: 0, feedback: "Never enter payment info to 'test' a website! Scammers capture your card details instantly." },
    ],
  },
  {
    id: "fw-bank",
    title: "Cloned Banking Site",
    category: "Fake Websites",
    icon: "Globe",
    description: "A Google ad leads to your bank's login page.",
    context: `You search for your bank's website on Google and click the first result, which is a sponsored ad. The page looks exactly like your bank's website, but you notice:\n\n• The URL reads "www.chase-secure-login.com" instead of "www.chase.com"\n• The SSL certificate shows a different organization name\n• There's a slight delay when you hover over menu items\n• The login form asks for your SSN along with username and password`,
    options: [
      { id: "fw2-1", text: "Log in since it looks exactly like my bank's site", riskLevel: "dangerous", points: 0, feedback: "Looks can be deceiving! Scammers create pixel-perfect clones. The wrong domain and SSN request are dead giveaways." },
      { id: "fw2-2", text: "Check the URL carefully and navigate to chase.com directly", riskLevel: "safe", points: 10, feedback: "Excellent! Always type your bank's URL directly or use a bookmark. Never trust search ad links for banking." },
      { id: "fw2-3", text: "Enter a fake password to test if it accepts anything", riskLevel: "risky", points: 3, feedback: "Scam sites often accept any credentials to avoid suspicion, then redirect to the real site. Don't interact with suspicious login pages." },
      { id: "fw2-4", text: "Report the ad to Google as suspicious", riskLevel: "cautious", points: 7, feedback: "Reporting is helpful, but first make sure you don't enter any info. Navigate to your bank directly and report the phishing site." },
    ],
  },
  {
    id: "fw-software",
    title: "Fake Software Download",
    category: "Fake Websites",
    icon: "Globe",
    description: "A site offers free premium software.",
    context: `You're looking for video editing software and find "free-adobe-premiere.download" which offers Adobe Premiere Pro for free. The site says:\n\n"Download Adobe Premiere Pro 2025 — Full Version, No Subscription! Click DOWNLOAD NOW to get started."\n\n• The download button flashes and changes colors\n• Multiple pop-ups appear when you visit\n• The file offered is "premiere_setup.exe" (47 KB — suspiciously small)\n• The site has no connection to Adobe`,
    options: [
      { id: "fw3-1", text: "Download it — free premium software is amazing!", riskLevel: "dangerous", points: 0, feedback: "This is malware disguised as software. The tiny file size (47 KB) and unofficial site are clear indicators. You'd likely install a virus or ransomware." },
      { id: "fw3-2", text: "Close the site and get software only from official sources", riskLevel: "safe", points: 10, feedback: "Perfect! Always download software from official websites. If it's too good to be true (free premium software), it's almost certainly malware." },
      { id: "fw3-3", text: "Download it but scan with antivirus before opening", riskLevel: "risky", points: 3, feedback: "While scanning is better than nothing, some malware evades antivirus. The safest approach is to never download from unofficial sources." },
      { id: "fw3-4", text: "Look for reviews of this download site first", riskLevel: "cautious", points: 5, feedback: "Researching is reasonable, but the red flags are overwhelming. No legitimate site offers premium software for free." },
    ],
  },
  {
    id: "fw-wifi",
    title: "Fake WiFi Login Portal",
    category: "Fake Websites",
    icon: "Globe",
    description: "A coffee shop's WiFi asks for personal details.",
    context: `You connect to "CoffeeShop_FreeWiFi" at a café. A login portal appears asking for:\n\n• Your full name\n• Email address\n• Date of birth\n• Phone number\n• Credit card number "for age verification"\n\nThe URL in the browser shows "192.168.1.1/login" and there's no padlock icon. The barista says they don't know much about the WiFi setup.`,
    options: [
      { id: "fw4-1", text: "Fill in all the info — I need internet access", riskLevel: "dangerous", points: 0, feedback: "Legitimate WiFi portals never ask for credit card numbers or birthdates. This is a rogue access point designed to steal your personal data." },
      { id: "fw4-2", text: "Ask the café staff for the official WiFi name and password", riskLevel: "safe", points: 10, feedback: "Smart! Always verify the WiFi network name with staff. Use your mobile data if the WiFi seems suspicious." },
      { id: "fw4-3", text: "Enter fake information just to get online", riskLevel: "cautious", points: 5, feedback: "Entering fake info is safer, but connecting to a rogue access point still exposes your traffic to monitoring. Better to avoid it." },
      { id: "fw4-4", text: "Connect and just use it for basic browsing", riskLevel: "risky", points: 3, feedback: "Even 'basic browsing' on a rogue network can be intercepted. Attackers can see unencrypted traffic and inject malicious content." },
    ],
  },
  {
    id: "fw-charity",
    title: "Fake Charity Website",
    category: "Fake Websites",
    icon: "Globe",
    description: "A charity site solicits donations after a disaster.",
    context: `After a natural disaster, you see a social media post linking to "HelpVictimsNow-Fund.org" asking for donations. The site:\n\n• Was registered just 2 days ago (you checked via WHOIS)\n• Has no charity registration number\n• Uses emotional images that reverse-search to stock photo sites\n• Only accepts cryptocurrency or wire transfer donations\n• Has grammatical errors throughout`,
    options: [
      { id: "fw5-1", text: "Donate immediately — people need help urgently!", riskLevel: "dangerous", points: 0, feedback: "Disaster-chasing fake charities are sadly common. No registration, crypto-only payments, and stock photos are all scam signs." },
      { id: "fw5-2", text: "Donate through a well-known charity like Red Cross instead", riskLevel: "safe", points: 10, feedback: "Excellent! Always donate through established, verified charities. Check charity registrations at sites like charitynavigator.org." },
      { id: "fw5-3", text: "Share the link to help spread awareness", riskLevel: "dangerous", points: 0, feedback: "Sharing helps the scam reach more victims. Never amplify unverified charity links, even with good intentions." },
      { id: "fw5-4", text: "Research the charity's registration before donating", riskLevel: "cautious", points: 7, feedback: "Good due diligence! Checking registration is wise. Given all the red flags here, this charity almost certainly isn't legitimate." },
    ],
  },

  // ==================== ONLINE SCAMS (5) ====================
  {
    id: "os-prize",
    title: "Prize Winner Scam",
    category: "Online Scams",
    icon: "Gift",
    description: "You've supposedly won a prize in a contest.",
    context: `You receive a pop-up notification: "🎉 CONGRATULATIONS! You are the 1,000,000th visitor! You've won a brand new iPhone 16 Pro! Click below to claim your prize!"\n\nAfter clicking, a page asks for a $4.99 processing fee with your credit card, full name, address, phone number, and email.`,
    options: [
      { id: "os1-1", text: "Pay $4.99 — it's a small price for a free iPhone!", riskLevel: "dangerous", points: 0, feedback: "This is an advance-fee scam. You won't get an iPhone — they'll steal your credit card info. Legitimate contests never require payment." },
      { id: "os1-2", text: "Close the page immediately", riskLevel: "safe", points: 10, feedback: "Smart move! 'You've won' pop-ups are virtually always scams. No legitimate company gives prizes to random visitors." },
      { id: "os1-3", text: "Enter fake details to see what happens", riskLevel: "risky", points: 3, feedback: "Even exploring scam sites is risky — they may install malware, track your IP, or use browser exploits." },
      { id: "os1-4", text: "Share the link so friends can win too", riskLevel: "dangerous", points: 0, feedback: "Sharing scam links spreads the threat to your friends and family." },
    ],
  },
  {
    id: "os-romance",
    title: "Romance Scam",
    category: "Online Scams",
    icon: "Gift",
    description: "An online love interest needs financial help.",
    context: `You've been chatting with someone on a dating app for 3 weeks. They claim to be a military doctor stationed overseas. They say:\n\n"I love you so much! I need $500 for a plane ticket to come visit you. My military account is frozen due to overseas restrictions. Can you wire the money through Western Union? I'll pay you back as soon as I arrive."\n\nThey always have excuses for not video calling and their photos look like model shots.`,
    options: [
      { id: "os2-1", text: "Send the money — they promised to pay me back", riskLevel: "dangerous", points: 0, feedback: "This is a textbook romance scam. Real love interests don't ask for money via wire transfer. You'll never see the money or the person." },
      { id: "os2-2", text: "Reverse image search their photos and cut contact", riskLevel: "safe", points: 10, feedback: "Excellent! Reverse image searches often reveal stolen photos. Cutting contact is the right call when multiple red flags appear." },
      { id: "os2-3", text: "Ask them to video call first to prove they're real", riskLevel: "cautious", points: 7, feedback: "Good instinct, but scammers will always have excuses for not video calling. The request for wire transfer money is already a dealbreaker." },
      { id: "os2-4", text: "Send a smaller amount first to test if they're legitimate", riskLevel: "risky", points: 3, feedback: "Any amount sent to a scammer is lost. They'll just ask for more, creating a cycle of increasing demands." },
    ],
  },
  {
    id: "os-invest",
    title: "Crypto Investment Scam",
    category: "Online Scams",
    icon: "Gift",
    description: "A 'guaranteed' investment opportunity appears online.",
    context: `You see an ad on social media: "I turned $500 into $50,000 in just 30 days using this AI crypto trading bot! 🚀 Join our exclusive group NOW — only 10 spots left!"\n\nThe ad links to a WhatsApp group where an 'expert' shows screenshots of massive profits and testimonials from 'members.' They ask you to invest a minimum of $250 through their 'platform' to get started.`,
    options: [
      { id: "os3-1", text: "Invest $250 — the testimonials look convincing!", riskLevel: "dangerous", points: 0, feedback: "Guaranteed returns don't exist in legitimate investing. Screenshots and testimonials are easily faked. This is a classic Ponzi/investment scam." },
      { id: "os3-2", text: "Report the ad and move on", riskLevel: "safe", points: 10, feedback: "Perfect response! Report scam ads to help protect others. No legitimate investment guarantees returns or uses WhatsApp groups for trading." },
      { id: "os3-3", text: "Join the group first to learn more before investing", riskLevel: "risky", points: 3, feedback: "Joining exposes you to high-pressure manipulation tactics. Scammers in these groups are experts at convincing people to 'invest.'" },
      { id: "os3-4", text: "Research the platform online before deciding", riskLevel: "cautious", points: 7, feedback: "Good instinct to research. You'll likely find it's unregistered. Always check if platforms are regulated by financial authorities." },
    ],
  },
  {
    id: "os-tech",
    title: "Fake Tech Support Pop-up",
    category: "Online Scams",
    icon: "Gift",
    description: "A scary pop-up claims your computer is infected.",
    context: `While browsing, a full-screen pop-up appears with a loud alarm sound:\n\n"⚠️ VIRUS DETECTED! Your computer has been infected with 3 viruses. Your personal data, banking passwords, and files are at risk!\n\nDO NOT SHUT DOWN YOUR COMPUTER.\nCall Microsoft Support NOW: 1-800-555-0199\nYour Computer ID: WIN-839201"\n\nThe pop-up prevents you from closing the browser tab normally.`,
    options: [
      { id: "os4-1", text: "Call the number immediately — my data is at risk!", riskLevel: "dangerous", points: 0, feedback: "Microsoft never shows virus pop-ups with phone numbers. Calling connects you to scammers who'll charge for fake 'repairs' or install actual malware." },
      { id: "os4-2", text: "Force-close the browser using Task Manager (Ctrl+Alt+Del)", riskLevel: "safe", points: 10, feedback: "Perfect! These are browser-based scam pop-ups, not real virus alerts. Force-closing the browser removes them completely." },
      { id: "os4-3", text: "Follow the pop-up's instructions to avoid losing files", riskLevel: "dangerous", points: 0, feedback: "The pop-up itself is the scam. Following its instructions leads to financial loss and potentially real malware installation." },
      { id: "os4-4", text: "Unplug my computer to stop the virus", riskLevel: "cautious", points: 5, feedback: "There's no actual virus — it's just a webpage. Unplugging works but isn't necessary. Simply force-close the browser." },
    ],
  },
  {
    id: "os-job",
    title: "Work-From-Home Scam",
    category: "Online Scams",
    icon: "Gift",
    description: "A too-good-to-be-true job offer arrives.",
    context: `You receive an email: "Congratulations! You've been selected for a Remote Data Entry position. Earn $45/hour, no experience needed, work whenever you want!\n\nTo get started, we just need:\n• Your SSN for tax purposes\n• A $99 training fee (refundable after first week)\n• Your bank details for direct deposit"\n\nYou never applied for this position. The company name doesn't appear in any searches.`,
    options: [
      { id: "os5-1", text: "Send the information — $45/hour is amazing!", riskLevel: "dangerous", points: 0, feedback: "Legitimate jobs never ask for upfront fees or your SSN before hiring. This is an identity theft and advance-fee scam combined." },
      { id: "os5-2", text: "Delete the email — I never applied for this job", riskLevel: "safe", points: 10, feedback: "Correct! Unsolicited job offers with unrealistic pay, upfront fees, and requests for sensitive info are always scams." },
      { id: "os5-3", text: "Reply asking for more information about the company", riskLevel: "risky", points: 3, feedback: "Engaging with scammers gives them a chance to build trust and manipulate you. The red flags are already clear enough." },
      { id: "os5-4", text: "Research the company before responding", riskLevel: "cautious", points: 7, feedback: "Smart to research first. The fact that the company doesn't appear in searches confirms it's a scam. Legitimate employers are findable." },
    ],
  },

  // ==================== DATA THEFT (5) ====================
  {
    id: "dt-call",
    title: "Social Engineering Call",
    category: "Data Theft",
    icon: "UserX",
    description: "Someone claiming to be from tech support calls you.",
    context: `You receive a phone call from someone claiming to be from "Microsoft Technical Support":\n\n"We've detected a virus on your computer that's stealing your banking information right now. I need your computer login password and remote access to fix it immediately. If we don't act now, your data will be compromised within the hour."\n\nThe caller sounds professional and provides an employee ID number.`,
    options: [
      { id: "dt1-1", text: "Give them my password — they need to fix it urgently", riskLevel: "dangerous", points: 0, feedback: "Microsoft never calls users unsolicited about viruses! Sharing your password gives scammers full access to your computer and data." },
      { id: "dt1-2", text: "Ask them to prove they're from Microsoft", riskLevel: "risky", points: 3, feedback: "Scammers are prepared with fake employee IDs and scripts. Engaging gives them more time to manipulate you." },
      { id: "dt1-3", text: "Hang up and call Microsoft's official support number", riskLevel: "safe", points: 10, feedback: "Perfect response! Legitimate tech companies never cold-call about viruses. Verify through official channels independently." },
      { id: "dt1-4", text: "Let them remotely access my computer to check", riskLevel: "dangerous", points: 0, feedback: "Remote access gives scammers complete control of your computer. They can install malware, steal files, and access your accounts." },
    ],
  },
  {
    id: "dt-survey",
    title: "Fake Survey for a Prize",
    category: "Data Theft",
    icon: "UserX",
    description: "A survey promises a gift card for your information.",
    context: `You see an ad: "Complete this 2-minute survey and win a $500 Amazon gift card!" The survey starts with harmless questions but gradually asks:\n\n• What's your full name?\n• What's your mother's maiden name?\n• What street did you grow up on?\n• What was the name of your first pet?\n• What's your date of birth?\n\nThese questions match common security questions used by banks and email providers.`,
    options: [
      { id: "dt2-1", text: "Complete the survey — $500 is worth 2 minutes!", riskLevel: "dangerous", points: 0, feedback: "These questions are your security question answers! Scammers use them to reset your passwords and take over your accounts." },
      { id: "dt2-2", text: "Recognize the questions as security questions and close it", riskLevel: "safe", points: 10, feedback: "Excellent awareness! You correctly identified that these are common security recovery questions. This survey is a data harvesting tool." },
      { id: "dt2-3", text: "Fill in fake answers to get the gift card", riskLevel: "cautious", points: 5, feedback: "Using fake answers protects your real info, but there's no actual gift card. You're also confirming your engagement to the scammer." },
      { id: "dt2-4", text: "Complete it but skip the personal questions", riskLevel: "cautious", points: 5, feedback: "The entire survey is a pretense. Even partial completion signals engagement. The gift card doesn't exist." },
    ],
  },
  {
    id: "dt-usb",
    title: "Found USB Drive",
    category: "Data Theft",
    icon: "UserX",
    description: "You find a USB drive in a parking lot.",
    context: `You find a USB drive labeled "Employee Salaries 2025 — CONFIDENTIAL" in your office parking lot. You're curious about what's on it.\n\nPlugging it into your computer could reveal interesting information, but it could also be a deliberate drop by an attacker (a technique called "USB baiting").`,
    options: [
      { id: "dt3-1", text: "Plug it in — I want to see the salary data", riskLevel: "dangerous", points: 0, feedback: "This is USB baiting! Malicious USB drives can install malware automatically when plugged in, compromising your entire system and network." },
      { id: "dt3-2", text: "Turn it in to IT security without plugging it in", riskLevel: "safe", points: 10, feedback: "Perfect! IT security can safely analyze the drive in a controlled environment. Never plug unknown USB drives into your devices." },
      { id: "dt3-3", text: "Plug it into an old computer that's not on the network", riskLevel: "risky", points: 3, feedback: "Even an isolated computer can be compromised. Some USB attacks work at the hardware level and can damage the device itself." },
      { id: "dt3-4", text: "Throw it away", riskLevel: "cautious", points: 5, feedback: "Better than plugging it in, but turning it over to IT security is preferred so they can investigate potential targeted attacks." },
    ],
  },
  {
    id: "dt-app",
    title: "Suspicious App Permissions",
    category: "Data Theft",
    icon: "UserX",
    description: "A flashlight app wants access to everything.",
    context: `You download a simple flashlight app from the app store. During installation, it requests access to:\n\n• Your contacts\n• Your location (always, not just while using)\n• Your microphone\n• Your text messages\n• Your photos and files\n• Your call history\n\nThe app has 4.8 stars but only 50 reviews, all very generic ("Great app!" "Works perfectly!").`,
    options: [
      { id: "dt4-1", text: "Grant all permissions — I just want to use the flashlight", riskLevel: "dangerous", points: 0, feedback: "A flashlight app has zero reason to access contacts, messages, or your microphone. These permissions allow massive data collection and spying." },
      { id: "dt4-2", text: "Deny all unnecessary permissions and uninstall", riskLevel: "safe", points: 10, feedback: "Excellent! A flashlight app should need camera access at most. Excessive permissions are a hallmark of spyware disguised as utility apps." },
      { id: "dt4-3", text: "Grant permissions but check reviews first", riskLevel: "risky", points: 3, feedback: "The reviews are likely fake (generic 5-star reviews). No amount of reviews justifies a flashlight app accessing your messages and contacts." },
      { id: "dt4-4", text: "Install but deny most permissions", riskLevel: "cautious", points: 7, feedback: "Denying permissions is good, but an app requesting these permissions is suspicious in itself. Better to find a trustworthy alternative." },
    ],
  },
  {
    id: "dt-wifi-sniff",
    title: "Public WiFi Data Theft",
    category: "Data Theft",
    icon: "UserX",
    description: "You need to do banking on public WiFi.",
    context: `You're at an airport and need to transfer money urgently through your banking app. The only internet available is the free airport WiFi network "Airport_Free_WiFi" (open, no password required).\n\nYou know that public WiFi can be risky, but the transfer is urgent.`,
    options: [
      { id: "dt5-1", text: "Connect to WiFi and do the banking — it's urgent!", riskLevel: "risky", points: 3, feedback: "Open WiFi networks can be monitored by attackers. Banking on unencrypted public WiFi risks exposing your credentials." },
      { id: "dt5-2", text: "Use my mobile data instead of the WiFi", riskLevel: "safe", points: 10, feedback: "Perfect! Mobile data (4G/5G) is encrypted and much safer than public WiFi for sensitive activities like banking." },
      { id: "dt5-3", text: "Connect to WiFi but use a VPN for the banking", riskLevel: "cautious", points: 7, feedback: "Using a VPN on public WiFi is a solid security practice. While mobile data is safest, VPN-encrypted WiFi is a reasonable alternative." },
      { id: "dt5-4", text: "Wait until I get home to do the transfer", riskLevel: "safe", points: 10, feedback: "If the transfer can wait, doing it from your secure home network is the safest option." },
    ],
  },

  // ==================== SOCIAL ENGINEERING (5) ====================
  {
    id: "se-link",
    title: "Suspicious Message Link",
    category: "Social Engineering",
    icon: "Link",
    description: "A friend sends you a strange message with a link.",
    context: `You receive a message on social media from a friend's account:\n\n"OMG! Is this you in this video?? 😱😱 You have to see this!!! → bit.ly/x7k9mQ2"\n\nThe message style doesn't match how your friend usually texts. Their profile picture is the same, but they haven't posted anything in weeks.`,
    options: [
      { id: "se1-1", text: "Click the link — my friend sent it so it must be safe", riskLevel: "dangerous", points: 0, feedback: "Your friend's account was likely hacked! Clicking could install malware or steal your login credentials." },
      { id: "se1-2", text: "Contact my friend through a different channel to verify", riskLevel: "safe", points: 10, feedback: "Excellent! Verifying through another channel is the safest approach and helps your friend know they've been hacked." },
      { id: "se1-3", text: "Use a URL expander tool to check the link first", riskLevel: "cautious", points: 7, feedback: "Good technical awareness! But contacting your friend directly is still the safest first step." },
      { id: "se1-4", text: "Reply asking 'Is this really you?'", riskLevel: "risky", points: 3, feedback: "If the account is hacked, the hacker will reply 'Yes!' Use a different channel to verify." },
    ],
  },
  {
    id: "se-tailgate",
    title: "Office Tailgating",
    category: "Social Engineering",
    icon: "Link",
    description: "Someone asks you to hold the secure door.",
    context: `You badge into your office building's secure entrance. A person in business attire walks up behind you carrying a large box and says:\n\n"Hey, can you hold the door? My hands are full and I left my badge at my desk. I'm from the marketing department — just started last week. I'm running late for a meeting with Sarah."\n\nThey seem friendly and professional but you don't recognize them.`,
    options: [
      { id: "se2-1", text: "Hold the door — they seem legitimate and need help", riskLevel: "risky", points: 3, feedback: "This is 'tailgating' — a classic physical social engineering technique. Letting unverified people through secure doors bypasses building security." },
      { id: "se2-2", text: "Politely ask them to badge in or call reception", riskLevel: "safe", points: 10, feedback: "Perfect! Politely enforcing security protocols protects everyone. A legitimate employee will understand." },
      { id: "se2-3", text: "Ask them who Sarah is and what department she's in", riskLevel: "cautious", points: 5, feedback: "Social engineers often research company details beforehand. They may know enough to answer convincingly. Badge verification is more reliable." },
      { id: "se2-4", text: "Hold the door but follow up with security later", riskLevel: "cautious", points: 5, feedback: "By the time you report it, the person could have already accessed sensitive areas. Prevention is better than after-the-fact reporting." },
    ],
  },
  {
    id: "se-pretexting",
    title: "IT Department Pretexting",
    category: "Social Engineering",
    icon: "Link",
    description: "An 'IT admin' emails you about a security audit.",
    context: `You receive an email from "it-admin@your-company.com" (the correct domain):\n\n"As part of our annual security audit, we need to verify all employee credentials. Please reply with your:\n• Username\n• Current password\n• VPN access code\n\nThis is required by company policy. Non-compliance will result in account suspension. Please respond by end of day."\n\nThe email looks official but you've never received a request like this before.`,
    options: [
      { id: "se3-1", text: "Send the requested information — it's from IT", riskLevel: "dangerous", points: 0, feedback: "No legitimate IT department asks for passwords via email — EVER. This is a pretexting attack, possibly from a compromised internal account." },
      { id: "se3-2", text: "Call the IT department using the company directory to verify", riskLevel: "safe", points: 10, feedback: "Perfect! Always verify unusual requests through a separate, trusted communication channel, especially those asking for credentials." },
      { id: "se3-3", text: "Send the info but change my password right after", riskLevel: "risky", points: 3, feedback: "Even sending credentials temporarily gives attackers access. They can act within seconds of receiving your info." },
      { id: "se3-4", text: "Ignore the email since it seems unusual", riskLevel: "cautious", points: 7, feedback: "Ignoring is safe, but reporting it to IT is better — others may fall for it, and IT needs to know about the potential breach." },
    ],
  },
  {
    id: "se-quid",
    title: "Quid Pro Quo Attack",
    category: "Social Engineering",
    icon: "Link",
    description: "Free antivirus in exchange for access.",
    context: `You receive a call: "Hi, I'm from CyberShield Security. We're offering a free antivirus installation for businesses in your area. To install it remotely, I just need:\n\n• Your computer's IP address\n• Remote desktop access for 10 minutes\n• Your admin password to install the software\n\nThis is a $200 value completely free! We're doing this as a promotional campaign to gain new customers."`,
    options: [
      { id: "se4-1", text: "Accept the free offer and provide the access", riskLevel: "dangerous", points: 0, feedback: "This is a quid pro quo attack — offering something 'free' in exchange for access. They'll install malware, not antivirus." },
      { id: "se4-2", text: "Decline and hang up", riskLevel: "safe", points: 10, feedback: "Correct! Never give remote access or admin credentials to unsolicited callers, regardless of what they offer." },
      { id: "se4-3", text: "Ask them to email you information about their company first", riskLevel: "cautious", points: 5, feedback: "Researching is better than immediate compliance, but legitimate security companies don't cold-call offering remote installations." },
      { id: "se4-4", text: "Give access but watch what they do on screen", riskLevel: "risky", points: 3, feedback: "Skilled attackers can execute commands too fast to follow or use hidden processes. Watching doesn't protect you." },
    ],
  },
  {
    id: "se-watering",
    title: "Watering Hole Attack",
    category: "Social Engineering",
    icon: "Link",
    description: "A trusted industry forum has been compromised.",
    context: `You regularly visit an industry forum for your profession. Today, your browser shows a warning:\n\n"⚠️ This site may be compromised. A third-party script has been detected that may attempt to install software on your device."\n\nYou've used this forum safely for years. Some colleagues have mentioned the forum was recently updated and looks slightly different.`,
    options: [
      { id: "se5-1", text: "Ignore the warning — I've used this site for years safely", riskLevel: "dangerous", points: 0, feedback: "This describes a watering hole attack — hackers compromise trusted sites to target specific groups. Browser warnings exist for good reason!" },
      { id: "se5-2", text: "Heed the warning, close the site, and alert the forum admins", riskLevel: "safe", points: 10, feedback: "Perfect response! Browser security warnings should always be taken seriously. Alerting admins helps protect the entire community." },
      { id: "se5-3", text: "Proceed but avoid logging in or downloading anything", riskLevel: "risky", points: 3, feedback: "Compromised sites can execute malicious scripts automatically, even without downloads. The browser warning means active threats were detected." },
      { id: "se5-4", text: "Clear my browser cache and try again", riskLevel: "risky", points: 3, feedback: "Clearing cache won't remove a compromised site's malicious scripts. The threat is on the server side, not in your cache." },
    ],
  },
];

export const categoryIcons: Record<string, string> = {
  Phishing: "Mail",
  "Fake Websites": "Globe",
  "Online Scams": "Gift",
  "Data Theft": "UserX",
  "Social Engineering": "Link",
};
