
// ======================
// RIASEC QUESTIONS
// ======================
const questions = [
  // REALISTIC (R)
    {
    text: "Do you enjoy using tools, machines, or equipment to complete tasks?",
    type: "R",
    image: "Quiz Images/realistic-1.png",
  },

  { text: "Do you like building, assembling, or repairing physical objects?", 
    type: "R",
    image: "Quiz Images/realistic-2.png"
  },

  { text: "Do you enjoy outdoor or physically active work environments?", 
    type: "R",
    image: "Quiz Images/realistic-3.png"
  },

  { text: "Do you prefer learning by doing rather than reading or listening?", 
    type: "R",
    image: "Quiz Images/realistic-4.png"
   },

  { text: "Do you enjoy working with nature, animals, plants, or the environment?",
     type: "R", 
     image: "Quiz Images/realistic-5.png"
    },

  // INVESTIGATIVE (I)
  { text: "Do you like solving puzzles or complex problems that require logical thinking?",
     type: "I", 
     image: "Quiz Images/investigative-1.png",
     scale: 2,
     },

  { text: "Do you like exploring scientific ideas or conducting experiments?",
     type: "I",
     image: "Quiz Images/investigative-2.png"
     },

  { text: "Do you enjoy learning how systems, technologies, or processes work?",
     type: "I", 
     image: "Quiz Images/investigative-3.png"
     },

  { text: "Do you like analyzing information before making decisions?",
     type: "I",
     image: "Quiz Images/investigative-4.png"
     },

  { text: "Do you enjoy researching topics to discover new knowledge?",
     type: "I",
     image: "Quiz Images/investigative-5.png"
    },


  // ARTISTIC (A)
  { text: "Do you enjoy creating original artwork, designs, or visual content?",
     type: "A",
     image: "Quiz Images/artistic-1.png"
     },

  { text: "Do you like expressing ideas through writing, music, or performance?",
     type: "A",
     image: "Quiz Images/artistic-2.png"
     },

  { text: "Do you enjoy activities that allow freedom and imagination?", 
    type: "A",
    image: "Quiz Images/artistic-3.png"
   },

  { text: "Do you prefer open-ended tasks over structured routines?",
     type: "A",
     image: "Quiz Images/artistic-4.png"
    },

  { text: "Do you enjoy experimenting with new creative ideas or styles?",
     type: "A",
     image: "Quiz Images/artistic-5.png"
     },


  // SOCIAL (S)
  { text: "Do you enjoy helping others solve personal or academic problems?",
     type: "S",
     image: "Quiz Images/social-1.png"
     },

  { text: "Do you like teaching, mentoring, or explaining concepts to people?",
     type: "S",
     image: "Quiz Images/social-2.png"
     },

  { text: "Do you enjoy working in teams that focus on helping others?",
     type: "S",
     image: "Quiz Images/social-3.png",
     scale: 4,
     },

  { text: "Do you feel fulfilled when supporting people’s emotional or social needs?",
     type: "S",
     image: "Quiz Images/social-4.png"
     },

  { text: "Do you enjoy activities that involve cooperation and communication?",
     type: "S",
     image: "Quiz Images/social-5.png"
     },


  // ENTERPRISING (E)
  { text: "Do you enjoy leading groups or organizing activities?", 
    type: "E",
    image: "Quiz Images/E1.png"
   },

  { text: "Do you feel confident persuading others to support your ideas?",
     type: "E", 
     image: "Quiz Images/E2.png"
     },

  { text: "Do you enjoy setting goals and motivating yourself to achieve them?",
     type: "E",
     image: "Quiz Images/E3.png"
    },

  { text: "Do you like making decisions that influence outcomes or people?", 
    type: "E",
    image: "Quiz Images/E4.png"
    },

  { text: "Do you enjoy taking initiative in competitive or business-related tasks?",
     type: "E",
     image: "Quiz Images/E5.png"
     },


  // CONVENTIONAL (C)
  { text: "Do you enjoy organizing information, schedules, or materials?", 
    type: "C",
    image: "Quiz Images/C1.png"
   },

  { text: "Do you prefer tasks with clear rules, steps, or instructions?", 
    type: "C", 
    image: "Quiz Images/C2.png"
   },

  { text: "Do you enjoy working with numbers, data, or detailed records?",
     type: "C",
     image: "Quiz Images/C3.png"
     },

  { text: "Do you like tasks that require accuracy, consistency, and precision?",
     type: "C",
     image: "Quiz Images/C4.png"
     },

  { text: "Do you feel satisfied when systems and records are well-maintained?",
     type: "C",
     image: "Quiz Images/C5.png"
     },

];



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

  const img = document.getElementById("questionImage");

  // Fade effect (Akinator feel)
  img.style.opacity = 0;

  setTimeout(() => {
    img.src = currentQuestion.image;
    img.style.opacity = 1;
  }, 120);

  updateProgress();
  backBtn.disabled = currentQuestionIndex === 0;
}


