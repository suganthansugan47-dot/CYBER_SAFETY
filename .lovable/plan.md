

# AI Cybersafety Advisor — Implementation Plan

## Overview
A client-side React web application that educates the public about cyber threats through interactive scenario simulations, risk scoring, and AI-powered safety tips — all running in the browser with no backend required.

---

## Pages & Features

### 1. Landing Page
- Hero section with a compelling headline about staying safe online
- Brief explanation of what the tool does
- "Start Assessment" call-to-action button
- Quick stats/icons showing threat categories covered (phishing, scams, fake websites, data theft, social engineering)

### 2. Scenario Simulator (Core Feature)
- **5 interactive scenarios**, each presenting a realistic cyber threat situation:
  1. **Phishing Email** — User sees a suspicious email and must decide how to respond
  2. **Fake Website** — User is shown a website screenshot and must identify red flags
  3. **Online Scam** — A too-good-to-be-true offer; user picks their response
  4. **Data Theft Attempt** — A social engineering scenario asking for personal info
  5. **Suspicious Link** — User evaluates a message with a shortened/suspicious URL
- Each scenario presents 3-4 response options (ranging from safe to risky)
- Immediate feedback after each answer explaining why a choice was safe or dangerous
- Progress indicator showing scenario completion

### 3. Risk Score Dashboard
- After completing all scenarios, users see a **risk score visualization** using Recharts (already installed):
  - Overall safety score (0-100)
  - Category breakdown (pie/radar chart showing strengths and weaknesses)
  - Risk level indicator (Low / Medium / High / Critical)
- Personalized risk assessment based on response patterns

### 4. AI Safety Advisor Panel
- Rule-based logic that analyzes user responses and detects risky behavior patterns
- Generates **personalized warnings and safety tips** based on:
  - Which scenarios the user failed
  - Common risky behaviors detected (clicking unknown links, sharing personal info, etc.)
- Tips organized by threat category
- "Learn More" expandable sections with detailed educational content

### 5. Cyber Safety Knowledge Base
- Educational cards/articles covering:
  - How to spot phishing emails
  - How to verify website authenticity
  - Common online scam patterns
  - Protecting personal data
  - Password security best practices
- Each topic has quick tips + detailed explanations

---

## Design & UX
- Modern, clean dark-themed UI with accent colors (cyber/tech aesthetic)
- Responsive design for mobile and desktop
- Smooth transitions between scenarios
- Visual indicators for safe vs. risky choices (green/red color coding)
- Engaging icons from Lucide for threat categories

## Data & Logic
- All scenarios, answers, and scoring logic stored as TypeScript data structures (no backend)
- Rule-based AI advisor logic built in JavaScript
- Risk score calculation based on weighted response analysis
- Results stored in browser localStorage so users can revisit

