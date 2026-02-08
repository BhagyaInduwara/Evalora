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
  term: string;
  content: string;
  author: string;
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
      title: "Algebra - Linear equations",
      subject: "Mathematics",
      content: "This note covers linear equations...",
      author: "admin@evalora.com",
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
      title: "Random math quiz",
      topic: "Algebra",
      questions: [
        { id: "q1-1", text: "2+2=?", choices: ["3", "4"], answer: "4" },
      ],
      author: "admin@evalora.com",
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
      title: "Term 1 - Mathematics Paper",
      term: "Term 1",
      content: "Paper content goes here...",
      author: "admin@evalora.com",
    },
  ]);
}

export function addPaper(p: Paper) {
  const items = getPapers();
  items.unshift(p);
  write(PAPERS_KEY, items);
}
