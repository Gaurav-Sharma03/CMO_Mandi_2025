// script.js
document.addEventListener("DOMContentLoaded", function() {
    // Fetch the doctor data from the JSON file
    fetch('json/doctors.json')
      .then(response => response.json())
      .then(data => displayDoctors(data))
      .catch(error => console.error('Error loading doctor data:', error));
  
    // Function to display the doctor information on the page
    function displayDoctors(doctors) {
      const doctorContainer = document.getElementById("doctor-cards-container");
  
      // Loop through each doctor and create a card
      doctors.forEach(doctor => {
        // Create a doctor card element
        const doctorCard = document.createElement("div");
        doctorCard.classList.add("col-md-4");
  
        doctorCard.innerHTML = `
          <div class="doctor-card text-center">
            <img src="${doctor.image}" alt="${doctor.name}" class="img-fluid rounded-circle">
            <h5 class="mt-3">${doctor.name}</h5>
            <p><strong>Specialty:</strong> ${doctor.specialty}</p>
            <p class="contact-info">
              <strong>Contact:</strong> <a href="tel:${doctor.contact.phone.replace(/\s/g, '')}">${doctor.contact.phone}</a><br>
              <strong>Email:</strong> <a href="mailto:${doctor.contact.email}">${doctor.contact.email}</a><br>
              <strong>Office Hours:</strong> ${doctor.officeHours}
            </p>
            <p class="text-muted">${doctor.bio}</p>
          </div>
        `;
  
        // Append the doctor card to the container
        doctorContainer.appendChild(doctorCard);
      });
    }
  });
  