// Variables for pagination
let currentPage = 1;
const studentsPerPage = 6;

// DOM elements
let studentsGrid;
let pagination;
let studentSearch;
let courseFilter;
let allStudentCards;

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  studentsGrid = document.getElementById("studentsGrid");
  pagination = document.getElementById("pagination");
  studentSearch = document.getElementById("studentSearch");
  courseFilter = document.getElementById("courseFilter");

  // Check if elements exist before proceeding
  if (!studentsGrid || !pagination || !studentSearch || !courseFilter) {
    console.error("Required DOM elements not found");
    return;
  }

  // Get all student cards AFTER ensuring the grid exists
  allStudentCards = document.querySelectorAll(".student-card");

  // Initial setup - only if we have student cards
  setupEventListeners();

  // Apply initial filtering and pagination if there are cards
  if (allStudentCards.length > 0) {
    filterAndPaginateStudents();
  }
});

// Set up event listeners
function setupEventListeners() {
  // Search functionality
  studentSearch.addEventListener("input", function () {
    currentPage = 1; // Reset to first page when searching
    filterAndPaginateStudents();
  });

  // Course filter
  courseFilter.addEventListener("change", function () {
    currentPage = 1; // Reset to first page when filtering
    filterAndPaginateStudents();
  });

  // Delegate event listener for action toggles
  document.addEventListener("click", function (event) {
    // Handle action toggle clicks
    if (event.target.closest(".action-toggle")) {
      const actionToggle = event.target.closest(".action-toggle");
      const actionsContainer = actionToggle.closest(".student-actions");
      if (!actionsContainer) return;

      const actionMenu = actionsContainer.querySelector(".action-menu");
      if (!actionMenu) return;

      // Close all other open menus
      document.querySelectorAll(".action-menu.show").forEach((menu) => {
        if (menu !== actionMenu) {
          menu.classList.remove("show");
        }
      });

      // Toggle the clicked menu
      actionMenu.classList.toggle("show");
      event.stopPropagation();
    }
    // Close menus when clicking outside
    else if (
      !event.target.closest(".action-menu") &&
      !event.target.closest(".action-toggle")
    ) {
      document.querySelectorAll(".action-menu.show").forEach((menu) => {
        menu.classList.remove("show");
      });
    }
  });

  // Add event listeners for action buttons
  document.addEventListener("click", function (event) {
    // View Details button
    if (
      event.target.closest(".action-btn") &&
      event.target.closest(".action-btn").textContent.includes("View Details")
    ) {
      event.preventDefault();
      const studentCard = event.target.closest(".student-card");
      if (!studentCard || !studentCard.dataset.studentId) return;

      const studentId = parseInt(studentCard.dataset.studentId);
      viewStudentDetails(studentId);
    }

    // Edit button
    else if (
      event.target.closest(".action-btn") &&
      event.target.closest(".action-btn").textContent.includes("Edit")
    ) {
      event.preventDefault();
      const studentCard = event.target.closest(".student-card");
      if (!studentCard || !studentCard.dataset.studentId) return;

      const studentId = parseInt(studentCard.dataset.studentId);
      editStudent(studentId);
    }

    // Delete button
    else if (event.target.closest(".action-btn.delete")) {
      event.preventDefault();
      const studentCard = event.target.closest(".student-card");
      if (!studentCard || !studentCard.dataset.studentId) return;

      const studentId = parseInt(studentCard.dataset.studentId);
      deleteStudent(studentId);
    }
  });
}

