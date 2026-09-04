# framework-detection-audit Specification

## Purpose
Specifies universal framework detection, config discovery, static source code inspection, and audit reporting across 9 mobile ecosystems for Google Play compliance.

## Requirements

### Requirement: Universal Framework Detection
The system SHALL automatically detect the underlying mobile framework from source tree markers and adapt file inspection paths accordingly.

#### Scenario: Flutter project detected
- **WHEN** the project contains `pubspec.yaml` and `lib/main.dart`
- **THEN** the system identifies the project as Flutter, checks `pubspec.yaml` for data-collecting dependencies, and inspects `android/app/src/main/AndroidManifest.xml` and `android/app/build.gradle`.

#### Scenario: Expo managed workflow detected
- **WHEN** the project contains `app.json` or `app.config.js` with Expo configurations and lacks an `android/` directory
- **THEN** the system inspects `expo.android.permissions`, `expo.plugins` for build-time injected permissions, and `eas.json` build profiles.

#### Scenario: React Native bare workflow detected
- **WHEN** the project contains `package.json` with `react-native` and has an active `android/` directory
- **THEN** the system inspects `package.json` dependencies, native Android manifests, and JS bundle update configurations.

#### Scenario: Native Android or Kotlin Multiplatform detected
- **WHEN** the project contains `build.gradle(.kts)` and native manifest files in `app/src/main/` or `androidApp/` / `composeApp/`
- **THEN** the system inspects the native Android manifest, Gradle dependencies, and Kotlin/Java source code.

#### Scenario: .NET MAUI detected
- **WHEN** the project contains `*.csproj` with `Microsoft.Maui` and `Platforms/Android/`
- **THEN** the system inspects the MAUI Android manifest and NuGet package dependencies.

#### Scenario: Cordova, Ionic, or Capacitor detected
- **WHEN** the project contains `config.xml` or `capacitor.config.ts/json`
- **THEN** the system inspects plugin XMLs, native bridge configurations, and checks for WebView-wrapper minimum functionality compliance.

#### Scenario: Unity game project detected
- **WHEN** the project contains `ProjectSettings/` and `.unity` assets
- **THEN** the system inspects player settings, 64-bit IL2CPP backend settings, and exported Gradle manifests.

### Requirement: Merged Manifest Awareness & SDK Injection
The system SHALL inspect third-party library and SDK declarations in project dependency files to identify permissions and components injected at build time.

#### Scenario: Ad SDK or analytics library brings AD_ID or package visibility
- **WHEN** dependencies contain GMA SDK, Facebook SDK, or Firebase Analytics without explicit manifest declarations
- **THEN** the system notes that `AD_ID` or package visibility query flags are injected via manifest merging and verifies corresponding Play Console Data Safety entries or provides `tools:node="remove"` snippets.

### Requirement: Security and Build Hygiene Checks
The system SHALL scan code and configuration for critical security misconfigurations before release.

#### Scenario: Debuggable or cleartext traffic enabled in release
- **WHEN** the manifest or build configuration specifies `android:debuggable="true"` or `android:usesCleartextTraffic="true"` without a secure network security config
- **THEN** the system SHALL flag a `Confirmed violation` / `Critical` security issue.

#### Scenario: Hardcoded secrets or committed signing keys
- **WHEN** the project repository contains committed `.keystore` / `.jks` files or unencrypted private API keys
- **THEN** the system SHALL flag a `Critical` security violation.

### Requirement: Spam and Minimum Functionality Verification
The system SHALL verify that the application provides substantive native functionality and does not violate spam or webview-wrapper rules.

#### Scenario: Single WebView wrapper detected
- **WHEN** an app consists primarily of a single `WebView` or `CustomTabsIntent` wrapping an external website with zero native features
- **THEN** the system SHALL flag a `Confirmed violation` under the Minimum Functionality policy.

#### Scenario: Broken buttons or placeholder screens in release
- **WHEN** the codebase contains dead placeholder screens ("coming soon", "test") or TODO stubs in user-facing flows
- **THEN** the system SHALL flag a `Policy risk` under the App Quality & Functionality policy.

### Requirement: Structured Audit Report Generation
The system SHALL compile all findings into a structured compliance report using the standard classification taxonomy.

#### Scenario: Audit report presentation
- **WHEN** an audit completes
- **THEN** the system outputs an Executive Summary, categorized findings by severity (`Critical`, `High`, `Medium`, `Low`), explicit classification (`Confirmed violation`, `Policy risk`, `Needs Play Console verification`, `Not applicable`), exact file:line citations, and Play Console action items.
