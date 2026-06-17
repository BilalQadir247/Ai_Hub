let Text_Link_Input = document.getElementById("link-title");
let Link_Input = document.getElementById("link-input");
let Save_links_Btn = document.querySelector(".save-link");
let Show_links_box = document.querySelector(".show-link-main-bo");
export let links = JSON.parse(localStorage.getItem('mylinks')) || [];

Save_links_Btn.addEventListener("click",()=>{
    if(Text_Link_Input.value === "" && Link_Input.value === ""){
        alert("Add Link Tilte & Link")
    } else if(Text_Link_Input.value != "" && Link_Input.value === ""){
        alert("Add Link");
    }else if(Text_Link_Input.value === "" &&  Link_Input.value != ""){
        alert("Add Link Title");
    }else{
        let link = {
            linkTitle:Text_Link_Input.value,
            InputLink:Link_Input.value
        }
        links.push(link)
        localStorage.setItem('mylinks', JSON.stringify(links));
        displayLinksBox()
    }
});

const displayLinksBox = () =>{
  Show_links_box.innerHTML = ""

  links.forEach((data,index)=>{
    Show_links_box.innerHTML += `
     <div class="link-box">
                    <div class="icon-bg">
                         <i class="fa-solid fa-arrow-up-right-from-square go-link" data-index="${index}"></i>
                    </div>
                    <div class="text-link-box">
                        <p>${data.linkTitle}</p>
                </div>
                <div class="delete-icon-links">
                     <i class="fa fa-trash delete-link" aria-hidden="true" data-index="${index}"></i>
                </div>
               </div>
    `
    let openLink  = Show_links_box.querySelectorAll(".go-link");
    openLink.forEach((singleLink)=>{
        let index = singleLink.getAttribute("data-index");
        singleLink.addEventListener("click",()=>{
            window.open(data.InputLink)
        });
    });
    
    let DeleteLink  = Show_links_box.querySelectorAll(".delete-link");
    DeleteLink.forEach((Delete)=>{
        let index = Delete.getAttribute("data-index");
        Delete.addEventListener("click",()=>{
            links.splice(index,1)
            localStorage.setItem('mylinks', JSON.stringify(links));
            displayLinksBox()
        });
    });


   });
    
 
   
  Text_Link_Input.value = "";
  Link_Input.value = "";
};
    
displayLinksBox()