# Policy Sync Log — Google Play Policy Review Skill
> Maintained automatically by the skill during Phase 0 live sync runs.
> Preserves all historical policy evolutions across multi-year cycles. Never delete entries.

---

## [2026-07-04] Policy Sync — Android 17 / API 37 + Rolling Rule Baseline
Sources checked:
- https://android-developers.googleblog.com/2026/03/the-third-beta-of-android-17.html (Beta 3 platform stability; API 37 apps accepted by Play)
- https://developer.android.com/blog/posts/android-17-is-here/ (Android 17 stable released June 16, 2026)
- https://android-developers.googleblog.com/2026/02/prepare-your-app-for-resizability-and.html (API 37 large-screen resizability)
- https://support.google.com/googleplay/android-developer/answer/16561298 (Target API rolling 1-year rule)
- https://support.google.com/googleplay/android-developer/answer/16659089 (180-day appeal hard window)
- https://support.google.com/googleplay/android-developer/answer/16558241 (Permissions 2026)
- https://support.google.com/googleplay/android-developer/answer/16935362 (Contacts Permissions policy Oct 2026)
- https://support.google.com/admob/answer/15269273 (AdMob IAB TCF v2.3 compliance)

### Active Multi-Year Policy Standards:

**TARGET SDK (Rolling 1-Year Rule & Annual Shifts)**
- Rolling rule: Submissions must target an API level within 1 year of the latest stable Android OS release.
- Current active hard minimum: `targetSdk >= 35` (Android 15) for all new apps and updates.
- API 36 (Android 16) and API 37 (Android 17, released stable June 16, 2026) fully accepted.
- Upcoming automatic shifts:
  - After August 31, 2026: targetSdk >= 36 floor enforced.
  - After August 31, 2027: targetSdk >= 37 floor enforced.
- API 37 behavior: targeting API 37 removes developer opt-out for orientation/resizability on large screens (`sw > 600dp`).

**180-DAY APPEAL HARD DEADLINE (Effective Jan 28, 2026 — ACTIVE)**
- Strict 180-day deadline from termination notice to file an appeal; after 180 days, cases are permanently closed.
- Automatic 30-day extension granted if appealing near the deadline.
- Formal 5-pillar "Plan of Action" (POA) document expected in all reviews (Hardware, Network, Identity, App Audit, Commitment).

**AI ENFORCEMENT & IDENTITY ASSOCIATIONS (ACTIVE)**
- Google AI actively correlates developer fingerprints across hardware, IP subnets, payment instruments, and phone numbers.
- Bulk update velocity flags (10+ updates in a single day trigger suspicious review).

**ACCESSIBILITY SERVICE (ACTIVE)**
- Autonomous AI-driven execution or planning via `AccessibilityService` is strictly banned. Only assistive tools with `isAccessibilityTool=true` or deterministic rules allowed.

**CONTACTS & LOCATION PRIVACY (Oct 28, 2026 Enforcements)**
- Apps targeting Android 17+ (API 37+) must use Android Contact Picker (`Intent.ACTION_PICK_CONTACTS`); `READ_CONTACTS` requires special Play Console declaration.
- Location Button required for one-time precise location access.

**ADMOB IAB TCF v2.3 (ACTIVE)**
- TCF v2.3 mandatory for EEA/UK traffic; non-compliance defaults to Limited Ads or dropped ad requests.
- UMP SDK updated with Cross-App Consent Syncing.

**FINANCIAL FEATURES & AI DISCLOSURES (ACTIVE)**
- Financial Features Declaration mandatory for ALL apps (even if declaring "None").
- AI-generated user-facing content requires prominent in-app disclosure and reporting mechanisms.

**PHOTO/VIDEO PICKER ENFORCEMENT (ACTIVE)**
- Broad `READ_MEDIA_IMAGES` / `READ_MEDIA_VIDEO` banned if the system photo picker (`PickVisualMedia`) suffices.

---

## [2026-06-11] Baseline Sync Archive
- Documented 180-day appeal hard window launch (Jan 28, 2026).
- Documented IAB TCF v2.3 enforcement (March 1, 2026).
- Documented Contacts Permission policy announcement for Android 17.
- Documented Developer Verification requirements for targeted markets.

---
*Future sync notes: Phase 0 dynamically appends new dated entries above on each live query run.*
