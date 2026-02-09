"use client";

export type Note = {
  id: string;
  title: string;
  subject: string;
  content: string;
  author: string; // email
  visibility: "admin" | "teacher"; // admin visible to all, teacher visible only to that teacher's students
  teacherEmail?: string;
};

export type Quiz = {
  id: string;
  title: string;
  topic: string;
  questions: { id: string; text: string; choices?: string[]; answer?: string }[];
  author: string;
};

export type Paper = {
  id: string;
  title: string;
  subject: string;
  term: string;
  grade: string;
  marks: number;
  duration: number;
  passPercentage: number;
  questionTypes: string[];
  content: string;
  author: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
};

export type SubjectPerformance = {
  subject: string;
  score: number;
  quizzesTaken: number;
  lastUpdated: string;
};

export type StudentStats = {
  subjectsEnrolled: number;
  averageScore: number;
  quizzesCompleted: number;
  currentStreak: number;
  achievements: Achievement[];
  performance: SubjectPerformance[];
  upcomingQuizzes: Array<{
    id: string;
    subject: string;
    topic: string;
    dueDate: string;
  }>;
};

const NOTES_KEY = "evalora_notes";
const QUIZZES_KEY = "evalora_quizzes";
const PAPERS_KEY = "evalora_papers";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    return fallback;
  }
}

function write(key: string, data: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {}
}

export function getNotes(): Note[] {
  return read<Note[]>(NOTES_KEY, [
    {
      id: "n1",
      title: "World Continents and Climate Zones",
      subject: "Geography",
      content: `# Understanding World Continents

## World Continents
Earth is divided into seven continents: Africa, Antarctica, Asia, Europe, North America, Oceania, and South America. Each continent has unique geographical features, climate zones, and cultural characteristics.

## Major Continents
- **Africa**: The largest tropical continent
- **Asia**: The largest continent by area and population
- **Europe**: Known for diverse geography and climate
- **North America**: Features varied terrain from Arctic to tropical
- **South America**: Rich in biodiversity and natural resources
- **Antarctica**: The coldest continent
- **Oceania**: Island nations in the Pacific Ocean`,
      author: "Dr. Sarah Williams",
      visibility: "admin",
    },
    {
      id: "n2",
      title: "Ancient Civilizations",
      subject: "History",
      content: `# Ancient Civilizations

## Early Human Societies
Ancient civilizations emerged along major river valleys and developed complex social structures, systems of governance, and cultural practices.

## Key Ancient Civilizations
- **Mesopotamia**: Between the Tigris and Euphrates rivers
- **Ancient Egypt**: Along the Nile River
- **Indus Valley**: In present-day Pakistan and India
- **Ancient China**: Along the Yellow River
- **Minoan Civilization**: On the island of Crete`,
      author: "Prof. James Martin",
      visibility: "admin",
    },
    {
      id: "n3",
      title: "Newton's Laws of Motion",
      subject: "Physics",
      content: `# Newton's Laws of Motion

## First Law of Motion
An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.

## Second Law of Motion
The acceleration of an object is directly proportional to the force applied and inversely proportional to its mass (F = ma).

## Third Law of Motion
For every action, there is an equal and opposite reaction.`,
      author: "Dr. Robert Chen",
      visibility: "admin",
    },
    {
      id: "n4",
      title: "Basic Chemical Bonding",
      subject: "Chemistry",
      content: `# Understanding Chemical Bonds

## Types of Chemical Bonds
Chemical bonding occurs when atoms combine to form molecules through the exchange or sharing of electrons.

## Ionic Bonds
Formed between metals and nonmetals through electron transfer.

## Covalent Bonds
Formed by sharing electrons between nonmetal atoms.

## Metallic Bonds
Found in metals where electrons are shared throughout the structure.`,
      author: "Dr. Elena Rodriguez",
      visibility: "admin",
    },
    {
      id: "n5",
      title: "Shakespeare's Literary Techniques",
      subject: "English",
      content: `# Shakespeare's Literary Techniques

## Metaphor and Simile
Shakespeare frequently used comparisons to create vivid imagery and emotional impact.

## Personification
Giving human characteristics to non-living objects to enhance meaning.

## Iambic Pentameter
The rhythmic pattern used in most of Shakespeare's plays and sonnets.

## Foreshadowing
Hints about future events that build suspense and dramatic tension.`,
      author: "Mrs. Patricia Johnson",
      visibility: "admin",
    },
    {
      id: "n6",
      title: "Photosynthesis Process",
      subject: "Biology",
      content: `# The Process of Photosynthesis

## Overview
Photosynthesis is the process by which plants convert sunlight into chemical energy.

## Light-Dependent Reactions
Occur in the thylakoid membrane and require light to produce ATP and NADPH.

## Light-Independent Reactions (Calvin Cycle)
Occur in the stroma and produce glucose from CO2.

## Importance
Photosynthesis is essential for life on Earth as it produces oxygen and forms the base of most food chains.`,
      author: "Dr. Michael Thompson",
      visibility: "admin",
    },
  ]);
}

