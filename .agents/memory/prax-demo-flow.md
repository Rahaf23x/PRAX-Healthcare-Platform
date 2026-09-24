---
name: PRAX demo flow constraints
description: Durable product constraints for the PRAX emergency handoff prototype.
---

PRAX is intentionally a frontend-only demonstration: patient identity, medical records, AI support, hospital availability, transmission, ETA, and readiness are all simulated with fictional data.

**Why:** The prototype is for demonstrating the paramedic-to-hospital experience without exposing real patient data or requiring medical-system integrations.

**How to apply:** Keep future changes local and clearly labeled as demo behavior unless the user explicitly requests production integrations and supplies a new security/data-handling scope.

The user chose demonstration-only role sign-in rather than real accounts. Treat its username and password fields as walkthrough inputs, not an authorization boundary or recoverable account.

**Why:** Real sign-in and password reset would introduce account provisioning, role enforcement, and sensitive medical-data access concerns beyond this prototype.

**How to apply:** If a later request relies on these screens for actual access control or account recovery, first scope real authentication and role assignment instead of extending the demo fields as if they were secure.

Real ambulance GPS sharing requires verified staff roles and access limited to the receiving case; a fixed demo login must never authorize location disclosure.

**Why:** A live location is sensitive, and self-selected roles or shared demonstration credentials cannot identify authorized hospital staff.

**How to apply:** Before enabling location upload or hospital viewing, establish trusted role enrollment, case-specific permissions, destination coordinates, consent, and a stop-sharing path. Otherwise explicitly show that live GPS is disconnected.