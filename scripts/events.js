const perPage = 6; // Number of items per page
let currentPage = 1;
let events = []; // Array to store fetched events

async function fetchEvents() {
  try {
    const response = await fetch('json/events.json');
    if (!response.ok) throw new Error('Network response was not ok');
    events = await response.json();
    renderEvents(currentPage);
  } catch (error) {
    console.error('Error fetching events:', error);
    document.getElementById("events-list").innerHTML = "<p class='text-danger'>Failed to load events.</p>";
  }
}

function renderEvents(page) {
  const eventsList = document.getElementById("events-list");
  const start = (page - 1) * perPage;
  const end = start + perPage;
  eventsList.innerHTML = ""; // Clear previous content

  events.slice(start, end).forEach(event => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card h-100 shadow-sm event-card">
        <div class="card-body">
          <h5 class="card-title">${event.title}</h5>
          <p class="card-text">${event.description}</p>
          <p class="card-text"><small class="text-muted">${event.date || 'Date not available'}</small></p>
          ${event.detailsUrl ? `<a href="${event.detailsUrl}" class="btn btn-primary" target="_blank">View Details</a>` : ""}
        </div>
      </div>
    `;
    eventsList.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
  const pageCount = Math.ceil(events.length / perPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // Clear previous pagination

  const createPageItem = (text, isActive, isDisabled, onClick) => {
    const pageItem = document.createElement("li");
    pageItem.className = `page-item ${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""}`;
    pageItem.innerHTML = `<a class="page-link" href="#">${text}</a>`;
    if (!isDisabled) {
      pageItem.onclick = (e) => {
        e.preventDefault();
        onClick();
      };
    }
    return pageItem;
  };

  pagination.appendChild(createPageItem('Previous', false, currentPage === 1, () => {
    if (currentPage > 1) {
      currentPage--;
      renderEvents(currentPage);
    }
  }));

  for (let i = 1; i <= pageCount; i++) {
    pagination.appendChild(createPageItem(i, i === currentPage, false, () => {
      currentPage = i;
      renderEvents(currentPage);
    }));
  }

  pagination.appendChild(createPageItem('Next', false, currentPage === pageCount, () => {
    if (currentPage < pageCount) {
      currentPage++;
      renderEvents(currentPage);
    }
  }));
}

// Initialize the events list when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchEvents(); // Fetch and render events on page load
});