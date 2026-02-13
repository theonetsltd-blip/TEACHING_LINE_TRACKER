/**
 * security.js - Authentication & Security
 * Handles secure login, rate limiting, and input validation
 */

// ========================
// SECURITY CONSTANTS
// ========================

const SECURITY_CONFIG = {
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes in ms
    MIN_PASSWORD_LENGTH: 8,
    MAX_PASSWORD_LENGTH: 128,
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    MIN_USERNAME_LENGTH: 2,
    MAX_USERNAME_LENGTH: 50,
};

// ========================
// RATE LIMITING
// ========================

let loginAttempts = {};
let lastSessionCheck = Date.now();

function getClientFingerprint() {
    // Create a unique identifier for this browser/device
    const fingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenResolution: `${window.screen.width}x${window.screen.height}`
    };
    // Simple hash
    return btoa(JSON.stringify(fingerprint));
}

const DEVICE_ID = getClientFingerprint();

function isAccountLocked() {
    const lockData = localStorage.getItem(`login_lock_${DEVICE_ID}`);
    if (!lockData) return false;
    
    const { lockedUntil } = JSON.parse(lockData);
    if (Date.now() < lockedUntil) {
        return true;
    }
    
    // Lock expired, remove it
    localStorage.removeItem(`login_lock_${DEVICE_ID}`);
    localStorage.removeItem(`login_attempts_${DEVICE_ID}`);
    return false;
}

function getLoginAttempts() {
    const attemptsData = localStorage.getItem(`login_attempts_${DEVICE_ID}`);
    if (!attemptsData) return 0;
    return JSON.parse(attemptsData).count || 0;
}

function recordLoginAttempt(failed = false) {
    const key = `login_attempts_${DEVICE_ID}`;
    let attemptsData = localStorage.getItem(key);
    
    if (!attemptsData) {
        attemptsData = { count: 0, lastAttempt: Date.now() };
    } else {
        attemptsData = JSON.parse(attemptsData);
    }
    
    if (failed) {
        attemptsData.count++;
        attemptsData.lastAttempt = Date.now();
        
        if (attemptsData.count >= SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS) {
            // Lock the account
            localStorage.setItem(`login_lock_${DEVICE_ID}`, JSON.stringify({
                lockedUntil: Date.now() + SECURITY_CONFIG.LOCKOUT_DURATION,
                reason: 'Too many failed login attempts'
            }));
        }
    } else {
        // Successful login - reset attempts
        localStorage.removeItem(key);
        localStorage.removeItem(`login_lock_${DEVICE_ID}`);
    }
    
    localStorage.setItem(key, JSON.stringify(attemptsData));
}

function getRemainingLockoutTime() {
    const lockData = localStorage.getItem(`login_lock_${DEVICE_ID}`);
    if (!lockData) return 0;
    
    const { lockedUntil } = JSON.parse(lockData);
    const remaining = Math.max(0, lockedUntil - Date.now());
    return Math.ceil(remaining / 1000); // return in seconds
}

// ========================
// INPUT VALIDATION
// ========================

function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    return input
        .trim()
        .replace(/[<>\"\']/g, '') // Remove HTML special chars
        .substring(0, 255); // Limit length
}

function validateUsername(username) {
    username = sanitizeInput(username);
    
    if (username.length < SECURITY_CONFIG.MIN_USERNAME_LENGTH) {
        return { valid: false, error: `Username must be at least ${SECURITY_CONFIG.MIN_USERNAME_LENGTH} characters` };
    }
    
    if (username.length > SECURITY_CONFIG.MAX_USERNAME_LENGTH) {
        return { valid: false, error: `Username must not exceed ${SECURITY_CONFIG.MAX_USERNAME_LENGTH} characters` };
    }
    
    // Only allow alphanumeric, spaces, hyphens, and periods
    if (!/^[a-zA-Z0-9\s\-\.]+$/.test(username)) {
        return { valid: false, error: 'Username contains invalid characters' };
    }
    
    return { valid: true, value: username };
}

function validatePassword(password) {
    if (typeof password !== 'string') {
        return { valid: false, error: 'Invalid password format' };
    }
    
    if (password.length < SECURITY_CONFIG.MIN_PASSWORD_LENGTH) {
        return { valid: false, error: `Password must be at least ${SECURITY_CONFIG.MIN_PASSWORD_LENGTH} characters` };
    }
    
    if (password.length > SECURITY_CONFIG.MAX_PASSWORD_LENGTH) {
        return { valid: false, error: 'Password is too long' };
    }
    
    // Check for at least one uppercase, one lowercase, one number
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
        return { 
            valid: false, 
            error: 'Password must contain uppercase, lowercase, and numbers' 
        };
    }
    
    return { valid: true };
}

