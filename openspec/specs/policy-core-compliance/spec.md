# policy-core-compliance Specification

## Purpose
Defines the centralized Google Play policy compliance rules, verification constraints, live policy sync protocol, dynamic multi-year rolling rules, and self-updating engine for mobile applications across 2026, 2027, and future cycles.

## Requirements

### Requirement: Real-Time Policy Sync & History Logging
The system SHALL support fetching real-time policy announcements from official Google Play Developer support channels, comparing them against the offline baseline, and dynamically adapting to the current and upcoming policy years.

#### Scenario: Dynamic multi-year search queries
- **WHEN** the user initiates an audit or requests a policy update check
- **THEN** the system dynamically resolves the current calendar year `Y` and upcoming year `Y+1`, executes searches targeting official Google Play developer support portals for `Y` and `Y+1` policy updates, and evaluates any new requirements against the baseline.

#### Scenario: Policy sync logging
- **WHEN** new policy changes or clarifications are discovered
- **THEN** the system appends a timestamped record to `policy-sync-log.md` detailing the source URL, policy domain, effective deadline, and impacted framework checks.

### Requirement: Autonomous Self-Update Protocol for Reference Documentation
The system SHALL support self-updating its own bundled reference documentation when new policy rules or shifted deadlines are detected.

#### Scenario: Updating reference files with newly announced policies
- **WHEN** Phase 0 live search identifies a new requirement not present in the offline baseline
- **THEN** the system SHALL update the relevant reference file in `references/` by adding a dated update banner (`### [DATE] POLICY UPDATE`) with the source URL, annotate any superseded statements as outdated (`~~old text~~ ← OUTDATED as of [DATE]`) without deleting historical records, and inform the user of the updated policies.

### Requirement: Dynamic Target SDK Rolling Rule Evaluation
The system SHALL calculate Google Play's mandatory target API minimum dynamically based on the current execution date and Google's rolling one-year target API policy (within 1 year of the latest stable Android major release).

#### Scenario: Target SDK below rolling requirement
- **WHEN** an app targets an API version below Google's active rolling minimum for the current date
- **THEN** the system SHALL flag a `Confirmed violation` with `Critical` severity, indicating that Google Play blocks new app and update submissions for that API level.

#### Scenario: Latest stable Android API evaluation
- **WHEN** an app targets the latest released stable Android API level or its predecessor
- **THEN** the system SHALL mark the target SDK check as `Pass`, and verify any behavior changes associated with that API level (e.g. API 37 large-screen resizability opt-out removal).

### Requirement: Restricted Permissions & Sensitive APIs Audit
The system SHALL audit all declared permissions against the principle of minimum privilege and Google Play restricted permission guidelines across all current and future API levels.

#### Scenario: SMS or Call Log permissions present
- **WHEN** an app declares SMS or Call Log permissions (`READ_SMS`, `RECEIVE_SMS`, `READ_CALL_LOG`) without default handler status
- **THEN** the system SHALL flag a `Confirmed violation` / `Critical` severity and recommend standard Google Play compliant alternatives such as the SMS Retriever API or SMS User Consent API.

#### Scenario: Broad storage or media access requested
- **WHEN** an app declares `MANAGE_EXTERNAL_STORAGE` or legacy `READ_EXTERNAL_STORAGE` on API 33+ without core justification
- **THEN** the system SHALL flag a `Confirmed violation` and recommend the Android Photo Picker (`PickVisualMedia`) or Storage Access Framework.

#### Scenario: Autonomous AI use of Accessibility Service
- **WHEN** an app declares `BIND_ACCESSIBILITY_SERVICE` and utilizes autonomous AI agent planning or execution
- **THEN** the system SHALL flag a `Confirmed violation` with `Critical` severity under the Google Play Accessibility policy.

#### Scenario: Contacts permission audit
- **WHEN** an app requests `READ_CONTACTS` for invite or sharing flows where system Contact Picker suffices
- **THEN** the system SHALL flag a `Confirmed violation` and recommend the system Contact Picker (`Intent.ACTION_PICK_CONTACTS`).

