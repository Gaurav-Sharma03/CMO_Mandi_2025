const perPage = 6;
let currentPage = 1;
let videos = []; // Store the videos fetched from the JSON file.

async function fetchVideos() {
  try {
    const response = await fetch('json/videos.json'); // ✅ Make sure the path matches your folder structure
    if (!response.ok) {
      throw new Error('Failed to fetch video data');
    }
    videos = await response.json();
    renderVideos(currentPage);
  } catch (error) {
    console.error('Error fetching videos:', error);
    document.getElementById("videos-list").innerHTML = "<p class='text-danger'>Failed to load videos.</p>";
  }
}

function renderVideos(page) {
  const videosList = document.getElementById("videos-list");
  const start = (page - 1) * perPage;
  const end = start + perPage;
  videosList.innerHTML = "";

  videos.slice(start, end).forEach(video => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card h-100 shadow-sm video-card">
       
        <div class="card-body">
          <h5 class="card-title">${video.title}</h5>
          <p class="card-text">${video.description}</p>
        </div>
        <div class="ratio ratio-16x9">
          <iframe src="${video.videoUrl}" title="${video.title}" allowfullscreen></iframe>
        </div>
      </div>
    `;
    videosList.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
  const pageCount = Math.ceil(videos.length / perPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const prev = document.createElement("li");
  prev.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
  prev.onclick = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderVideos(currentPage);
    }
  };
  pagination.appendChild(prev);

  for (let i = 1; i <= pageCount; i++) {
    const page = document.createElement("li");
    page.className = `page-item ${i === currentPage ? "active" : ""}`;
    page.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    page.onclick = (e) => {
      e.preventDefault();
      currentPage = i;
      renderVideos(currentPage);
    };
    pagination.appendChild(page);
  }

  const next = document.createElement("li");
  next.className = `page-item ${currentPage === pageCount ? "disabled" : ""}`;
  next.innerHTML = `<a class="page-link" href="#">Next</a>`;
  next.onclick = (e) => {
    e.preventDefault();
    if (currentPage < pageCount) {
      currentPage++;
      renderVideos(currentPage);
    }
  };
  pagination.appendChild(next);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchVideos(); // Fetch and render videos on page load
});
