# Advertising & Monetization Policy Reference
> Comprehensive guide for AdMob, mediation SDKs, Google Play Billing v7+, and Regional Consent.

---

## Table of Contents
1. [AdMob & Google Play Account Interlock](#account-interlock)
2. [Ad Placement & Disruptive Ads Rules](#placement-rules)
3. [Consent & GDPR: IAB TCF & UMP SDK](#consent-gdpr)
4. [Invalid Traffic & Click Fraud Prevention](#invalid-traffic)
5. [Ad Format Rules: App Open, Interstitial, Banner, Rewarded & Native](#format-rules)
6. [Families & Children's Ad Compliance (COPPA)](#families-coppa)
7. [Google Play Billing v7+ vs External Gateways](#play-billing)
8. [Subscription Transparency & Paywall Standards](#subscription-standards)
9. [Code Remediation Templates (Kotlin & Flutter)](#code-templates)

---

## 1. AdMob & Google Play Account Interlock {#account-interlock}

The Google Play Developer Account and Google AdMob account are closely interconnected:
- A severe policy violation on Google Play can trigger an automated audit and suspension of your AdMob account.
- Invalid traffic or click fraud flags on AdMob can trigger Google Play account termination under the Device and Network Abuse policy.
- If AdMob suspends an app or account, the developer must **immediately decouple all ad serving code** prior to submitting updates to Google Play to avoid app crashes and policy strikes.

---

## 2. Ad Placement & Disruptive Ads Rules {#placement-rules}

Google Play strictly prohibits disruptive and deceptive ad experiences:

### 🔴 Absolutely Prohibited Placements:
- **Splash / Loading Screens**: Displaying interstitial or banner ads during cold launch before the user can interact with the app.
- **Lock Screen & System UI**: Displaying ads on lock screens or within system notification shades.
- **Out-of-App Context**: Triggering interstitial or pop-up ads when the user is not actively inside the application.
- **Interactive Element Overlays**: Placing banner ads directly overlapping or within 50dp of buttons, text fields, or navigation tabs where accidental clicks occur.
- **Accidental Click Traps**: Placing banner ads as the header item of a scrollable `RecyclerView` or `ListView`.

---

## 3. Consent & GDPR: IAB TCF & UMP SDK {#consent-gdpr}

### Regional Consent & IAB TCF Standards:
- All developers serving ads to traffic originating in the EU, EEA, or UK MUST implement Google-certified CMPs utilizing **IAB Europe TCF**.
- Outdated TCF implementations trigger error code 1.4 ("Disclosed vendors missing") and cause Google to drop ad requests or fall back to Limited Ads, causing substantial revenue loss.
- Developers must maintain the Google User Messaging Platform (UMP) SDK on its latest stable release.

### Consent-First Initialization:
- You **CANNOT** call `MobileAds.initialize()` before verifying user consent state.
- Ad networks must not collect device identifiers or serve personalized ad requests without affirmative consent.
- Developers must provide an accessible in-app consent revocation option (e.g. in Settings).

---

## 4. Invalid Traffic & Click Fraud Prevention {#invalid-traffic}

Google permanently bans accounts for artificial impressions or programmatic clicks:

### 🔴 Zero-Tolerance Violations:
```kotlin
// 🔴 VIOLATION: Programmatically triggering clicks
adView.performClick()

// 🔴 VIOLATION: Hidden ad views collecting fraudulent impressions
adView.visibility = View.INVISIBLE
adView.alpha = 0.0f
adView.layoutParams = ViewGroup.LayoutParams(0, 0)

// 🔴 VIOLATION: Misrepresenting banner/interstitial ads as rewards
binding.unlockFeatureButton.setOnClickListener {
    interstitialAd.show(this) // Only Rewarded Ads may offer in-app incentives
}
```

---

## 5. Ad Format Rules {#format-rules}

### App Open Ads:
- Allowed exclusively on cold app starts or warm background resume.
- Banned on internal screen-to-screen transitions.

### Interstitial Ads:
- **60-Second Cooldown**: Must enforce at least a 60-second cooldown between consecutive interstitial displays.
- **15-Second Closeable Rule**: Interstitial ads MUST be dismissible by the user within 15 seconds.
- **No Exit Interstitials**: Banned from showing when the user presses back or attempts to exit the application.
- Must only be triggered at natural stopping points (e.g. level completion, document saved).

### Rewarded Ads:
- User must voluntarily initiate the ad via an explicit action (e.g., tapping "Watch ad for +50 coins").
- The declared reward must be promptly credited upon ad completion.
- Cannot force rewarded ads as a barrier to continue core usage.

### Native Ads:
- Must display an unmistakable, high-contrast label stating "Ad" or "Sponsored".
- Cannot hide the AdChoices logo or mimic native system buttons.

---

## 6. Families & Children's Ad Compliance (COPPA) {#families-coppa}

If an app's target audience includes children (under 13) or is in the Designed for Families program:
1. **Zero Advertising ID (`AD_ID`)**: The `com.google.android.gms.permission.AD_ID` permission MUST NOT be declared or merged.
2. **Families Self-Certified SDKs Only**: Only ad SDKs certified by Google Play Families program are permitted.
3. **COPPA Flags Mandatory**:
   ```kotlin
   val requestConfiguration = MobileAds.getRequestConfiguration().toBuilder()
       .setTagForChildDirectedTreatment(RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE)
       .setMaxAdContentRating(RequestConfiguration.MAX_AD_CONTENT_RATING_G)
       .build()
   MobileAds.setRequestConfiguration(requestConfiguration)
   ```
4. **No Behavioral Profiling**: Interest-based advertising and remarketing are strictly banned for children.

---

## 7. Google Play Billing v7+ vs External Gateways {#play-billing}

| Content / Service Type | Required Payment Processor | Policy Basis |
|---|---|---|
| **In-App Digital Content** (coins, gems, levels, pro unlocks) | **Google Play Billing v7+** | Developer Distribution Agreement §3.1 |
| **Digital Subscriptions** (cloud storage, streaming, premium membership) | **Google Play Billing v7+** | Developer Distribution Agreement §3.1 |
| **Physical Goods** (clothing, electronics, grocery delivery) | **Third-Party Gateways** (Stripe, PayPal, Braintree) | External processing permitted |
| **Physical Services** (ride-sharing, gym membership, cleaning) | **Third-Party Gateways** (Stripe, PayPal, Braintree) | External processing permitted |

*Warning*: Linking users out to external web views to purchase digital items at cheaper rates bypasses Google Play Billing and triggers immediate suspension.

---

## 8. Subscription Transparency & Paywall Standards {#subscription-standards}

Any subscription paywall must explicitly present:
1. Exact recurring cost and billing interval (e.g. "$9.99 / month").
2. Full payment schedule and auto-renewal terms.
3. Free trial duration and the exact date and amount charged when the trial ends.
4. Clear, direct guidance on how to cancel via the Google Play Subscription Center.

---

## 9. Code Remediation Templates {#code-templates}

### Kotlin: UMP Consent-First AdMob Initialization

```kotlin
class App : Application() {
    override fun onCreate() {
        super.onCreate()
        initConsentAndAds()
    }

    private fun initConsentAndAds() {
        val params = ConsentRequestParameters.Builder()
            .setTagForUnderAgeOfConsent(false)
            .build()

        val consentInfo = UserMessagingPlatform.getConsentInformation(this)
        consentInfo.requestConsentInfoUpdate(
            null,
            params,
            {
                UserMessagingPlatform.loadAndShowConsentFormIfRequired(
                    MainActivity.currentActivity,
                    { formError ->
                        if (consentInfo.canRequestAds()) {
                            MobileAds.initialize(this) {}
                        }
                    }
                )
            },
            { requestError ->
                // On consent error, initialize limited ads if permitted
                if (consentInfo.canRequestAds()) {
                    MobileAds.initialize(this) {}
                }
            }
        )
    }
}
```

### Flutter: Consent-First Initialization (`google_mobile_ads`)

```dart
import 'package:google_mobile_ads/google_mobile_ads.dart';

Future<void> setupAdsWithConsent() async {
  final params = ConsentRequestParameters();
  
  ConsentInformation.instance.requestConsentInfoUpdate(
    params,
    () async {
      if (await ConsentInformation.instance.isConsentFormAvailable()) {
        await ConsentForm.loadAndShowConsentFormIfRequired((formError) {
          _startAdsIfPermitted();
        });
      } else {
        _startAdsIfPermitted();
      }
    },
    (FormError error) {
      _startAdsIfPermitted();
    },
  );
}

void _startAdsIfPermitted() async {
  if (await ConsentInformation.instance.canRequestAds()) {
    await MobileAds.instance.initialize();
  }
}
```

### Kotlin: Interstitial Cooldown Helper (60-second limit)

```kotlin
object InterstitialHelper {
    private var lastShownTime = 0L
    private const val COOLDOWN_MS = 60_000L

    fun canShowInterstitial(): Boolean {
        val now = System.currentTimeMillis()
        return (now - lastShownTime) >= COOLDOWN_MS
    }

    fun markInterstitialShown() {
        lastShownTime = System.currentTimeMillis()
    }
}
```
