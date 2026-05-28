# Portfolio Security Specification - Phase 0

This specification describes the security requirements and invariants for the Developer Portfolio Firestore database, focusing on two key collections: `messages` (contact requests from outside visitors) and `projects` (dynamic projects rendered on the page).

## 1. Data Invariants

### Collection: `messages`
- **Creation**: Any public user can submit a message (write-only).
- **Validation**: Submissions must contain a valid `name`, `email` format, `subject`, `message`, and `createdAt` that strictly matches the server timestamp.
- **Access Control**: Users *cannot* list, get, update, or delete submitted messages. Only authenticated admin users can read or manage contact messages.
- **Spam Guard**: Document ID sizes are restricted to protect against path exhaustion, and fields have strict text lengths limits.

### Collection: `projects`
- **Read**: Publicly readable (all users, authenticated or anonymous).
- **Write (Create/Update/Delete)**: Restriced exclusively to designated Administrator accounts.
- **Admin Verification**: Roles must be verified server-side through a trusted database entry matching the user's authenticated UID, or by checking against a bootstrapped admin list containing the owner's email (`govindmalwal62@gmail.com`) with verified email checks (`request.auth.token.email_verified == true`).
- **Validation**: Fields must adhere to proper types, `title` and `description` must have appropriate size constraints, and `category` must be one of the enum values: `["AI", "Web Apps", "Games", "College Projects"]`.

---

## 2. The "Dirty Dozen" Malicious Payloads

The rules are designed to fail-close against these specific exploit scenarios:

1. **Unauthenticated Project Ingestion**
   An attacker attempts to write a new project document to deface the homepage. Expected result: `PERMISSION_DENIED`.

2. **Unverified Email Privilege Escalation**
   An attacker signs up with the email `govindmalwal62@gmail.com` but with `email_verified: false` to hijack the admin panel. Expected result: `PERMISSION_DENIED`.

3. **Message Hijacking (Read Leak)**
   A curious user queries `/messages` to read contact submissions sent by other visitors. Expected result: `PERMISSION_DENIED`.

4. **Timestamp Spoofing**
   An attacker submits a contact message with a manually forged, back-dated `createdAt` timestamp (e.g., in 1970). Expected result: `PERMISSION_DENIED`.

5. **Resource Exhaustion (Denial of Wallet)**
   An attacker submits a 2MB long title within a project or contact request. Expected result: `PERMISSION_DENIED` due to size checks.

6. **Shadow Field Inundation**
   An attacker injects an extra property `isAdmin: true` into their contact collection or updates. Expected result: `PERMISSION_DENIED` thanks to `keys().size()` check.

7. **Category Spoofing**
   An attacker attempts to set a project's `category` to `"Malware"` (not in the allowed enum). Expected result: `PERMISSION_DENIED`.

8. **Path ID Poisoning**
   An attacker sends a write with a massive 10KB special character document ID to cause internal routing failures. Expected result: `PERMISSION_DENIED` because `isValidId` restricts characters.

9. **Project Deletion Exploit**
   A standard user sends a deletion request to a project document. Expected result: `PERMISSION_DENIED`.

10. **Message Overwrite/Update**
    An attacker attempts to update a previously submitted contact message to wipe out evidence or change content. Expected result: `PERMISSION_DENIED`.

11. **Anonymously Writing Empty Project**
    An attacker attempts to create a completely blank project with no title, description, or tech stack. Expected result: `PERMISSION_DENIED`.

12. **Admin Claim Identity Spoofing**
    An attacker modifies their own user record or auth claims locally to pretend to be an admin. Expected result: `PERMISSION_DENIED` because admin checks are validated server-side on trusted DB records.