// Filter and paginate students
function filterAndPaginateStudents() {
  if (!allStudentCards || allStudentCards.length === 0) {
    // Re-query in case the DOM has been updated
    allStudentCards = document.querySelectorAll(".student-card");
    if (allStudentCards.length === 0) {
      // If still no cards, show empty state
      const emptyState = document.querySelector(".empty-state");
      if (!emptyState) {
        renderEmptyState();
      }
      if (pagination) {
        pagination.style.display = "none";
      }
      return;
    }
  }

  const searchTerm = studentSearch.value.toLowerCase().trim();
  const courseValue = courseFilter.value;

  let visibleCards = [];

  // First pass: identify visible cards
  allStudentCards.forEach((card) => {
    try {
      const nameElement = card.querySelector(".student-name");
      const emailElement = card.querySelector(".student-email");
      const phoneElement = card.querySelector(".student-phone");
      const universityElement = card.querySelector(
        ".student-detail:nth-child(3) span"
      );
      const courseElement = card.querySelector(".student-course");

      // Skip if any required elements are missing
      if (
        !nameElement ||
        !emailElement ||
        !phoneElement ||
        !universityElement ||
        !courseElement
      ) {
        card.style.display = "none";
        return;
      }

      const name = nameElement.textContent.toLowerCase();
      const email = emailElement.textContent.toLowerCase();
      const phone = phoneElement.textContent.toLowerCase();
      const university = universityElement.textContent.toLowerCase();
      const course = courseElement.textContent;
      const courseValueAttr = course.toLowerCase().replace(/\s+/g, "-");

      const matchesSearch =
        searchTerm === "" ||
        name.includes(searchTerm) ||
        email.includes(searchTerm) ||
        phone.includes(searchTerm) ||
        university.includes(searchTerm);

      const matchesCourse =
        courseValue === "all" || courseValueAttr === courseValue;

      if (matchesSearch && matchesCourse) {
        visibleCards.push(card);
      } else {
        card.style.display = "none";
      }
    } catch (error) {
      console.error("Error processing student card:", error);
      card.style.display = "none";
    }
  });

  // Show empty state if no results
  const emptyState = document.querySelector(".empty-state");
  if (visibleCards.length === 0) {
    if (!emptyState) {
      renderEmptyState();
    }
    if (pagination) {
      pagination.style.display = "none";
    }
    return;
  } else {
    if (emptyState) {
      emptyState.remove();
    }
    if (pagination) {
      pagination.style.display = "";
    }
  }

  // Calculate pagination
  const totalPages = Math.ceil(visibleCards.length / studentsPerPage);

  // Adjust current page if it's now out of bounds
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = Math.min(startIndex + studentsPerPage, visibleCards.length);

  // Second pass: show/hide based on pagination
  visibleCards.forEach((card, index) => {
    if (index >= startIndex && index < endIndex) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });

  // Update pagination
  renderPagination(totalPages);
}

// Render empty state when no students match filters
function renderEmptyState() {
  if (!studentsGrid) return;

  const emptyState = document.createElement("div");
  emptyState.className = "empty-state";
  emptyState.innerHTML = `
    <i class="fas fa-user-graduate"></i>
    <h3>No students found</h3>
    <p>Try adjusting your search or filter criteria</p>
    <button class="add-student-btn" onclick="addNewStudent()">
      <i class="fas fa-plus"></i>
      Add Student
    </button>
  `;
  studentsGrid.appendChild(emptyState);
}

