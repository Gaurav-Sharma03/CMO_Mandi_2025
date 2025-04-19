const perPage = 15;
let currentPage = 1;

async function loadNotificationsFromJson(jsonUrl) {
  try {
    const res = await fetch(jsonUrl);  // JSON path remains unchanged if the file is in the 'json' folder.
    const notifications = await res.json();
    renderNotifications(notifications, currentPage);
  } catch (err) {
    console.error("Error loading notifications from JSON:", err);
    document.getElementById("notification-list").innerHTML = "<li class='list-group-item text-danger'>Failed to load notifications.</li>";
  }
}

function renderNotifications(notifications, page) {
  const list = document.getElementById("notification-list");
  const start = (page - 1) * perPage;
  const end = start + perPage;
  list.innerHTML = "";

  notifications.slice(start, end).forEach((n) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";

    li.innerHTML = `
      <div class="me-3">
        <span class="fw-bold">${n.title}</span>
        ${n.isNew ? '<span class="new-badge">🆕 New</span>' : ""}
        <span class="text-muted small">${n.date}</span>
      </div>
      <div class="view-btn-container">
        <button 
          class="btn btn-outline-primary btn-sm btn-view-details"
          data-bs-toggle="modal"
          data-bs-target="#notificationModal"
          data-title="${n.title}"
          data-date="${n.date}"
          data-details="${n.details}"
          data-pdf="${n.pdf}"
        >
          View Details
        </button>
      </div>
    `;
    list.appendChild(li);
  });

  renderPagination(notifications.length);
}

function renderPagination(totalItems) {
  const pageCount = Math.ceil(totalItems / perPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const prev = document.createElement("li");
  prev.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
  prev.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      loadNotificationsFromJson("json/notifications.json");
    }
  };
  pagination.appendChild(prev);

  for (let i = 1; i <= pageCount; i++) {
    const page = document.createElement("li");
    page.className = `page-item ${i === currentPage ? "active" : ""}`;
    page.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    page.onclick = () => {
      currentPage = i;
      loadNotificationsFromJson("json/notifications.json");
    };
    pagination.appendChild(page);
  }

  const next = document.createElement("li");
  next.className = `page-item ${currentPage === pageCount ? "disabled" : ""}`;
  next.innerHTML = `<a class="page-link" href="#">Next</a>`;
  next.onclick = () => {
    if (currentPage < pageCount) {
      currentPage++;
      loadNotificationsFromJson("json/notifications.json");
    }
  };
  pagination.appendChild(next);
}

document.addEventListener("DOMContentLoaded", () => {
  loadNotificationsFromJson("json/notifications.json");

  const modal = document.getElementById("notificationModal");
  modal.addEventListener("show.bs.modal", function (event) {
    const button = event.relatedTarget;
    document.getElementById("modal-title").textContent = button.getAttribute("data-title");
    document.getElementById("modal-date").textContent = button.getAttribute("data-date");
    document.getElementById("modal-details").textContent = button.getAttribute("data-details");
    document.getElementById("modal-download").href = button.getAttribute("data-pdf");
  });
});
