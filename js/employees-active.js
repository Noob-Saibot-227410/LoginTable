window.onload = function() {
  var table = document.getElementById("tableFields").getElementsByTagName("tbody")[0];

  // load the data from LocalStorage
  var data = localStorage.getItem("tableData");
  if (data) {
    table.innerHTML = data;
  }

  // add event listener to the "Add Field" button
  document.getElementById("addButton").addEventListener("click", function() {
    var newRow = table.insertRow(-1);

    // create new columns
    var nameCell = newRow.insertCell(0);
    nameCell.contentEditable = "true";
    nameCell.innerHTML = "New Employee";

    var positionCell = newRow.insertCell(1);
    positionCell.contentEditable = "true";
    positionCell.innerHTML = "Position";

    var skillsCell = newRow.insertCell(2);
    skillsCell.contentEditable = "true";
    skillsCell.innerHTML = "Skills";

    var projectCell = newRow.insertCell(3);
    projectCell.contentEditable = "true";
    projectCell.innerHTML = "Project";

    var startDateCell = newRow.insertCell(4);
    startDateCell.contentEditable = "true";
    startDateCell.innerHTML = "Start Date";

    var endDateCell = newRow.insertCell(5);
    endDateCell.contentEditable = "true";
    endDateCell.innerHTML = "End Date";

    var awsCertificateCell = newRow.insertCell(6);
    var awsCertificateInput = document.createElement("input");
    awsCertificateInput.type = "checkbox";
    awsCertificateInput.classList.add("awsCertificate");
    awsCertificateCell.appendChild(awsCertificateInput);

    var actionsCell = newRow.insertCell(7);
    var removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("removeButton");
    removeButton.innerHTML = "Remove";
    removeButton.addEventListener("click", function() {
      table.deleteRow(newRow.rowIndex);


// Function to convert the table data to CSV format
// function convertToCSV(table) {
//   let csv = '';
//   const rows = table.getElementsByTagName('tr');
  
//   for (let i = 0; i < rows.length; i++) {
//     const cells = rows[i].getElementsByTagName('td');
    
//     for (let j = 0; j < cells.length; j++) {
//       csv += cells[j].textContent;
//       if (j < cells.length - 1) {
//         csv += ',';
//       }
//     }
//     csv += '\n';
//   }
  
//   return csv;
// }

// Event listener for the "Excel CSV" button

// Get the "Excel CSV" button element
const downCsvBtn = document.getElementById("downCsv");

// Add a click event listener to the button
downCsvBtn.addEventListener("click", function() {
  // Get the table element
  const table = document.getElementById("tableFields");

  // Convert the table data to a CSV string
  const csv = Array.from(table.rows).map(row => {
    return Array.from(row.cells).map(cell => cell.textContent).join(",");
  }).join("\n");

  // Create a new Blob object with the CSV string as data
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  // Create a new temporary URL to the Blob object
  const url = URL.createObjectURL(blob);

  // Create a new temporary link element to download the CSV file
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "table-data.csv");
  link.style.display = "none";

  // Add the link element to the document and click it
  document.body.appendChild(link);
  link.click();

  // Remove the link element from the document
  document.body.removeChild(link);

  // Revoke the temporary URL
  URL.revokeObjectURL(url);
});




      // save the data to LocalStorage
      localStorage.setItem("tableData", table.innerHTML);
    });
    actionsCell.appendChild(removeButton);

    // save the data to LocalStorage
    localStorage.setItem("tableData", table.innerHTML);
  });

  // add event listeners to the "Remove" buttons
  var removeButtons = document.getElementsByClassName("removeButton");
  for (var i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", function() {
      this.parentNode.parentNode.parentNode.deleteRow(this.parentNode.parentNode.rowIndex);

      // save the data to LocalStorage
      localStorage.setItem("tableData", table.innerHTML);
    });
  }

  // add event listener to all the table cells to save data to LocalStorage on change
  var cells = table.getElementsByTagName("td");
  for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("input", function() {
      localStorage.setItem("tableData", table.innerHTML);
    });
  }

  // add event listener to the "Exit" button
  document.getElementById("exitButton").addEventListener("click", function() {

    window.location.href = "index.html";
  
  });

// add event listener to the "Log In" button on the index page to load the data from LocalStorage
document.getElementById("login-button").addEventListener("click", function() {
  var data = localStorage.getItem("tableData");
  if (data) {
    table.innerHTML = data;
  }
});
}