document.addEventListener("DOMContentLoaded", function () {
  // Fetch doctor data from the JSON file
  fetch('json/services.json')
    .then(response => response.json())
    .then(data => {
      const doctorList = document.getElementById('doctorList'); // Ensure this element exists

      // Loop through doctor data and create cards
      data.doctors.forEach(doctor => {
        const card = document.createElement('div');
        card.classList.add("col-md-4", "col-sm-6", "col-12", "doctor-card", "mb-4");

        card.innerHTML = `
          <div class="card shadow-sm my-4 rounded">
            <img src="${doctor.image}" class="card-img-top rounded-circle mx-auto mt-3" alt="Dr. ${doctor.name}" style="width: 150px; height: 150px; object-fit: cover;">
            <div class="card-body text-center">
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

        // Append the card to the doctor list
        doctorList.appendChild(card);
      });

      // Filter functionality
      const buttons = document.querySelectorAll('.filter-btn'); // Assuming you have filter buttons
      const cards = document.querySelectorAll('.doctor-card');

      // Show all cards by default
      cards.forEach(card => {
        card.classList.add('show');
      });

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove 'active' from all buttons
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const department = btn.getAttribute('data-department');

          cards.forEach(card => {
            const cardDepartment = card.querySelector('.card-text').textContent.toLowerCase();
            if (department === 'all' || cardDepartment.includes(department.toLowerCase())) {
              card.classList.add('show');
            } else {
              card.classList.remove('show');
            }
          });
        });
      });
    })
    .catch(error => console.error('Error fetching doctor data:', error));
});
