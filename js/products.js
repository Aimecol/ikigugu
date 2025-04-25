// Products filtering functionality
document.addEventListener("DOMContentLoaded", () => {
  // Handle action menu toggles
  const actionToggles = document.querySelectorAll(".action-toggle");

  actionToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent click from bubbling to document
      const menu = toggle.nextElementSibling;

      // Close all other open menus
      document.querySelectorAll(".action-menu.show").forEach((openMenu) => {
        if (openMenu !== menu) {
          openMenu.classList.remove("show");
        }
      });

      // Toggle current menu
      menu.classList.toggle("show");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", () => {
    document.querySelectorAll(".action-menu.show").forEach((menu) => {
      menu.classList.remove("show");
    });
  });

  // Prevent menu from closing when clicking inside it
  document.querySelectorAll(".action-menu").forEach((menu) => {
    menu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  // Add event listeners to filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Filter products
      productCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (filterValue === "all" || filterValue === cardCategory) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.5s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
