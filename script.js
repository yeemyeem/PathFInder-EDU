
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

  { text: "Do you prefer learning by doing rather than reading or listening? (Cooking, Repairing, etc.)", 
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
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}


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
      "Mechanical Engineering",
      "Civil Engineering",
      "Computer Engineering",
      "Architecture",
      "Aviation Technology",
      "Aircraft Maintenance Technology",
      "Culinary Arts",
      "Agricultural Science",
      "Industrial Technology"
    ],
    ABM: [
      "Operations Management",
      "Logistics and Supply Chain Management",
      "Business Administration"
    ],
    HUMSS: [
      "Environmental Planning",
      "Community Development",
      "Disaster Risk Management"
    ]
  },

  I: {
    STEM: [
      "Computer Science",
      "Information Technology",
      "Data Science",
      "Biology",
      "Chemistry",
      "Physics",
      "Mathematics",
      "Medical Technology",
      "Pharmacy",
      "Veterinary Medicine"
    ],
    ABM: [
      "Business Analytics",
      "Economics",
      "Financial Management"
    ],
    HUMSS: [
      "Psychology",
      "Political Science",
      "Sociology",
      "Geography"
    ]
  },

  A: {
    STEM: [
      "Multimedia Arts",
      "Game Development",
      "Digital Animation",
      "Graphic Design",
      "Music Technology"
    ],
    ABM: [
      "Marketing Management",
      "Advertising",
      "Creative Entrepreneurship"
    ],
    HUMSS: [
      "Fine Arts",
      "Creative Writing",
      "Theater Arts",
      "Communication Arts",
      "Fashion Design"
    ]
  },

  S: {
    STEM: [
      "Nursing",
      "Public Health",
      "Physical Therapy",
      "Sports Science",
      "Dentistry"
    ],
    ABM: [
      "Human Resource Management",
      "Training and Development"
    ],
    HUMSS: [
      "Education",
      "Social Work",
      "Guidance and Counseling",
      "Library and Information Science",
      "Criminology"
    ]
  },

  E: {
    STEM: [
      "Industrial Engineering",
      "Technology Management",
      "Innovation Management"
    ],
    ABM: [
      "Business Administration",
      "Entrepreneurship",
      "Marketing Management",
      "Hospitality Management",
      "Real Estate Management"
    ],
    HUMSS: [
      "Public Administration",
      "Political Science",
      "Communication",
      "Law (Pre-Law Programs)"
    ]
  },

  C: {
    STEM: [
      "Information Systems",
      "Computer Applications",
      "Database Management"
    ],
    ABM: [
      "Accountancy",
      "Financial Management",
      "Banking and Finance",
      "Office Administration"
    ],
    HUMSS: [
      "Public Administration",
      "Records Management",
      "Legal Management"
    ]
  }
};

