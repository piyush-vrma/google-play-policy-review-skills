# 🛡️ Google Play Policy Review Agent Skills

[![skills.sh](https://skills.sh/b/piyush-vrma/google-play-policy-review-skills)](https://skills.sh/piyush-vrma/google-play-policy-review-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

The production-grade **Google Play Store Policy Review, Pre-Submission Audit, Code Remediation, and Appeal Recovery Skill** for AI coding agents (Claude Code, Antigravity, Cursor, Cline, Codex, and more).

Supports native and cross-platform apps across **9 ecosystems**: Native Android (Kotlin/Java), Flutter, React Native, Expo, Kotlin Multiplatform (KMP), .NET MAUI, Cordova/Ionic, Capacitor, and Unity.

---

## 🚀 Quick Install via `skills.sh`

Install this skill directly into any project or globally using the `skills` CLI:

```bash
# Install to current project
npx skills add https://github.com/piyush-vrma/google-play-policy-review-skills --skill google-play-policy-review

# Or install globally across all supported coding agents
npx skills add https://github.com/piyush-vrma/google-play-policy-review-skills --skill google-play-policy-review -g
```

---

## 🌟 Key Capabilities

### 1. Multi-Year Policy Compliance (2026 & Beyond)
- **Dynamic Rolling Target SDK Rule**: Automatically enforces the 1-year rolling requirement (API 35 floor, API 36/37, auto-rolling annually post-August 31).
- **Permissions Audit**: Validates restrictions on `READ_MEDIA_IMAGES`/`READ_MEDIA_VIDEO` vs system Photo Picker (`PickVisualMedia`), Android 17+ Contact Picker (`ACTION_PICK_CONTACTS`), and Location Button one-time access.
- **Monetization & Ads**: Google Play Billing v7+ enforcement for digital items vs external processors for physical goods, AdMob IAB TCF v2.3 European consent compliance, and banner/interstitial placement restrictions.
- **Child & Family Safety**: COPPA compliance, zero `AD_ID` for child-directed apps, neutral age screening for mixed audiences.

### 2. Deep Multi-Framework Manifest & Code Inspection
Audits configuration files, code-level permission requests, and build-time merged manifests across:
- **Native Android** (Kotlin & Java)
- **Flutter** (`pubspec.yaml`, plugins, platform channels)
- **React Native & Expo** (`package.json`, `app.json`, config plugins, OTA hygiene)
- **Kotlin Multiplatform (KMP)**
- **.NET MAUI**
- **Cordova, Ionic & Capacitor**
- **Unity** (PlayerSettings, exported manifests)

### 3. Account Suspension & Rejection Recovery
- **180-Day Appeal Hard Window**: Immediate assessment and countdown calculation for Play Console termination notices.
- **5-Pillar Plan of Action (POA) Generator**: Structured appeals addressing root cause, hardware/network audit, identity verification, app remediation, and future compliance commitments.

---

## 📁 Repository Structure

```
├── .agents/skills/
│   └── google-play-policy-review/
│       ├── SKILL.md                  # Main skill entry point (< 250 lines)
│       ├── policy-sync-log.md        # Sync baseline and policy delta records
│       ├── references/               # Modular deep-dive reference guides
│       │   ├── policy-core.md        # Core policies, permissions & privacy
│       │   ├── ads-monetization.md   # AdMob, IAB TCF v2.3, Play Billing v7+
│       │   ├── framework-guides.md   # 9-framework detection markers
│       │   ├── native-checks.md      # Kotlin/Java code & manifest checks
│       │   ├── cross-platform-checks.md # Flutter, React Native, Expo, KMP, etc.
│       │   └── recovery-appeals.md   # 180-day POA generator & reinstatement
│       └── evals/                    # Test cases and evaluation suite
├── AGENTS.md                         # Repository mission and rules
├── openspec/                         # OpenSpec change management and active specs
└── README.md                         # This file
```

---

## 🛠️ Usage with Coding Agents

Once installed, trigger the skill naturally in your prompt:

- *"Audit my Android app before submitting to Google Play Store."*
- *"Why did Google reject my app for Photo and Video permissions?"*
- *"Check my Flutter app for AdMob and COPPA compliance."*
- *"Help me write a formal Plan of Action appeal for a Play Console account termination."*

---

## 📜 License

MIT License.
