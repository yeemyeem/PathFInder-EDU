// ======================
// RIASEC QUESTIONS
// ======================
const questions = [
  // Realistic (R)
  { text: "Do you enjoy hands-on activities, such as fixing, building, or assembling things?", type: "R" },
  { text: "Do you like learning how tools, machines, or equipment work, even if you don’t use them often?", type: "R" },
  { text: "Do you enjoy working with nature, animals, plants, or the environment?", type: "R" },
  { text: "Do you prefer doing practical tasks rather than just reading or talking about them?", type: "R" },
  { text: "Do you enjoy activities that involve movement, physical effort, or outdoor work?", type: "R" },

  // Investigative (I)
  { text: "Do you enjoy solving problems that make you think deeply?", type: "I" },
  { text: "Do you like asking questions about how or why things happen?", type: "I" },
  { text: "Do you enjoy learning new information, especially about science, technology, or ideas?", type: "I" },
  { text: "Do you like figuring out patterns, causes, or solutions?", type: "I" },
  { text: "Do you enjoy thinking carefully before making decisions?", type: "I" },

  // Artistic (A)
  { text: "Do you enjoy expressing yourself creatively, such as through drawing, writing, music, or design?", type: "A" },
  { text: "Do you like coming up with original ideas?", type: "A" },
  { text: "Do you enjoy activities where there is no single 'correct' answer?", type: "A" },
  { text: "Do you like using imagination or creativity when doing tasks?", type: "A" },
  { text: "Do you enjoy creating something that reflects your personality or emotions?", type: "A" },

  // Social (S)
  { text: "Do you enjoy helping or supporting other people?", type: "S" },
  { text: "Do you like explaining things or sharing what you know?", type: "S" },
  { text: "Do you enjoy working with people rather than alone?", type: "S" },
  { text: "Do you like listening to others and understanding their feelings or needs?", type: "S" },
  { text: "Do you feel satisfied when your actions positively affect others?", type: "S" },

  // Enterprising (E)
  { text: "Do you enjoy taking initiative or making decisions in group activities?", type: "E" },
  { text: "Do you like sharing ideas and encouraging others to support them?", type: "E" },
  { text: "Do you enjoy setting goals and working toward success?", type: "E" },
  { text: "Do you like planning projects, events, or activities?", type: "E" },
  { text: "Do you enjoy roles where you influence, organize, or motivate others?", type: "E" },

  // Conventional (C)
  { text: "Do you enjoy organizing information, tasks, or schedules?", type: "C" },
  { text: "Do you prefer clear instructions and step-by-step tasks?", type: "C" },
  { text: "Do you like working carefully and accurately?", type: "C" },
  { text: "Do you enjoy working with numbers, data, or structured information?", type: "C" },
  { text: "Do you feel satisfied when things are neat, organized, and properly recorded?", type: "C" }
];
questions.sort(() => Math.random() - 0.5);

// ======================
// QUIZ STATE
// ======================
let currentQuestionIndex = 0;
const answers = [];

const scores = {
  R: 0,
  I: 0,
  A: 0,
  S: 0,
  E: 0,
  C: 0
};

// ======================
// DOM ELEMENTS
// ======================
const clickSound = document.getElementById("clickSound");
const progressText = document.getElementById("progressText");
const questionText = document.getElementById("questionText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const backBtn = document.getElementById("backBtn");
const homeBox = document.getElementById("homeBox");
const quizBox = document.getElementById("quizBox");
const startQuizBtn = document.getElementById("startQuizBtn");

// ======================
// BACKGROUND MUSIC (DEFAULT ON)
// ======================
const bgMusic = document.getElementById("bgMusic");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const volDownBtn = document.getElementById("volDownBtn");
const volUpBtn = document.getElementById("volUpBtn");
const volumeBar = document.getElementById("volumeBar");


const MAX_VOLUME = 10;
let volumeLevel = 3; // 30%
let userMuted = false; // track if user turned it off

// Create volume bars
for (let i = 0; i < MAX_VOLUME; i++) {
  const block = document.createElement("div");
  block.classList.add("volumeBlock");
  volumeBar.appendChild(block);
}

// Update volume UI
function updateVolumeUI() {
  bgMusic.volume = volumeLevel / MAX_VOLUME;

  const blocks = document.querySelectorAll(".volumeBlock");
  blocks.forEach((block, index) => {
    block.classList.toggle("active", index < volumeLevel);
  });
}

// Initial volume setup
updateVolumeUI();

// 🔊 AUTO-START MUSIC ON FIRST USER INTERACTION
document.addEventListener("click", function autoPlayOnce() {
  if (!userMuted && bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
  document.removeEventListener("click", autoPlayOnce);
});

// Toggle music ON / OFF
musicToggleBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    userMuted = false;
    bgMusic.play().then(() => {
      musicToggleBtn.textContent = "🔊 Music: ON";
    });
  } else {
    userMuted = true;
    bgMusic.pause();
    musicToggleBtn.textContent = "🔇 Music: OFF";
  }
});

// Volume down
volDownBtn.addEventListener("click", () => {
  if (volumeLevel > 0) {
    volumeLevel--;
    updateVolumeUI();
  }
});

// Volume up
volUpBtn.addEventListener("click", () => {
  if (volumeLevel < MAX_VOLUME) {
    volumeLevel++;
    updateVolumeUI();
  }
});

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.volume = 0.4;
  clickSound.play().catch(() => {});
}



// ======================
// AUTO-START MUSIC ON HOMEPAGE INTERACTION
// ======================
let musicStarted = false;