// ========================
// SESSION MANAGEMENT
// ========================

function createSecureSession(teacherName, uid) {
    const sessionData = {
        username: sanitizeInput(teacherName),
        uid: uid,
        loginTime: Date.now(),
        lastActivity: Date.now(),
        deviceId: DEVICE_ID,
        sessionToken: generateSessionToken()
    };
    
    localStorage.setItem('sessionData', JSON.stringify(sessionData));
    startSessionTimeout();
    return sessionData;
}

function generateSessionToken() {
    return btoa(Date.now() + '-' + Math.random().toString(36).substr(2, 9));
}

function getSessionData() {
    const sessionData = localStorage.getItem('sessionData');
    return sessionData ? JSON.parse(sessionData) : null;
}

function isSessionValid() {
    const sessionData = getSessionData();
    if (!sessionData) return false;
    
    // Check if session has expired
    if (Date.now() - sessionData.lastActivity > SECURITY_CONFIG.SESSION_TIMEOUT) {
        clearSession();
        return false;
    }
    
    // Check device fingerprint
    if (sessionData.deviceId !== DEVICE_ID) {
        clearSession();
        console.warn('⚠️ Session device mismatch - possible security issue');
        return false;
    }
    
    return true;
}

function updateSessionActivity() {
    const sessionData = getSessionData();
    if (sessionData) {
        sessionData.lastActivity = Date.now();
        localStorage.setItem('sessionData', JSON.stringify(sessionData));
    }
}

function clearSession() {
    localStorage.removeItem('sessionData');
    localStorage.removeItem('teacherProfile');
    clearSessionTimeout();
}

let sessionTimeoutId = null;

function startSessionTimeout() {
    clearSessionTimeout();
    sessionTimeoutId = setInterval(() => {
        if (!isSessionValid()) {
            console.warn('Session expired - logging out');
            if (typeof logoutTeacher === 'function') {
                logoutTeacher();
            }
            clearSession();
            if (typeof showAuthLanding === 'function') {
                showAuthLanding();
            }
            alert('⏱️ Your session has expired. Please login again.');
        }
    }, 60000); // Check every minute
}

function clearSessionTimeout() {
    if (sessionTimeoutId) {
        clearInterval(sessionTimeoutId);
        sessionTimeoutId = null;
    }
}

// ========================
// PROTECT AGAINST BYPASS
// ========================

// Prevent accessing app without valid session
function enforceAuthentication() {
    const mainContent = document.querySelector('.main-content');
    
    if (isSessionValid()) {
        updateSessionActivity();
        if (mainContent) {
            mainContent.classList.add('visible');
        }
    } else {
        clearSession();
        if (mainContent) {
            mainContent.classList.remove('visible');
        }
        if (typeof showAuthLanding === 'function') {
            showAuthLanding();
        }
    }
}

// Monitor for unauthorized direct access attempts
document.addEventListener('click', (e) => {
    // Check session is valid before allowing any interaction
    if (!isSessionValid()) {
        const mainContent = document.querySelector('.main-content');
        if (mainContent && mainContent.classList.contains('visible')) {
            console.warn('⚠️ Unauthorized access attempt detected');
            clearSession();
            if (typeof showAuthLanding === 'function') {
                showAuthLanding();
            }
            alert('Your session is invalid. Please login again.');
        }
    }
});

