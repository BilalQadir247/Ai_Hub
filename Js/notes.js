//Notes

let notesInputBox = document.querySelector(".notes-input-box");
let colseBtn = document.querySelector(".btn-off");
let notesTitle = document.querySelector(".notes-title");
let NotesPhag = document.querySelector(".notes-big-text");
let savenotesBtn = document.querySelector(".save-notes");
let showInout = document.querySelector(".addNotesbtn");
let totalnoteslenght = document.querySelector(".total-notes-lenght");
let dashbordnotesnumber = document.getElementById("notes-total-number");
let NotesBox = document.querySelector(".notes-show");
export let notes = JSON.parse(localStorage.getItem('mynotes')) || [];
let deitals_close_btn_backup = notesInputBox.innerHTML;

const restoreBackupAndEvents = () => {
    notesInputBox.innerHTML = deitals_close_btn_backup;
    
    colseBtn = document.querySelector(".btn-off");
    notesTitle = document.querySelector(".notes-title");
    NotesPhag = document.querySelector(".notes-big-text");
    savenotesBtn = document.querySelector(".save-notes");
    
    colseBtn.addEventListener("click", () => {
        notesInputBox.style.opacity = "0";
    });
    savenotesBtn.addEventListener("click", savenotesdata);
};

showInout.addEventListener("click",()=>{
    restoreBackupAndEvents();
    notesInputBox.style.opacity = "1";
    notesTitle.value = "";
    NotesPhag.value = "";
});

colseBtn.addEventListener("click",()=>{
    notesInputBox.style.opacity = "0";
});

const savenotesdata = () => {
    if(notesTitle.value === "" && NotesPhag.value === ""){
        alert("Add Title & Details");
    } else if(notesTitle.value != "" && NotesPhag.value === ""){
        alert("Add Notes Details");
    } else if(notesTitle.value === "" && NotesPhag.value != ""){
        alert("Add Notes Title");
    } else {
        let note = {
            text: notesTitle.value,
            paragraph: NotesPhag.value,
            date: new Date().toLocaleDateString()
        };
        notes.push(note);
        localStorage.setItem('mynotes', JSON.stringify(notes));
        displayNotes();
    }
};

savenotesBtn.addEventListener("click", savenotesdata);

const displayNotes = () => {
    NotesBox.innerHTML = ""; 
    totalnoteslenght.innerText = notes.length + " notes found";
   
    notes.forEach((data, index) => {
        NotesBox.innerHTML += `<div class="notes-list" data-index="${index}">
                        <div class="note-list-head">
                            <div class="note-icon">
                                 <i class="fas fa-sticky-note"></i>
                            </div>
                            <h3 class="notes-title-head">${data.text}</h3>
                        </div>
                        <div class="notes-list-center">
                            <p>${data.paragraph}</p>
                        </div>
                        <div class="notes-list-end">
                            <p class="task-date-time"><i class="fa-solid fa-calendar-days"></i> ${data.date}</p>
                             <i class="fa fa-trash notesDelete" aria-hidden="true" style="color:red; cursor: pointer;"></i>
                        </div> 
                    </div>`;
    });
    let allNotes = NotesBox.querySelectorAll(".notes-list");
    allNotes.forEach((singleNote) => {
        let index = singleNote.getAttribute("data-index");
        singleNote.addEventListener("click", () => {
            notesInputBox.style.opacity = "1";
            notesInputBox.innerHTML = `<div class="notes-details-head">
                <div class="note-icon notes-details-icon">
                 <i class="fas fa-sticky-note"></i>
                </div>
                <i class="fas fa-times btn-off notese-details-close-btn close-btn-detials"></i>
              </div>
              <div class="notes-title-details">
              <h3>${notes[index].text}</h3>
              <p>${notes[index].paragraph}</p>
              </div>
               <div class="notes-list-end">
                <p class="task-date-time"><i class="fa-solid fa-calendar-days"></i> ${notes[index].date}</p>
                </div>`;
              
            let detailsCloseBtn = notesInputBox.querySelector(".close-btn-detials");
            detailsCloseBtn.addEventListener("click", () => {
                notesInputBox.style.opacity = "0"; 
                restoreBackupAndEvents();
            });
        });
        let deleteBtn = singleNote.querySelector(".notesDelete");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            notes.splice(index, 1);
            localStorage.setItem('mynotes', JSON.stringify(notes));
            displayNotes(); 
        });
    });

    notesInputBox.style.opacity = "0"; 
    if(notesTitle) notesTitle.value = "";
    if(NotesPhag) NotesPhag.value = ""; 
};
displayNotes();