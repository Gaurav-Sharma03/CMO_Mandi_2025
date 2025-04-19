
  const toggle = document.getElementById('themeToggle');
  const body = document.body;

  // Load saved theme from localStorage
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  });


  // Counter animation for hospital data
  
  // Simple counter animation
  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.count');

    counters.forEach(counter => {
      counter.innerText = '0';

      const updateCount = () => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;

        const increment = Math.ceil(target / 100);

        if (count < target) {
          counter.innerText = Math.min(count + increment, target);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  });


//=========================
document.addEventListener("DOMContentLoaded", () => {
  loadPhotoGallery();
  loadVideoGallery();
});

function loadPhotoGallery() {
  fetch('json/gallery.json')
    .then(response => {
      if (!response.ok) throw new Error("Failed to load gallery data.");
      return response.json();
    })
    .then(images => {
      const carouselInner = document.querySelector("#photoGalleryCarousel .carousel-inner");
      const indicators = document.querySelector("#photoGalleryCarousel .carousel-indicators");
      
      carouselInner.innerHTML = "";
      indicators.innerHTML = "";

      images.forEach((img, index) => {
        const isActive = index === 0 ? 'active' : '';

        // Add image slide
        const item = document.createElement('div');
        item.className = `carousel-item ${isActive}`;
        item.innerHTML = `<img src="${img.src}" class="d-block w-100" alt="${img.alt || 'Gallery Image'}">`;
        carouselInner.appendChild(item);

        // Add indicator
        const btn = document.createElement('button');
        btn.type = "button";
        btn.setAttribute('data-bs-target', '#photoGalleryCarousel');
        btn.setAttribute('data-bs-slide-to', index);
        btn.setAttribute('aria-label', `Slide ${index + 1}`);
        if (isActive) {
          btn.classList.add('active');
          btn.setAttribute('aria-current', 'true');
        }
        indicators.appendChild(btn);
      });
    })
    .catch(err => {
      console.error("Photo Gallery Error:", err);
      document.querySelector("#photoGalleryCarousel .carousel-inner").innerHTML = `<p class="text-danger p-3">Unable to load images.</p>`;
    });
}

function loadVideoGallery() {
  fetch('json/videos.json')
    .then(response => {
      if (!response.ok) throw new Error("Failed to load video data.");
      return response.json();
    })
    .then(videos => {
      const video = videos[0]; // Show the first video (or loop if needed)
      const videoContainer = document.querySelector(".ratio iframe");
      if (video && video.url) {
        videoContainer.src = video.url;
        videoContainer.title = video.title || "Gallery Video";
      }
    })
    .catch(err => {
      console.error("Video Gallery Error:", err);
      document.querySelector(".ratio").innerHTML = `<p class="text-danger p-3">Unable to load video.</p>`;
    });
}


// ======================featch data form latest event section==================================== 
document.addEventListener("DOMContentLoaded", () => {
  fetch('json/events.json')
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      const latestEvents = data.slice(0, 5); // Get latest 5 events
      populateLatestEventsCarousel(latestEvents);
    })
    .catch(error => {
      console.error('Error loading latest events:', error);
      document.getElementById("latest-events-carousel-inner").innerHTML = "<p class='text-danger text-center'>Unable to load events.</p>";
    });
});

function populateLatestEventsCarousel(events) {
  const carouselInner = document.getElementById("latest-events-carousel-inner");
  const indicators = document.getElementById("carousel-indicators");
  carouselInner.innerHTML = "";
  indicators.innerHTML = "";

  events.forEach((event, index) => {
    const isActive = index === 0 ? "active" : "";

    // Carousel item
    const item = document.createElement("div");
    item.className = `carousel-item ${isActive}`;
    item.innerHTML = `
      <div class="p-4 mx-3  my-3">
        <h5 class="text-primary fw-bold">${event.title}</h5>
        <p>${event.description}</p>
        <p class="text-muted"><small>${event.date || "Date not available"}</small></p>
        ${event.detailsUrl ? `<a href="${event.detailsUrl}" class="btn btn-sm btn-primary" target="_blank">View Details</a>` : ""}
      </div>
    `;
    carouselInner.appendChild(item);

    // Carousel indicator
    const indicatorBtn = document.createElement("button");
    indicatorBtn.type = "button";
    indicatorBtn.setAttribute("data-bs-target", "#latestEventsCarousel");
    indicatorBtn.setAttribute("data-bs-slide-to", index);
    if (index === 0) {
      indicatorBtn.className = "active";
      indicatorBtn.setAttribute("aria-current", "true");
    }
    indicatorBtn.setAttribute("aria-label", `Event ${index + 1}`);
    indicators.appendChild(indicatorBtn);
  });
}
//=============================================================================
//=================multiple department image scroller===================================

const images = [
  "Image/Aadhar-Logo.jpg",
  "Image/Birth-Death-Logo.jpg",
  "Image/Election-Logo.png",
  "Image/Esamadhan-Logo.png",
  "Image/logo5.jpg",
  "Image/logo6.jpg",
  "Image/logo7.jpg",
  "Image/logo8.jpg"
];

const itemsToShow = 3;
const carouselInner = document.getElementById('carousel-inner-images');

// Create individual carousel items, 1 image per item
images.forEach((img, index) => {
  const item = document.createElement('div');
  item.classList.add('carousel-item');
  if (index === 0) item.classList.add('active');

  const row = document.createElement('div');
  row.classList.add('row', 'justify-content-center');

  for (let i = 0; i < itemsToShow; i++) {
    const imgIndex = (index + i) % images.length;
    const col = document.createElement('div');
    col.classList.add('col-2', 'd-flex', 'justify-content-center');

    const image = document.createElement('img');
    image.src = images[imgIndex];
    image.alt = `Image ${imgIndex + 1}`;
    image.className = 'img-fluid';
    image.style.maxHeight = '100px';
    image.style.maxWidth = '300px';

    col.appendChild(image);
    row.appendChild(col);
  }

  item.appendChild(row);
  carouselInner.appendChild(item);
});

// Autoplay every 2 seconds
setInterval(() => {
  const carousel = new bootstrap.Carousel('#multiSlideCarousel');
  carousel.next();
}, 3000);
//=====================================================================

