## 1. Directory Structure & Scaffolding

- [x] 1.1 Scaffold the master skill directory layout at `.agents/skills/google-play-policy-review/` with `references/` and `evals/` subdirectories, and verify paths exist with `Test-Path`
- [x] 1.2 Author initial `policy-sync-log.md` with multi-year baseline sync history and verify markdown rendering and initial entry timestamps

## 2. Authoring Modular Reference Guides

- [x] 2.1 Author `references/policy-core.md` with future-proof dynamic rolling targetSdk rules (API 35/36/37+), restricted permissions, Data Safety, and self-update annotation instructions
- [x] 2.2 Author `references/ads-monetization.md` covering AdMob placement rules, IAB TCF consent, UMP SDK, Play Billing v7+ vs third-party payments, subscription paywall rules, and verify all ad policies are documented
- [x] 2.3 Author `references/framework-guides.md` defining detection markers, config paths, and merged-manifest audit rules across all 9 mobile frameworks, and verify matrix coverage
- [x] 2.4 Author `references/native-checks.md` with Kotlin/Java specific manifest, permissions, and code-level inspection patterns and safe remediation templates
- [x] 2.5 Author `references/cross-platform-checks.md` covering Flutter, React Native, Expo, KMP, MAUI, Cordova/Ionic, Capacitor, and Unity specific plugin and channel patterns
- [x] 2.6 Author `references/recovery-appeals.md` covering the 180-day appeal hard window, formal 5-pillar Plan of Action (POA) templates, and AdMob reinstatement procedures

## 3. Implementing Core SKILL.md Orchestrator

- [x] 3.1 Write `SKILL.md` frontmatter with comprehensive, proactive triggers, dynamic multi-year descriptions, and compatibility tags adhering to `skill-creator` standards
- [x] 3.2 Implement Phase 0 (Dynamic Multi-Year Policy Sync & Self-Update Protocol) and Phase 1 (Framework & Context Discovery) in `SKILL.md`, and verify dynamic year queries
- [x] 3.3 Implement Phase 2 (Audit Execution & Classification) with the 4-tier taxonomy (`Confirmed violation`, `Policy risk`, `Needs Play Console verification`, `Not applicable`) and standard report template in `SKILL.md`
- [x] 3.4 Implement Phase 3 (Interactive Safe Remediation Engine) and Phase 4 (Appeal & Recovery Protocols) in `SKILL.md`, and verify diff presentation and confirmation rules
- [x] 3.5 Verify that `SKILL.md` is strictly under 500 lines and all relative links to `references/` resolve correctly

## 4. Authoring Evaluation Benchmark Suite

- [x] 4.1 Author `evals/evals.json` containing representative test prompts across pre-submission audit, violation remediation, account termination appeal, and multi-year self-update scenarios following `skill-creator` schema
- [x] 4.2 Author `evals/eval_metadata.json` with structured assertion criteria, expectation fields (`text`, `passed`, `evidence`), and evaluation rubrics
- [x] 4.3 Validate complete change with `openspec validate create-google-play-policy-skill --strict` and verify zero errors
