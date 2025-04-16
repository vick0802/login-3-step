function showStep(step) {
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "none";
  document.getElementById(step).style.display = "block";
}

const LOCKOUT_DURATION = 30 * 1000; // 30 second lockout
const MAX_ATTEMPTS = 3;

// Show full-page overlay with countdown timer
function showLockOverlay(duration, stepKey = null) {
  const overlay = document.getElementById("lockOverlay");
  const timer = document.getElementById("lockTimer");
  overlay.style.display = "block";

  let remaining = Math.floor(duration / 1000);

  const countdown = setInterval(() => {
    if (remaining <= 0) {
      clearInterval(countdown);
      overlay.style.display = "none";

      // Reset attempts and lockout
      if (stepKey) {
        localStorage.removeItem(`${stepKey}_attempts`);
        localStorage.removeItem(`${stepKey}_lockoutUntil`);
      }
    } else {
      let mins = Math.floor(remaining / 60);
      let secs = remaining % 60;
      timer.textContent = `Time remaining: ${mins}:${secs.toString().padStart(2, '0')}`;
      remaining--;
    }
  }, 1000);
}

// Check if a step is locked out
function checkLockout(stepKey) {
  const lockoutUntil = parseInt(localStorage.getItem(`${stepKey}_lockoutUntil`)) || 0;
  const now = Date.now();

  if (now < lockoutUntil) {
    showLockOverlay(lockoutUntil - now, stepKey);
    return true;
  }

  return false;
}

// Handle failed attempt
function handleFailure(stepKey) {
  let attempts = parseInt(localStorage.getItem(`${stepKey}_attempts`)) || 0;
  attempts++;
  localStorage.setItem(`${stepKey}_attempts`, attempts);

  if (attempts >= MAX_ATTEMPTS) {
    const lockoutUntil = Date.now() + LOCKOUT_DURATION;
    localStorage.setItem(`${stepKey}_lockoutUntil`, lockoutUntil);
    showLockOverlay(LOCKOUT_DURATION, stepKey);
    alert("Too many failed attempts. Login locked for 30 Seconds.");
    return true;
  } else {
    alert(`Incorrect. Attempts remaining: ${MAX_ATTEMPTS - attempts}`);
    return false;
  }
}

// Reset lockout after success
function resetLockout(stepKey) {
  localStorage.removeItem(`${stepKey}_attempts`);
  localStorage.removeItem(`${stepKey}_lockoutUntil`);
}

// Step 1: Username & Password
function verifyStep1() {
  if (checkLockout("step1")) return;

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "password") {
    resetLockout("step1");
    showStep("step2");
  } else {
    handleFailure("step1");
  }
}

// Step 2: Verification Code
function verifyStep2() {
  if (checkLockout("step2")) return;

  const code = document.getElementById("code").value;

  if (code === "123456") {
    resetLockout("step2");
    showStep("step3");
  } else {
    handleFailure("step2");
  }
}

// Step 3: Security Question
function verifyStep3() {
  if (checkLockout("step3")) return;

  const securityAnswer = document.getElementById("security-answer").value;

  if (securityAnswer === "blue") {
    resetLockout("step3");
    document.querySelector('#msg').style.display = 'block';

    setTimeout(function () {
      document.querySelector('#msg').style.display = 'none';
      window.location.href = "Decryption.html";
    }, 5000);
  } else {
    handleFailure("step3");
  }
}

// Go back to previous step
function goBack(step) {
  showStep(step);
}
