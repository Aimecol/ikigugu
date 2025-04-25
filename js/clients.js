// Client search functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("clientSearch");
  const clientCards = document.querySelectorAll(".client-card");

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();

    clientCards.forEach((card) => {
      const clientName = card
        .querySelector(".client-name")
        .textContent.toLowerCase();
      const clientEmail = card
        .querySelector(".client-detail span")
        .textContent.toLowerCase();
      const clientPhone = card
        .querySelectorAll(".client-detail span")[1]
        .textContent.toLowerCase();

      if (
        clientName.includes(searchTerm) ||
        clientEmail.includes(searchTerm) ||
        clientPhone.includes(searchTerm)
      ) {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.3s ease";
      } else {
        card.style.display = "none";
      }
    });
  });
});
