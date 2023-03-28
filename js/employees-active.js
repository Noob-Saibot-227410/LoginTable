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
    nameCell.style.wordWrap = "break-word";
    nameCell.innerHTML = "-";


    var positionCell = newRow.insertCell(1);
    positionCell.contentEditable = "true";
    positionCell.innerHTML = "DevOps";

    var skillsCell = newRow.insertCell(2);
    skillsCell.contentEditable = "true";
    skillsCell.innerHTML = "-";

    var projectCell = newRow.insertCell(3);
    projectCell.contentEditable = "true";
    projectCell.innerHTML = "dataRain";

    // var startDateCell = newRow.insertCell(4);
    // startDateCell.contentEditable = "true";
    // startDateCell.innerHTML = "Start Date";

    var actionsCell = newRow.insertCell(4);
    var removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("removeButton");
    removeButton.innerHTML = "Excluir";
    removeButton.addEventListener("click", function() {
      table.deleteRow(newRow.rowIndex);
    
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

// add event listener to the "Clear All" button
document.getElementById("clearAll").addEventListener("click", function() {
  // delete all rows except for the first row
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // save the data to LocalStorage
  localStorage.setItem("tableData", table.innerHTML);
});

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

  // add event listener to the new button
  document.getElementById("removeAllButton").addEventListener("click", function() {
    if (table.rows.length > 1) {
      for (var i = table.rows.length - 1; i >= 1; i--) {
        table.deleteRow(i);
      }
      // save the data to LocalStorage
      localStorage.setItem("tableData", table.innerHTML);
    }
  });

// add event listener to the "Log In" button on the index page to load the data from LocalStorage
document.getElementById("login-button").addEventListener("click", function() {
  var data = localStorage.getItem("tableData");
  if (data) {
    table.innerHTML = data;
  }
});
}