// Update progress bar
function updateProgress() {
  const progressPercent =
    (currentQuestionIndex / questions.length) * 100;

  const bar = document.getElementById("progressBar");
  const icon = document.getElementById("progressIcon");

  bar.style.width = progressPercent + "%";
  icon.style.left = `calc(${progressPercent}% - 16px)`;
}




function nextQuestion() {
  if(currentQuestionIndex >= questions.length - 1){
    showResults();
    return;
  }
  currentQuestionIndex++;
  loadQuestion();
}

const riasecDisplay = {
  R: { label: "Realistic", class: "realistic", icon: "🛠️" },
  I: { label: "Investigative", class: "investigative", icon: "🔬" },
  A: { label: "Artistic", class: "artistic", icon: "🎨" },
  S: { label: "Social", class: "social", icon: "🤝" },
  E: { label: "Enterprising", class: "enterprising", icon: "💡" },
  C: { label: "Conventional", class: "conventional", icon: "📊" }
};



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

const riasecCareers = {
  R: {
    STEM: ["Mechanical Technician", "Electrical Technician", "Civil Engineering Assistant"],
    ABM: ["Operations Supervisor", "Logistics Coordinator"],
    HUMSS: ["Community Infrastructure Aide", "Environmental Field Worker"]
  },
  I: {
    STEM: ["Software Developer", "Data Analyst", "Research Scientist"],
    ABM: ["Business Analyst", "Market Research Analyst"],
    HUMSS: ["Policy Research Assistant", "Psychology Research Assistant"]
  },
  A: {
    STEM: ["UI/UX Designer", "Game Designer"],
    ABM: ["Creative Marketing Associate", "Advertising Assistant"],
    HUMSS: ["Writer", "Visual Artist"]
  },
  S: {
    STEM: ["Nurse", "Public Health Assistant"],
    ABM: ["Human Resource Assistant"],
    HUMSS: ["Teacher", "Social Worker"]
  },
  E: {
    STEM: ["Technology Startup Founder"],
    ABM: ["Entrepreneur", "Sales Executive"],
    HUMSS: ["Public Relations Officer"]
  },
  C: {
    STEM: ["Information Systems Assistant"],
    ABM: ["Accounting Assistant", "Finance Clerk"],
    HUMSS: ["Records Management Aide"]
  }
};