export function addNote(note: Note) {
  const items = getNotes();
  items.unshift(note);
  write(NOTES_KEY, items);
}

export function getQuizzes(): Quiz[] {
  return read<Quiz[]>(QUIZZES_KEY, [
    {
      id: "q1",
      title: "Geography Basics",
      topic: "World Continents",
      questions: [
        {
          id: "q1-1",
          text: "How many continents are there on Earth?",
          choices: ["5", "6", "7", "8"],
          answer: "7",
        },
        {
          id: "q1-2",
          text: "Which is the largest continent by area?",
          choices: ["Africa", "Asia", "North America", "Europe"],
          answer: "Asia",
        },
      ],
      author: "Mrs. Jennifer Lee",
    },
    {
      id: "q2",
      title: "Ancient Civilizations",
      topic: "Egypt & Mesopotamia",
      questions: [
        {
          id: "q2-1",
          text: "The Great Pyramid of Giza was built in which country?",
          choices: ["Iraq", "Egypt", "Greece", "Israel"],
          answer: "Egypt",
        },
        {
          id: "q2-2",
          text: "Mesopotamia is located between which two rivers?",
          choices: [
            "Tigris and Nile",
            "Tigris and Euphrates",
            "Nile and Jordan",
            "Euphrates and Jordan",
          ],
          answer: "Tigris and Euphrates",
        },
      ],
      author: "Prof. Michael Harrison",
    },
    {
      id: "q3",
      title: "Physics Fundamentals",
      topic: "Newton's Laws",
      questions: [
        {
          id: "q3-1",
          text: "Newton's First Law states that an object at rest will remain at rest unless acted upon by an external force. What is this property called?",
          choices: ["Gravity", "Inertia", "Momentum", "Velocity"],
          answer: "Inertia",
        },
        {
          id: "q3-2",
          text: "The formula F=ma represents which of Newton's laws?",
          choices: ["First Law", "Second Law", "Third Law", "Law of Gravity"],
          answer: "Second Law",
        },
      ],
      author: "Dr. Robert Thompson",
    },
    {
      id: "q4",
      title: "Chemistry Basics",
      topic: "Chemical Elements",
      questions: [
        {
          id: "q4-1",
          text: "What is the chemical symbol for gold?",
          choices: ["Go", "Gd", "Au", "Ag"],
          answer: "Au",
        },
        {
          id: "q4-2",
          text: "What type of bond is formed between two nonmetal atoms sharing electrons?",
          choices: ["Ionic Bond", "Metallic Bond", "Covalent Bond", "Hydrogen Bond"],
          answer: "Covalent Bond",
        },
      ],
      author: "Dr. Sarah Williams",
    },
    {
      id: "q5",
      title: "English Literature",
      topic: "Shakespeare",
      questions: [
        {
          id: "q5-1",
          text: "In what year did William Shakespeare die?",
          choices: ["1616", "1604", "1623", "1599"],
          answer: "1616",
        },
        {
          id: "q5-2",
          text: "Which of the following is a tragedy by Shakespeare?",
          choices: ["A Midsummer Night's Dream", "The Tempest", "Hamlet", "Much Ado About Nothing"],
          answer: "Hamlet",
        },
      ],
      author: "Mrs. Patricia Johnson",
    },
    {
      id: "q6",
      title: "Biology Essentials",
      topic: "Photosynthesis",
      questions: [
        {
          id: "q6-1",
          text: "Photosynthesis primarily takes place in which organelle?",
          choices: ["Mitochondria", "Nucleus", "Chloroplast", "Ribosome"],
          answer: "Chloroplast",
        },
        {
          id: "q6-2",
          text: "What is the primary light-capturing pigment in plants?",
          choices: ["Chlorophyll A", "Chlorophyll B", "Xanthophyll", "Carotene"],
          answer: "Chlorophyll A",
        },
      ],
      author: "Dr. Michael Chen",
    },
  ]);
}