function startMusic() {
  if (!musicStarted && !userMuted) {
    bgMusic.play().then(() => {
      musicStarted = true;
      musicToggleBtn.textContent = "🔊 Music: ON";
    }).catch(() => {});
  }
}

// Start music when user interacts with homepage
document.getElementById("homeBox").addEventListener("click", startMusic);

// Backup: start music on any click (in case user clicks elsewhere)
document.addEventListener("click", startMusic, { once: true });






// ======================
// FUNCTIONS
// ======================
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.text;
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  // Update progress bar
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  document.getElementById("progressBar").style.width = progressPercent + "%";

  backBtn.disabled = currentQuestionIndex === 0;
}



function nextQuestion() {
  if(currentQuestionIndex >= questions.length - 1){
    showResults();
    return;
  }
  currentQuestionIndex++;
  loadQuestion();
}

const careerSuggestions = {
  R: {
    STEM: ["Engineering", "Architecture", "Agricultural Technology"],
    ABM: ["Operations Management", "Supply Chain Management"],
    HUMSS: ["Environmental Planning", "Community Development"]
  },
  I: {
    STEM: ["Medicine", "Information Technology", "Data Analytics"],
    ABM: ["Business Analytics", "Market Research"],
    HUMSS: ["Psychology", "Political Science"]
  },
  A: {
    STEM: ["Multimedia Technology", "Game Design"],
    ABM: ["Advertising", "Brand Management"],
    HUMSS: ["Creative Writing", "Fine Arts", "Performing Arts"]
  },
  S: {
    STEM: ["Nursing", "Public Health"],
    ABM: ["Human Resource Management"],
    HUMSS: ["Education", "Social Work", "Guidance Counseling"]
  },
  E: {
    STEM: ["Technology Entrepreneurship"],
    ABM: ["Marketing", "Entrepreneurship", "Sales Management"],
    HUMSS: ["Public Relations", "Political Leadership"]
  },
  C: {
    STEM: ["Information Systems", "Data Management"],
    ABM: ["Accounting", "Finance"],
    HUMSS: ["Public Administration", "Records Management"]
  }
};


function showResults() {
  document.getElementById("quizBox").style.display = "none";
  document.getElementById("resultsBox").style.display = "block";

  const resultsList = document.getElementById("resultsList");
  resultsList.innerHTML = "";

  const sortedResults = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const descriptions = {
    R: "Realistic – You enjoy hands-on, practical activities.",
    I: "Investigative – You enjoy thinking, analyzing, and problem-solving.",
    A: "Artistic – You enjoy creativity, self-expression, and originality.",
    S: "Social – You enjoy helping, teaching, and supporting others.",
    E: "Enterprising – You enjoy leading, persuading, and taking initiative.",
    C: "Conventional – You enjoy organizing, managing data, and structured tasks."
  };

  sortedResults.forEach(([type, score]) => {
  const div = document.createElement("div");
  div.style.border = "1px solid #ccc";
  div.style.padding = "15px";
  div.style.marginBottom = "20px";

  div.innerHTML = `
    <h3>${descriptions[type]}</h3>
    <p><strong>Score:</strong> ${score}</p>

    <p><strong>STEM:</strong> ${careerSuggestions[type].STEM.join(", ")}</p>
    <p><strong>ABM:</strong> ${careerSuggestions[type].ABM.join(", ")}</p>
    <p><strong>HUMSS:</strong> ${careerSuggestions[type].HUMSS.join(", ")}</p>
  `;

  resultsList.appendChild(div);
});

}


// ======================
// EVENT LISTENERS
// ======================
yesBtn.addEventListener("click", () => {
  const type = questions[currentQuestionIndex].type;

  scores[type]++;
  answers[currentQuestionIndex] = "yes";

  nextQuestion();
});


noBtn.addEventListener("click", () => {
  answers[currentQuestionIndex] = "no";
  nextQuestion();
});

backBtn.addEventListener("click", () => {
  if (currentQuestionIndex === 0) return;

  currentQuestionIndex--;

  const previousAnswer = answers[currentQuestionIndex];

  if (previousAnswer === "yes") {
    const type = questions[currentQuestionIndex].type;
    scores[type]--;
  }

  loadQuestion();
});



// ======================
// START QUIZ
// ======================
startQuizBtn.addEventListener("click", () => {
  homeBox.style.display = "none";
  quizBox.style.display = "block";
  loadQuestion();
});
document.getElementById("homeBtn").addEventListener("click", () => {
  quizBox.style.display = "none"; // hide quiz
  homeBox.style.display = "block"; // show home page
});


document.getElementById("restartBtn").addEventListener("click", () => {
  location.reload();
});

const aboutBtn = document.getElementById("aboutBtn");
const faqBtn = document.getElementById("faqBtn");
const aboutBox = document.getElementById("aboutBox");
const faqBox = document.getElementById("faqBox");

aboutBtn.addEventListener("click", () => {
  aboutBox.style.display = "block";
  faqBox.style.display = "none";
});

faqBtn.addEventListener("click", () => {
  faqBox.style.display = "block";
  aboutBox.style.display = "none";
});

function closePopups() {
  aboutBox.style.display = "none";
  faqBox.style.display = "none";
}

document.querySelectorAll("button").forEach(button => {

  // Press down
  button.addEventListener("pointerdown", () => {
    button.classList.add("pressed");
    playClickSound();
  });

  // Release
  const release = () => {
    button.classList.remove("pressed");
  };

  button.addEventListener("pointerup", release);
  button.addEventListener("pointerleave", release);
  button.addEventListener("pointercancel", release);
});