function showResults() {
  // Hide quiz, show results
  document.getElementById("quizBox").style.display = "none";
  document.getElementById("resultsBox").style.display = "block";

  // Fill progress bar
  document.getElementById("progressBar").style.width = "100%";
  document.getElementById("progressIcon").style.left = "calc(100% - 16px)";

  const resultsList = document.getElementById("resultsList");
  resultsList.innerHTML = "";
  if (!resultsList) {
  console.error("resultsList not found in HTML");
  return;
}


  // Get top 3 scores
  const sortedResults = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

sortedResults.forEach(([type, score], index) => {
  const display = riasecDisplay[type];
  const careers = careerSuggestions[type];

  const card = document.createElement("div");
  if (index === 0) {
  card.classList.add("active"); // top result open by default
}

  card.className = `riasec-card ${display.class} ${index === 0 ? "top-match" : ""}`;

  card.innerHTML = `
<div class="riasec-header">
<div class="riasec-mascot-wrapper">
  <img 
    src="Result Images/${type}.png"
    alt="${display.label} mascot"
    class="riasec-mascot"
  />
</div>
  <span class="riasec-title">
    ${display.label} (${type})
  </span>
</div>

  <div class="riasec-body">
    <p class="riasec-desc">
      You Matched: ${score}/5 in this category
    </p>

    <p class="riasec-desc">
      <strong>${categoryDescriptions[type]}</strong>
    </p>

    <p class="riasec-desc">
      <strong>Key Skills & Competencies:</strong>
      ${categorySkills[type].join(", ")}
    </p>

    <div class="strand-selector">
      <button class="strand-btn active" data-strand="STEM">STEM</button>
      <button class="strand-btn" data-strand="ABM">ABM</button>
      <button class="strand-btn" data-strand="HUMSS">HUMSS</button>
    </div>

    <p class="riasec-desc">
      <strong>College Programs:</strong>
      <span class="college-programs"></span>
    </p>

    <h4>Possible Career Paths</h4>
    <ul class="career-list"></ul>
  </div>
`;


  resultsList.appendChild(card);
  // Make header act like a button (sound + press)
const header = card.querySelector(".riasec-header");

header.addEventListener("pointerdown", () => {
  header.classList.add("pressed");
  playClickSound();
});

const releaseHeader = () => {
  header.classList.remove("pressed");
};

header.addEventListener("pointerup", releaseHeader);
header.addEventListener("pointerleave", releaseHeader);
header.addEventListener("pointercancel", releaseHeader);


// Open the first (top result) by default
if (index === 0) {
  card.classList.add("active");
}


header.addEventListener("click", () => {
  const isOpen = card.classList.contains("active");

  // Close all cards
  document.querySelectorAll(".riasec-card").forEach(c => {
    c.classList.remove("active");
  });

  // Toggle current card
  if (!isOpen) {
    card.classList.add("active");
  }
});


  const buttons = card.querySelectorAll(".strand-btn");
  const collegeSpan = card.querySelector(".college-programs");

  // Update career list + college programs
  function updateCard(strand) {
    // Career paths
    const list = card.querySelector(".career-list");
    list.innerHTML = "";
    riasecCareers[type][strand].forEach(career => {
      const li = document.createElement("li");
      li.textContent = career;
      list.appendChild(li);
    });

    // College programs
    collegeSpan.textContent = careers[strand].join(", ");
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      updateCard(btn.dataset.strand);
    });
  });

  // Default = STEM
  updateCard("STEM");
});

}
const categoryDescriptions = {
  R: "You enjoy practical, hands-on work and solving tangible problems.",
  I: "You enjoy analyzing information, solving problems, and exploring ideas.",
  A: "You enjoy creative expression, innovation, and imaginative tasks.",
  S: "You enjoy helping, teaching, and collaborating with others.",
  E: "You enjoy leading, persuading, and taking initiative.",
  C: "You enjoy structure, organization, and detailed, methodical work."
};

const categorySkills = {
  R: ["Problem-solving", "Technical skills", "Manual dexterity"],
  I: ["Analytical thinking", "Research", "Critical reasoning"],
  A: ["Creativity", "Artistic expression", "Innovation"],
  S: ["Communication", "Empathy", "Collaboration"],
  E: ["Leadership", "Decision-making", "Persuasion"],
  C: ["Organization", "Attention to detail", "Data management"]
};


function updateCareerList(card, type, strand) {
  const list = card.querySelector(".career-list");
  list.innerHTML = "";

  riasecCareers[type][strand].forEach(career => {
    const li = document.createElement("li");
    li.textContent = career;
    list.appendChild(li);
  });
}



