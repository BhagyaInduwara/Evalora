"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { addPaper } from "@/lib/mockData";
import { getCurrentUser } from "@/lib/mockAuth";

export default function TeacherUploadPapersPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [term, setTerm] = useState("");
  const [grade, setGrade] = useState("");
  const [duration, setDuration] = useState("");
  const [passPercentage, setPassPercentage] = useState("50");
  const [isModelPaper, setIsModelPaper] = useState(false);
  const [mcqCount, setMcqCount] = useState("0");
  const [mcqMarks, setMcqMarks] = useState("1");
  const [essayCount, setEssayCount] = useState("0");
  const [essayMarks, setEssayMarks] = useState("10");
  const [notes, setNotes] = useState("");

  const totalQuestions = useMemo(() => {
    return Number(mcqCount || 0) + Number(essayCount || 0);
  }, [mcqCount, essayCount]);

  const totalMarks = useMemo(() => {
    return Number(mcqCount || 0) * Number(mcqMarks || 0) + Number(essayCount || 0) * Number(essayMarks || 0);
  }, [mcqCount, mcqMarks, essayCount, essayMarks]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const user = getCurrentUser();
    const questionTypes = [
      Number(mcqCount || 0) > 0 ? "MCQ" : null,
      Number(essayCount || 0) > 0 ? "Essay" : null,
    ].filter(Boolean) as string[];

    addPaper({
      id: `p-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title,
      subject,
      term,
      grade,
      marks: totalMarks,
      duration: Number(duration || 0),
      passPercentage: Number(passPercentage || 0),
      questionTypes,
      content: notes || (isModelPaper ? "Model paper" : "Past paper"),
      author: user?.email || "teacher@evalora.com",
    });

    router.push("/protected/teacher/upload");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Upload Past Paper</h2>
        <p className="mt-2 text-slate-600">Create and upload past papers for your students.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Paper Details</h3>
            <div className="mt-4 grid grid-cols-1 gap-6">
              <div>
                <label className="text-sm font-semibold text-slate-600">Paper Title</label>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g., Mathematics Term 1 Past Paper"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-600">Subject</label>
                  <select
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none"
                  >
                    <option value="">Select a subject</option>
                    {[
                      "Mathematics",
                      "Physics",
                      "Chemistry",
                      "Biology",
                      "History",
                    ].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">Term</label>
                  <select
                    value={term}
                    onChange={(event) => setTerm(event.target.value)}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none"
                  >
                    <option value="">Select term</option>
                    {["Term 1", "Term 2", "Term 3"].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-600">Grade</label>
                  <select
                    value={grade}
                    onChange={(event) => setGrade(event.target.value)}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none"
                  >
                    <option value="">Select grade</option>
                    {["Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">Duration (minutes)</label>
                  <input
                    value={duration}
                    onChange={(event) => setDuration(event.target.value)}
                    placeholder="e.g., 180"
                    required
                    type="number"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={isModelPaper}
                  onChange={(event) => setIsModelPaper(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span>This is a model paper</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Paper Structure</h3>
            <p className="mt-1 text-sm text-slate-500">Define how many questions of each type this paper will have.</p>
            <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-purple-50 p-5">
                <h4 className="text-sm font-semibold text-slate-700">Multiple Choice Questions</h4>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500">Number of MCQs</label>
                    <input
                      value={mcqCount}
                      onChange={(event) => setMcqCount(event.target.value)}
                      type="number"
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500">Marks per MCQ</label>
                    <input
                      value={mcqMarks}
                      onChange={(event) => setMcqMarks(event.target.value)}
                      type="number"
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-indigo-50 p-5">
                <h4 className="text-sm font-semibold text-slate-700">Essay Questions</h4>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500">Number of Essays</label>
                    <input
                      value={essayCount}
                      onChange={(event) => setEssayCount(event.target.value)}
                      type="number"
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500">Marks per Essay</label>
                    <input
                      value={essayMarks}
                      onChange={(event) => setEssayMarks(event.target.value)}
                      type="number"
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-purple-200 bg-purple-50 px-5 py-4 text-sm text-purple-700">
              <div className="flex items-center justify-between">
                <span>Total Marks</span>
                <span className="text-lg font-semibold">{totalMarks}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span>Total Questions</span>
                <span className="text-lg font-semibold">{totalQuestions}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-600">Pass Percentage</label>
              <input
                value={passPercentage}
                onChange={(event) => setPassPercentage(event.target.value)}
                type="number"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-600">Notes</label>
              <input
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Optional instructions"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/protected/teacher/upload")}
              className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:border-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-purple-700 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-600"
            >
              Upload Paper
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
