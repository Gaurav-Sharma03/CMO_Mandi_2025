// script.js
document.addEventListener("DOMContentLoaded", function() {
    // Fetch the official data from the JSON file
    fetch('json/officials.json')
      .then(response => response.json())
      .then(data => displayOfficials(data))
      .catch(error => console.error('Error loading official data:', error));
  
    // Function to display the official information on the page
    function displayOfficials(officials) {
      const officialContainer = document.getElementById("official-cards-container");
  
      // Loop through each official and create a card
      officials.forEach(official => {
        // Create an official card element
        const officialCard = document.createElement("div");
        officialCard.classList.add("col-md-4");
  
        officialCard.innerHTML = `
          <div class="profile-card text-center">
            <img src="${official.image}" alt="${official.name}" class="img-fluid">
            <h5 class="mt-3">${official.name}</h5>
            <p><strong>Designation:</strong> ${official.designation}</p>
            <p><strong>Contact:</strong> <a href="tel:${official.contact.replace(/\s/g, '')}">${official.contact}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${official.email}">${official.email}</a></p>
            <p class="text-muted">${official.bio}</p>
          </div>
        `;
  
        // Append the official card to the container
        officialContainer.appendChild(officialCard);
      });
    }
  });
  