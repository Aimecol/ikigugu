// Employees Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Search functionality
  const searchBar = document.querySelector(".search-bar");
  const employeeCards = document.querySelectorAll(".employee-card");

  if (searchBar) {
    searchBar.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();

      employeeCards.forEach((card) => {
        const name = card
          .querySelector(".employee-name")
          .textContent.toLowerCase();
        const position = card
          .querySelector(".employee-position")
          .textContent.toLowerCase();
        const email = card
          .querySelector(".employee-contact")
          .textContent.toLowerCase();

        if (
          name.includes(searchTerm) ||
          position.includes(searchTerm) ||
          email.includes(searchTerm)
        ) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.5s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // Add employee button click handler
  const addEmployeeBtn = document.querySelector(".add-employee-btn");
  if (addEmployeeBtn) {
    addEmployeeBtn.addEventListener("click", function () {
      document.location.href = "add-employee.html";
      // In a real implementation, this would open a modal or form
    });
  }

  // Edit and delete button handlers
  employeeCards.forEach((card) => {
    const editBtn = card.querySelector(".edit-btn");
    const deleteBtn = card.querySelector(".delete-btn");

    if (editBtn) {
      editBtn.addEventListener("click", function () {
        const employeeName = card.querySelector(".employee-name").textContent;
        alert(`Edit ${employeeName} functionality will be implemented here`);
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener("click", function () {
        const employeeName = card.querySelector(".employee-name").textContent;
        if (confirm(`Are you sure you want to delete ${employeeName}?`)) {
          card.style.animation = "fadeOut 0.5s ease forwards";
          setTimeout(() => {
            card.remove();
          }, 500);
        }
      });
    }
  });
});

// Animation for fade out
const style = document.createElement("style");
style.innerHTML = `
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;
document.head.appendChild(style);
