# Universal Mobile Framework Detection & Inspection Guide
> Inspection targets, config discovery, and merged manifest rules across 9 mobile ecosystems.

---

## Table of Contents
1. [Framework Detection Matrix](#detection-matrix)
2. [Ecosystem Inspection Targets](#ecosystem-targets)
3. [Expo Special Handling (Managed vs Bare)](#expo-special)
4. [Merged Manifest Awareness & SDK Injection](#merged-manifest)
5. [Release Configuration & Security Hygiene](#security-hygiene)

---

## 1. Framework Detection Matrix {#detection-matrix}

To accurately audit an app, first identify the framework from the project's root markers:

| Framework | Detection Markers | Primary Config Files |
|---|---|---|
| **Native Kotlin/Java** | `build.gradle`, `build.gradle.kts`, `app/src/main/` | `app/build.gradle(.kts)`, `app/src/main/AndroidManifest.xml` |
| **Flutter** | `pubspec.yaml`, `lib/main.dart` | `pubspec.yaml`, `android/app/build.gradle`, `android/app/src/main/AndroidManifest.xml` |
| **React Native** | `package.json` with `react-native`, `android/` | `package.json`, `android/app/build.gradle`, `android/app/src/main/AndroidManifest.xml` |
| **Expo** | `app.json` or `app.config.js` with `expo`, `eas.json` | `app.json`, `app.config.js`, `eas.json`, `package.json` |
| **Kotlin Multiplatform (KMP)** | `build.gradle.kts` with `multiplatform`, `composeApp/` | `build.gradle.kts`, `composeApp/src/androidMain/AndroidManifest.xml` |
| **.NET MAUI** | `*.csproj` with `Microsoft.Maui`, `Platforms/Android/` | `*.csproj`, `Platforms/Android/AndroidManifest.xml` |
| **Cordova / Ionic** | `config.xml`, `ionic.config.json` | `config.xml`, `platforms/android/app/src/main/AndroidManifest.xml` |
| **Capacitor** | `capacitor.config.ts/json`, `android/app/` | `capacitor.config.ts`, `android/app/src/main/AndroidManifest.xml` |
| **Unity** | `ProjectSettings/`, `.unity` assets | `ProjectSettings/ProjectSettings.asset`, exported Gradle manifest |

---

## 2. Ecosystem Inspection Targets {#ecosystem-targets}

### 1. Native Android (Kotlin / Java):
- Inspect `app/build.gradle` or `app/build.gradle.kts` for `compileSdk`, `targetSdk`, and dependencies.
- Inspect `app/src/main/AndroidManifest.xml` for declared permissions, exported components (`android:exported="true"`), and foreground service types.
- Check ProGuard/R8 rules in `proguard-rules.pro` to ensure release obfuscation is active.

### 2. Flutter:
- Scan `pubspec.yaml` for data-collecting dependencies (`geolocator`, `firebase_analytics`, `google_mobile_ads`, `photo_manager`, `permission_handler`).
- Inspect `android/app/build.gradle` for `targetSdkVersion` (must meet dynamic rolling requirement).
- Inspect `lib/` for runtime permission requests using `permission_handler` and ensure rationale is displayed before request.

### 3. React Native:
- Scan `package.json` dependencies: `@react-native-firebase/analytics`, `react-native-google-mobile-ads`, `react-native-permissions`, `react-native-iap`.
- Check native Android layer in `android/app/src/main/AndroidManifest.xml`.
- Inspect JS OTA update libraries (CodePush) — dynamic JS code hot-patching is tolerated only when it does not modify the core app utility declared during review.

### 4. Kotlin Multiplatform (KMP / Compose Multiplatform):
- Check `composeApp/build.gradle.kts` or `androidApp/build.gradle.kts` for `android` block configuration.
- Check `androidMain/AndroidManifest.xml` for shared vs platform-specific permissions.

### 5. .NET MAUI:
- Inspect `*.csproj` for `<ApplicationTitle>`, `<ApplicationId>`, `<SupportedOSPlatformVersion>`, and NuGet dependencies.
- Check `Platforms/Android/AndroidManifest.xml` for permissions and exported activity declarations.

### 6. Cordova / Ionic & Capacitor:
- Check `config.xml` (Cordova) or `capacitor.config.ts` (Capacitor).
- Verify webview bridge permissions and plugins in `package.json`.
- **Minimum Functionality Check**: Verify the app does not merely load a single remote URL inside a WebView (bare website wrapper = instant rejection under Minimum Functionality policy).

### 7. Unity:
- Inspect `ProjectSettings/ProjectSettings.asset` for Bundle Identifier, Target API Level, and Scripting Backend (IL2CPP required for 64-bit support).
- Check exported Gradle manifest for ad mediation SDKs (Unity Ads, IronSource, AppLovin).

---

## 3. Expo Special Handling (Managed vs Bare) {#expo-special}

Expo applications may not have an `android/` directory if running the managed workflow:
1. **Permission Definitions**:
   - Check `expo.android.permissions` in `app.json` or `app.config.js`.
   - Check `blockedPermissions` to confirm sensitive permissions are blocked.
2. **Build-Time Plugin Injections**:
   - Expo plugins in `expo.plugins` inject native permissions at build time!
   - Example: `expo-location` injects `ACCESS_FINE_LOCATION` and `ACCESS_COARSE_LOCATION`.
   - Example: `expo-camera` injects `CAMERA`.
   - Always inspect each plugin in `app.json` to understand what permissions will appear in the generated manifest.
3. **EAS Build Configuration**:
   - Inspect `eas.json` — ensure the `production` profile does NOT have `developmentClient: true`.

---

## 4. Merged Manifest Awareness & SDK Injection {#merged-manifest}

During the Gradle build process, dependencies inject permissions and components into the final binary via **Manifest Merging**. An audit must not look solely at `app/src/main/AndroidManifest.xml`:

| Integrated Library / SDK | Hidden Injected Permissions / Components | Action Required |
|---|---|---|
| `play-services-ads` (AdMob) | `com.google.android.gms.permission.AD_ID` | Declare in Data Safety; remove if targeting children |
| `firebase-analytics` | `ACCESS_NETWORK_STATE`, `WAKE_LOCK` | Declare analytics data collection in Data Safety |
| Barcode / QR Scanning SDKs | `android.permission.CAMERA` | Declare camera rationale if required |
| Old Analytics / Attribution SDKs | `QUERY_ALL_PACKAGES` (legacy SDKs) | Remove outdated SDK or add `<remove>` manifest tag |

### Blocking Injected Permissions:
To prevent an SDK from injecting an unwanted permission, use `tools:node="remove"`:
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
    
    <!-- Strip AD_ID injected by ad/analytics SDK for children's apps -->
    <uses-permission 
        android:name="com.google.android.gms.permission.AD_ID" 
        tools:node="remove" />
</manifest>
```

---

## 5. Release Configuration & Security Hygiene {#security-hygiene}

Prior to release submission, check the following technical hygiene parameters:

### 🔴 Critical Security Flags:
- **`android:debuggable="true"`**: Must NEVER be present in a release build or release manifest.
- **`android:usesCleartextTraffic="true"`**: Prohibited unless specifically restricted to `localhost` in a `network_security_config.xml`. All production traffic must be HTTPS.
- **Hardcoded Secrets**: Scan for embedded API keys (`Bearer`, `secret_key`, AWS tokens, service-account JSONs).
- **Keystore Files**: Never commit `.jks`, `.keystore`, or release credentials to version control.
