
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
const neutralBtn = document.getElementById("neutralBtn");
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
    STEM: [
      "Engineering & Industrial Technology",
      "Architecture",
      "Skilled Trades & Technical Services",
      "Agricultural & Environmental Technology",
      "Construction & Infrastructure"
      
    ],
    ABM: [
      "Operations & Facilities Management",
      "Logistics & Supply Chain Operations"
    ],
    HUMSS: [
      "Environmental Planning",
      "Community Development",
      "Disaster Risk Management"
    ]
  },

  I: {
    STEM: [
     "Medical & Health Sciences",
      "Natural & Physical Sciences",
      "Engineering & Applied Sciences",
      "Information & Data Sciences"
    ],
    ABM: [
     "Business Analytics & Market Research",
      "Economic & Policy Analysis"
    ],
    HUMSS: [
      "Psychology",
      "Political Science",
      "Sociology"
    ]
  },

  A: {
    STEM: [
      "Multimedia Technology",
      "Game Design",
      "Digital Animation"
    ],
    ABM: [
      "Advertising",
      "Brand Management",
      "Creative Entrepreneurship"
    ],
    HUMSS: [
      "Creative Writing",
      "Fine Arts",
      "Performing Arts",
      "Media Studies"
    ]
  },

  S: {
    STEM: [
      "Healthcare & Allied Health Services",
      "Public Health & Wellness"
    ],
    ABM: [
      "Human Resource Development",
      "Training & Organizational Support"
    ],
    HUMSS: [
      "Education & Teaching",
      "Counseling & Social Services",
      "Community & Human Development"
    ]
  },

  E: {
    STEM: [
      "Technology Innovation & Startups",
      "Applied Innovation Management"
    ],
    ABM: [
      "Entrepreneurship & Business Development",
      "Sales, Marketing & Commercial Management",
      "Hospitality & Service Management"
    ],
    HUMSS: [
      "Law, Governance & Public Leadership",
      "Media, Communication & Public Relations"
    ]
  },

  C: {
    STEM: [
      "Information Systems & Data Operations",
      "Technical Information Management",
      "Computerized Accounting"
    ],
    ABM: [
      "Accounting, Finance & Bookkeeping",
      "Banking & Financial Services"
    ],
    HUMSS: [
      "Administrative & Records Management",
       "Clerical & Office Support Services"
    ]
  }
};


