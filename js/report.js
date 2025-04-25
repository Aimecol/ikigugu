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

  // Initialize date picker with current date
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  document.getElementById("reportDate").value = formattedDate;

  // Sample data for transactions table
  const transactions = [
    {
      id: "TRX-001",
      date: "2023-06-01",
      client: "John Smith",
      amount: "$1,250.00",
      status: "completed",
    },
    {
      id: "TRX-002",
      date: "2023-06-02",
      client: "Sarah Johnson",
      amount: "$890.50",
      status: "completed",
    },
    {
      id: "TRX-003",
      date: "2023-06-03",
      client: "Michael Brown",
      amount: "$2,400.00",
      status: "pending",
    },
    {
      id: "TRX-004",
      date: "2023-06-04",
      client: "Emily Davis",
      amount: "$750.25",
      status: "completed",
    },
    {
      id: "TRX-005",
      date: "2023-06-05",
      client: "David Wilson",
      amount: "$1,800.00",
      status: "cancelled",
    },
    {
      id: "TRX-006",
      date: "2023-06-06",
      client: "Jennifer Taylor",
      amount: "$950.75",
      status: "completed",
    },
    {
      id: "TRX-007",
      date: "2023-06-07",
      client: "Robert Martinez",
      amount: "$3,200.00",
      status: "pending",
    },
    {
      id: "TRX-008",
      date: "2023-06-08",
      client: "Lisa Anderson",
      amount: "$1,100.50",
      status: "completed",
    },
    {
      id: "TRX-009",
      date: "2023-06-09",
      client: "Daniel Thomas",
      amount: "$680.00",
      status: "cancelled",
    },
    {
      id: "TRX-010",
      date: "2023-06-10",
      client: "Jessica White",
      amount: "$2,750.25",
      status: "completed",
    },
    {
      id: "TRX-011",
      date: "2023-06-11",
      client: "Christopher Harris",
      amount: "$1,500.00",
      status: "pending",
    },
    {
      id: "TRX-012",
      date: "2023-06-12",
      client: "Amanda Martin",
      amount: "$920.75",
      status: "completed",
    },
    {
      id: "TRX-013",
      date: "2023-06-13",
      client: "Matthew Thompson",
      amount: "$3,400.00",
      status: "completed",
    },
    {
      id: "TRX-014",
      date: "2023-06-14",
      client: "Olivia Garcia",
      amount: "$1,250.50",
      status: "pending",
    },
    {
      id: "TRX-015",
      date: "2023-06-15",
      client: "Andrew Robinson",
      amount: "$780.00",
      status: "cancelled",
    },
  ];

  // Pagination variables
  let currentPage = 1;
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  // Populate transactions table
  function populateTable(page = 1) {
    const tableBody = document.querySelector("#transactionsTable tbody");
    tableBody.innerHTML = "";

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, transactions.length);

    for (let i = startIndex; i < endIndex; i++) {
      const transaction = transactions[i];
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.client}</td>
        <td>${transaction.amount}</td>
        <td><span class="status-badge status-${transaction.status}">${
        transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)
      }</span></td>
      `;

      tableBody.appendChild(row);

      // Add animation to each row
      setTimeout(() => {
        row.style.opacity = "0";
        row.style.transform = "translateY(10px)";
        row.style.transition = "all 0.3s ease";

        setTimeout(() => {
          row.style.opacity = "1";
          row.style.transform = "translateY(0)";
        }, 50 * (i - startIndex));
      }, 0);
    }

    // Update pagination info
    document.getElementById("pageStart").textContent = startIndex + 1;
    document.getElementById("pageEnd").textContent = endIndex;
    document.getElementById("totalEntries").textContent = transactions.length;

    // Update pagination buttons
    const paginationControls = document.querySelector(".pagination-controls");
    paginationControls.innerHTML = "";

    // Previous button
    const prevBtn = document.createElement("button");
    prevBtn.className = `pagination-btn${page === 1 ? " disabled" : ""}`;
    prevBtn.disabled = page === 1;
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        populateTable(currentPage);
      }
    });
    paginationControls.appendChild(prevBtn);

    // Page buttons
    const maxVisiblePages = 5;
    const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.className = `pagination-btn${i === page ? " active" : ""}`;
      pageBtn.textContent = i;
      pageBtn.addEventListener("click", () => {
        currentPage = i;
        populateTable(currentPage);
      });
      paginationControls.appendChild(pageBtn);
    }

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.className = `pagination-btn${
      page === totalPages ? " disabled" : ""
    }`;
    nextBtn.disabled = page === totalPages;
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        populateTable(currentPage);
      }
    });
    paginationControls.appendChild(nextBtn);
  }

  // Initialize table
  populateTable();

  // Table search functionality
  const tableSearch = document.getElementById("tableSearch");
  tableSearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const filteredTransactions = transactions.filter((transaction) => {
      return (
        transaction.id.toLowerCase().includes(searchTerm) ||
        transaction.date.toLowerCase().includes(searchTerm) ||
        transaction.client.toLowerCase().includes(searchTerm) ||
        transaction.amount.toLowerCase().includes(searchTerm) ||
        transaction.status.toLowerCase().includes(searchTerm)
      );
    });

    // Update table with filtered data
    const tableBody = document.querySelector("#transactionsTable tbody");
    tableBody.innerHTML = "";

    if (filteredTransactions.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="5" style="text-align: center;">No matching records found</td>`;
      tableBody.appendChild(row);
    } else {
      filteredTransactions.forEach((transaction) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${transaction.id}</td>
          <td>${transaction.date}</td>
          <td>${transaction.client}</td>
          <td>${transaction.amount}</td>
          <td><span class="status-badge status-${transaction.status}">${
          transaction.status.charAt(0).toUpperCase() +
          transaction.status.slice(1)
        }</span></td>
        `;
        tableBody.appendChild(row);
      });
    }
  });

  // Report type filter functionality
  const reportTypeFilter = document.getElementById("reportType");
  reportTypeFilter.addEventListener("change", function () {
    const selectedType = this.value;
    // In a real application, this would filter data based on report type
    console.log(`Report type changed to: ${selectedType}`);

    // For demo purposes, we'll just show a notification
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `<i class="fas fa-info-circle"></i> ${
      selectedType === "all"
        ? "Showing all reports"
        : `Showing ${selectedType} reports`
    }`;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.padding = "10px 20px";
    notification.style.background = "var(--primary)";
    notification.style.color = "white";
    notification.style.borderRadius = "4px";
    notification.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    notification.style.zIndex = "1000";
    notification.style.opacity = "0";
    notification.style.transform = "translateY(20px)";
    notification.style.transition = "all 0.3s ease";

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateY(0)";
    }, 100);

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(20px)";

      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  });

  // Export report functionality
  const exportBtn = document.getElementById("exportReport");
  exportBtn.addEventListener("click", function () {
    // In a real application, this would generate and download a report
    console.log("Exporting report...");

    // For demo purposes, we'll just show a notification
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `<i class="fas fa-file-download"></i> Report exported successfully!`;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.padding = "10px 20px";
    notification.style.background = "var(--success)";
    notification.style.color = "white";
    notification.style.borderRadius = "4px";
    notification.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    notification.style.zIndex = "1000";
    notification.style.opacity = "0";
    notification.style.transform = "translateY(20px)";
    notification.style.transition = "all 0.3s ease";

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateY(0)";
    }, 100);

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(20px)";

      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  });

  // Simulate loading charts
  setTimeout(() => {
    // Revenue Chart (Bar Chart)
    const revenueChartPlaceholder = document.getElementById("revenueChart");
    revenueChartPlaceholder.innerHTML = "";
    revenueChartPlaceholder.style.display = "block";

    // Create canvas for chart
    const revenueCanvas = document.createElement("canvas");
    revenueChartPlaceholder.appendChild(revenueCanvas);

    // Draw simple bar chart using canvas
    const ctx = revenueCanvas.getContext("2d");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const values = [12500, 17800, 15200, 21000, 19500, 24580];

    // Set canvas dimensions
    revenueCanvas.width = revenueChartPlaceholder.offsetWidth;
    revenueCanvas.height = revenueChartPlaceholder.offsetHeight;

    // Draw chart background
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, revenueCanvas.width, revenueCanvas.height);

    // Draw bars
    const barWidth = (revenueCanvas.width - 60) / months.length - 20;
    const maxValue = Math.max(...values);

    for (let i = 0; i < months.length; i++) {
      const x = 40 + i * (barWidth + 20);
      const barHeight = (values[i] / maxValue) * (revenueCanvas.height - 80);
      const y = revenueCanvas.height - 40 - barHeight;

      // Draw bar with gradient
      const gradient = ctx.createLinearGradient(
        x,
        y,
        x,
        revenueCanvas.height - 40
      );
      gradient.addColorStop(0, "#4361ee");
      gradient.addColorStop(1, "#4895ef");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 5);
      ctx.fill();

      // Draw month label
      ctx.fillStyle = "#1b263b";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(months[i], x + barWidth / 2, revenueCanvas.height - 20);

      // Draw value label
      ctx.fillStyle = "#4361ee";
      ctx.font = "bold 12px Arial";
      ctx.fillText(
        `$${(values[i] / 1000).toFixed(1)}k`,
        x + barWidth / 2,
        y - 10
      );
    }

    // Draw y-axis
    ctx.strokeStyle = "#adb5bd";
    ctx.beginPath();
    ctx.moveTo(30, 20);
    ctx.lineTo(30, revenueCanvas.height - 40);
    ctx.stroke();

    // Draw x-axis
    ctx.beginPath();
    ctx.moveTo(30, revenueCanvas.height - 40);
    ctx.lineTo(revenueCanvas.width - 20, revenueCanvas.height - 40);
    ctx.stroke();

    // Distribution Chart (Pie Chart)
    const distributionChartPlaceholder =
      document.getElementById("distributionChart");
    distributionChartPlaceholder.innerHTML = "";
    distributionChartPlaceholder.style.display = "block";

    // Create canvas for chart
    const distributionCanvas = document.createElement("canvas");
    distributionChartPlaceholder.appendChild(distributionCanvas);

    // Draw simple pie chart using canvas
    const ctxPie = distributionCanvas.getContext("2d");
    const categories = ["Products", "Services", "Subscriptions"];
    const percentages = [45, 30, 25];
    const colors = ["#4361ee", "#4cc9f0", "#f72585"];

    // Set canvas dimensions
    distributionCanvas.width = distributionChartPlaceholder.offsetWidth;
    distributionCanvas.height = distributionChartPlaceholder.offsetHeight;

    // Draw chart background
    ctxPie.fillStyle = "#f8f9fa";
    ctxPie.fillRect(0, 0, distributionCanvas.width, distributionCanvas.height);

    // Draw pie chart
    const centerX = distributionCanvas.width / 2;
    const centerY = distributionCanvas.height / 2 - 20;
    const radius = Math.min(centerX, centerY) - 40;

    let startAngle = 0;
    for (let i = 0; i < categories.length; i++) {
      const endAngle = startAngle + (percentages[i] / 100) * 2 * Math.PI;

      // Draw pie slice
      ctxPie.fillStyle = colors[i];
      ctxPie.beginPath();
      ctxPie.moveTo(centerX, centerY);
      ctxPie.arc(centerX, centerY, radius, startAngle, endAngle);
      ctxPie.closePath();
      ctxPie.fill();

      // Calculate position for label
      const labelAngle = startAngle + (endAngle - startAngle) / 2;
      const labelX = centerX + (radius + 20) * Math.cos(labelAngle);
      const labelY = centerY + (radius + 20) * Math.sin(labelAngle);

      // Draw label line
      ctxPie.strokeStyle = colors[i];
      ctxPie.beginPath();
      ctxPie.moveTo(
        centerX + radius * Math.cos(labelAngle),
        centerY + radius * Math.sin(labelAngle)
      );
      ctxPie.lineTo(labelX, labelY);
      ctxPie.stroke();

      // Draw label
      ctxPie.fillStyle = "#1b263b";
      ctxPie.font = "bold 12px Arial";
      ctxPie.textAlign = labelX > centerX ? "left" : "right";
      ctxPie.fillText(`${categories[i]}: ${percentages[i]}%`, labelX, labelY);

      startAngle = endAngle;
    }

    // Draw legend
    const legendY = distributionCanvas.height - 60;
    for (let i = 0; i < categories.length; i++) {
      const legendX =
        20 + (i * (distributionCanvas.width - 40)) / categories.length;

      // Draw color box
      ctxPie.fillStyle = colors[i];
      ctxPie.fillRect(legendX, legendY, 15, 15);

      // Draw label
      ctxPie.fillStyle = "#1b263b";
      ctxPie.font = "12px Arial";
      ctxPie.textAlign = "left";
      ctxPie.fillText(categories[i], legendX + 20, legendY + 12);
    }
  }, 1000);
});
