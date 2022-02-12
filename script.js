// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector("footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0){ //if user values aren't only spaces
        addBtn.classList.add("active");
    }
    else {
        addBtn.classList.remove("active");
    }
}
showTasks(); //calling showTask function

// if user click on the add button
addBtn.onclick = ()=>{
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){ //if localstorage is null
        listArr = []; //creating blank array
    }
    else {
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTask function
}

// function to add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){ //if localstorage is null
        listArr = []; //creating blank array
    }
    else {
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }


    let newLiTag = "";
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank

    // clear all butonu ucun
    if (listArr.length > 0) {
        deleteAllBtn.classList.add("active");
    }
    else {
        deleteAllBtn.classList.remove("active")
    }

        // pendingNumber
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length; //passing the length value in pendingNumber
}

// delete task function 
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    listArr.splice(index, 1); //delete or remove the particular indexed li
    // after remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTask function
}

// delete All tasks function 
deleteAllBtn.onclick = ()=>{
    listArr = [];
    // after delete all the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTask function
}