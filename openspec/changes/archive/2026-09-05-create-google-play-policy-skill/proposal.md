# Proposal: Master Google Play Policy Review & Remediation Skill

## Why

Developers currently face a fragmented landscape when auditing mobile apps for Google Play Store compliance: one reference skill provides 2026 policies and recovery workflows, another provides engineering personas and safe remediation principles, while a third provides multi-framework static detection across 9 ecosystems. Crucially, static compliance tools rapidly become obsolete as Google introduces annual enforcement shifts, changes target SDK requirements, and adjusts API restrictions. 

To solve this, we must build a unified, production-grade master skill (`google-play-policy-review`) that is **future-proof, auto-updating, and dynamically adaptable across upcoming years (2026, 2027, and beyond)**. By integrating a dynamic rolling rule engine, live search synchronization, and a structured self-update protocol alongside deep multi-framework analysis and safe remediation, this master skill will serve as a permanent, evolving asset for mobile engineering teams.

## What Changes

- **Unified Master Skill Architecture**: Create `google-play-policy-review` adhering to the `skill-creator` progressive disclosure model (root `SKILL.md` <500 lines, future-proof modular `references/`, and an evaluation suite in `evals/`).
- **Dynamic Multi-Year Rolling Rule Engine**: Rather than hardcoding static years, the skill calculates Google Play's mandatory target API minimum dynamically using Google's rolling 1-year window (within one year of the latest stable Android major release).
- **Live Search Policy Sync & Autonomous Self-Update Protocol**: Phase 0 automatically determines the current execution year and upcoming release cycle, queries official Google Play developer support portals, logs findings to `policy-sync-log.md`, and annotates offline references in-place without deleting historical baselines.
- **Universal Multi-Framework Inspection**: Support 9 ecosystems: Native Android (Kotlin/Java), Flutter, React Native, Expo (Managed & Bare workflows), Kotlin Multiplatform (KMP), .NET MAUI, Cordova/Ionic, Capacitor, and Unity, with deep merged-manifest awareness (SDK-injected permissions).
- **Principal Android Engineer Audit & Safe Remediation Engine**: Classify all findings using a 4-tier taxonomy (`Confirmed violation`, `Policy risk`, `Needs Play Console verification`, `Not applicable`) with file:line citations, non-speculative diffs, data migration preservation, and interactive user confirmation gating.
- **Complete Recovery & Appeals Blueprint**: Implement the 180-day appeal hard deadline protocol and generate 5-pillar formal **Plan of Action (POA)** appeal packages (developer identity, hardware audit, network audit, app audit, compliance commitment).
- **Benchmarking & Evaluation Suite**: Author realistic multi-scenario test prompts and quantitative assertion schemas in `evals/` following `skill-creator`.

### Non-Goals
- We will NOT perform speculative product changes or arbitrary code refactorings unrelated to policy compliance.
- We will NOT guarantee Google Play Store approval, as console declarations, Data Safety responses, store listings, and account standing are controlled outside source code.
- We will NOT support bypassing or circumventing Google Play policies or DRM restrictions.

## Capabilities

### New Capabilities
- `policy-core-compliance`: Centralized policy engine with dynamic multi-year rolling targetSdk calculations, restricted permissions, privacy & data safety, billing v7+, AdMob IAB TCF v2.3, live search sync, and the autonomous self-update protocol.
- `framework-detection-audit`: Universal framework detection and static source inspection across 9 mobile ecosystems (Native Android, Flutter, React Native, Expo, KMP, .NET MAUI, Cordova/Ionic, Capacitor, Unity) including merged manifest analysis.
- `remediation-and-recovery`: Principal Android Engineer safe remediation workflows (file:line citations, non-speculative diffs, user gating, data migrations) and formal 180-day appeal recovery (Plan of Action POA generation).

### Modified Capabilities
*(None - this is the initial establishment of the master capability specifications).*

## Impact

- **New Skill Location**: Creates master skill at `.agents/skills/google-play-policy-review/`.
- **Reference Skills Preserved**: Keeps `referenceskills/` as historical baselines while superseding them in functionality.
- **Multi-Agent Compatibility**: Works natively across Antigravity, Claude Code, Cursor, Gemini CLI, GitHub Copilot, Cline, and OpenAI/OpenCode agents.
- **Long-Term Maintainability**: Auto-updating capability ensures the skill stays current for 2027 and future Android OS releases without requiring code-level redesigns.
