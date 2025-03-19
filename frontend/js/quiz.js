const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let quizData = null;

async function fetchQuestion(index) {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please log in first!");
            return;
        }

        const response = await fetch(`https://educationalgamificationapp.onrender.com/getQuizByIndex?index=${index}`, {
            method: "GET",
            headers: {
                "Authorization": `${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (!data.question || !data.question.questions || data.question.questions.length === 0) {
            throw new Error("Invalid quiz data format");
        }

        quizData = data.question.questions[0];
        loadQuestion();
    } catch (error) {
        console.error("Error fetching quiz:", error);
        questionElement.innerText = "Failed to load question!";
        optionsContainer.innerHTML = "";
    }
}

function loadQuestion() {
    if (!quizData) {
        alert("No quiz data available!");
        return;
    }

    questionElement.innerText = quizData.questionText || "Question not found";
    optionsContainer.innerHTML = "";

    if (!quizData.options || !Array.isArray(quizData.options)) {
        alert("Options not available!");
        return;
    }

    const labels = ["A", "B", "C", "D"];

    quizData.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.innerHTML = `<strong>${labels[index]}.</strong> ${option}`;
        btn.classList.add("option");
        btn.setAttribute("data-label", labels[index]);
        btn.onclick = () => checkAnswer(btn, option, quizData.correctAnswer);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(button, selected, correct) {
    const buttons = document.querySelectorAll(".option");

    if (selected === correct) {
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");

        // Highlight correct answer
        buttons.forEach(btn => {
            if (btn.innerText.includes(correct)) {
                btn.classList.add("correct");
            }
        });
    }

    buttons.forEach(btn => btn.disabled = true);

    setTimeout(() => {
        currentQuestionIndex++;
        fetchQuestion(currentQuestionIndex);
    }, 1500);
}

nextButton.addEventListener("click", () => fetchQuestion(currentQuestionIndex));

fetchQuestion(currentQuestionIndex);
