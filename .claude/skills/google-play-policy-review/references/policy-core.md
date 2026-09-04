# Google Play Core Policy Reference & Dynamic Multi-Year Baseline
> Dynamically maintained baseline. Future policy changes are appended in-place via the Self-Update Protocol.
> Sources: support.google.com/googleplay/android-developer, developer.android.com

---

## Self-Update Protocol Instructions
When Phase 0 web search identifies new policy rules, shifted deadlines, or new API constraints:
1. Prepend a dated update section at the top of the relevant section below:
   ```markdown
   ### [YYYY-MM-DD] POLICY UPDATE
   Source: [Official Google URL]
   Change: [Plain-English explanation of the change]
   Effective Date: [Date]
   ```
2. Annotate any superseded text with strike-through notation:
   `~~[superseded text]~~ ← OUTDATED as of [YYYY-MM-DD], see update above`
3. Append a summary entry to `../policy-sync-log.md`.
4. **Never delete existing entries** — maintain historical records for multi-version compliance auditing.

---

## Table of Contents
1. [Dynamic Rolling Target SDK Engine & Multi-Year Timeline](#rolling-targetsdk)
2. [High-Risk Behaviors & Account Termination Triggers](#high-risk)
3. [Data Privacy, Consent & Data Safety Form](#privacy-data-safety)
4. [Permissions & Restricted APIs](#permissions-apis)
5. [Content Policy & Intellectual Property](#content-ip)
6. [Monetization, Financial & Billing Policies](#monetization-financial)
7. [AI-Generated Content Safeguards](#ai-content)
8. [Special Categories: Status Savers, Media Downloaders & Monitoring](#special-categories)
9. [Official Policy URLs for Live Sync](#policy-urls)

---

## 1. Dynamic Rolling Target SDK Engine & Multi-Year Timeline {#rolling-targetsdk}

### Google's Rolling One-Year Rule:
New apps and app updates submitted to Google Play must target an API level within **one year of the latest major Android release**:
- Google shifts the minimum accepted target SDK floor annually on **August 31**.
- Submissions targeting an API level below the rolling floor are blocked from Play Console release pipelines.
- Existing live apps targeting legacy APIs become unavailable to new users running newer Android OS versions.

### Multi-Year Target SDK Progression:
| Submission Date Window | Minimum Target SDK Floor | Supported / Future-Proof Target SDKs | Notes |
|---|---|---|---|
| **Aug 31, 2024 – Aug 30, 2025** | API 34 (Android 14) | API 35 | Legacy window |
| **Aug 31, 2025 – Aug 30, 2026** | **API 35 (Android 15)** | API 36, API 37 | Current hard minimum floor |
| **Aug 31, 2026 – Aug 30, 2027** | **API 36 (Android 16)** | API 37, API 38 | Upcoming floor shift |
| **Post August 31, 2027** | **API 37 (Android 17)** | API 38+ | Rolling forward annually |

### API 37 (Android 17) Behavior Notice:
- Android 17 reached stable release on June 16, 2026. Target SDK 37 is valid, supported, and accepted by Play Console.
- **Large-Screen Behavior Change**: Targeting API 37 removes developer opt-out for orientation and resizability restrictions on displays with `sw > 600dp`. Applications targeting 37 MUST support multi-window and adaptive layouts gracefully.

---

## 2. High-Risk Behaviors & Account Termination Triggers {#high-risk}

Google deploys automated AI pattern detection across the entire developer ecosystem. Detection of any of the following patterns triggers permanent account-level termination without prior warning:

### Automated Identity & Association Mapping:
- **Hardware Association**: Device fingerprints (MAC, hardware serials) associated with previously terminated accounts.
- **Network Association**: Shared corporate or residential IP subnets linked to bad actors.
- **Financial & Registration Association**: Reusing credit cards, billing addresses, bank accounts, or phone numbers from a banned account.
- **Signing Key Reuse**: Signing APKs/AABs with a keystore associated with a removed app or banned account.
- **Bulk Updating**: Uploading 10+ app updates across an account in a 24-hour window flags automated spam/bot detection.
- **AdMob Interlock**: An account termination on AdMob propagates to the associated Google Play Developer Account.

### Severe Source & Behavioral Triggers:
- **Cloaking / Conditional Execution**: Showing compliant screens during Play review and dynamically unlocking undisclosed features live via Firebase Remote Config or server responses.
- **Dynamic Code Loading (DCL)**: Downloading and executing executable code (`.dex`, `.jar`, `.so`, or native ELF binaries) from outside Google Play via `DexClassLoader` or `System.load()`.
- **Accessibility Service Abuse**: Using `AccessibilityService` for autonomous AI agent action execution (strictly prohibited since Oct 2025). Only bona fide accessibility tools (`isAccessibilityTool=true`) or deterministic rule-based triggers are permitted.

---

## 3. Data Privacy, Consent & Data Safety Form {#privacy-data-safety}

### Privacy Policy Requirements:
- A valid, publicly accessible HTTPS privacy policy URL must be linked **both** in the Play Console store listing **and** inside the app UI (e.g. Settings, About, or Onboarding screen).
- Must explicitly disclose: data collected, processing purpose, retention period, third-party SDK sharing, and account/data deletion methods.

### Data Safety Form Consistency (Top Cause of Rejections):
- Every piece of personal or sensitive user data collected by the app or third-party SDKs must be declared in the Play Console Data Safety form.
- **Common Omissions Causing Removal**:
  - Failing to declare Google Mobile Ads (AdMob) collecting Device IDs (`AD_ID`) and App Activity.
  - Failing to declare Firebase Analytics or Crashlytics collecting crash logs, device diagnostics, and instance IDs.
  - Failing to declare location data accessed by mediation SDKs.

### Prominent In-App Disclosure & Consent:
- When personal or sensitive data (precise location, contacts, phone state, media files) is collected for reasons not intuitively obvious from the app's core purpose, a prominent disclosure dialog must be displayed **before** the OS permission prompt.
- The disclosure must:
  1. Appear in the normal flow of the app without requiring navigation to a menu.
  2. Describe the exact data being accessed and the specific feature benefiting.
  3. Require affirmative, explicit user action (e.g., "Accept", "Grant") — dismissing on outside tap is prohibited.

### Mandatory Account Deletion (Play Policy & Apple 5.1.1v Equivalent):
- If the app enables users to create an account, it MUST provide:
  1. An in-app mechanism for users to delete their account and associated data.
  2. A dedicated web URL deletion request form declared in the Play Console Data Safety section.

---

## 4. Permissions & Restricted APIs {#permissions-apis}

All permissions must adhere to the principle of minimum privilege. Declaring unused or unjustified permissions is a direct violation of the Permissions Policy.

### High-Risk & Restricted Permissions:

```xml
<!-- 🔴 Prohibited without core-function justification & approved Declaration Form -->
<uses-permission android:name="android.permission.READ_SMS" />
<uses-permission android:name="android.permission.RECEIVE_SMS" />
<uses-permission android:name="android.permission.SEND_SMS" />
<uses-permission android:name="android.permission.READ_CALL_LOG" />
<uses-permission android:name="android.permission.WRITE_CALL_LOG" />
<uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" />
<uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.BIND_ACCESSIBILITY_SERVICE" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
```

### Permission Specifics:
- **SMS / Call Log**: Permitted only if the app is the default SMS/Phone handler. If used solely for OTP SMS verification, you MUST use the **SMS Retriever API** or **SMS User Consent API** (zero permissions required).
- **Photo & Video Access**:
  - `READ_MEDIA_IMAGES` and `READ_MEDIA_VIDEO` are prohibited for one-time or infrequent photo access (e.g. uploading a profile picture).
  - Apps MUST use the system **Photo Picker** (`ActivityResultContracts.PickVisualMedia`).
- **Contacts (October 2026 Enforcement)**:
  - Apps targeting Android 17+ (API 37+) must utilize the new **Contact Picker** (`Intent.ACTION_PICK_CONTACTS`).
  - `READ_CONTACTS` is restricted to apps whose primary core function requires full address book access, subject to Play Console declaration.
- **Location & Location Button (October 2026 Enforcement)**:
  - Apps requiring one-time precise location must utilize the OS **Location Button**.
  - `ACCESS_BACKGROUND_LOCATION` requires rigorous proof that background tracking is indispensable to the core service, a comprehensive declaration form, and a walkthrough video demonstration.
- **Package Visibility (`QUERY_ALL_PACKAGES`)**:
  - Prohibited for standard apps. Apps must specify exact target packages using the `<queries>` element in `AndroidManifest.xml`.
- **Foreground Services (API 34+)**:
  - Every foreground service must declare an explicit `android:foregroundServiceType` in the manifest and request the corresponding `FOREGROUND_SERVICE_<TYPE>` permission. The runtime service invocation must strictly match declared types.

---

## 5. Content Policy & Intellectual Property {#content-ip}

### Absolute Zero Tolerance:
- **CSAM (Child Sexual Abuse Material)**: Instant termination and criminal referral.
- **Hate Speech & Terrorist Promotion**: Severe discrimination or violent extremism.

### Intellectual Property (IP) & Impersonation:
- **No Trademark Infringement**: Never use registered trademarks (e.g., "WhatsApp", "Instagram", "TikTok", "YouTube") in the app title, package name, or launcher icon.
  - ❌ "WhatsApp Status Saver" → ✅ "Status Saver for WA Media" or "Media Saver Pro"
- **App Icons & Assets**: Do not mimic the iconography, color schemes, or assets of official apps.
- **Store Listing Metadata**:
  - Title: 30 characters maximum, no promotional buzzwords ("Free", "Best", "#1", ALL CAPS, emoji).
  - Description: Accurate representation without keyword stuffing.

---

## 6. Monetization, Financial & Billing Policies {#monetization-financial}

### Google Play Billing vs. External Gateways:
- **Digital Goods & Services**: Unlocking app functionality, virtual currencies, digital content, subscriptions, or cloud features MUST use **Google Play Billing Library v7+**.
- **External Payment Gateways (Stripe, PayPal, Braintree, Crypto)**:
  - Allowed ONLY for physical goods (e-commerce, food delivery, physical rides) or real-world physical services.
  - Using Stripe/PayPal to unlock digital features is an instant removal/termination trigger.

### Subscription Transparency:
- Paywall screens must display explicit terms before any purchase button:
  1. Exact price per billing period (e.g., "$4.99 / month").
  2. Renewal terms and grace period details.
  3. Free trial duration and the exact billing charge when the trial concludes.
  4. Clear instructions on how to cancel in Google Play Subscriptions Center.

### Financial Services & Loan Requirements:
- **Mandatory Declaration**: ALL apps must submit the Financial Features Declaration in Play Console (declare "None" if inapplicable).
- Personal loans with APR >= 36% (US) or loan terms < 60 days are banned.
- Loan apps are strictly forbidden from accessing contacts, photos, or media storage permissions.

---

## 7. AI-Generated Content Safeguards {#ai-content}

For applications generating text, images, code, or audio via generative AI (OpenAI, Gemini, Anthropic, local LLMs):
1. **User Interface Disclosure**: Clearly inform users when content is AI-generated.
2. **Content Safeguards**: Implement content filtering against prohibited content (CSAM, malware generation, election disinformation).
3. **In-App Reporting**: Provide an immediate in-app flagging/reporting mechanism for offensive AI output.
4. **Data Safety**: Disclose prompt transmission to third-party AI APIs in the Data Safety form.

---

## 8. Special Categories: Status Savers, Media Downloaders & Monitoring {#special-categories}

### Status Savers & Downloaders:
- Must only access media files already stored on the device using scoped storage or MediaStore.
- Banned from making HTTP requests or web scraping private social network APIs.
  - *Deep link distinction*: Passing `wa.me/<number>` to `Intent(ACTION_VIEW)` to launch the official app is permitted, provided no network HTTP request is performed by the helper app.
- Must not facilitate downloading DRM-protected copyright streams (e.g. YouTube video downloaders are banned under Developer Distribution Agreement section 3.3).

### Monitoring & Stalkerware:
- Covert surveillance or adult tracking apps are banned.
- Legitimate parental controls or enterprise device management must:
  1. Declare `isMonitoringTool="true"` metadata in the manifest.
  2. Display a persistent user-visible notification whenever monitoring is active.

---

## 9. Official Policy URLs for Live Sync {#policy-urls}

- **Policy Announcements (Real-time updates)**:
  `https://support.google.com/googleplay/android-developer/announcements/13412212`
- **Developer Program Policies**:
  `https://support.google.com/googleplay/android-developer/answer/9904549`
- **Target API Level Requirements**:
  `https://support.google.com/googleplay/android-developer/answer/11926878`
- **Permissions & Sensitive APIs**:
  `https://support.google.com/googleplay/android-developer/answer/16558241`
- **Contacts Permissions Policy**:
  `https://support.google.com/googleplay/android-developer/answer/16935362`
- **180-Day Appeal Policy**:
  `https://support.google.com/googleplay/android-developer/answer/16659089`
- **Data Safety Requirements**:
  `https://support.google.com/googleplay/android-developer/answer/10787469`
- **AdMob IAB TCF Compliance**:
  `https://support.google.com/admob/answer/15269273`
