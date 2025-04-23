document.addEventListener("DOMContentLoaded", function () {
  // Fetch doctor data from the JSON file
  fetch('json/services.json')
    .then(response => response.json())
    .then(data => {
      const doctorList = document.getElementById('doctorList');
      
      // Loop through doctor data and create cards
      data.doctors.forEach(doctor => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'col-sm-6', 'doctor-card', 'show', 'mb-4');

        card.innerHTML = `
          <div class="card shadow-lg border-0 rounded-4">
            <div class="card-img-container">
              <img src="${doctor.image}" class="card-img-top img-fluid rounded-top" alt="Dr. ${doctor.name}" style="height: 200px; object-fit: cover;">
            </div>
            <div class="card-body">
              <h5 class="card-title text-center text-primary">${doctor.name}</h5>
              <p class="card-text"><strong>Department:</strong> ${doctor.department}</p>
              <p class="card-text"><strong>Location:</strong> ${doctor.location}</p>
              <p class="card-text"><strong>Phone:</strong> <a href="tel:${doctor.phone}" class="text-decoration-none">${doctor.phone}</a></p>
              <p class="card-text"><strong>Services:</strong></p>
              <ul class="list-unstyled">
                ${doctor.services.map(service => `<li><i class="bi bi-check-circle-fill text-success"></i> ${service}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
        
        doctorList.appendChild(card);
      });

      // Filter functionality
      const buttons = document.querySelectorAll('.filter-btn');
      const cards = document.querySelectorAll('.doctor-card');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove 'active' from all buttons
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const department = btn.getAttribute('data-department');

          cards.forEach(card => {
            if (department === 'all' || card.querySelector('.card-text').textContent.includes(department)) {
              card.classList.add('show');
            } else {
              card.classList.remove('show');
            }
          });
        });
      });
    });
});
