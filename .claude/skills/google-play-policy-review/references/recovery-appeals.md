# Google Play Account Recovery & Appeals Guide
> Protocols, 180-day hard deadline procedures, and formal Plan of Action (POA) templates for app removals and account terminations.

---

## Table of Contents
1. [Quick Triage Matrix](#triage)
2. [The 180-Day Appeal Hard Window](#180-day-window)
3. [Section 1: App Removed, Account Active](#app-removed)
4. [Section 2: Account Terminated — Formal Plan of Action (POA)](#account-terminated)
5. [Section 3: Appeal Rejections & Escalation](#escalations)
6. [Section 4: AdMob Account Suspension & Recovery](#admob-recovery)
7. [Section 5: Post-Reinstatement Republication Checklist](#republication)
8. [Formal Appeal Letter Templates](#templates)

---

## 1. Quick Triage Matrix {#triage}

| Developer Situation | Immediate Action | Primary Section |
|---|---|---|
| **App Removed (Account Active)** | Audit cited violation, fix code, update Data Safety, submit update or appeal | [Section 1](#app-removed) |
| **Account Terminated (First Time)** | **Immediately initiate 180-day window clock**; compile 5-pillar Plan of Action | [Section 2](#account-terminated) |
| **Appeal Rejected Once** | Add substantive new evidence; address AI association flags; re-appeal | [Section 3](#escalations) |
| **AdMob Account Suspended** | Decouple ad SDKs from app immediately; resolve traffic/placement issues | [Section 4](#admob-recovery) |
| **Account Reinstated** | Follow clean-slate pre-publish checklist to republish without triggering flags | [Section 5](#republication) |

---

## 2. The 180-Day Appeal Hard Window {#180-day-window}

Google Play enforces a **strict, non-negotiable 180-day deadline** for submitting appeals following an account termination notice:
- **Hard Closure**: After 180 calendar days from the termination notice timestamp, the case is permanently closed. No further web appeals or human escalations are accepted.
- **Deadline Extension**: If an appeal is lodged near the 180-day deadline, Google grants an automatic 30-day extension from the date of their response.
- **Immediate Filing**: Never delay filing your appeal to "figure things out" months later. File promptly with a comprehensive Plan of Action.

---

## 3. Section 1: App Removed, Account Active {#app-removed}

1. **Extract Policy Citation**: Locate the exact violation email from Google Play (e.g. "Deceptive Behavior", "Data Safety mismatch", "Device and Network Abuse").
2. **Execute Full Audit**: Run the master audit skill across the entire repository to uncover all latent issues, not just the single cited violation.
3. **Apply Code & Metadata Fixes**:
   - Fix source code violations and preserve existing data migrations.
   - Update Play Console Data Safety and declaration forms.
4. **Submit Update or Appeal**:
   - If Play Console permits uploading a new bundle: upload the fixed AAB with incremented `versionCode`.
   - If in a hard "Removed" state requiring an appeal: submit the formal appeal detailing exact code changes before updating.

---

## 4. Section 2: Account Terminated — Formal Plan of Action (POA) {#account-terminated}

Under Google's AI-driven review process, standard conversational appeal requests are automatically rejected. Developers must submit a formal **5-Pillar Plan of Action (POA)**:

### The 5 Pillars of a Formal Plan of Action:

1. **Developer Identity & Independence**:
   - Government ID proof, business registration, and registration transaction order number (`PDS.XXXX-XXXX-XXXX-XXXXX`).
   - Affirmation that you are an independent entity with zero affiliation with previously terminated accounts.

2. **Hardware Audit**:
   - Comprehensive inventory of all development machines, build servers, and testing devices (Models, OS, MAC address fragments).
   - Confirmation that hardware was never used by or shared with banned developers.

3. **Network & Infrastructure Audit**:
   - Clarification of IP subnet environment (residential vs. shared corporate network vs. VPN).
   - Explanations of any corporate proxy or VPN usage that may have triggered automated association heuristics.

4. **App-by-App Policy Remediation Audit**:
   - Line-by-line audit report for every application published under the account.
   - Exact code fixes applied, permissions removed, and privacy disclosures updated.

5. **Formal Compliance Commitment**:
   - Commitment statement affirming compliance with Developer Program Policies and the Developer Distribution Agreement.
   - Documented integration of Android Studio Play Policy Insights for real-time linting.

---

## 5. Section 3: Appeal Rejections & Escalation {#escalations}

### Rules for Re-Appealing:
- ❌ **Never** resubmit the identical appeal text.
- ❌ **Never** create a new developer account (triggers instant automated AI termination for evasion).
- ❌ **Never** write emotional, accusatory, or threatening messages.
- ✅ **Always** attach new, verifiable proof (video demonstration, third-party privacy audit from exodus-privacy.eu.org, notarized ID verification).

### Escalation Options:
- **EU Out-of-Court Dispute Resolution**: For developers based in the EU/EEA, use the Routing ID provided in the termination notice to request an external mediator under DSA regulations.
- **Play Console Developer Community**: Submit a documented, factual escalation thread for Community Manager review.

---

## 6. Section 4: AdMob Account Suspension & Recovery {#admob-recovery}

1. **Isolate Code**: Immediately remove all AdMob initialization and ad units from your codebase to prevent runtime exceptions and further invalid impression reporting.
2. **Audit Placements**: Review ad layouts against `ads-monetization.md` (no ads on splash screens, no banner overlap, enforce 60s interstitial cooldown).
3. **Upgrade Consent**: Verify full compliance with IAB TCF and UMP SDK.
4. **File AdMob Appeal**: Submit the AdMob reinstatement form detailing traffic sources, fraud filters implemented, and layout corrections.

---

## 7. Section 5: Post-Reinstatement Republication Checklist {#republication}

When an account or app is successfully reinstated, follow this clean-slate checklist:

- [ ] `targetSdk` meets the active rolling target SDK requirement.
- [ ] No test ad unit IDs or test device hashes exist in the release artifact.
- [ ] Privacy policy URL is live, HTTPS, and accessible worldwide.
- [ ] Financial Features Declaration is filled in Play Console.
- [ ] Content Rating (IARC) questionnaire is retaken and accurate.
- [ ] Release AAB is signed with the registered release keystore.
- [ ] Staged Rollout initiated (recommend starting at 10% to monitor Android Vitals crash rate).

---

## 8. Formal Appeal Letter Templates {#templates}

### Template: Formal Plan of Action (Account Termination)

```text
Subject: Plan of Action & Reinstatement Appeal — [Developer Account Name / Email]
Account Order Number: PDS.XXXX-XXXX-XXXX-XXXXX
Date: [Date]

Dear Google Play Review & Policy Team,

I am formally appealing the termination of developer account [developer email], registered on [date]. I submit this formal Plan of Action (POA) containing empirical evidence of independent operation, technical remediation of all policy concerns, and future compliance safeguards.

1. DEVELOPER IDENTITY & INDEPENDENCE
- Account Email: [developer email]
- Registration Order ID: PDS.XXXX-XXXX-XXXX-XXXXX
- Status: Independent registered individual/entity. I have never owned, operated, or been employed by any other Google Play developer account. Attached is government-issued photo identification verifying my legal identity.

2. HARDWARE & NETWORK AUDIT (Addressing Association Heuristics)
- Primary Development Machine: [MacBook Pro / PC - Model, Serial]
- Testing Devices: [Pixel 8, Samsung S24]
- Network Environment: [Residential broadband / Static IP]. My workstation does not utilize shared public VPNs. Any automated association flag was likely triggered by [e.g. shared corporate co-working Wi-Fi / legacy ISP subnet rotation].

3. APP-BY-APP REMEDIATION REPORT
For each published application, I conducted an exhaustive audit:
App: [App Name] (Package: com.example.app)
- Target SDK: Upgraded to meet the active rolling target API floor.
- Permissions: Eliminated MANAGE_EXTERNAL_STORAGE and replaced with Android Photo Picker (PickVisualMedia).
- Ads & Consent: Integrated Google UMP SDK with IAB TCF compliance; added 60-second interstitial cooldown timers.
- Data Safety: Updated Play Console Data Safety form to explicitly reflect Firebase Analytics and Google Mobile Ads telemetry.

4. PREVENTATIVE SAFEGUARDS & COMMITMENT
- Integrated "Play Policy Insights" linting plugin within Android Studio.
- Established a pre-release compliance checklist strictly adhering to the Developer Program Policies.

Attached Documents:
- Identity Verification Document (ID.pdf)
- Complete Source Code Diff and Remediation Log (Audit_Diff.pdf)
- Video Walkthrough of Compliant Application Behavior (Demo.mp4)

I respectfully request that the committee review this empirical Plan of Action and reinstate my developer account.

Sincerely,
[Your Legal Name]
[Contact Phone Number]
[Physical / Business Address]
```
