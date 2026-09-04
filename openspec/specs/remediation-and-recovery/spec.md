# remediation-and-recovery Specification

## Purpose
Defines the safe engineering remediation workflows, diff proposals, and structured appeal recovery procedures for removed apps and terminated developer accounts.

## Requirements

### Requirement: Safe Code-Level Remediation
The system SHALL propose precise, minimal, and non-speculative code modifications to fix confirmed policy violations while preserving application data integrity.

#### Scenario: Remediation proposal presented to user
- **WHEN** the user requests remediation of an audited violation
- **THEN** the system displays the current code snippet, the exact replacement diff, explains the policy basis, and prompts the user for explicit confirmation (`yes / skip / modify`) before applying any modifications.

#### Scenario: Storage migration safety
- **WHEN** remediating legacy storage permissions to scoped storage or MediaStore
- **THEN** the system SHALL provide data migration logic to ensure existing user files, databases, and shared preferences are preserved during app update.

#### Scenario: Audit logging of fixes
- **WHEN** a code fix is confirmed and applied
- **THEN** the system appends a timestamped record to `fix-log.md` detailing the violation, file location, and description of the fix.

### Requirement: 180-Day Termination Appeal Protocol
The system SHALL support developers facing account termination by enforcing the mandatory 180-day appeal deadline and generating a structured appeal package.

#### Scenario: Account termination recovery requested
- **WHEN** the user reports an account termination
- **THEN** the system immediately alerts the user to the hard 180-day appeal window from the date of termination notice and initiates the Plan of Action creation workflow.

#### Scenario: Formal Plan of Action generation
- **WHEN** creating a termination appeal package
- **THEN** the system SHALL generate a 5-pillar formal Plan of Action (POA) covering: 1) Developer Identity & Independence, 2) Hardware Audit, 3) Network and corporate IP audit, 4) App-by-app policy remediation log, and 5) Formal compliance commitment statement.

### Requirement: Follow-Up Re-Appeal & Association Handling
The system SHALL provide structured strategies for follow-up appeals after an initial rejection within the 180-day window.

#### Scenario: First appeal rejected
- **WHEN** an initial termination appeal is rejected
- **THEN** the system instructs the developer to avoid repeating past arguments, guides compilation of novel verifiable evidence (third-party privacy audit from Exodus Privacy, government ID, demo video), directly addresses automated AI association heuristics, and references EU Out-of-Court Dispute Resolution for eligible developers.

### Requirement: AdMob Enforcement Recovery
The system SHALL provide specific remediation and appeal pathways when an app or developer faces AdMob policy suspensions or account bans.

#### Scenario: AdMob account or app suspension
- **WHEN** an AdMob policy violation or invalid traffic flag is reported
- **THEN** the system instructs the developer on decoupling ad code before republishing, rectifying placement violations, updating to IAB TCF v2.3 with UMP, and filing the AdMob reinstatement appeal.

### Requirement: Post-Reinstatement Clean-Slate Republication
The system SHALL guide reinstated developers through the safe republication workflow to prevent triggering recurrent policy flags.

#### Scenario: App or account reinstated
- **WHEN** an account or app is successfully reinstated
- **THEN** the system provides a clean-slate pre-publish checklist (targetSdk >= 35, release signing, Financial Features Declaration, Data Safety verification) and recommends initiating a staged rollout to monitor Android Vitals.
