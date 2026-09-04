# Design: Master Google Play Policy Review & Remediation Skill

## Context

Mobile developers face severe compliance risks as Google Play continuously updates policies, tightens API restrictions, and accelerates AI-driven enforcement. Current reference skills present significant gaps:
1. **`google-play-policy-guardian-2026`**: Introduces real-time web sync, 2026 enforcement shifts (180-day appeal hard window, formal Plan of Action, AdMob TCF v2.3, Contact/Location pickers), and self-update logging.
2. **`google-play-policy-remediation`**: Provides Principal Android Engineer rigor, strict 4-tier classification taxonomy (`Confirmed violation`, `Policy risk`, `Needs Play Console verification`, `Not applicable`), file:line citations, and safe data-preserving remediations.
3. **`playstore-review`**: Covers universal 9-framework detection, merged manifest awareness, Play Billing v7+ vs third-party payments, and top-10 rejection quick checks.

A critical limitation of static tools is that they become obsolete once a new year arrives or Google changes requirements. This design builds a **future-proof, auto-updating, and dynamically adaptable master skill (`google-play-policy-review`)** adhering to Anthropic's **`skill-creator`** progressive disclosure standard.

---

## Goals / Non-Goals

**Goals:**
- Deliver a unified, production-grade master skill in `.agents/skills/google-play-policy-review/`.
- **Auto-Updating & Multi-Year Adaptability**: Support 2026, 2027, and future policy cycles dynamically without requiring code redesigns.
- **Dynamic Rolling Rule Engine**: Calculate target API requirements dynamically based on execution date and Google's rolling 1-year window instead of hardcoding static years.
- **Autonomous Self-Update Protocol**: Enable the skill to query official Google Play developer portals, log discoveries to `policy-sync-log.md`, and update modular references in-place using structured timestamped annotations.
- Adhere strictly to the Anthropic `skill-creator` progressive disclosure model: root `SKILL.md` orchestrator (<500 lines) with domain-specific modular reference guides in `references/`.
- Provide complete static audit and remediation coverage across 9 frameworks: Native Android (Kotlin/Java), Flutter, React Native, Expo (Managed & Bare workflows), Kotlin Multiplatform (KMP), .NET MAUI, Cordova/Ionic, Capacitor, and Unity.
- Implement interactive user gating before modifying any source code.
- Provide a standardized benchmark suite in `evals/` to validate triggering accuracy and audit quality.

**Non-Goals:**
- Perform speculative refactoring or rewrite unaffected app logic.
- Guarantee Google Play Store approval (console declarations, store listings, Data Safety responses, and account standing are outside source code control).
- Create runtime automated emulator dynamic testing (the skill performs static code, configuration, and manifest analysis).
- Support circumvention of Google Play policies or DRM restrictions.

---

## Skill Architecture & Directory Layout

The master skill is structured into a 3-tier progressive disclosure hierarchy with future-proof reference naming:

```
.agents/skills/google-play-policy-review/
├── SKILL.md                         # Orchestrator (<500 lines): metadata, triage, dynamic execution phases
├── policy-sync-log.md               # Persistent historical log of web search policy updates across years
├── references/                      # Tier 3: Modular domain guides read on-demand
│   ├── policy-core.md               # Core policy baseline, dynamic rolling rules & active requirements
│   ├── ads-monetization.md          # AdMob, IAB TCF consent, UMP, Play Billing v7+ vs 3rd party
│   ├── framework-guides.md          # Framework detection & config markers (9 frameworks)
│   ├── native-checks.md             # Kotlin/Java manifest, permissions, and code patterns
│   ├── cross-platform-checks.md     # Flutter, RN, Expo, KMP, MAUI, Web-wrapper patterns
│   └── recovery-appeals.md          # 180-day appeal window, Plan of Action (POA) templates
└── evals/                           # Tier 3: Benchmarking suite following skill-creator
    ├── evals.json                   # Realistic user test prompts across audit, fix, and appeal
    └── eval_metadata.json           # Evaluation rubrics and quantitative assertions
```

### Progressive Disclosure Model:
1. **Tier 1: Metadata (YAML Frontmatter)**: Always in the LLM's context (~120 words). Contains pushy, proactive triggering instructions covering all user phrasing.
2. **Tier 2: Core Orchestrator (`SKILL.md`)**: Loaded only when the skill triggers (<500 lines). Contains operating rules, dynamic rolling rule calculations, framework triage logic, phase orchestration (Phase 0 to Phase 4), and output report formats.
3. **Tier 3: Bundled Modular Resources (`references/`)**: Loaded conditionally based on app context (e.g. `native-checks.md` is loaded only for Kotlin/Java; `ads-monetization.md` is loaded only when ad SDKs are detected).

---

## Dynamic Multi-Year Engine & Autonomous Self-Update Protocol

### 1. Dynamic Rolling Target SDK Engine
Google Play requires apps to target an API level within **one year of the latest stable Android release**:
- Rather than a hardcoded number, the skill evaluates the current date `D` and year `Y`.
- Hard floors shift annually on August 31:
  - Submissions up to Aug 31, 2025: targetSdk >= 34
  - Submissions up to Aug 31, 2026: targetSdk >= 35 (API 36/37 accepted)
  - Submissions post Aug 31, 2026: targetSdk >= 36 (Android 16 floor)
  - Submissions post Aug 31, 2027: targetSdk >= 37 (Android 17 floor)
