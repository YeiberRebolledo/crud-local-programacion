var selectedRow = null;

// Show Alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields
function clearFields(){
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNo").value = "";
    document.querySelector("#reservation").value = "";
    document.querySelector("#duration").value = "";
   
}

// Add Data

document.querySelector("#student-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    //Get Form Values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNo = document.querySelector("#rollNo").value;
    const reservation = document.querySelector("#reservation").value;
    const duration = document.querySelector("#duration").value;
    

    //validate
    if(firstName == "" || lastName == "" || rollNo == "" || reservation == "" || duration == ""){
        showAlert("Por favor agregue sus datos", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");
            
            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${rollNo}</td>
                <td>${reservation}</td>
                <td>${duration}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Registro Exitoso", "success");
        }
         else{
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            selectedRow.children[3].textContent = reservation;
            selectedRow.children[4].textContent = duration;
            selectedRow = null;
            showAlert("Registro Editado", "info");
        }

        clearFields();
    }
});

// Edit Data

document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
        document.querySelector("#reservation").value = selectedRow.children[3].textContent;
        document.querySelector("#duration").value = selectedRow.children[4].textContent;
    }
});

// Delete Data

document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Registro Eliimnado", "danger");
    }
});