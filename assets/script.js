var taskInput = document.querySelector("#task");
var signUpButton = document.querySelector("#save");
var storedTasks = [];

renderLastRegistered();

function renderLastRegistered() {
  var task = localStorage.getItem("#task");
}

signUpButton.addEventListener("click", function(event) {
  event.preventDefault();

  var task = document.querySelector("#task").value;
  

  localStorage.setItem("#task", task);
  renderLastRegistered();
});
