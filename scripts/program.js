$(document).ready(function () {
    $.getJSON('json/program.json', function (data) {
      
      function displayPrograms(unit) {
        const selected = data.find(item => item.unit === unit);
        let html = '';
  
        // Officer Info Card
        html += `
          <div class="col-12 mb-4">
            <div class="card shadow-sm border-0 p-3">
              <div class="row g-3 align-items-center">
                <div class="col-md-3 text-center">
                  <img src="${selected.userImage}" class="img-fluid rounded-circle shadow-sm" alt="${selected.name}" style="width: 150px; height: 150px; object-fit: cover;">
                </div>
                <div class="col-md-9">
                  <h4 class="fw-bold">${selected.name}</h4>
                  <p class="mb-1"><strong>Designation:</strong> ${selected.designation}</p>
                  <p class="mb-1"><strong>Email:</strong> <a href="mailto:${selected.email}" class="text-decoration-none">${selected.email}</a></p>
                  <p class="mb-0"><strong>Contact:</strong> <a href="tel:${selected.contact}" class="text-decoration-none">${selected.contact}</a></p>
                </div>
              </div>
            </div>
          </div>
        `;
  
        // Programs List
        selected.programs.forEach(program => {
          html += `
            <div class="col-md-6 col-lg-4 mb-4">
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">${program.name}</h5>
                  <p class="card-text">${program.description}</p>
                </div>
              </div>
            </div>
          `;
        });
  
        $('#programList').html(html);
      }
  
      // Default Load
      displayPrograms('MOH');
  
      // Filter Buttons
      $('.filter-btn').on('click', function () {
        const selectedUnit = $(this).data('unit');
        displayPrograms(selectedUnit);
  
        // Highlight active button
        $('.filter-btn').removeClass('active btn-primary btn-success btn-warning btn-danger');
        $(this).addClass('active');
  
        switch (selectedUnit) {
          case 'MOH':
            $(this).addClass('btn-primary');
            break;
          case 'DPO UNIT-1':
            $(this).addClass('btn-success');
            break;
          case 'DPO UNIT-2':
            $(this).addClass('btn-warning');
            break;
          case 'DPO UNIT-3':
            $(this).addClass('btn-danger');
            break;
        }
      });
    });
  });
  