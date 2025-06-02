// variable du quiz
let questions = [];
let currentQuestion = 0;
let score = 0;
let selectedOption = null;

// sert a charger les questions qui sont contenu dans le JSON
// on stocke dans un json pcq c'est + pratique pour ajouter ou modifier
// des questions sans toucher au code JS
async function loadQuestions() {
    try {
        const response = await fetch("../json/questions.json");
        const data = await response.json();
        questions = data.questions;
        displayQuestion(0);
    } catch (error) {
        console.error("Erreur lors du chargement des questions:", error);
        document.querySelector(".quiz-container").innerHTML = 
            "<p class='text-center'>Erreur lors du chargement du quiz. Veuillez réessayer.</p>";
    }
}

// affiche la question a l'index donné
function displayQuestion(questionIndex) {
    const quizContainer = document.querySelector(".quiz-container");
    const question = questions[questionIndex];
    
    // ajouter une div avec la question et les réponses
    const questionHTML = `
        <div class="quiz-question quiz-fade">
            <h3>Question ${questionIndex + 1}/${questions.length}</h3>
            <p>${question.question}</p>
        </div>
        <div class="quiz-options quiz-fade">
            ${question.options.map((option, index) => `
                <div class="quiz-option" data-index="${index}">
                    ${option}
                </div>
            `).join("")}
        </div>
        <button id="validate-btn" class="mt-2" disabled>Question suivante</button>`;
    
    quizContainer.innerHTML = questionHTML;
    setupEventListeners();
}

// ajoute un event listener pour chaque bouton de réponse
// et pour le bouton de validation
function setupEventListeners() {
    const options = document.querySelectorAll(".quiz-option");
    const validateBtn = document.getElementById("validate-btn");
    
    options.forEach(option => {
        option.addEventListener("click", () => {
            options.forEach(opt => opt.classList.remove("selected"));
            option.classList.add("selected");
            validateBtn.disabled = false;
            selectedOption = parseInt(option.dataset.index);
        });
    });
    
    validateBtn.addEventListener("click", nextQuestion);
}

// passer a laquestion suivante
function nextQuestion() {
    // si la question est correcte on augmente le score
    if (selectedOption === questions[currentQuestion].correctAnswer) {
        score++;
    }
    
    currentQuestion++;
    
    // si plus de question -> score final
    if (currentQuestion < questions.length) {
        displayQuestion(currentQuestion);
    } else {
        showFinalScore();
    }
}

// affiche le score final
function showFinalScore() {
    const quizContainer = document.querySelector(".quiz-container");
    const percentage = (score / questions.length) * 100;
    let message = "";

    if (score >= 3) {
        message = "Bravo ! Vous avez une bonne compréhension des enjeux de l'ODD8 !";
    } else {
        message = "Vous pouvez faire mieux ! N'hésitez pas à relire nos articles pour approfondir vos connaissances.";
    }

    quizContainer.innerHTML = `
        <div class="quiz-fade">
            <h3 class="mb-2">Quiz terminé !</h3>
            <p class="mb-2">Votre score : ${score}/${questions.length} (${percentage}%)</p>
            <p class="mb-2">${message}</p>
            <button onclick="restartQuiz()" class="mt-2">Recommencer le quiz</button>
        </div>`;
}

// reinitialise le quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    displayQuestion(0);
}

// sert a démarrer le quiz quand le DOM est chargé
document.addEventListener("DOMContentLoaded", loadQuestions);