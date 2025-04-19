const perPage = 12;
let currentPage = 1;
let images = []; // Empty array to hold the gallery data

// Fetch the JSON data from gallery.json file
fetch('json/gallery.json')
  .then((response) => response.json())
  .then((data) => {
    images = data; // Store the fetched data into images array
    renderGallery(currentPage); // Initial render
  })
  .catch((error) => {
    console.error('Error loading gallery data:', error);
  });

// Function to render gallery images
function renderGallery(page) {
  const galleryGrid = document.getElementById('gallery-grid');
  const start = (page - 1) * perPage;
  const end = start + perPage;
  galleryGrid.innerHTML = ''; // Clear the grid before rendering new items

  images.slice(start, end).forEach((image) => {
    const div = document.createElement('div');
    div.className = 'col';

    div.innerHTML = `
      <div class="gallery-item">
        <a href="${image.src}" data-bs-lightbox="gallery" data-bs-title="${image.title}">
          <img src="${image.src}" alt="${image.alt}" class="img-fluid" />
        </a>
        <div class="gallery-overlay">
          <span>View</span>
        </div>
      </div>
    `;

    galleryGrid.appendChild(div);
  });

  renderPagination();
}

// Function to render pagination
function renderPagination() {
  const pageCount = Math.ceil(images.length / perPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = ''; // Clear pagination before rendering new items

  const prev = document.createElement('li');
  prev.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
  prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
  prev.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderGallery(currentPage);
    }
  };
  pagination.appendChild(prev);

  for (let i = 1; i <= pageCount; i++) {
    const page = document.createElement('li');
    page.className = `page-item ${i === currentPage ? 'active' : ''}`;
    page.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    page.onclick = () => {
      currentPage = i;
      renderGallery(currentPage);
    };
    pagination.appendChild(page);
  }

  const next = document.createElement('li');
  next.className = `page-item ${currentPage === pageCount ? 'disabled' : ''}`;
  next.innerHTML = `<a class="page-link" href="#">Next</a>`;
  next.onclick = () => {
    if (currentPage < pageCount) {
      currentPage++;
      renderGallery(currentPage);
    }
  };
  pagination.appendChild(next);
}

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initially render gallery when data is loaded
});