// Render pagination controls
function renderPagination(totalPages) {
  if (!pagination) return;

  pagination.innerHTML = "";

  // Don't show pagination if there's only one page or no results
  if (totalPages <= 1) return;

  // Previous button
  const prevLi = document.createElement("li");
  prevLi.innerHTML = `<a href="#" aria-label="Previous"><i class="fas fa-chevron-left"></i></a>`;
  prevLi.classList.toggle("disabled", currentPage === 1);
  prevLi.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      filterAndPaginateStudents();
    }
  });
  pagination.appendChild(prevLi);

  // Page numbers (limit displayed pages for better UI)
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // First page indicator if needed
  if (startPage > 1) {
    const firstLi = document.createElement("li");
    firstLi.innerHTML = `<a href="#">1</a>`;
    firstLi.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = 1;
      filterAndPaginateStudents();
    });
    pagination.appendChild(firstLi);

    if (startPage > 2) {
      const ellipsisLi = document.createElement("li");
      ellipsisLi.className = "ellipsis";
      ellipsisLi.innerHTML = `<span>...</span>`;
      pagination.appendChild(ellipsisLi);
    }
  }

  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    const li = document.createElement("li");
    li.className = currentPage === i ? "active" : "";
    li.innerHTML = `<a href="#">${i}</a>`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      filterAndPaginateStudents();
    });
    pagination.appendChild(li);
  }

  // Last page indicator if needed
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const ellipsisLi = document.createElement("li");
      ellipsisLi.className = "ellipsis";
      ellipsisLi.innerHTML = `<span>...</span>`;
      pagination.appendChild(ellipsisLi);
    }

    const lastLi = document.createElement("li");
    lastLi.innerHTML = `<a href="#">${totalPages}</a>`;
    lastLi.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = totalPages;
      filterAndPaginateStudents();
    });
    pagination.appendChild(lastLi);
  }

  // Next button
  const nextLi = document.createElement("li");
  nextLi.innerHTML = `<a href="#" aria-label="Next"><i class="fas fa-chevron-right"></i></a>`;
  nextLi.classList.toggle("disabled", currentPage === totalPages);
  nextLi.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      filterAndPaginateStudents();
    }
  });
  pagination.appendChild(nextLi);
}

// Helper function to escape HTML content
function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Action button handlers
function viewStudentDetails(studentId) {
  console.log(`View details for student ID: ${studentId}`);
  const studentCard = document.querySelector(
    `.student-card[data-student-id="${studentId}"]`
  );
  if (studentCard) {
    const studentName =
      studentCard.querySelector(".student-name")?.textContent || "Unknown";
    alert(`Viewing details for ${studentName}`);
    // In a real app, you might show a modal or navigate to a details page
  }
}

function editStudent(studentId) {
  console.log(`Edit student ID: ${studentId}`);
  window.location.href = `edit-student.html?id=${studentId}`;
}

function deleteStudent(studentId) {
  console.log(`Delete student ID: ${studentId}`);
  const studentCard = document.querySelector(
    `.student-card[data-student-id="${studentId}"]`
  );
  if (studentCard) {
    const studentName =
      studentCard.querySelector(".student-name")?.textContent || "this student";
    if (confirm(`Are you sure you want to delete ${studentName}?`)) {
      studentCard.remove();
      // Update allStudentCards after removing a student
      allStudentCards = document.querySelectorAll(".student-card");
      // Update pagination after removing a student
      filterAndPaginateStudents();
    }
  }
}

function addNewStudent() {
  // Navigate to the add student page
  window.location.href = "add-student.html";
}
// Calculate and display course statistics
function updateCourseStats() {
  const courseCounts = {
    "web-development": 0,
    "data-science": 0,
    "ui-ux-design": 0,
    "mobile-development": 0,
    cybersecurity: 0,
  };

  // Count students in each course
  document.querySelectorAll(".student-card").forEach((card) => {
    const course = card
      .querySelector(".student-course")
      .textContent.toLowerCase()
      .replace(/\s+/g, "-");
    if (courseCounts.hasOwnProperty(course)) {
      courseCounts[course]++;
    }
  });

  // Find max count for percentage calculations
  const maxCount = Math.max(...Object.values(courseCounts));

  // Update the statistics display
  Object.entries(courseCounts).forEach(([course, count]) => {
    const statCard = document.querySelector(
      `.stat-card[data-course="${course}"]`
    );
    if (statCard) {
      statCard.querySelector(".stat-count").textContent = `${count} ${
        count === 1 ? "student" : "students"
      }`;

      // Calculate percentage width for the bar (minimum 10% if there are any students)
      const percentage = count > 0 ? Math.max(10, (count / maxCount) * 100) : 0;
      statCard
        .querySelector(".stat-bar")
        .style.setProperty("--percentage", `${percentage}%`);
    }
  });
}

// Initialize course stats on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCourseStats();
});

// Also update stats when filtering or searching
// (You'll need to call updateCourseStats() after any filtering/searching operations)
