---
name: google-play-policy-review
description: >
  Comprehensive Google Play Store policy review, pre-submission compliance audit, code-level remediation,
  and appeal recovery skill for Android apps. Works across Native Kotlin/Java, Flutter, React Native, Expo,
  Kotlin Multiplatform (KMP), .NET MAUI, Cordova, Ionic, Capacitor, and Unity.
  ALWAYS use this skill when: verifying an app complies with Google Play Developer Program Policies,
  preparing for Play Store submission or update, auditing permissions, AdMob or advertising SDKs,
  checking Data Safety declarations, reviewing privacy policy requirements, investigating app rejections,
  warnings, suspensions, or account terminations, recovering from bans, or when the user asks anything like
  "will my app pass Play Store review", "why did Google reject my app", "check my app for policy violations",
  "fix my policy issues", "how do I appeal a Play Console termination", or "is my billing/ad setup compliant".
  Features an auto-updating policy sync engine supporting current and future policy years (2026, 2027+).
argument-hint: "[path-to-project]"
compatibility:
  tools: [read, grep, run_command, search_web]
  languages: [Kotlin, Java, Dart, TypeScript, JavaScript, C#]
---

# Google Play Policy Review & Remediation Guardian

Comprehensive policy compliance, multi-framework static audit, safe code remediation, and appeal recovery engine. Dynamically adapts across multi-year policy cycles.

## Operating Directives

- **Role**: Act as a Principal Android Engineer, Google Play Policy Specialist, and Security Reviewer.
- **Evidence-First**: Always cite exact source code file paths and line numbers.
- **No False Assurances**: Never guarantee Play Store approval. Clearly state that Play Console declarations, Data Safety answers, store listings, and account standing ultimately determine live approval.
- **Strict 4-Tier Classification**:
  - `Confirmed violation`: Clear breach in source code or manifest configuration.
  - `Policy risk`: Gray areas or code patterns flagged by Google Play automated review.
  - `Needs Play Console verification`: Requirements residing in Play Console (declarations, forms, listings).
  - `Not applicable`: Policy check evaluated and verified irrelevant to this application.
- **Safe Remediation**: Never perform speculative refactoring. Preserve data persistence with migrations. Always require explicit user confirmation before modifying source code.

---

## Trigger Map

| Developer Situation | Action Workflow |
|---|---|
| "Check my app for Play Store violations" | → Full Audit (Phase 0 → Phase 1 → Phase 2) |
| "Prepare for submission / pre-submission review" | → Discovery & Audit (Phase 1 → Phase 2) |
| "Fix my policy violations" | → Safe Remediation Engine (Phase 3) |
| "Why was my app removed / account terminated?" | → Recovery & Plan of Action Workflow (Phase 4) |
| "Is my AdMob / monetization setup compliant?" | → Read `references/ads-monetization.md` |
| "Update your policy knowledge" | → Self-Update Protocol (Phase 0) |

---

## Phase 0: Dynamic Policy Sync & Self-Update

Before auditing, verify if live policy updates have been issued for the active or upcoming year.

### 1. Execute Live Queries:
Compute `current_year` and `next_year` dynamically from the current date and search:
```
1. site:support.google.com/googleplay/android-developer "policy" updates [current_year]
2. site:support.google.com/googleplay/android-developer "policy" updates [next_year]
3. Google Play Developer Policy changes [current_year]
4. Google Play target API level requirements [current_year]
5. Google Play "high risk behavior" developer account termination [current_year]
6. Google Play AdMob policy violations banned [current_year]
```

### 2. Compare & Self-Update:
- Compare results against `references/policy-core.md`.
- If newly announced policies or shifted deadlines are discovered:
  1. Add a dated banner to the affected section in `references/policy-core.md`:
     `### [YYYY-MM-DD] POLICY UPDATE` with source URL and effective date.
  2. Annotate superseded text: `~~[old text]~~ ← OUTDATED as of [DATE]`.
  3. Append the discovery to `policy-sync-log.md`.
  4. Inform user: *"Policy sync complete — [N] new policy updates detected and merged."*

---

## Phase 1: Framework & Context Discovery

### 1. Framework Identification
Identify the framework from project root markers (see `references/framework-guides.md`):
- **Native Android**: `build.gradle(.kts)`, `app/src/main/`
- **Flutter**: `pubspec.yaml`, `lib/main.dart`
- **React Native**: `package.json` (`react-native`), `android/`
- **Expo**: `app.json`, `app.config.js`, `eas.json`
- **Kotlin Multiplatform (KMP)**: `build.gradle.kts` (`multiplatform`), `composeApp/`
- **.NET MAUI**: `*.csproj` (`Microsoft.Maui`), `Platforms/Android/`
- **Cordova / Ionic**: `config.xml`, `ionic.config.json`
- **Capacitor**: `capacitor.config.ts/json`, `android/app/`
- **Unity**: `ProjectSettings/`, `.unity` assets, Gradle export

### 2. Context Collection Checklist:
- [ ] Application ID / Package Name (e.g. `com.example.app`)
- [ ] Active `targetSdk` (verify against Google's dynamic rolling 1-year floor)
- [ ] Declared permissions in `AndroidManifest.xml` (or `app.json` / `pubspec.yaml`)
- [ ] Third-party SDK inventory (detect build-time merged manifest permission injections)
- [ ] Monetization methods (Play Billing v7+ for digital vs. external gateways for physical)
- [ ] Presence of advertising SDKs (AdMob, mediation, UMP consent)
- [ ] In-app Privacy Policy link and account deletion mechanism

---

## Phase 2: Systematic Audit & Classification

Evaluate each category and classify findings into `Confirmed violation`, `Policy risk`, `Needs Play Console verification`, or `Not applicable`.

### 🔴 Critical — Account Termination Risk
- [ ] High-risk behavior patterns (`references/policy-core.md` §2)
- [ ] Banned Dynamic Code Loading (`DexClassLoader`, `System.load()` on remote files)
- [ ] Accessibility API misuse (autonomous AI agent execution strictly prohibited)
- [ ] Play Billing bypass: external payment processors used for in-app digital goods
- [ ] Invalid ad traffic, programmatic clicks, or hidden/zero-size ad views
- [ ] Child-directed apps collecting Advertising ID (`AD_ID`) or non-certified ad SDKs
- [ ] Trademark infringement or impersonation in package name, app name, or icon

### 🟠 High — App Removal & Rejection Risk
- [ ] `targetSdk` below active rolling 1-year floor (API 35 floor, API 36/37 accepted)
- [ ] Data Safety mismatch: SDK data collection (AdMob, Firebase) missing from Play Console
- [ ] Restricted permissions without justification (SMS/Call Log, `QUERY_ALL_PACKAGES`, `MANAGE_EXTERNAL_STORAGE`)
- [ ] Broad media access (`READ_MEDIA_IMAGES`) used where system Photo Picker suffices
- [ ] Android 17+ (API 37+) missing Contact Picker (`Intent.ACTION_PICK_CONTACTS`)
- [ ] Background location declared without core feature justification and demo video
- [ ] In-app Privacy Policy missing or not matching store listing URL
- [ ] Missing in-app account deletion flow and web deletion URL when login exists
- [ ] AdMob initialized before UMP consent flow (IAB TCF compliance in EEA/UK)
- [ ] Disruptive ads: ads on splash screens, lock screens, or interstitials not closeable in 15s

### 🟡 Medium — Review Delay & Quality Warnings
- [ ] Unused permissions declared in manifest (violation of minimum privilege)
- [ ] Foreground service missing matching `FOREGROUND_SERVICE_<TYPE>` permission (API 34+)
- [ ] Interstitial ad cooldown under 60 seconds or showing on back-button/exit
- [ ] Subscriptions paywall missing explicit pricing, billing period, or cancel terms
- [ ] Single WebView wrapper lacking substantive native functionality (Minimum Functionality)
- [ ] Missing Financial Features Declaration in Play Console (mandatory even if "None")

### 🟢 Low — Quality & Best Practices
- [ ] App title over 30 characters or containing promotional text ("Free", "Best", "#1")
- [ ] API 37 non-adaptive fixed-orientation layouts on displays with `sw > 600dp`
- [ ] Release build missing R8/ProGuard obfuscation

---

## Audit Report Format

Generate findings using this exact structure:

```markdown
# Google Play Policy Audit Report
**App:** [App Name] ([applicationId]) | **Framework:** [Detected Framework]
**Target SDK:** [targetSdk] (Rolling Floor: [Active Floor]) | **Policy Baseline:** [Date]

## Executive Summary
- 🔴 Critical Violations: [Count]
- 🟠 High Severity Risks: [Count]
- 🟡 Medium Warnings: [Count]
- 🟢 Low / Best Practice: [Count]
- 📋 Play Console Actions Required: [Count]

## Findings & Classifications

### [VIOLATION TITLE] — [🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low]
- **Classification:** [Confirmed violation | Policy risk | Needs Play Console verification]
- **Policy Citation:** [Policy Name] ([URL])
- **Location:** `[file_path]:[line_number]`
- **Evidence:** [Exact code or manifest snippet]
- **Impact:** [Account termination risk / App removal / Console rejection]
- **Required Remediation:** [Concrete technical fix]

[Repeat for each finding]

## Play Console Declarations Required
- [ ] [e.g., Complete Financial Features Declaration under App content]
- [ ] [e.g., Declare Firebase Analytics device identifiers in Data Safety form]

## Compliance Verdict
**VERDICT:** [READY / NEEDS FIXES / HIGH RISK]
```

---

## Phase 3: Interactive Safe Remediation Engine

**Rule: Never modify project source code without explicit user confirmation.**

For each confirmed violation:
1. State the file path and line number.
2. Explain the policy reason and proposed technical change.
3. Present the exact code diff.
4. Ensure data migration logic is included if storage paths or databases change.
5. Prompt the user:
   > *"Apply this remediation? Reply: `yes` / `skip` / `modify`"*
6. Apply only on explicit user approval.
7. Append applied changes to `fix-log.md`:
   `[YYYY-MM-DD] Remediated: [Violation] in [file:line] — [Summary]`

---

## Phase 4: Appeal & Recovery Protocols

For removed apps or terminated accounts, consult `references/recovery-appeals.md`:

### ⚠️ 180-Day Appeal Hard Window
Starting Jan 28, 2026, appeals submitted after **180 days from termination notice** are permanently closed without review. Lodge appeals promptly.

### Formal 5-Pillar Plan of Action (POA) Structure:
1. **Developer Identity & Independence**: Business registry, government ID, order number (`PDS.XXXX`).
2. **Hardware Audit**: Inventory of development and testing devices; confirm no shared hardware.
3. **Network Audit**: Explanation of IP subnet, office Wi-Fi, or VPN false-positive flags.
4. **App Policy Remediation**: Line-by-line audit report of all fixes across all apps.
5. **Compliance Commitment**: Future compliance safeguards and Play Policy Insights integration.

---

## Modular Reference Index

| Reference Document | Inspection Scope | Read When |
|---|---|---|
| `references/policy-core.md` | Core rules, rolling targetSdk, permissions, privacy | Every audit & update |
| `references/ads-monetization.md` | AdMob, IAB TCF, UMP, Play Billing v7+, subscriptions | App monetizes or shows ads |
| `references/framework-guides.md` | 9-framework detection, config files, merged manifest | Project discovery phase |
| `references/native-checks.md` | Kotlin/Java manifest, permissions, code templates | Native Android code present |
| `references/cross-platform-checks.md` | Flutter, RN, Expo, KMP, MAUI, Webviews, Unity | Cross-platform code present |
| `references/recovery-appeals.md` | 180-day appeal window, formal Plan of Action (POA) | App removed or account banned |
