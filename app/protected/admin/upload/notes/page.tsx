"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { addNote } from "@/lib/mockData";
import { getCurrentUser } from "@/lib/mockAuth";
import RichTextEditor from "@/components/rich-text-editor";

const subjectTopics: Record<string, string[]> = {
  Mathematics: ["Functions", "Calculus", "Algebra", "Statistics"],
  Physics: ["Kinematics", "Forces", "Energy", "Waves"],
  Chemistry: ["Atomic Structure", "Bonding", "Reactions", "Solutions"],
  Biology: ["Cells", "Genetics", "Ecology", "Human Systems"],
};

export default function AdminUploadNotesPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");

  const topics = useMemo(() => (subject ? subjectTopics[subject] || [] : []), [subject]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const textContent = content.replace(/<[^>]*>/g, "").trim();
    if (!textContent) return;
    const user = getCurrentUser();
    addNote({
      id: `n-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title,
      subject,
      content,
      author: user?.email || "admin@evalora.com",
      visibility: "admin",
    });
    setTitle("");
    setSubject("");
    setTopic("");
    setContent("");
    setFileName("");
    router.push("/protected/admin/upload");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Upload Notes</h2>
        <p className="mt-2 text-slate-600">Share study materials and notes with all students.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="text-sm font-semibold text-slate-600">Note Title</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g., Introduction to Calculus"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-600">Subject</label>
              <select
                value={subject}
                onChange={(event) => {
                  setSubject(event.target.value);
                  setTopic("");
                }}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none"
              >
                <option value="">Select a subject</option>
                {Object.keys(subjectTopics).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-600">Topic</label>
              <select
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                required
                disabled={!subject}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none disabled:bg-slate-50"
              >
                <option value="">{subject ? "Select a topic" : "Select a subject first"}</option>
                {topics.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">Note Content</label>
            <div className="mt-2">
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Start writing your notes here..."
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Tip: Use the toolbar above to format headings, lists, and more.
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">Attach File (Optional)</label>
            <div className="mt-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center text-sm text-slate-500">
              <input
                id="notes-file"
                type="file"
                className="hidden"
                onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
              />
              <label htmlFor="notes-file" className="cursor-pointer font-semibold text-purple-700">
                Click to upload
              </label>
              <p className="text-xs text-slate-400">PDF, DOCX, PPT, TXT (max 10MB)</p>
              {fileName ? <p className="mt-2 text-xs text-slate-600">Selected: {fileName}</p> : null}
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/protected/admin/upload")}
              className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:border-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-purple-700 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-600"
            >
              Upload Note
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