const riasecCareers = {
  R: {
    STEM: [
    "Mechanical Engineer",
    "Civil Engineer",
    "Architect",
    "Police Officer",
    "Fire FIghter",
    "Carpenter",
    "Farmer",
    "Aircraft Mechanic",
    "Pilot"
    ],
    ABM: [
      "Operations Supervisor",
      "Logistics Coordinator",
      "Facilities Supervisor",
      "Farm Operations Manager"
    ],
    HUMSS: [
      "Community Infrastructure Aide",
      "Environmental Field Worker",
      "Project Site Assistant"
    ]
  },

  I: {
    STEM: [
   "Software Developer",
    "Data Analyst",
    "Research Scientist",
    "Laboratory Analyst",
    "Biologist",
    "Chemist",
    "Electrical Engineer",
    "Mathematician",
    "Medical Technician",
    "Meteorologist",
    "Pharmacist",
    "Physician",
    "Veterinarian"
    ],
    ABM: [
      "Business Analyst",
      "Market Research Analyst",
      "Planning Analyst"
    ],
    HUMSS: [
      "Policy Research Assistant",
      "Psychology Research Assistant",
      "Program Evaluation Assistant",
      "Surveyor"
    ]
  },

A: {
  STEM: [
    "UI/UX Designer",
    "Game Designer",
    "Multimedia Artist",
    "Graphic Designer",
    "Sound Designer"
  ],
  ABM: [
    "Creative Marketing Associate",
    "Advertising Assistant",
    "Brand Designer"
  ],
  HUMSS: [
    "Writer",
    "Visual Artist",
    "Actor",
    "Art Teacher",
    "Book Editor",
    "Clothing Designer",
    "Comedian",
    "Composer",
    "Dancer",
    "Musician"
  ]
},

  S: {
    STEM: [
     "Nurse",
    "Public Health Assistant",
    "Physical Therapist",
    "Athletic Trainer",
    "Dental Hygienist"
    ],
    ABM: [
      "Human Resource Assistant",
      "Training Coordinator"
    ],
    HUMSS: [
   "Teacher",
    "Social Worker",
    "Counselor",
    "Librarian",
    "Parole Officer"
    ]
  },

  E: {
    STEM: [
      "Technology Startup Associate",
      "Industrial Engineer",
      "Innovation Project Officer"
    ],
    ABM: [
    "Entrepreneur",
    "Sales Executive",
    "Business Development Officer",
    "Auctioneer",
    "Bank President",
    "Hotel Manager",
    "Real Estate Agent",
    "Sales Manager",
    "Salesperson",
    "Travel Agent",
    "Lawyer"
    ],
    HUMSS: [
    "Public Relations Officer",
    "City Manager",
    "Judge",
    "Lawyer",
    "TV Newscaster",
    "School Principal"
    ]
  },

  C: {
    STEM: [
      "Information Systems Assistant",
      "Database Support Staff"
    ],
    ABM: [
    "Accounting Assistant",
    "Finance Clerk",
    "Bookkeeper",
    "Secretary",
    "Bank Teller"
    ],
    HUMSS: [
    "Records Management Aide",
    "Administrative Officer",
    "Court Clerk",
    "Mail Carrier",
    "Post Office Clerk",
    "Secretary",
    "Timekeeper",
    "Title Examiner",
    "Typist"
  ]
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

if (!resultsList) {
  console.error("resultsList not found in HTML");
  return;
}

resultsList.innerHTML = "";



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
  document.getElementById("resultsDisclaimer").textContent = resultDisclaimer;

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

    <!-- SCORE -->
    <p class="riasec-score">
      You Matched: <strong>${score}/5</strong>
    </p>

    <!-- PERSONALITY PROFILE -->
    <section class="riasec-section">
      <h4>Personality Profile</h4>
      <p>${riasecProfiles[type].personality}</p>
    </section>

    <!-- COMMON TRAITS -->
    <section class="riasec-section">
      <h4>Common Traits</h4>
      <ul>
        ${riasecProfiles[type].traits.map(t => `<li>${t}</li>`).join("")}
      </ul>
    </section>

    <!-- SKILLS -->
    <section class="riasec-section">
      <h4>Skills & Competencies</h4>
      <ul>
        ${categorySkills[type].map(s => `<li>${s}</li>`).join("")}
      </ul>
    </section>

    <!-- ACTIVITIES -->
    <section class="riasec-section">
      <h4>Preferred Activities</h4>
      <ul>
        ${riasecProfiles[type].activities.preferred.map(a => `<li>${a}</li>`).join("")}
      </ul>
      <br>
      <h4>Activities Often Avoided</h4>
      <ul>
        ${riasecProfiles[type].activities.avoided.map(a => `<li>${a}</li>`).join("")}
      </ul>
    </section>

    <!-- ENVIRONMENT -->
    <section class="riasec-section">
      <h4>Work Environment Fit</h4>
      <p>${riasecProfiles[type].environment}</p>
    </section>

    <!-- STRANDS -->
    <div class="strand-selector">
      <button class="strand-btn active" data-strand="STEM">STEM</button>
      <button class="strand-btn" data-strand="ABM">ABM</button>
      <button class="strand-btn" data-strand="HUMSS">HUMSS</button>
    </div>

    <!-- CAREER FIELDS -->
    <section class="riasec-section">
      <h4>Career Fields Commonly Associated</h4>
      <p class="college-programs"></p>
    </section>

    <!-- OCCUPATIONS -->
    <section class="riasec-section">
      <h4>Examples of Occupations</h4>
      <ul class="career-list"></ul>
    </section>

    <!-- SOURCE -->
    <section class="riasec-section riasec-source">
      <small><em>Source: ${riasecProfiles[type].source}</em></small>
    </section>

  </div>
`;

const cardBody = card.querySelector(".riasec-body");


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
  const list = card.querySelector(".career-list");
  list.innerHTML = "";

  // 🔑 toggle grid layout only for STEM
  list.classList.toggle("stem-grid", strand === "STEM");

  riasecCareers[type][strand].forEach(career => {
    const li = document.createElement("li");
    li.textContent = career;
    list.appendChild(li);
  });

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


const categorySkills = {
  R: [
    "Hands-on problem solving",
    "Technical and mechanical skills",
    "Equipment handling and maintenance",
    "Spatial and physical coordination"
  ],
  I: [
    "Analytical and critical thinking",
    "Research and data interpretation",
    "Logical reasoning",
    "Independent problem solving"
  ],
  A: [
    "Creative thinking and ideation",
    "Artistic and design skills",
    "Original expression",
    "Visual or verbal creativity"
  ],
  S: [
    "Interpersonal communication",
    "Empathy and active listening",
    "Team collaboration",
    "Instruction and support skills"
  ],
  E: [
    "Leadership and initiative",
    "Decision-making under pressure",
    "Persuasion and negotiation",
    "Goal-oriented planning"
  ],
  C: [
    "Organization and time management",
    "Attention to detail",
    "Data and record handling",
    "Following systems and procedures"
  ]
};

const riasecProfiles = {
  R: {
    personality: `
Individuals with a Realistic personality type prefer hands-on, practical activities
that involve working with tools, machines, objects, or animals. They value structure,
clear outcomes, and tangible results, and often avoid highly social, educational,
or therapeutic activities.
`,
    traits: [
      "Practical and persistent",
      "Honest and dependable",
      "Prefers structured and tangible tasks"
    ],
    activities: {
      preferred: [
        "Using tools, machines, or equipment",
        "Building, repairing, or maintaining physical objects",
        "Performing structured, hands-on tasks"
      ],
      avoided: [
        "Highly social or persuasive activities",
        "Abstract or therapeutic tasks"
      ]
    },
    environment: `
Realistic environments emphasize technical competence, structured tasks,
and tangible outcomes. These environments reward practical skills,
traditional values, and mechanical ability.
`,
    source: "Holland (1997); Niles & Harris-Bowlsbey (2013)"
  },

  I: {
    personality: `
Individuals with an Investigative personality type prefer activities that involve
observation, research, and systematic investigation of physical, biological,
or cultural phenomena. They enjoy working with ideas and data and often avoid
persuasive, repetitive, or highly social tasks.
`,
    traits: [
      "Analytical and curious",
      "Independent and cautious",
      "Enjoys intellectual challenges"
    ],
    activities: {
      preferred: [
        "Researching and analyzing information",
        "Solving complex problems",
        "Working with data, theories, or experiments"
      ],
      avoided: [
        "Sales-oriented or persuasive tasks",
        "Highly routine or repetitive work"
      ]
    },
    environment: `
Investigative environments encourage scientific inquiry, analytical thinking,
and independent problem-solving. These environments value knowledge,
research competence, and intellectual achievement.
`,
    source: "Holland (1997); Niles & Harris-Bowlsbey (2013)"
  },

  A: {
    personality: `
Individuals with an Artistic personality type prefer ambiguous, flexible,
and unsystematized activities that allow creative expression. They value
originality, imagination, and independence and often avoid rigid or highly
structured tasks.
`,
    traits: [
      "Creative and expressive",
      "Independent and intuitive",
      "Values originality"
    ],
    activities: {
      preferred: [
        "Creating art, designs, or written works",
        "Expressing ideas creatively",
        "Working in flexible environments"
      ],
      avoided: [
        "Highly structured or repetitive tasks",
        "Strict procedural work"
      ]
    },
    environment: `
Artistic environments are flexible and unstructured, encouraging originality
and creative expression. These environments reward innovation,
individuality, and artistic achievement.
`,
    source: "Holland (1997); Niles & Harris-Bowlsbey (2013)"
  },

  S: {
    personality: `
Individuals with a Social personality type prefer activities that involve helping,
teaching, guiding, or supporting others. They value cooperation, empathy,
and meaningful social interaction and often avoid highly technical or mechanical tasks.
`,
    traits: [
      "Helpful and understanding",
      "Communicative and patient",
      "People-oriented"
    ],
    activities: {
      preferred: [
        "Teaching or training others",
        "Providing care or support",
        "Collaborating in team-based settings"
      ],
      avoided: [
        "Highly mechanical or technical tasks",
        "Isolated or machine-focused work"
      ]
    },
    environment: `
Social environments emphasize cooperation, communication, and service.
These environments reward empathy, interpersonal skills,
and helping-oriented values.
`,
    source: "Holland (1997); Niles & Harris-Bowlsbey (2013)"
  },

  E: {
    personality: `
Individuals with an Enterprising personality type prefer activities that involve
leading, persuading, or influencing others to achieve goals. They value initiative,
achievement, and responsibility and often avoid highly analytical or routine tasks.
`,
    traits: [
      "Confident and energetic",
      "Goal-oriented",
      "Comfortable with leadership roles"
    ],
    activities: {
      preferred: [
        "Leading teams or projects",
        "Persuading or motivating others",
        "Making decisions and taking initiative"
      ],
      avoided: [
        "Highly theoretical or analytical work",
        "Routine or repetitive tasks"
      ]
    },
    environment: `
Enterprising environments are dynamic and goal-driven, rewarding leadership,
initiative, and achievement. These environments value influence,
status, and organizational success.
`,
    source: "Holland (1997); Niles & Harris-Bowlsbey (2013)"
  },

  C: {
    personality: `
Individuals with a Conventional personality type prefer structured, orderly,
and systematic activities involving data, records, or procedures. They value
accuracy, efficiency, and clear rules and often avoid ambiguous or unstructured tasks.
`,
    traits: [
      "Organized and detail-oriented",
      "Efficient and reliable",
      "Prefers clear procedures"
    ],
    activities: {
      preferred: [
        "Organizing records and data",
        "Following established systems",
        "Managing details accurately"
      ],
      avoided: [
        "Ambiguous or unstructured work",
        "Highly creative or exploratory tasks"
      ]
    },
    environment: `
Conventional environments emphasize order, accuracy, and efficiency.
These environments reward reliability, conformity to procedures,
and systematic work habits.
`,
    source: "Holland (1997); Niles & Harris-Bowlsbey (2013)"
  }
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
    const heightPercent = ((value / MAX_SCORE) ** 2.5) * 100;

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

neutralBtn.addEventListener("click", () => {
  const type = questions[currentQuestionIndex].type;

  scores[type] += 0.5;          // ⭐ Neutral = 0.5
  answers[currentQuestionIndex] = "neutral";

  nextQuestion();
});


backBtn.addEventListener("click", () => {
  if (currentQuestionIndex === 0) return;

  currentQuestionIndex--;

  const previousAnswer = answers[currentQuestionIndex];

const type = questions[currentQuestionIndex].type;

if (previousAnswer === "yes") {
  scores[type] -= 1;
} else if (previousAnswer === "neutral") {
  scores[type] -= 0.5;
}


  loadQuestion();
});

const resultDisclaimer = `
Career results are based on Holland’s RIASEC Theory of Vocational Personalities
and Work Environments (Holland, 1997), with personality descriptions adapted
from Niles & Harris-Bowlsbey (2013). Results are intended for career exploration,
not as fixed predictions.
`;


// ======================
// START QUIZ
// ======================
startQuizBtn.addEventListener("click", () => {
  homeBox.style.display = "none";
  quizBox.style.display = "block";
  loadQuestion();
});


const restartBtn = document.getElementById("restartBtn");
if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    resetQuiz();
  });
}


// HOME button (Quiz page)
const homeBtn = document.getElementById("homeBtn");
if (homeBtn) {
homeBtn.addEventListener("click", () => {
  quizBox.style.display = "none";
  homeBox.style.display = "block";
  window.scrollTo(0, 0);
});

}

// HOME button (Reflection page)
const homeBtnReflection = document.getElementById("homeBtnReflection");
if (homeBtnReflection) {
  homeBtnReflection.addEventListener("click", () => {
    resetQuiz(); // reset state

    // then go home
    document.getElementById("quizBox").style.display = "none";
    document.getElementById("resultsBox").style.display = "none";
    document.getElementById("reflectionPage").style.display = "none";
    homeBox.style.display = "block";

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


const backToResultsBtn = document.getElementById("backToResultsBtn");
if (backToResultsBtn) {
  backToResultsBtn.addEventListener("click", () => {
    document.getElementById("reflectionPage").style.display = "none";
    document.getElementById("resultsBox").style.display = "block";
    window.scrollTo(0, 0);
  });
}

