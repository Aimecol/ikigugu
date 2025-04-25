document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Basic validation
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters long!");
    return;
  }

  // Here you would typically send the data to a server
  console.log({ username, email, password });

  // Success animation
  const loginBtn = document.querySelector(".login-btn");
  loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
  loginBtn.style.backgroundColor = "#4caf50";

  setTimeout(() => {
    // Redirect to login page after successful signup
    window.location.href = "admin_login.html";
  }, 1500);
});
