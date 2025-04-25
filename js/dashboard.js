// Dashboard JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Sidebar toggle for mobile
  const sidebarToggle = document.createElement("div");
  sidebarToggle.className = "sidebar-toggle";
  sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector(".main-header").prepend(sidebarToggle);

  sidebarToggle.addEventListener("click", function () {
    document.querySelector(".sidebar").classList.toggle("active");
  });

  // User profile dropdown
  const userProfile = document.querySelector(".user-profile");
  const profileDropdown = document.createElement("div");
  profileDropdown.className = "profile-dropdown";
  profileDropdown.innerHTML = `
        <a href="./profile.html"><i class="fas fa-user"></i> Profile</a>
        <a href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>
    `;
  userProfile.appendChild(profileDropdown);

  userProfile.addEventListener("click", function (e) {
    e.stopPropagation();
    profileDropdown.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function () {
    profileDropdown.classList.remove("show");
  });

  // Simulate loading charts data
  setTimeout(() => {
    const chartPlaceholders = document.querySelectorAll(".chart-placeholder");
    chartPlaceholders.forEach((placeholder) => {
      placeholder.innerHTML = "<canvas></canvas>";
      // In a real app, we would initialize charts here with Chart.js or similar
      placeholder.style.display = "flex";
      placeholder.style.alignItems = "center";
      placeholder.style.justifyContent = "center";
      placeholder.innerHTML = "<p>Chart loaded successfully</p>";
    });
  }, 1000);

  // Load recent activities
  const activities = [
    { icon: "fa-user-plus", text: "New client added", time: "2 mins ago" },
    { icon: "fa-box-open", text: "Inventory updated", time: "15 mins ago" },
    {
      icon: "fa-file-invoice-dollar",
      text: "New invoice created",
      time: "1 hour ago",
    },
    { icon: "fa-tasks", text: "Task completed", time: "3 hours ago" },
    { icon: "fa-comment", text: "New message received", time: "5 hours ago" },
  ];

  const activityList = document.querySelector(".activity-list");
  activities.forEach((activity) => {
    const activityItem = document.createElement("div");
    activityItem.className = "activity-item";
    activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.text}</p>
                <small>${activity.time}</small>
            </div>
        `;
    activityList.appendChild(activityItem);
  });

  // Add animation to metric cards on scroll
  const metricCards = document.querySelectorAll(".metric-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  metricCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.5s ease";
    observer.observe(card);
  });
});
