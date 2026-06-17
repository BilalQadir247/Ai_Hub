
// Todo
let input = document.querySelector(".todo-input");
let addTask = document.querySelector(".addbtn");
let div = document.querySelector(".task-div");
let totalsTask = document.querySelector(".totalTask");
let completetasknumber = document.querySelector(".completeTask");

export let tasks = JSON.parse(localStorage.getItem('mytask')) || [];

let selectedTaskIndex = null;

if(addTask){
  addTask.addEventListener("click", () => {
    let inputask = input.value.trim();

    if (inputask === "") {
        alert("Add a new task");
        return;
    }

    let difficulty;
    if (inputask.length < 20) {
        difficulty = "Easy";
    } else if (inputask.length < 50) {
        difficulty = "Medium";
    } else {
        difficulty = "Hard";
    }

    let task = {
        text: inputask,
        difficulty: difficulty,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        complete: false
    };

    tasks.push(task);
    localStorage.setItem('mytask', JSON.stringify(tasks));
    input.value = "";
    render();
});
}


const render = () => {
    div.innerHTML = "";
    totalsTask.innerText = tasks.length + " active";
    
    let completed = tasks.filter(task => task.complete).length;
    if (completetasknumber) {
        completetasknumber.innerText = completed + " complete";
    }

    tasks.forEach((task, index) => {
        let TaskDiv = document.createElement("div");
        TaskDiv.classList.add("task-item");
        
        TaskDiv.innerHTML = `
            <div class="task-up-div">
                <input type="checkbox" class="task-checkbox" ${task.complete ? "checked" : ""}>
                <p class="task-name" style="${task.complete ? 'text-decoration: line-through;' : ''}">${task.text}</p>
            </div>
            <div class="task-down-div">
                <p class="difficulty">${task.difficulty}</p>
                <p class="task-date-time"><i class="fa-solid fa-calendar-days"></i> ${task.date}</p>
                <p class="task-date-time"><i class="fa-solid fa-clock"></i> ${task.time}</p>
            </div>
        `;

        if (selectedTaskIndex === index) {
            TaskDiv.style.backgroundColor = "#20374e";
            TaskDiv.style.borderLeft = "3px solid #38bdf8";
        }

        let check_difficulty = TaskDiv.querySelector(".difficulty");
        if (task.difficulty === "Easy") {
            check_difficulty.style.backgroundColor = "#1e3d40"; check_difficulty.style.color = "#20c15e";
        } else if (task.difficulty === "Medium") {
            check_difficulty.style.backgroundColor = "#393835"; check_difficulty.style.color = "#f59e0e";
        } else if (task.difficulty === "Hard") {
            check_difficulty.style.backgroundColor = "#382d3d"; check_difficulty.style.color = "#ef4442";
        }

        let checkbox_checked = TaskDiv.querySelector(".task-checkbox");
        checkbox_checked.addEventListener("change", (e) => {
            e.stopPropagation(); 
            tasks[index].complete = checkbox_checked.checked;
            localStorage.setItem('mytask', JSON.stringify(tasks));
            render(); 
        });


        TaskDiv.addEventListener("click", (e) => {
           
            if (e.target !== checkbox_checked) {
                if (selectedTaskIndex === index) {
                    selectedTaskIndex = null; 
                } else {
                    selectedTaskIndex = index; 
                }
                render();
            }
        });

        div.appendChild(TaskDiv);
    });

    let taskDetails = document.querySelector(".todo-side-box");
    if (selectedTaskIndex !== null && tasks[selectedTaskIndex]) {
        let currentTask = tasks[selectedTaskIndex];
        taskDetails.innerHTML = `
            <p class="side-task-name" style="${currentTask.complete ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${currentTask.text}</p>
            <div>
                <h3 class="dif"><i class="fas fa-gauge"></i> Difficulty: <p class="difficulty">${currentTask.difficulty}</p></h3> 
                <p class="task-date-time"><i class="fa-solid fa-calendar-days"></i> Date: ${currentTask.date}</p>
                <p class="task-date-time"><i class="fa-solid fa-clock"></i> Time: ${currentTask.time}</p>
                <p><i class="fa fa-trash" aria-hidden="true"></i> Delete: <button class="task-delete">Remove Task</button></p>
            </div>
        `;

        let big = taskDetails.querySelector(".difficulty");
        if (currentTask.difficulty === "Easy") {
            big.style.backgroundColor = "#1e3d40"; big.style.color = "#20c15e";
        } else if (currentTask.difficulty === "Medium") {
            big.style.backgroundColor = "#393835"; big.style.color = "#f59e0e";
        } else if (currentTask.difficulty === "Hard") {
            big.style.backgroundColor = "#382d3d"; big.style.color = "#ef4442";
        }

        let taskDelete = taskDetails.querySelector(".task-delete");
        taskDelete.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(selectedTaskIndex, 1);
            localStorage.setItem('mytask', JSON.stringify(tasks));
            selectedTaskIndex = null;
            render();
        });
    } else {
        taskDetails.innerHTML = ""; 

    }
};


render();
