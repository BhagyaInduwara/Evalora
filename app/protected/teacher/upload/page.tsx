"use client";

import { useState } from "react";
import { addNote, addQuiz, addPaper } from "@/lib/mockData";
import { useRouter } from "next/navigation";

export default function TeacherUploadPage() {
  const [type, setType] = useState("note");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "note") {
      addNote({
        id: `n-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title,
        subject,
        content,
        author: "teacher@evalora.com",
        visibility: "teacher",
        teacherEmail: "teacher@evalora.com",
      });
    }
    if (type === "quiz") {
      addQuiz({
        id: `q-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title,
        topic: subject || "General",
        questions: [{ id: `q-${Date.now()}-1`, text: content }],
        author: "teacher@evalora.com",
      });
    }
    if (type === "paper") {
      addPaper({
        id: `p-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title,
        term: subject || "Term 1",
        content,
        author: "teacher@evalora.com",
      });
    }
    router.refresh();
    setTitle("");
    setSubject("");
    setContent("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Upload (Teacher)</h1>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 max-w-lg">
        <label>
          Type
          <select value={type} onChange={(e) => setType(e.target.value)} className="ml-2">
            <option value="note">Note</option>
            <option value="quiz">Quiz</option>
            <option value="paper">Paper</option>
          </select>
        </label>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="ml-2 border rounded px-2 py-1 w-full" />
        </label>
        <label>
          Subject / Term / Topic
          <input value={subject} onChange={(e) => setSubject(e.target.value)} className="ml-2 border rounded px-2 py-1 w-full" />
        </label>
        <label>
          Content
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="ml-2 border rounded px-2 py-1 w-full h-40" />
        </label>
        <div>
          <button className="px-3 py-2 border rounded">Upload</button>
        </div>
      </form>
    </div>
  );
}