function populateReflectionChart() {
  const MAX_SCORE = 5; // max possible per type

  ["R", "I", "A", "S", "E", "C"].forEach(type => {
    const bar = document.querySelector(`#riasecChartReflection .bar.${type}`);
    const scoreLabel = document.getElementById(`score-${type}`);

    if (!bar || !scoreLabel) return;

    const value = scores[type];

    // Non-linear scaling (exaggerates higher values)
    const heightPercent = ((value / MAX_SCORE) ** 1.3) * 100;

    bar.style.height = heightPercent + "%";
    scoreLabel.textContent = value;
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

const restartFromReflectionBtn = document.getElementById("restartFromReflectionBtn");

if (restartFromReflectionBtn) {
  restartFromReflectionBtn.addEventListener("click", () => {
    resetQuiz();

    document.getElementById("reflectionPage").style.display = "none";
    document.getElementById("homeBox").style.display = "block";

    window.scrollTo(0, 0);
  });
}


const aboutBtn = document.getElementById("aboutBtn");
const faqBtn = document.getElementById("faqBtn");
const riasecBtn = document.getElementById("riasecBtn");

const aboutBox = document.getElementById("aboutBox");
const faqBox = document.getElementById("faqBox");
const riasecBox = document.getElementById("riasecBox");

if (aboutBtn) {
  aboutBtn.addEventListener("click", () => {
    aboutBox.style.display = "block";
    faqBox.style.display = "none";
    riasecBox.style.display = "none";
  });
}

if (faqBtn) {
  faqBtn.addEventListener("click", () => {
    faqBox.style.display = "block";
    aboutBox.style.display = "none";
    riasecBox.style.display = "none";
  });
}

if (riasecBtn) {
  riasecBtn.addEventListener("click", () => {
    riasecBox.style.display = "block";
    aboutBox.style.display = "none";
    faqBox.style.display = "none";
  });
}
function closePopups() {
  aboutBox.style.display = "none";
  faqBox.style.display = "none";
  riasecBox.style.display = "none";
}

function resetQuiz() {
  // Reset quiz state
  currentQuestionIndex = 0;
  answers.length = 0;

  for (let key in scores) {
    scores[key] = 0;
  }

  // 🔥 HIDE ALL OTHER PAGES
  document.getElementById("homeBox").style.display = "none";
  document.getElementById("resultsBox").style.display = "none";
  document.getElementById("reflectionPage").style.display = "none";

  // SHOW QUIZ ONLY
  document.getElementById("quizBox").style.display = "block";

  // Reset progress
  document.getElementById("progressBar").style.width = "0%";
  document.getElementById("progressIcon").style.left = "0";

  loadQuestion();
  window.scrollTo(0, 0);
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

document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    answer.style.display =
      answer.style.display === "block" ? "none" : "block";
  });
});

function openRiasec() {
  document.getElementById("riasecModal").style.display = "block";
}

function closeRiasec() {
  document.getElementById("riasecModal").style.display = "none";
}

const reflectionBox = document.getElementById("reflectionBox");

if (reflectionBox) {
  reflectionBox.addEventListener("focus", () => {
    setTimeout(() => {
      reflectionBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 300); // wait for keyboard to open
  });
}

document.getElementById("goToReflectionBtn").addEventListener("click", () => {
  document.getElementById("resultsBox").style.display = "none";
  document.getElementById("reflectionPage").style.display = "block";

  populateReflectionChart(); // ✅ CALL IT HERE

  window.scrollTo(0, 0);
});


document.getElementById("backToResultsBtn").addEventListener("click", () => {
  document.getElementById("reflectionPage").style.display = "none";
  document.getElementById("resultsBox").style.display = "block";
});

// Restart quiz from Reflection page
document.getElementById("restartFromReflectionBtn").addEventListener("click", () => {
  resetQuiz();
});



