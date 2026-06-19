let topic_name_box = document.querySelector(".prompt");
let QuizBtn = document.querySelector(".quiz-btn");
let question_box = document.querySelector(".question-box");
let question_show = document.querySelector(".question-name");
let options_box = document.querySelector(".options-box");
let questionNumber = document.querySelector(".live-q-number");

let currentQuestion = 0;
let scroe = 0;
let quizALL = [];

let click = false;

topic_name_box.addEventListener("click", () => {
  click = !click;

  if (click) {
    topic_name_box.style.border = "2px solid #42b2e9";
    QuizBtn.style.cursor = "pointer";
    QuizBtn.style.backgroundColor = "#29b3f2";
  } else {
    topic_name_box.style.border = "";
    QuizBtn.style.cursor = "not-allowed";
    QuizBtn.style.backgroundColor = "#324154";
  }
});

QuizBtn.addEventListener("click", () => {
  if (topic_name_box.value.trim() === "") {
    alert("Enter a Topic Name You To Generate Quiz");
    return;
  }

  question_box.style.display = "flex";
  question_show.innerText = "Generate Your Quiz please wait...";

  GenerateQuiz();
});

const GenerateQuiz = () => {
  const topic = topic_name_box.value;

  const geminiPrompt = `
Generate exactly 5 multiple-choice questions about '${topic}'.

Return ONLY a valid JSON array.

[
  {
    "question": "Question text",
    "options": ["A","B","C","D"],
    "correct_answer": "A"
  }
]
`;

  getQuiz(geminiPrompt);

  async function getQuiz(geminiPrompt) {
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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"
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

      const data = await response.json();

      const quizText = data.choices[0].message.content;
      const quizData = JSON.parse(quizText);

      // Current quiz reset
      quizALL = quizData;
      currentQuestion = 0;
      scroe = 0;

      // Dashboard count update
      const oldTotal =
        Number(localStorage.getItem("totalQuizQuestions")) || 0;

      const newTotal = oldTotal + quizData.length;

      localStorage.setItem(
        "totalQuizQuestions",
        newTotal
      );

      // All quizzes save
      const oldQuiz =
        JSON.parse(localStorage.getItem("allQuiz")) || [];

      const updatedQuiz = [...oldQuiz, ...quizData];

      localStorage.setItem(
        "allQuiz",
        JSON.stringify(updatedQuiz)
      );

      showQestion();

      console.log("Current Quiz:", quizALL);
      console.log("Total Questions:", newTotal);
    } catch (error) {
      console.error(error);
    }
  }
};

const showQestion = () => {
  const q = quizALL[currentQuestion];

  question_show.innerText = q.question;
  options_box.innerHTML = "";

  questionNumber.innerText =
    `Question ${currentQuestion + 1} of ${quizALL.length}`;

  questionNumber.style.opacity = "1";

  q.options.forEach((option) => {
    const optionDiv = document.createElement("div");

    optionDiv.classList.add("question-optains");

    optionDiv.innerHTML = `<h3>${option}</h3>`;

    optionDiv.addEventListener("click", () => {
      checkAnswer(option);
    });

    options_box.appendChild(optionDiv);
  });
};

const checkAnswer = (selectedOption) => {
  if (
    selectedOption ===
    quizALL[currentQuestion].correct_answer
  ) {
    scroe++;
  }

  currentQuestion++;

  if (currentQuestion < quizALL.length) {
    showQestion();
  } else {
    showReualt();
  }
};

const showReualt = () => {
  question_show.innerText =
    `Quiz Complete Score ${scroe}/${quizALL.length}`;

  options_box.innerHTML = "";
};