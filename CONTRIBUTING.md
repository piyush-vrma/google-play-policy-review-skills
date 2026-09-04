# Contributing to Google Play Policy Review Agent Skills

Thank you for contributing to `google-play-policy-review-skills`!

This repository provides an autonomous policy review and remediation skill for AI coding agents (Claude Code, Antigravity, Cursor, Cline, Windsurf, OpenCode, Codex, and more). Changes directly affect how AI agents audit real Android applications and guide developers through Google Play compliance.

---

## 📁 Repository Structure

The primary skill lives in the top-level `skills/` directory:

```text
skills/
└── google-play-policy-review/
    ├── SKILL.md                  # Workflow orchestration (< 250 lines)
    ├── policy-sync-log.md        # Enforcement baseline & policy delta records
    ├── references/               # Modular deep-dive inspection guides
    │   ├── policy-core.md        # Permissions, targetSdk, privacy policies
    │   ├── ads-monetization.md   # Billing v7+, AdMob, IAB TCF v2.3, ad placement
    │   ├── framework-guides.md   # 9-framework detection markers
    │   ├── native-checks.md      # Kotlin/Java manifest & code checks
    │   ├── cross-platform-checks.md # Flutter, React Native, Expo, KMP, etc.
    │   └── recovery-appeals.md   # 180-day appeal hard window & 5-Pillar POA
    └── evals/                    # Test cases and evaluation harness
        ├── eval_metadata.json
        ├── evals.json
        └── run-evals.js
```

---

## 🌟 What Makes a Good Contribution

- **Policy Delta Updates**: Keeping the baseline up-to-date with Google Play policy announcements (e.g. 2026/2027 shifts, API floor changes).
- **Framework Detection & New Plugins**: Adding detection markers and permission audit patterns for new cross-platform libraries (Flutter, React Native, Expo, KMP, etc.).
- **Safe Remediation Patterns**: Improving code refactoring snippets (e.g. Photo Picker, system contact picker, Location Button) ensuring zero data migration regressions.
- **Evaluation Test Cases**: Adding realistic scenarios and rejection notice test cases in `evals/evals.json`.
- **Documentation & Ergonomics**: Making instructions clearer, fixing typos, or improving prompt engineering in `SKILL.md`.

---

## 🚫 What Is Usually Out of Scope

- Speculative or opinionated architectural refactors that are not grounded in official Google Play Developer Program Policies.
- Framework-specific boilerplate that bloats `SKILL.md` (keep detailed guides in `references/`).
- Arbitrary permission removals that break legitimate core app functionality.

---

## 📋 Contribution Workflow

1. **Check Issues**: Check existing issues and PRs to avoid duplicate work.
2. **Adhere to `skill-creator`**: Keep `SKILL.md` under 250 lines, moving deep domain references into `references/`.
3. **Validate Changes**: Run the evaluation suite:
   ```bash
   node skills/google-play-policy-review/evals/run-evals.js
   ```
4. **Submit PR**: Open a pull request using the provided PR template.
