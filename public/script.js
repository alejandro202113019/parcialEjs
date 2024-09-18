document.addEventListener('DOMContentLoaded', () => {
  const departmentSelect = document.getElementById('department');
  const municipalitySelect = document.getElementById('municipality');
  const playerForm = document.getElementById('playerForm');
  const playersTable = document.getElementById('players-table');

  // Cargar los departamentos al cargar la página
  fetch('/departments')
    .then(response => response.json())
    .then(departments => {
      departments.sort((a, b) => a.name.localeCompare(b.name));
      departments.forEach(department => {
        const option = document.createElement('option');
        option.value = department.code;
        option.textContent = department.name;
        departmentSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error al cargar los departamentos:', error));

  // Cuando cambia el departamento, actualizar los municipios
  departmentSelect.addEventListener('change', (e) => {
    const departmentCode = e.target.value;
    municipalitySelect.innerHTML = '<option value="">Seleccione un municipio</option>';

    if (departmentCode) {
      fetch(`/municipalities/${departmentCode}`)
        .then(response => response.json())
        .then(municipalities => {
          municipalities.sort((a, b) => a.name.localeCompare(b.name));
          municipalities.forEach(municipality => {
            const option = document.createElement('option');
            option.value = municipality.code;
            option.textContent = municipality.name;
            municipalitySelect.appendChild(option);
          });
        })
        .catch(error => console.error('Error al cargar los municipios:', error));
    }
  });

  // Manejar el envío del formulario
  playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(playerForm);
    const playerData = Object.fromEntries(formData.entries());

    // Obtener los nombres del departamento y municipio seleccionados
    const departmentName = departmentSelect.options[departmentSelect.selectedIndex].text;
    const municipalityName = municipalitySelect.options[municipalitySelect.selectedIndex].text;

    // Crear un objeto con los datos del jugador
    const newPlayer = {
      name: playerData.name,
      age: playerData.age,
      team: playerData.team,
      position: playerData.position,
      birthDepartment: departmentName,
      birthMunicipality: municipalityName
    };

    // Agregar el jugador a la tabla
    addPlayerToTable(newPlayer);

    // Limpiar el formulario
    playerForm.reset();
  });

  function addPlayerToTable(player) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${player.name}</td>
      <td>${player.age}</td>
      <td>${player.team}</td>
      <td>${player.position}</td>
      <td>${player.birthDepartment}</td>
      <td>${player.birthMunicipality}</td>
    `;
    playersTable.appendChild(row);
  }
});