export function addQuiz(q: Quiz) {
  const items = getQuizzes();
  items.unshift(q);
  write(QUIZZES_KEY, items);
}

  export function getPapers(): Paper[] {
    return read<Paper[]>(PAPERS_KEY, [
      {
        id: "p1",
        title: "Geography Final Paper (50 MCQ + 4 Essay)",
        subject: "Geography",
        term: "Term 3",
        grade: "Grade 10",
        marks: 100,
        duration: 180,
        passPercentage: 50,
        questionTypes: ["MCQs", "Essay Questions"],
        content: "Paper content goes here...",
        author: "Mrs. Jennifer Lee",
      },
      {
        id: "p2",
        title: "History Examination - Ancient Civilizations",
        subject: "History",
        term: "Term 3",
        grade: "Grade 10",
        marks: 100,
        duration: 150,
        passPercentage: 50,
        questionTypes: ["MCQs", "Short Answer", "Essay"],
        content: "Paper content goes here...",
        author: "Prof. Michael Harrison",
      },
      {
        id: "p3",
        title: "Physics Final Exam",
        subject: "Physics",
        term: "Term 3",
        grade: "Grade 10",
        marks: 120,
        duration: 180,
        passPercentage: 50,
        questionTypes: ["MCQs", "Problem Solving"],
        content: "Paper content goes here...",
        author: "Dr. Robert Thompson",
      },
      {
        id: "p4",
        title: "Chemistry Test - Elements & Bonding",
        subject: "Chemistry",
        term: "Term 3",
        grade: "Grade 10",
        marks: 100,
        duration: 120,
        passPercentage: 50,
        questionTypes: ["MCQs", "Structural Questions"],
        content: "Paper content goes here...",
        author: "Dr. Sarah Williams",
      },
      {
        id: "p5",
        title: "English Literature Exam",
        subject: "English",
        term: "Term 3",
        grade: "Grade 10",
        marks: 100,
        duration: 150,
        passPercentage: 50,
        questionTypes: ["Comprehension", "Essay Writing"],
        content: "Paper content goes here...",
        author: "Mrs. Patricia Johnson",
      },
      {
        id: "p6",
        title: "Biology Final Paper",
        subject: "Biology",
        term: "Term 3",
        grade: "Grade 10",
        marks: 100,
        duration: 180,
        passPercentage: 50,
        questionTypes: ["MCQs", "Diagram Labeling"],
        content: "Paper content goes here...",
        author: "Dr. Michael Chen",
      },
      {
        id: "p7",
        title: "Geography Midterm Assessment",
        subject: "Geography",
        term: "Term 1",
        grade: "Grade 10",
        marks: 80,
        duration: 120,
        passPercentage: 50,
        questionTypes: ["MCQs", "Map Reading"],
        content: "Paper content goes here...",
        author: "Mrs. Jennifer Lee",
      },
      {
        id: "p8",
        title: "History Midterm Paper",
        subject: "History",
        term: "Term 1",
        grade: "Grade 10",
        marks: 80,
        duration: 120,
        passPercentage: 50,
        questionTypes: ["Timeline", "Essay"],
        content: "Paper content goes here...",
        author: "Prof. Michael Harrison",
      },
    ]);
  }

export function addPaper(p: Paper) {
  const items = getPapers();
  items.unshift(p);
  write(PAPERS_KEY, items);
}

const STUDENT_STATS_KEY = "evalora_student_stats";

export function getStudentStats(): StudentStats {
  return read<StudentStats>(STUDENT_STATS_KEY, {
    subjectsEnrolled: 4,
    averageScore: 88,
    quizzesCompleted: 24,
    currentStreak: 7,
    achievements: [
      {
        id: "a1",
        title: "Quick Learner",
        description: "Complete 10 quizzes",
        icon: "🚀",
        earnedDate: "2026-01-15",
      },
      {
        id: "a2",
        title: "Perfect Score",
        description: "Score 100% on any quiz",
        icon: "⭐",
        earnedDate: "2026-01-20",
      },
      {
        id: "a3",
        title: "7-Day Streak",
        description: "Complete quizzes 7 days in a row",
        icon: "🔥",
        earnedDate: "2026-02-09",
      },
    ],
    performance: [
      {
        subject: "Mathematics",
        score: 85,
        quizzesTaken: 8,
        lastUpdated: "2026-02-08",
      },
      {
        subject: "Physics",
        score: 92,
        quizzesTaken: 6,
        lastUpdated: "2026-02-07",
      },
      {
        subject: "Chemistry",
        score: 78,
        quizzesTaken: 5,
        lastUpdated: "2026-02-06",
      },
      {
        subject: "English",
        score: 88,
        quizzesTaken: 5,
        lastUpdated: "2026-02-09",
      },
    ],
    upcomingQuizzes: [
      {
        id: "uq1",
        subject: "Mathematics",
        topic: "Calculus",
        dueDate: "2026-02-10",
      },
      {
        id: "uq2",
        subject: "Physics",
        topic: "Thermodynamics",
        dueDate: "2026-02-12",
      },
    ],
  });
}

export function updateStudentStats(stats: StudentStats) {
  write(STUDENT_STATS_KEY, stats);
}
