# 🔑 Password Reset Feature - User Guide

## Overview
The password reset feature allows users who have forgotten their password to securely reset it by verifying their identity using information they provided during registration.

---

## How to Reset Your Password

### Step 1: Click "Forgot Password?"
1. On the login screen, click the **🔑 Forgot Password?** link below the login button
2. The Reset Password dialog will open

### Step 2: Verify Your Identity
You'll need to provide:
- **Teacher Name**: Your full name as registered
- **Verification Method**: Choose either:
  - 📧 **Email** - if you provided an email during registration
  - 📱 **Phone** - if you provided a phone number during registration
- **Email or Phone**: The exact email or phone number you registered with

**Example:**
```
Teacher Name: John Doe
Verification Method: Email
Email: john.doe@school.com
```

### Step 3: Verify & Continue
- Click the **"Verify & Continue"** button
- The system will check that your information matches our records
- If verified, you'll move to the password reset step

### Step 4: Create New Password
If identity verification succeeds:
1. Enter your **New Password** (must meet security requirements - see below)
2. **Confirm Password** by entering it again
3. Click **"Reset Password"**

### Step 5: Login with New Password
- Password reset successful! ✅
- Go back to login screen
- Login with your **Teacher Name** and **New Password**

---

## Password Requirements

Your new password must meet ALL of these requirements:

```
✅ Minimum 8 characters
✅ At least 1 UPPERCASE letter (A-Z)
✅ At least 1 lowercase letter (a-z)
✅ At least 1 number (0-9)
✅ At least 1 special character (!@#$%^&*...)
```

### Valid Password Examples:
```
SecurePass@123
MyPassword#2024!
Teaching@2024
Reset!Password123
```

### Invalid Password Examples:
```
password123         ❌ No uppercase, no special char
Password            ❌ No number, no special char
Pass1@              ❌ Too short
12345678!           ❌ No letters
```

---

## What Information Is Verified?

The system verifies your identity by checking against your registration data:

### If you choose Email verification:
- ✅ Teacher Name matches
- ✅ Email matches (case-insensitive)

### If you choose Phone verification:
- ✅ Teacher Name matches
- ✅ Phone number matches (spaces and dashes ignored)

---

## Error Messages & Solutions

| Error | Reason | Solution |
|-------|--------|----------|
| "All fields are required!" | Missing information | Fill in all three fields |
| "Teacher Name does not match our records" | Name doesn't match | Check your registered name exactly |
| "Email address does not match our records" | Email doesn't match | Use the email you registered with |
| "Phone number does not match our records" | Phone doesn't match | Use the phone you registered with |
| "Password must be at least 8 characters" | Password too short | Create a longer password |
| "Password must contain uppercase, lowercase, and numbers" | Weak password | Add capitals, lowercase, and numbers |
| "Passwords do not match!" | Confirmation doesn't match | Re-enter both passwords carefully |
| "New password must be different from your current password!" | Same as old password | Choose a different password |

---

## Security Features

### ✅ Protected Process
- Your identity is verified before allowing password reset
- Password must be strong (8+ chars with complexity)
- Only registered email/phone accepted
- No confirmation codes or emails sent (for offline use)
- Session login attempts reset after successful reset

### ✅ What Can't Be Bypassed
- Can't reset without correct teacher name
- Can't reset without correct email or phone
- Can't use weak password
- Can't reset accounts without registered email/phone

---

## Important Notes

⚠️ **Identity Information Must Match Exactly:**
- Teacher Name is case-insensitive but must match registered name
- Email must match exactly (including capitalization)
- Phone must be the same number (spaces/dashes don't matter)

💡 **Tips:**
- Check the exact name you registered with
- Use the email or phone from your profile
- Write down your password requirements for security
- Don't share reset process with others
- Test new password immediately after reset

---

## Data Security

Your registration data (email, phone, name) is stored locally on your device:
- ✅ Never sent to external servers
- ✅ Used only for identity verification
- ✅ Protected by browser security
- ✅ Encrypted in browser storage

---

## What If I Don't Remember My Details?

If you can't remember:
- Your registered email/phone
- Your exact teacher name

You'll need to:
1. Contact your administrator
2. Clear app data and recreate profile
3. Use the "Force Reset Database" option in Settings

---

## Frequently Asked Questions

**Q: Can I reset someone else's password?**  
A: No. You need their exact teacher name AND email/phone to reset, which only they would know.

**Q: Is my new password saved to the cloud?**  
A: Your password is stored locally on your device. Cloud sync uses Firebase authentication.

**Q: What if I reset my password but can't login?**  
A: Check that you're using the exact teacher name and new password. Check Caps Lock.

**Q: Can I recover my old password?**  
A: No. Passwords are not recoverable. Your new password replaces the old one.

**Q: What happens after I reset?**  
A: Login attempts counter resets. You can login immediately with new password.

---

## Process Flowchart

```
┌─────────────────────────────────────┐
│    Click "Forgot Password?"         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Enter Teacher Name, Email/Phone    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  System Verifies Against Profile    │
└──────────────┬──────────────────────┘
               │
       ┌───────┴──────────┐
       │                  │
   ✅ Match          ❌ No Match
       │                  │
       │            Alert & Retry
       │                  │
┌──────▼─────────────────┐
│ Enter New Password     │
└──────┬────────────────┘
       │
┌──────▼──────────────────┐
│ Validate Password       │
└──────┬────────────────┘
       │
   ┌───┴──────┐
   │          │
  ✅OK      ❌Weak
   │          │
   │      Alert & Retry
   │          │
┌──▼──────────┐
│ Reset Done! │
└─────────────┘
       │
┌──────▼─────────────────┐
│ Login with New Pass    │
└───────────────────────┘
```

---

**Feature Status:** ✅ Active  
**Last Updated:** February 13, 2026  
**Security Level:** 🟢 HIGH
