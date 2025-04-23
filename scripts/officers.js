document.addEventListener("DOMContentLoaded", function() {
  // Fetch the officer data from the JSON file
  fetch('json/officers.json')
    .then(response => response.json())
    .then(data => {
      const officers = data.officers;

      // Function to display the officer information on the page
      function displayOfficers(officers) {
        const officerContainer = document.getElementById("officer-cards-container");
        officerContainer.innerHTML = ""; // Clear previous cards

        officers.forEach(officer => {
          const officerCard = document.createElement("div");
          officerCard.classList.add("col-md-4", "col-sm-6", "col-12");

          officerCard.innerHTML = `
            <div class="card shadow-sm my-4 rounded">
              <img src="${officer.image}" alt="${officer.name}" class="card-img-top rounded-circle mx-auto mt-3" style="width: 150px; height: 150px; object-fit: cover;">
              <div class="card-body text-center">
                <h5 class="card-title">${officer.name}</h5>
                <p class="card-text"><strong>Designation:</strong> ${officer.designation}</p>
                <p class="card-text"><strong>Posting:</strong> ${officer.posting}</p>
                <p class="card-text">
                  <strong>Contact:</strong> <a href="tel:${officer.contact_number.replace(/\D/g, '')}" class="text-decoration-none">${officer.contact_number}</a>
                </p>
              </div>
            </div>
          `;

          officerContainer.appendChild(officerCard);
        });
      }

      // Initially display all officers
      displayOfficers(officers);

      // Set up filter functionality
      setUpFilter(officers);

      // Function to filter officers based on the selected unit
      function setUpFilter(allOfficers) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
          button.addEventListener('click', function() {
            const unit = this.getAttribute('data-unit');
            const filteredOfficers = unit === 'All' 
              ? allOfficers 
              : allOfficers.filter(officer => officer.designation === unit);

            displayOfficers(filteredOfficers); // Re-display filtered officers
          });
        });
      }
    })
    .catch(error => console.error('Error loading officer data:', error));
});
