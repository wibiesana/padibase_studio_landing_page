# 🔐 Authentication & Identity Management

**PadiBase Studio** features military-grade identity security powered by **Argon2id** password hashing, stateless **JSON Web Tokens (JWT)**, brute-force rate-limiting, and autonomous **Auth Collections** that generate complete authentication APIs automatically.

---

## 📋 Table of Contents

1. [🛡️ Security Architecture](#1-security-architecture)
2. [👑 Superuser Gateway (/api/admins)](#2-superuser-gateway-apiadmins)
3. [👥 Auth Collections (/api/collections/:authTable)](#3-auth-collections-apicollectionsauthtable)
4. [🔑 Authentication Endpoints Specification](#4-authentication-endpoints-specification)
5. [🔄 Token Rotation & TokenKey Session Revocation](#5-token-rotation--tokenkey-session-revocation)
6. [🛡️ Brute-Force Rate Limiting Protection](#6-brute-force-rate-limiting-protection)
7. [💻 Usage via PadiBase JS SDK](#7-usage-via-padibase-js-sdk)

---

## 1. 🛡️ Security Architecture

PadiBase cleanly separates identity into two distinct layers:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                      PADIBASE AUTHENTICATION LAYERS                    │
├───────────────────────────────────┬────────────────────────────────────┤
│ 👑 Superuser Admin Gateway        │ 👥 User Auth Collections           │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Studio dashboard managers       │ • End users / application members  │
│ • Stored in `_admins` table       │ • Configured per Auth collection   │
│ • Full access to all schemas,     │ • Restricted by Access Rules &     │
│   query tools, and settings       │   server-side field projections    │
│ • Endpoint: `/api/admins/*`       │ • Endpoint: `/api/collections/*`   │
└───────────────────────────────────┴────────────────────────────────────┘
```

- **Argon2id Password Hashing**: Winner of the Password Hashing Competition (PHC), resistant to GPU, FPGA, and ASIC-based attacks.
- **Stateless Bearer JWT**: Cryptographically signed using HMAC SHA-256 (`JWT_SECRET`, min 32 characters).

---

## 2. 👑 Superuser Gateway (`/api/admins`)

Authenticates administrators accessing PadiBase Studio at `http://127.0.0.1:8085/_padibase/`.

### Bootstrap & Login Flow:
1. `GET /api/admins/has-admins`: Checks if any admin exists in `_admins`.
2. `POST /api/admins/setup`: One-time setup endpoint for the initial Superuser when the database is empty.
3. `POST /api/admins/auth-with-password`: Authenticates superusers with email and password.

```bash
# Superuser login via curl:
curl -X POST http://127.0.0.1:8085/api/admins/auth-with-password \
  -H "Content-Type: application/json" \
  -d '{
    "identity": "admin@padibase.dev",
    "password": "secure_password_123"
  }'
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "adm_001",
    "email": "admin@padibase.dev",
    "avatar": 1
  }
}
```

---

## 3. 👥 Auth Collections (`/api/collections/:authTable`)

When you create an **Auth Collection** in Studio (e.g., `users`, `members`, `customers`), PadiBase automatically configures credential columns:

- `email`: Unique, validated email address.
- `username`: Optional unique username.
- `passwordHash`: Argon2id password hash (never returned in API responses).
- `tokenKey`: 32-character random key embedded into JWT token claims.
- `role`: Authorization role (`user`, `admin`, `manager`, etc.).
- `status`: Account status (`active`, `pending`, `banned`).
- `verified`: Boolean indicating email verification status.
- `email_verified_at`: Timestamp of email verification.

---

## 4. 🔑 Authentication Endpoints Specification

Every Auth Collection automatically provides the following endpoints:

### 1. Account Registration
`POST /api/collections/:authTable/register`
```json
{
  "email": "budi@example.com",
  "username": "budisantoso",
  "password": "SecurePassword123!",
  "passwordConfirm": "SecurePassword123!"
}
```

### 2. Password Login
`POST /api/collections/:authTable/auth-with-password`
```json
{
  "identity": "budi@example.com",
  "password": "SecurePassword123!"
}
```
The `identity` field accepts either an `email` or a `username`.

### 3. Refresh Active JWT Token
`POST /api/collections/:authTable/auth-refresh`
Include header `Authorization: Bearer <TOKEN>` to receive a fresh token.

### 4. Request Password Reset
`POST /api/collections/:authTable/request-password-reset`
```json
{
  "email": "budi@example.com"
}
```
Sends a password reset token to the user's email via the configured SMTP server.

### 5. Confirm Password Reset
`POST /api/collections/:authTable/confirm-password-reset`
```json
{
  "token": "reset_token_from_email",
  "password": "NewSecurePassword456!",
  "passwordConfirm": "NewSecurePassword456!"
}
```

### 6. Change Password (Authenticated User)
`POST /api/collections/:authTable/change-password`
```json
{
  "oldPassword": "SecurePassword123!",
  "newPassword": "NewSecurePassword456!",
  "newPasswordConfirm": "NewSecurePassword456!"
}
```

### 7. Request & Confirm Email Verification
- `POST /api/collections/:authTable/request-verification`: Sends account verification email.
- `POST /api/collections/:authTable/confirm-verification`: Confirms verification token.

### 8. Fetch Current Authenticated Profile
`GET /api/collections/:authTable/me`
Header: `Authorization: Bearer <TOKEN>`

---

## 5. 🔄 Token Rotation & TokenKey Session Revocation

PadiBase embeds the `tokenKey` column into JWT claims.
Whenever a user:
1. Changes their password (`change-password`), or
2. Confirms a password reset (`confirm-password-reset`),

PadiBase automatically **regenerates the user's `tokenKey`** in the database. As a result, all previously issued JWT tokens on other devices **become invalid immediately**, thwarting session hijacking attempts.

---

## 6. 🛡️ Brute-Force Rate Limiting Protection

PadiBase enforces built-in **sensitive-path rate limiting**:
- Login, registration, verification, and password change routes are strictly throttled per client IP address.
- Repeated brute-force attempts are blocked with `429 Too Many Requests`.

---

## 7. 💻 Usage via PadiBase JS SDK

```javascript
import PadiBase from 'padibase';

const padi = new PadiBase('http://127.0.0.1:8085');

// 1. User login
const authData = await padi.collection('users').authWithPassword('budi@example.com', 'SecurePassword123!');
console.log('Login successful! Token:', authData.token);
console.log('User profile:', authData.record);

// The token is automatically saved into padi.authStore and attached to all future requests!

// 2. Fetch current user profile:
const me = await padi.collection('users').getProfile();
console.log('My profile:', me);

// 3. Change password:
await padi.collection('users').changePassword('SecurePassword123!', 'NewPassword456!');

// 4. Logout:
padi.authStore.clear();
```