#### Scenario: Background location verification
- **WHEN** an app requests `ACCESS_BACKGROUND_LOCATION`
- **THEN** the system SHALL verify core functionality justification, require a prominent in-app disclosure, and flag the requirement for a Play Console declaration and video demonstration.

### Requirement: Data Privacy, Disclosures & Account Deletion
The system SHALL enforce user privacy disclosures, consent timing, Data Safety section accuracy, and account deletion workflows.

#### Scenario: Privacy policy link verification
- **WHEN** an app collects user data
- **THEN** the system SHALL verify that an HTTPS privacy policy link is present in both the store listing and accessible inside the app UI.

#### Scenario: Account deletion mechanism
- **WHEN** an app provides user account registration or login
- **THEN** the system SHALL verify the existence of an in-app account deletion path AND a web-based deletion request URL.

#### Scenario: Prominent disclosure before sensitive access
- **WHEN** personal or sensitive data is collected for non-obvious features
- **THEN** the system SHALL verify that an in-app prominent disclosure dialog appears before the system permission prompt and requires affirmative user action.

### Requirement: Monetization & Payments Compliance
The system SHALL enforce Google Play Billing v7+ for digital goods while permitting external payment gateways only for physical goods and non-digital services.

#### Scenario: Digital goods billing bypass
- **WHEN** code uses Stripe, PayPal, or crypto gateways to unlock in-app digital features, subscriptions, or consumables
- **THEN** the system SHALL flag a `Confirmed violation` with `Critical` severity (account termination and app removal risk).

#### Scenario: Subscription paywall transparency
- **WHEN** an app offers recurring digital subscriptions
- **THEN** the system SHALL verify that the paywall presents clear billing intervals, recurring prices, renewal terms, free trial terms, and cancellation instructions before the purchase button.

### Requirement: Advertising Policy & Consent Compliance
The system SHALL verify that all integrated ad networks comply with placement restrictions and regional consent standards.

#### Scenario: Disruptive ad placements detected
- **WHEN** ads are displayed on app launch splash screens, lock screens, notification shades, or interstitials cannot be closed within 15 seconds
- **THEN** the system SHALL flag an ad policy violation with `High` severity.

#### Scenario: Consent-first initialization
- **WHEN** ad mediation or AdMob SDKs are initialized prior to User Messaging Platform (UMP) / IAB TCF consent resolution
- **THEN** the system SHALL flag a consent policy violation requiring consent-first initialization.

#### Scenario: Interstitial frequency cooldown
- **WHEN** interstitial ads are shown more frequently than once every 60 seconds or on back-button presses
- **THEN** the system SHALL flag a disruptive ads violation.

### Requirement: Families & Child Safety Compliance
The system SHALL verify that apps targeting children or a mixed audience comply with COPPA, Families Self-Certified Ads SDKs, and data protection rules.

#### Scenario: Child-directed app includes Advertising ID
- **WHEN** an app targeting children contains `com.google.android.gms.permission.AD_ID` or requests personal identifiers
- **THEN** the system SHALL flag a `Confirmed violation` with `Critical` severity.

#### Scenario: Mixed-audience age screening
- **WHEN** an app targets both children and adults
- **THEN** the system SHALL verify the presence of a neutral age screen before requesting personal information or serving ads.

### Requirement: Special Categories & AI Disclosures
The system SHALL enforce domain-specific safeguards for status savers, monitoring tools, financial features, and AI-generated content.

#### Scenario: Status saver / media downloader audit
- **WHEN** an app functions as a status saver or media downloader
- **THEN** the system SHALL verify it does not scrape social platform APIs, does not infringe trademarked brand names in title/package/icon, and accesses only local device media via scoped storage or MediaStore.

#### Scenario: AI-generated content in-app disclosure
- **WHEN** an app generates content dynamically using generative AI models
- **THEN** the system SHALL verify user-visible disclosure that content is AI-generated and verify an in-app reporting mechanism for prohibited content.

#### Scenario: Financial features declaration verification
- **WHEN** any app is reviewed for submission
- **THEN** the system SHALL flag the mandatory Play Console Financial Features Declaration check (even if declaring "None").
