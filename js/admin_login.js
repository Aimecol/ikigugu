// Admin Login JavaScript
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.querySelector(".login-btn");

// Add input focus effects
usernameInput.addEventListener("focus", () => {
  usernameInput.parentElement.querySelector("i").style.color = "#4361ee";
  usernameInput.style.borderColor = "#4361ee";
});

usernameInput.addEventListener("blur", () => {
  usernameInput.parentElement.querySelector("i").style.color = "#adb5bd";
  usernameInput.style.borderColor = "#e9ecef";
});

passwordInput.addEventListener("focus", () => {
  passwordInput.parentElement.querySelector("i").style.color = "#4361ee";
  passwordInput.style.borderColor = "#4361ee";
});

passwordInput.addEventListener("blur", () => {
  passwordInput.parentElement.querySelector("i").style.color = "#adb5bd";
  passwordInput.style.borderColor = "#e9ecef";
});

// Form submission handler
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Simple validation
  if (usernameInput.value.trim() === "" || passwordInput.value.trim() === "") {
    shakeForm();
    return;
  }

  // Simulate login process
  loginBtn.disabled = true;
  loginBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Authenticating...';

  // In a real application, this would be an AJAX call
  setTimeout(() => {
    // Replace with actual login logic
    console.log("Login attempted with:", {
      username: usernameInput.value,
      password: passwordInput.value,
    });

    // Reset button state
    loginBtn.disabled = false;
    loginBtn.innerHTML = '<span>Login</span><i class="fas fa-arrow-right"></i>';

    // Redirect or show success message
    // window.location.href = 'dashboard.html';
  }, 1500);
});

// Shake animation for invalid input
function shakeForm() {
  const loginBox = document.querySelector(".login-box");
  loginBox.style.animation = "shake 0.5s";

  // Reset animation after it completes
  setTimeout(() => {
    loginBox.style.animation = "";
  }, 500);
}

// Add shake animation to CSS dynamically
document.head.insertAdjacentHTML(
  "beforeend",
  `
<style>
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
</style>
`
);