- The skill dynamically determines which threshold applies during audit execution.

### 2. Phase 0 Dynamic Search Queries
During Phase 0, the skill computes `current_year` and `next_year` dynamically and executes live searches:
```
1. site:support.google.com/googleplay/android-developer "policy" updates [current_year]
2. site:support.google.com/googleplay/android-developer "policy" updates [next_year]
3. Google Play Developer Policy changes [current_year]
4. Google Play target API level requirements [current_year]
5. Google Play "high risk behavior" developer account termination [current_year]
6. Google Play AdMob policy violations banned [current_year]
```

### 3. In-Place Reference Self-Update Protocol
When Phase 0 searches detect newly published policies, shifted deadlines, or new API constraints:
1. The skill opens the relevant modular reference file in `references/`.
2. It prepends a dated policy update block:
   ```markdown
   ### [YYYY-MM-DD] POLICY UPDATE
   Source: [Official Google URL]
   Change: [Plain-English explanation of the change]
   Effective Date: [Date]
   ```
3. It annotates any superseded baseline text with strike-through notation:
   `~~[superseded guidance]~~ ← OUTDATED as of [YYYY-MM-DD], see update above`
4. It logs the change into `policy-sync-log.md`.
5. It informs the user of newly synced policy items during the audit run.
*Rule*: Existing entries are never deleted, ensuring a permanent, auditable historical record.

---

## YAML Frontmatter & Triggering Specification

Adhering to the `skill-creator` directive that LLMs tend to undertrigger, the frontmatter uses comprehensive, proactive language:

```yaml
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
```

---

## Operating Phases & Workflow Execution

### Phase 0: Dynamic Policy Sync & Self-Update
- Compute current year and query official Google Play Developer support portals.
- Compare live results against offline baseline in `references/policy-core.md`.
- Annotate outdated entries and log new discoveries to `policy-sync-log.md`.

### Phase 1: Framework & Context Discovery
- Inspect root detection markers to identify the framework across the 9 supported ecosystems.
- Locate build configs (`targetSdk`, `minSdk`, dependencies) and manifests.
- Inventory all third-party SDKs to detect build-time merged manifest injections (`AD_ID`, `QUERY_ALL_PACKAGES`).

### Phase 2: Systematic Audit & Classification
Classify every finding using the 4-tier taxonomy:
1. `Confirmed violation`: Clear source code or manifest violation.
2. `Policy risk`: Gray areas or patterns flagged by automated review.
3. `Needs Play Console verification`: Requirements residing in Play Console (Data Safety, declarations, store listing).
4. `Not applicable`: Policies evaluated and verified irrelevant.

Severity ratings:
- 🔴 `Critical`: Immediate account termination or app removal risk.
- 🟠 `High`: Submission rejection risk.
- 🟡 `Medium`: Warning or review delay risk.
- 🟢 `Low`: Quality and best practice recommendation.

### Phase 3: Interactive Safe Remediation
- Display exact file and line number.
- Explain the policy justification.
- Present a clean before-and-after diff.
- Enforce explicit user confirmation (`yes / skip / modify`).
- Ensure storage changes provide data migrations to protect existing user data.
- Log applied changes to `fix-log.md`.

### Phase 4: Appeal & Recovery Protocols
- Enforce the **180-day appeal hard window** from the notice date.
- Generate a formal 5-pillar Plan of Action (POA): Developer Identity & Independence, Hardware Audit, Network/IP Audit, App-by-App Policy Remediation, Compliance Commitment.
- Provide AdMob reinstatement workflows and post-reinstatement clean-slate republication checklists.

---

## Technical Decisions & Trade-Offs

### Decision 1: Future-Proof File Naming & Dynamic Rolling Rules
- *Choice*: Rename `policy-areas-2026.md` to `policy-core.md` and implement dynamic rolling target-SDK calculation.
- *Rationale*: Avoids obsolescence when transitioning into 2027 and future Android OS versions. The skill remains permanently viable without requiring architectural rename refactoring.

### Decision 2: Modular References vs. Monolithic Document
- *Choice*: Split deep domain rules into 6 modular files in `references/`.
- *Rationale*: A monolithic 50KB+ document causes context pollution, slow execution, and hallucinated line numbers in LLMs. Modular references ensure the agent reads only relevant context.

### Decision 3: Rigorous 4-Tier Classification
- *Choice*: Adopt `Confirmed violation`, `Policy risk`, `Needs Play Console verification`, `Not applicable`.
- *Rationale*: Avoids false assurances. Code audits cannot verify console declarations or developer account standing; classifying console items explicitly prevents surprise rejections.

### Decision 4: Interactive Confirmation Gate
- *Choice*: Never modify code automatically without presenting diffs and awaiting user confirmation.
- *Rationale*: Automated mass rewrites can break production apps and corrupt user databases. Safe remediation requires developer approval.

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Rapidly changing Play policies | Outdated recommendations | Phase 0 live web sync with dynamic year queries and in-place reference self-update protocol |
| False positives on cross-platform deep links | Unnecessary code changes | Explicit distinction between Intent deep links (`wa.me`) and illegal HTTP scraping |
| Destructive code modifications | Lost user data | Migration preservation requirement and interactive user confirmation gate |