const AssociatedIndustry = { 
  R: {
    STEM: [
      "Engineering & Industrial Technology",
      "Robotics/Computers",
      "Architecture",
      "Culinary",
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
      "Computer Science/Robotics",
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
    "Computer Engineer",
    "Architect",
    "Police Officer",
    "Fire Fighter",
    "Chef",
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
   "IT Specialist",
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
    <span class="riasec-caret">▼</span>
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
      <h4>Example of College Programs Associated</h4>
      <p class="college-programs"></p>
    </section>

    <!-- INDUSTRY -->
<section class="riasec-section">
  <h4>Related Career Fields</h4>
  <ul class="industry-list"></ul>
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



const caret = card.querySelector(".riasec-caret");

header.addEventListener("click", () => {
  const isOpen = card.classList.contains("active");

  // Close all cards
  document.querySelectorAll(".riasec-card").forEach(c => {
    c.classList.remove("active");
    c.querySelector(".riasec-caret").textContent = "▼";
  });

  // Toggle current card
  if (!isOpen) {
    card.classList.add("active");
    caret.textContent = "▲";
  }
});



  const buttons = card.querySelectorAll(".strand-btn");
  const collegeSpan = card.querySelector(".college-programs");

  // Update career list + college programs
function updateCard(strand) {
  const list = card.querySelector(".career-list");
  const industryList = card.querySelector(".industry-list");

  list.innerHTML = "";
  industryList.innerHTML = "";

  // STEM grid layout
  list.classList.toggle("stem-grid", strand === "STEM");

  // CAREERS
  riasecCareers[type][strand].forEach(career => {
    const li = document.createElement("li");
    li.textContent = career;
    list.appendChild(li);
  });

  // COLLEGE PROGRAMS
  collegeSpan.textContent = careers[strand].join(", ");

  // INDUSTRY
  AssociatedIndustry[type][strand].forEach(field => {
    const li = document.createElement("li");
    li.textContent = field;
    industryList.appendChild(li);
  });
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


// ======================
// COURSE FINDER CONTAINER
// ======================
const reminderContainer = document.createElement("div");
reminderContainer.className = "coursefinder-container";

reminderContainer.innerHTML = `
  <div class="coursefinder-box">
    <h3 style="color: #ffffffff;">Find Colleges Offering These Programs</h3>

    <p style="color: #000000ff;">
      Want to explore colleges and universities in the Philippines that offer
      programs related to your interests? Use the Course Finder to search for
      schools offering courses connected to your recommended careers.
    </p>

    <button style="color: #ffffffff;" class="coursefinder-btn" onclick="window.open('https://coursefinder.ph/', '_blank')">
      Open Course Finder
    </button>
  </div>
`;

document.getElementById("resultsList").appendChild(reminderContainer);

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

function showTopInsight() {

  const sorted = Object.entries(scores)
    .sort((a,b) => b[1] - a[1])
    .slice(0,3)
    .map(entry => entry[0]);

  const top1 = sorted[0];
  const top2 = sorted[1];
  const top3 = sorted[2];

  const label1 = riasecDisplay[top1].label;
  const label2 = riasecDisplay[top2].label;
  const label3 = riasecDisplay[top3].label;

  const box = document.getElementById("topInsightBox");

  box.innerHTML = `
    <h3 margin-top:-60px; marhin-bottom: 40px>Your Career Interest Pattern</h3>

    <p>
      Your strongest interest types are 
      <span style="color:${riasecColors[top1]}; font-weight:bold;">${label1}</span>, 
      <span style="color:${riasecColors[top2]}; font-weight:bold;">${label2}</span>, 
      and 
      <span style="color:${riasecColors[top3]}; font-weight:bold;">${label3}</span>.
    </p>

    <p>
      This combination suggests that you may enjoy activities and careers
      that reflect the strengths of these personality types. The suggested
      careers and college programs earlier were based on this pattern.
    </p>

    <p>
      Understanding your interests can help guide you when exploring
      possible college courses and future career paths.
    </p>
  `;
}

const riasecColors = {
  R: "#4CAF50",   // Realistic
  I: "#2196F3",   // Investigative
  A: "#ff0077",   // Artistic
  S: "#d900ff",   // Social
  E: "#FF9800",   // Enterprising
  C: "#ffe600"    // Conventional
};




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
  shuffleQuestions();       // 🔥 NEW
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
  currentQuestionIndex = 0;
  answers.length = 0;

  for (let key in scores) {
    scores[key] = 0;
  }

  shuffleQuestions();       // 🔥 NEW

  document.getElementById("homeBox").style.display = "none";
  document.getElementById("resultsBox").style.display = "none";
  document.getElementById("reflectionPage").style.display = "none";
  document.getElementById("quizBox").style.display = "block";

  document.getElementById("progressBar").style.width = "0%";
  document.getElementById("progressIcon").style.left = "0";

  loadQuestion();
  window.scrollTo(0, 0);
}


  // Reset progress
  document.getElementById("progressBar").style.width = "0%";
  document.getElementById("progressIcon").style.left = "0";

  loadQuestion();
  window.scrollTo(0, 0);




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

  populateReflectionChart();
  showTopInsight();
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

