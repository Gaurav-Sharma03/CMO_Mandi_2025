// Global variable to store fetched forms
let formsData = [];

// Function to fetch form data from the JSON file
async function loadForms() {
    try {
        const response = await fetch('json/forms.json');
        const data = await response.json();
        formsData = data.forms; // Store in global variable

        const formButtonsContainer = document.getElementById('form-buttons');
        formButtonsContainer.innerHTML = ''; // Clear previous content

        formsData.forEach(form => {
            const formCard = document.createElement('div');
            formCard.classList.add('form-card');

            const formContent = document.createElement('div');
            formContent.classList.add('form-content');

            const formTitle = document.createElement('h3');
            formTitle.textContent = form.title;

            const formDescription = document.createElement('p');
            formDescription.textContent = form.description;

            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download';
            downloadButton.classList.add('download-btn');
            downloadButton.onclick = () => downloadForm(form.id);

            formContent.appendChild(formTitle);
            formContent.appendChild(formDescription);
            formCard.appendChild(formContent);
            formCard.appendChild(downloadButton);

            formButtonsContainer.appendChild(formCard);
        });
    } catch (error) {
        console.error('Error loading forms data:', error);
    }
}

// Function to get a form object by ID
function getFormById(formId) {
    return formsData.find(form => form.id === formId);
}

// Function to handle download
function downloadForm(formId) {
    const form = getFormById(formId);
    if (form) {
        const link = document.createElement('a');
        link.href = form.downloadLink;
        link.download = `${form.title}.pdf`;
        link.click();
    } else {
        alert("Download link not found.");
    }
}

// Load forms on page load
window.onload = loadForms;
