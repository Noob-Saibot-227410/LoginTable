// Seleciona a tabela (table)
const table = document.getElementById("tableFields");
// Seleciona o botão "Adicionar Linha"
const addButton = document.getElementById("addButton");
// Seleciona o corpo da tabela (tbody)
const tableBody = document.getElementsByTagName("tbody")[0];
// Seleciona o botão "Download CSV"
const saveButton = document.getElementById("saveTable");
// Seleciona o botão "Salvar"
const saveStatusButton = document.getElementById("saveStatus");

// função de download CSV
function downloadCSV() {
  var tabela = document.getElementById("tableFields");
  var linhas = tabela.rows;
  var csv = [];

  for (var i = 0; i < linhas.length; i++) {
    var linha = [];
    var colunas = tabela.rows[i].querySelectorAll("input");

    for (var j = 0; j < colunas.length; j++) {
      linha.push(colunas[j].value);
    }

    csv.push(linha.join(","));
  }

  var link = document.createElement("a");
  link.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csv.join("\n")));
  link.setAttribute("download", "tabela.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// Adiciona um ouvinte de eventos ao botão "Adicionar Linha"
addButton.addEventListener("click", function() {
  // Cria uma nova linha na tabela
  const newRow = tableBody.insertRow();

  // Adiciona as células na nova linha
  const nameCell = newRow.insertCell();
  const skillCell = newRow.insertCell();
  const projectCell = newRow.insertCell();
  const startDateCell = newRow.insertCell();
  const endDateCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();

  // Adiciona os campos de entrada de dados nas células
  nameCell.innerHTML = "<input type='text' name='name'>";
  skillCell.innerHTML = "<input type='text' name='skill'>";
  projectCell.innerHTML = "<input type='text' name='project'>";
  startDateCell.innerHTML = "<input type='date' name='startDate'>";
  endDateCell.innerHTML = "<input type='date' name='endDate'>";
  deleteCell.innerHTML = "<button type='button' class='deleteButton'>Excluir</button>";

  // Adiciona um ouvinte de eventos ao botão "Excluir"
  const deleteButton = deleteCell.querySelector(".deleteButton");
  deleteButton.addEventListener("click", function() {
    tableBody.deleteRow(newRow.rowIndex);
  });
});

// Adiciona um ouvinte de eventos ao botão "Download CSV"
// saveButton.addEventListener("click", function() {
//   downloadCSV();
// });

// Adiciona um ouvinte de eventos ao botão "Salvar"
saveStatusButton.addEventListener("click", function() {
  saveTableDataToLocalStorage();
});

// Função que lê o conteúdo da tabela e salva no Local Storage
function saveTableDataToLocalStorage() {
  const tableData = [];
  const rows = tableBody.querySelectorAll("tr");

  for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].querySelectorAll("td input");
      const rowData = {};

      for (let j = 0; j < cells.length; j++) {
          const inputName = cells[j].getAttribute("name");
          const inputValue = cells[j].value;

          rowData[inputName] = inputValue;
      }

      tableData.push(rowData);
  }

  localStorage.setItem("tableData", JSON.stringify(tableData));
}

// Carrega os dados da tabela do Local Storage
function loadTableDataFromLocalStorage() {
  const tableData = localStorage.getItem("tableData");
  if (tableData) {
      const parsedTableData = JSON.parse(tableData);
      for (let i = 0; i < parsedTableData.length; i++) {
          const newRow = tableBody.insertRow();
          const nameCell = newRow.insertCell();
          const skillCell = newRow.insertCell();
          const projectCell = newRow.insertCell();
          const startDateCell = newRow.insertCell();
          const endDateCell = newRow.insertCell();
          const deleteCell = newRow.insertCell();
          nameCell.innerHTML = `<input type="text" name="name" value="${parsedTableData[i].name}">`;
          skillCell.innerHTML = `<input type="text" name="skill" value="${parsedTableData[i].skill}">`;
          projectCell.innerHTML = `<input type="text" name="project" value="${parsedTableData[i].project}">`;
          startDateCell.innerHTML = `<input type="date" name="startDate" value="${parsedTableData[i].startDate}">`;
          endDateCell.innerHTML = `<input type="date" name="endDate" value="${parsedTableData[i].endDate}">`;
          deleteCell.innerHTML = `<button type="button" class="deleteButton">Excluir</button>`;
          const deleteButton = deleteCell.querySelector(".deleteButton");
          deleteButton.addEventListener("click", function() {
              tableBody.deleteRow(newRow.rowIndex);
              saveTableDataToLocalStorage();
          });
          const inputs = newRow.querySelectorAll("input");
          for (let j = 0; j < inputs.length; j++) {
              inputs[j].addEventListener("input", function() {
                  saveTableDataToLocalStorage();
              });
          }
      }
  }
}

// Carrega os dados da tabela do Local Storage ao iniciar a página
loadTableDataFromLocalStorage();

// Adiciona um ouvinte de eventos ao botão "Salvar"
saveStatusButton.addEventListener("click", function() {
  saveTableDataToLocalStorage();
});



// add event listener to the "Exit" button
document.getElementById("exitButton").addEventListener("click", function() {
  window.location.href = "index.html";
});