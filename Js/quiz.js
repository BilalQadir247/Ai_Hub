let topic_name_box = document.querySelector(".prompt");
let QuizBtn = document.querySelector(".quiz-btn");
let question_box = document.querySelector(".question-box");
let question_show = document.querySelector(".question-name");
let options_box = document.querySelector(".options-box")
let questionNumber = document.querySelector(".live-q-number")  
let currentQuestion = 0;
let scroe = 0;
const quizALL = [];

let click = false
topic_name_box.addEventListener("click",()=>{
  click = !click
 if(click === true){
      topic_name_box.style.border = "2px solid #42b2e9"
    QuizBtn.style.cursor = "pointer"
     QuizBtn.style.backgroundColor = "#29b3f2"

 }else{
    topic_name_box.style.border = ""
    QuizBtn.style.cursor = "not-allowed"
     QuizBtn.style.backgroundColor = "#324154"
 }
    
});



QuizBtn.addEventListener("click",()=>{
  if(topic_name_box.value === ""){
    alert("Enter a Topic Name You To Generate Quiz")
  }else{
   GenerateQuiz()
   topic_name_box.value = ""
    question_box.style.display = "flex"
    question_show.innerText = "Generate Your Quiz plase wait.."
  }
})

const GenerateQuiz = () =>{
    const topic = topic_name_box.value;
    const geminiPrompt = `
     Generate exactly 5 multiple-choice questions about '${topic}'.
     Return ONLY a valid JSON array. Do not include markdown formatting like \`\`\`json or \`\`\`, and do not include any introductory or concluding text.

     JSON Structure:
     [
     {
     "question": "The question text string",
     "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
     "correct_answer": "The exact string matching the correct option"
     }
     ]
    `;
    getQuiz(geminiPrompt)
  async function getQuiz(geminiPrompt) {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: geminiPrompt
            }
          ]
        })
      }
    );

    console.log("Status:", response.status);
    const data = await response.json();
    console.log(data.choices[0].message.content);
    const quizText = data.choices[0].message.content;

    const quizData = JSON.parse(quizText);
    quizALL.push(...quizData)
    showQestion()
   console.log(quizALL);
    return data;
  } catch (error) {
    console.error(error);
  }
}
}

const showQestion = () =>{
  
  const q = quizALL[currentQuestion];
  question_show.innerText = q.question;
  options_box.innerHTML = "";
  questionNumber.innerText = `Question ${currentQuestion + 1} to 4`
  questionNumber.style.opacity = "1"
  q.options.forEach((options)=>{
     const optionDiv = document.createElement("div");
     optionDiv.classList.add("question-optains");
     optionDiv.innerHTML = `<h3>${options}</h3>`;

    optionDiv.addEventListener("click", () => {
      checkAnswer(options);
   });

   options_box.appendChild(optionDiv);
  });
  
}

const  checkAnswer = (Selectoptions) =>{
  if(Selectoptions === quizALL[currentQuestion].correct_answer){
    scroe++
    console.log("right")
  }else{
    console.log("worng")
  }
  currentQuestion++

  if(currentQuestion < quizALL.length){
    showQestion()
  }else{
    showReualt()
  }
}

const showReualt = () =>{
  question_show.innerText = `Quiz complete scroe ${scroe}/ ${quizALL.length + 1}`
  options_box.innerHTML = ""
}

