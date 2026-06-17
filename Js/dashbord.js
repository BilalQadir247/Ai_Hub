// import { tasks } from "./todo"


const toggle_btn_of = document.querySelector(".toggle-btn-off");
const toggle_btn_on = document.querySelector(".toggle-btn-on");
const side_manue = document.querySelector(".side-manue");

toggle_btn_of.addEventListener("click", () => {
    side_manue.style.left = "0%";
});
toggle_btn_on.addEventListener("click", () => {
    side_manue.style.left = "";
});

const sape1 = document.querySelector(".name");
const nameBox = document.querySelector(".name-box");

const savedName = localStorage.getItem("userTwoLetterName");
if (savedName) {
    sape1.innerHTML = savedName;
}

nameBox.addEventListener("click", () => {
    let name = prompt("Enter a Name");
    if (name === null) return;
    name = name.trim();
    if (name.length > 2) {
        alert("Enter Only Two Letters");
    } else if (name === "") {
        alert("Name cannot be empty!");
    } else {
        sape1.innerHTML = name;
        localStorage.setItem("userTwoLetterName", name);
    }
});

const totalTaskNumber = document.querySelector(".total-task-number");
const totalCompleteNumber = document.querySelector(".Complete-task");
const notesCompleteNumber = document.querySelector(".notes-all");
const quizNumber = document.querySelector(".quiz-Ask");
const AllLink = document.querySelector(".Allinks");
const notes = JSON.parse(localStorage.getItem('mynotes')) || [];
const tasks = JSON.parse(localStorage.getItem("mytask")) || [];
const links = JSON.parse(localStorage.getItem('mylinks')) || [];

if (totalTaskNumber) {
    totalTaskNumber.textContent = tasks.length;
}
const completedTasks = tasks.filter(task => task.complete).length;
if (totalCompleteNumber) {
    totalCompleteNumber.textContent = completedTasks;
}
if (notesCompleteNumber) {
    notesCompleteNumber.textContent = notes.length;
}
if (AllLink) {
    AllLink.textContent = links.length;
}
