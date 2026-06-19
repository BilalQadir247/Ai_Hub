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
const totalQuestions = Number(localStorage.getItem("totalQuizQuestions")) || 0;
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
if (quizNumber) {
    quizNumber.textContent = totalQuestions;
}
console.log(totalQuestions)

// ToTalTasksCHart
const totalTasks = tasks.length;

const ctx = document.getElementById("totalTaskChart");

new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: ["Total Tasks"],
        datasets: [{
            data: [totalTasks],
            backgroundColor: ["#38bdf8"],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        cutout: "70%",
        plugins: {
            legend: {
                display: true
            },
            title: {
                display: true,
                text: `Total Tasks: ${totalTasks}`
            }
        }
    }
});

// complete Tasks
const ctxx = document.getElementById("completedTaskChart");
const pendingTasks = tasks.filter(task => !task.complete).length;

new Chart(ctxx, {
    type: "pie",
    data: {
        labels: ["Completed", "Pending"],
        datasets: [{
            label: "Tasks",
            data: [completedTasks, pendingTasks],
            backgroundColor: [
                "#38bdf8",
                "#94a3b8"  
            ],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Completed vs Pending Tasks"
            },
            legend: {
                position: "bottom"
            }
        }
    }
});

// NotesChart
const dateCounts = {};

notes.forEach(note => {
    dateCounts[note.date] = (dateCounts[note.date] || 0) + 1;
});

const labels = Object.keys(dateCounts);
const data = Object.values(dateCounts);

new Chart(document.getElementById("notesChart"), {
    type: "line",
    data: {
        labels,
        datasets: [{
            label: "Notes Created",
            data,
            tension: 0.4,
            fill: false
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Notes Created By Date"
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});

// Links Chart
  const validLinks = links.filter(link =>
        link.InputLink.startsWith("http://") ||
        link.InputLink.startsWith("https://")
    ).length;


    // Invalid URL
    const invalidLinks = links.length - validLinks;



    const ctxxx = document.getElementById("linkChart");


    new Chart(ctxxx, {

        type: "pie",

        data: {

            labels: [
                "Valid Links",
                "Invalid Links"
            ],

            datasets: [{

                label: "Links",

                data: [
                    validLinks,
                    invalidLinks
                ],

                backgroundColor: [
                    "#94a3b8",
                    "#0f172a"
                ],

                borderWidth: 2

            }]

        },


        options: {

            responsive: true,

            plugins: {

                title: {

                    display: true,

                    text: `Links Status (Total: ${links.length})`

                },


                legend: {

                    position: "bottom"

                }

            }

        }

    });

    const sourceCount = {};


links.forEach(link => {

    let source = "Other";


    if(link.InputLink.startsWith("http")){

        const url = new URL(link.InputLink);

        source = url.hostname.replace("www.","");

    }


    sourceCount[source] = 
    (sourceCount[source] || 0) + 1;


});



const labels1 = Object.keys(sourceCount);

const data1 = Object.values(sourceCount);



const linksS = document.getElementById("sourceChart");



new Chart(linksS, {

    type:"bar",


    data:{


        labels: labels1,


        datasets:[{

            label:"Links",

            data:data1,


            borderWidth:1

        }]


    },


    options:{


        responsive:true,


        plugins:{


            title:{


                display:true,


                text:"Links By Source"

            },


            legend:{


                position:"bottom"

            }

        },


        scales:{


            y:{


                beginAtZero:true,


                ticks:{

                    stepSize:1

                }

            }

        }


    }


});


// quizCgart

const quiz = document.getElementById("quizChart");




new Chart(quiz, {


    type:"bar",


    data:{


        labels:["Total Quiz"],


        datasets:[{

            label:"Quiz Count",


            data:[totalQuestions],


            borderRadius:15,


            barThickness:60

        }]


    },


    options:{


        responsive:true,


        plugins:{


            title:{


                display:true,


                text:"Total Quiz Overview",


                font:{


                    size:18

                }

            },


            legend:{


                display:false

            }


        },


        scales:{


            y:{


                beginAtZero:true,


                ticks:{


                    stepSize:5

                }


            }

        }


    }



});