async function loadTendersFromJson(jsonUrl, targetId, maxItems = 5) {
    try {
      const res = await fetch(jsonUrl);
      const data = await res.json();
      const list = document.getElementById(targetId);
      list.innerHTML = "";
  
      // Loop through the fetched tenders and display them
      data.slice(0, maxItems).forEach((tender) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-start";
  
        li.innerHTML = `
          <div class="me-3">
            <span class="fw-bold">${tender.title}</span>
            ${tender.isNew ? '<span class="new-badge">🆕 New</span>' : ""}
            <span class="text-muted small">${tender.date}</span>
          </div>
          <div class="view-btn-container">
            <button 
              class="btn btn-outline-primary btn-sm btn-view-details"
              data-bs-toggle="modal"
              data-bs-target="#tenderModal"
              data-title="${tender.title}"
              data-date="${tender.date}"
              data-details="${tender.details}"
              data-pdf="${tender.pdf}"
            >
              View Details
            </button>
          </div>
        `;
        list.appendChild(li);
      });
      renderPagination(data.length);
    } catch (err) {
      console.error("Error loading tenders from JSON:", err);
      document.getElementById(targetId).innerHTML = "<li class='list-group-item text-danger'>Failed to load tenders.</li>";
    }
  }
  
  function renderPagination(totalItems) {
    const perPage = 15;
    const pageCount = Math.ceil(totalItems / perPage);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
  
    let currentPage = 1;
  
    // Previous Button
    const prev = document.createElement("li");
    prev.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
    prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
    prev.onclick = (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        loadTendersFromJson("json/tenders.json", "tender-list", currentPage * perPage);
      }
    };
    pagination.appendChild(prev);
  
    // Page Numbers
    for (let i = 1; i <= pageCount; i++) {
      const page = document.createElement("li");
      page.className = `page-item ${i === currentPage ? "active" : ""}`;
      page.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      page.onclick = (e) => {
        e.preventDefault();
        currentPage = i;
        loadTendersFromJson("json/tenders.json", "tender-list", currentPage * perPage);
      };
      pagination.appendChild(page);
    }
  
    // Next Button
    const next = document.createElement("li");
    next.className = `page-item ${currentPage === pageCount ? "disabled" : ""}`;
    next.innerHTML = `<a class="page-link" href="#">Next</a>`;
    next.onclick = (e) => {
      e.preventDefault();
      if (currentPage < pageCount) {
        currentPage++;
        loadTendersFromJson("json/tenders.json", "tender-list", currentPage * perPage);
      }
    };
    pagination.appendChild(next);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    loadTendersFromJson("json/tenders.json", "tender-list");
  
    const modal = document.getElementById("tenderModal");
    modal.addEventListener("show.bs.modal", function (event) {
      const button = event.relatedTarget;
      document.getElementById("modal-title").textContent = button.getAttribute("data-title");
      document.getElementById("modal-date").textContent = button.getAttribute("data-date");
      document.getElementById("modal-details").textContent = button.getAttribute("data-details");
      document.getElementById("modal-download").href = button.getAttribute("data-pdf");
    });
  });
  