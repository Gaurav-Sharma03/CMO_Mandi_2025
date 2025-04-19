document.addEventListener("DOMContentLoaded", function () {
    // Fetch doctor data from the JSON file
    fetch('json/services.json')
      .then(response => response.json())
      .then(data => {
        const doctorList = document.getElementById('doctorList');
        
        // Loop through doctor data and create cards
        data.doctors.forEach(doctor => {
          const card = document.createElement('div');
          card.classList.add('col-md-4', 'doctor-card', 'show');
          
          card.innerHTML = `
            <div class="card h-100 shadow-sm">
              <img src="${doctor.image}" class="card-img-top" alt="Dr. ${doctor.name}" style="height: 200px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title text-primary">${doctor.name}</h5>
                <p class="card-text"><strong>Department:</strong> ${doctor.department}</p>
                <p class="card-text"><strong>Location:</strong> ${doctor.location}</p>
                <p class="card-text"><strong>Phone:</strong> ${doctor.phone}</p>
                <p class="card-text"><strong>Services:</strong></p>
                <ul>
                  ${doctor.services.map(service => `<li>${service}</li>`).join('')}
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
