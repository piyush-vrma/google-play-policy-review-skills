# Native Android (Kotlin / Java) Policy & Remediation Reference
> Code-level inspection patterns, manifest configurations, and safe remediation templates.

---

## Table of Contents
1. [Manifest Configuration & Component Security](#manifest-security)
2. [Runtime Permissions & Graceful Degradation](#runtime-permissions)
3. [Scoped Storage & Photo Picker Migration](#storage-photo-picker)
4. [Contacts Picker Implementation (Android 17+ / API 37)](#contacts-picker)
5. [Location Permissions & Location Button](#location-button)
6. [Network Security & Deep Link Distinction](#network-security)
7. [Safe Remediation Code Templates](#remediation-templates)

---

## 1. Manifest Configuration & Component Security {#manifest-security}

### Exported Components (`android:exported`):
On Android 12+ (API 31+), all components (`<activity>`, `<service>`, `<receiver>`) containing `<intent-filter>` must explicitly declare `android:exported="true"` or `android:exported="false"`.
- Keep internal receivers and services `android:exported="false"`.
- Only activities meant to be launched by other apps (e.g., launcher activity or deep link handler) should declare `android:exported="true"`.

### Foreground Service Types (API 34+):
```xml
<!-- 🔴 Must declare explicit type and matching FOREGROUND_SERVICE permission -->
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_DATA_SYNC" />

<service
    android:name=".sync.SyncService"
    android:foregroundServiceType="dataSync"
    android:exported="false" />
```
*Note*: Using `dataSync` or `specialUse` requires submitting an explanation and demo video in Play Console.

---

## 2. Runtime Permissions & Graceful Degradation {#runtime-permissions}

### 🔴 Violation Patterns:
```kotlin
// 🔴 VIOLATION: Blindly requesting permissions at app launch
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    requestPermissions(arrayOf(Manifest.permission.CAMERA), 101) // No context
}

// 🔴 VIOLATION: Killing app if permission is denied
if (grantResults[0] != PackageManager.PERMISSION_GRANTED) {
    finish() // App must degrade gracefully!
}
```

### ✅ Compliant Lifecycle:
1. Check if permission is already granted.
2. If not, check `shouldShowRequestPermissionRationale()`.
3. If true, present an in-app dialog explaining why the permission is required.
4. Request permission via `ActivityResultContracts.RequestMultiplePermissions()`.
5. If denied, degrade gracefully with an empty state and manual grant prompt.

---

## 3. Scoped Storage & Photo Picker Migration {#storage-photo-picker}

### 🔴 Storage Permissions to Eliminate:
- `READ_EXTERNAL_STORAGE` / `WRITE_EXTERNAL_STORAGE`: Deprecated on API 33+.
- `MANAGE_EXTERNAL_STORAGE`: Prohibited for media/gallery/status saver apps.

### ✅ Compliant Photo/Video Picker (Zero Permissions Required):
```kotlin
// Modern Android Photo Picker does NOT require READ_MEDIA_IMAGES permission
val pickMedia = registerForActivityResult(ActivityResultContracts.PickVisualMedia()) { uri ->
    if (uri != null) {
        processSelectedImage(uri)
    }
}

// Launch single image/video picker
pickMedia.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageAndVideo))
```

---

## 4. Contacts Picker Implementation (Android 17+ / API 37) {#contacts-picker}

Starting October 28, 2026, apps targeting Android 17+ (API 37+) may not request `READ_CONTACTS` for invite or sharing flows:

```kotlin
// 🔴 VIOLATION: Requesting broad READ_CONTACTS permission for sharing
val cursor = contentResolver.query(ContactsContract.Contacts.CONTENT_URI, ...)

// ✅ CORRECT: Launch system Contact Picker (user selects specific contact)
val contactPickerLauncher = registerForActivityResult(
    ActivityResultContracts.StartActivityForResult()
) { result ->
    if (result.resultCode == Activity.RESULT_OK) {
        val contactUri = result.data?.data
        contactUri?.let { retrieveContactDetails(it) }
    }
}

fun launchContactPicker() {
    val intent = Intent(Intent.ACTION_PICK, ContactsContract.Contacts.CONTENT_URI)
    contactPickerLauncher.launch(intent)
}
```

---

## 5. Location Permissions & Location Button {#location-button}

For one-time precise location access (effective October 2026):
- Use the Android **Location Button** rather than requesting perpetual `ACCESS_FINE_LOCATION`.
- If background tracking is essential, request `ACCESS_COARSE_LOCATION` and `ACCESS_FINE_LOCATION` first in the foreground, then request `ACCESS_BACKGROUND_LOCATION` separately with an approved declaration form and video walkthrough.

---

## 6. Network Security & Deep Link Distinction {#network-security}

### Distinguishing HTTP Network Requests vs. Intent Deep Links:
Automated scanners often flag URLs such as `https://wa.me/...` or `https://api.whatsapp.com/...`. Distinguish the two in code:
- **Violation**: Passing the URL into an HTTP client (OkHttp, Retrofit, Volley, `HttpURLConnection`) to scrape or fetch data from another service's private endpoint.
- **Allowed**: Wrapping the URL in an `Intent(Intent.ACTION_VIEW, uri)` to launch the external application.

```kotlin
// ✅ Compliant Intent Deep Link (No HTTP call, no scraping)
fun openWhatsAppChat(phoneNumber: String, message: String) {
    val encodedMsg = URLEncoder.encode(message, "UTF-8")
    val uri = Uri.parse("https://wa.me/$phoneNumber?text=$encodedMsg")
    val intent = Intent(Intent.ACTION_VIEW, uri).apply {
        setPackage("com.whatsapp")
    }
    startActivity(intent)
}
```

---

## 7. Safe Remediation Code Templates {#remediation-templates}

### Template: Complete Permission Request Flow with Rationale & Graceful Degradation

```kotlin
class MediaViewerActivity : AppCompatActivity() {

    private val mediaPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val isGranted = permissions.values.all { it }
        if (isGranted) {
            loadLocalMedia()
        } else {
            showGracefulDegradationUI()
        }
    }

    private fun checkAndRequestMediaPermissions() {
        val permissions = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            arrayOf(Manifest.permission.READ_MEDIA_IMAGES, Manifest.permission.READ_MEDIA_VIDEO)
        } else {
            arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE)
        }

        val missingPermissions = permissions.filter {
            ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }

        if (missingPermissions.isEmpty()) {
            loadLocalMedia()
            return
        }

        val shouldShowRationale = missingPermissions.any {
            ActivityCompat.shouldShowRequestPermissionRationale(this, it)
        }

        if (shouldShowRationale) {
            AlertDialog.Builder(this)
                .setTitle("Media Permission Required")
                .setMessage("This feature needs permission to access your media to display saved items.")
                .setPositiveButton("Continue") { _, _ ->
                    mediaPermissionLauncher.launch(missingPermissions.toTypedArray())
                }
                .setNegativeButton("Not Now") { dialog, _ ->
                    dialog.dismiss()
                    showGracefulDegradationUI()
                }
                .show()
        } else {
            mediaPermissionLauncher.launch(missingPermissions.toTypedArray())
        }
    }

    private fun showGracefulDegradationUI() {
        binding.emptyStateText.text = "Permission was not granted. Tap below to select individual files via Photo Picker."
        binding.grantPermissionButton.visibility = View.VISIBLE
    }
}
```