// Track user activity
document.addEventListener('mousemove', updateSessionActivity, { passive: true });
document.addEventListener('keypress', updateSessionActivity, { passive: true });
document.addEventListener('click', updateSessionActivity, { passive: true });

// ========================
// EXPORTS
// ========================

// These functions are called from other modules
function secureLogin(username, password) {
    // Check if account is locked
    if (isAccountLocked()) {
        const remainingTime = getRemainingLockoutTime();
        const minutes = Math.ceil(remainingTime / 60);
        return {
            success: false,
            error: `Account locked due to too many failed attempts. Try again in ${minutes} minute(s).`,
            locked: true
        };
    }
    
    // Validate inputs
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.valid) {
        recordLoginAttempt(true);
        return { success: false, error: usernameValidation.error };
    }
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        recordLoginAttempt(true);
        return { success: false, error: passwordValidation.error };
    }
    
    // Input validation passed
    return { success: true, validatedUsername: usernameValidation.value };
}

function recordSuccessfulLogin() {
    recordLoginAttempt(false);
}

function recordFailedLogin() {
    recordLoginAttempt(true);
}

// ========================
// PASSWORD RESET
// ========================

function verifyIdentity(teacherName, verificationMethod, verificationValue) {
    // Sanitize inputs
    const name = sanitizeInput(teacherName).trim();
    const method = verificationMethod.trim();
    const value = sanitizeInput(verificationValue).trim();
    
    // Validate inputs
    if (!name || !method || !value) {
        return { success: false, error: 'All fields are required!' };
    }
    
    if (method !== 'email' && method !== 'phone') {
        return { success: false, error: 'Invalid verification method' };
    }
    
    // Get stored profile
    const profile = localStorage.getItem('teacherProfile');
    if (!profile) {
        return { success: false, error: 'No profile found. Please create a profile first.' };
    }
    
    const profileData = JSON.parse(profile);
    
    // Verify teacher name (case-insensitive)
    if (profileData.teacherName.toLowerCase() !== name.toLowerCase()) {
        return { success: false, error: 'Teacher Name does not match our records' };
    }
    
    // Verify email or phone based on method
    if (method === 'email') {
        if (!profileData.email || profileData.email.toLowerCase() !== value.toLowerCase()) {
            return { success: false, error: 'Email address does not match our records' };
        }
    } else if (method === 'phone') {
        // Normalize phone (remove spaces and dashes for comparison)
        const storedPhone = (profileData.phone || '').replace(/[\s\-]/g, '');
        const inputPhone = value.replace(/[\s\-]/g, '');
        
        if (!storedPhone || storedPhone !== inputPhone) {
            return { success: false, error: 'Phone number does not match our records' };
        }
    }
    
    // Identity verified
    return { success: true, teacherName: profileData.teacherName };
}

function resetPassword(newPassword, confirmPassword) {
    // Validate new password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
        return { success: false, error: passwordValidation.error };
    }
    
    // Validate confirmation
    if (newPassword !== confirmPassword) {
        return { success: false, error: 'Passwords do not match!' };
    }
    
    // Get stored profile
    const profile = localStorage.getItem('teacherProfile');
    if (!profile) {
        return { success: false, error: 'Profile not found' };
    }
    
    const profileData = JSON.parse(profile);
    
    // Check if new password is different from old
    if (newPassword === profileData.password) {
        return { success: false, error: 'New password must be different from your current password!' };
    }
    
    // Update password
    profileData.password = newPassword;
    localStorage.setItem('teacherProfile', JSON.stringify(profileData));
    
    // Reset login attempts since password was just changed
    localStorage.removeItem(`login_attempts_${DEVICE_ID}`);
    localStorage.removeItem(`login_lock_${DEVICE_ID}`);
    
    return { success: true, message: 'Password reset successfully!' };
}

// Immediately enforce authentication when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(enforceAuthentication, 1000);
});

// Also check on visibility change (tab switch)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        enforceAuthentication();
    }
});
