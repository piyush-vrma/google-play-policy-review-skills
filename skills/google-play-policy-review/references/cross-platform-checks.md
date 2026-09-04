# Cross-Platform & Hybrid Ecosystems Policy Reference
> In-depth inspection rules and remediation templates for Flutter, React Native, Expo, KMP, MAUI, Cordova/Ionic, Capacitor, and Unity.

---

## Table of Contents
1. [Flutter / Dart Inspection & Remediation](#flutter)
2. [React Native & Expo (Managed vs Bare)](#react-native-expo)
3. [Kotlin Multiplatform (KMP)](#kmp)
4. [.NET MAUI](#maui)
5. [Cordova, Ionic & Capacitor (Webview Policies)](#hybrid-webviews)
6. [Unity Game Engine Compliance](#unity)

---

## 1. Flutter / Dart Inspection & Remediation {#flutter}

### Dependencies Audit (`pubspec.yaml`):
Grep for plugins that collect data or declare dangerous permissions:
- `firebase_analytics`, `firebase_crashlytics` → Must be declared in Data Safety.
- `geolocator`, `location` → Must be declared in Data Safety; requires prominent disclosure if used off-screen.
- `device_info_plus` → Inspect if reading `androidInfo.id` (Android ID); Android ID must not be used for persistent tracking.
- `photo_manager` → Verify scoped storage handling; ensure granular media permissions for Android 13+.
- `permission_handler` → Verify only necessary permissions are requested and rationale is presented.

### Flutter Runtime Permission Template:
```dart
import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';

Future<bool> requestMediaPermissionWithRationale(BuildContext context) async {
  var status = await Permission.photos.status;
  if (status.isGranted) return true;

  if (status.isDenied) {
    final userConsent = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Access to Media Required'),
        content: const Text(
          'This app requires media access to display and organize your saved images.'
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
          TextButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Grant')),
        ],
      ),
    );

    if (userConsent == true) {
      final result = await [Permission.photos, Permission.videos].request();
      return result.values.every((s) => s.isGranted);
    }
  }
  return false;
}
```

---

## 2. React Native & Expo (Managed vs Bare) {#react-native-expo}

### React Native Dependencies:
- `@react-native-firebase/analytics`, `@react-native-firebase/crashlytics` → Declare in Data Safety.
- `react-native-google-mobile-ads` → Check UMP consent flow implementation.
- `react-native-permissions` → Verify Android runtime rationale dialogs.
- `react-native-iap` / `react-native-purchases` (RevenueCat) → Verify Play Billing v7+ compliance for digital goods.

### Expo Managed Workflow:
- Check `app.json` or `app.config.js`:
  ```json
  {
    "expo": {
      "android": {
        "package": "com.example.app",
        "permissions": ["READ_MEDIA_IMAGES", "READ_MEDIA_VIDEO"],
        "blockedPermissions": ["android.permission.MANAGE_EXTERNAL_STORAGE"]
      }
    }
  }
  ```
- **Plugins (`expo.plugins`)**: Examine each plugin to identify build-time injected permissions (e.g. `expo-location` injects background location if configured).
- **OTA Updates (expo-updates / CodePush)**: Dynamic JS updates are permitted only when they bug-fix existing features. Downloading new native modules or altering core functionality outside Google Play review is a direct violation of the Device & Network Abuse policy.

---

## 3. Kotlin Multiplatform (KMP) {#kmp}

### Multiplatform Manifest & SDK Targets:
- Verify `android` block in `build.gradle.kts`:
  ```kotlin
  android {
      compileSdk = 35 // or 36/37
      defaultConfig {
          minSdk = 24
          targetSdk = 35 // Must meet active rolling floor
      }
  }
  ```
- Shared code in `commonMain` may invoke platform channels or expect permissions; verify corresponding declarations exist in `androidMain/AndroidManifest.xml`.

---

## 4. .NET MAUI {#maui}

- Check `.csproj` for target framework: `<TargetFrameworks>net8.0-android;net9.0-android</TargetFrameworks>`.
- Check `Platforms/Android/AndroidManifest.xml` for permissions and `<queries>` tags.
- Verify that runtime permissions use `Microsoft.Maui.ApplicationModel.Permissions` with custom rationale dialogs prior to prompting.

---

## 5. Cordova, Ionic & Capacitor (Webview Policies) {#hybrid-webviews}

### 🔴 Top Rejection Risk — Minimum Functionality Policy:
- Google Play strictly rejects apps that simply package a website into a WebView with zero native platform features or offline support.
- The app must provide genuine native utility (local storage, native notifications, camera integration, offline workflows) beyond the mobile web experience.

### Secure WebView Configuration:
```typescript
// Capacitor config - capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  webDir: 'dist',
  server: {
    // 🔴 VIOLATION: Never use cleartext in production
    cleartext: false,
    androidScheme: 'https'
  }
};
export default config;
```

---

## 6. Unity Game Engine Compliance {#unity}

### 64-Bit & Target API:
- Verify Player Settings in `ProjectSettings/ProjectSettings.asset`:
  - `Scripting Backend`: Must be set to **IL2CPP** (Mono does not produce required 64-bit ARM64 binaries).
  - `Target API Level`: Must meet the active rolling target SDK floor.
- Review integrated ad mediation plugins (Unity Mediation, AppLovin MAX, IronSource) for GDPR/TCF consent compliance and Families COPPA flags if the game appeals to children.
