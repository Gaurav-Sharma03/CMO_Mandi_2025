document.addEventListener("DOMContentLoaded", function () {
    // Fetch hospital data from the JSON file
    fetch('json/hospitals.json')
      .then(response => response.json())
      .then(data => {
        const hospitalList = document.getElementById('hospitalList');
        
        // Loop through hospital data and create cards
        data.hospitals.forEach(hospital => {
          const card = document.createElement('div');
          card.classList.add('col-md-4', 'hospital-card', 'show');
          card.setAttribute('data-type', hospital.type);
          
          card.innerHTML = `
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title ${hospital.class}">${hospital.name}</h5>
                <p class="card-text small">Type: ${hospital.type.charAt(0).toUpperCase() + hospital.type.slice(1)}</p>
                <p class="small">Phone: ${hospital.phone}<br>Location: ${hospital.location}</p>
              </div>
            </div>
          `;
          
          hospitalList.appendChild(card);
        });

        // Filter functionality
        const buttons = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.hospital-card');

        buttons.forEach(btn => {
          btn.addEventListener('click', () => {
            // Remove 'active' from all buttons
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
  
            const type = btn.getAttribute('data-type');
  
            cards.forEach(card => {
              if (type === 'all' || card.getAttribute('data-type') === type) {
                card.classList.add('show');
              } else {
                card.classList.remove('show');
              }
            });
          });
        });
      });
});
