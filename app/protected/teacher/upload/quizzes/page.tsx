"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addQuiz } from "@/lib/mockData";
import { getCurrentUser } from "@/lib/mockAuth";

type Question = {
  id: string;
  text: string;
  type: "Multiple Choice" | "Short Answer";
  points: string;
  options: string[];
  answer: string;
};

const createQuestion = (): Question => ({
  id: `q-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  text: "",
  type: "Multiple Choice",
  points: "1",
  options: ["", "", "", ""],
  answer: "",
});

export default function TeacherUploadQuizzesPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [quizType, setQuizType] = useState("Topic-based Quiz");
  const [duration, setDuration] = useState("");
  const [questions, setQuestions] = useState<Question[]>([createQuestion()]);

  const updateQuestion = (index: number, updated: Partial<Question>) => {
    setQuestions((prev) =>
      prev.map((question, idx) => (idx === index ? { ...question, ...updated } : question))
    );
  };

  const updateOption = (index: number, optionIndex: number, value: string) => {
    setQuestions((prev) =>
      prev.map((question, idx) => {
        if (idx !== index) return question;
        const updatedOptions = question.options.map((opt, optIdx) => (optIdx === optionIndex ? value : opt));
        return { ...question, options: updatedOptions };
      })
    );
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, createQuestion()]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const user = getCurrentUser();

    addQuiz({
      id: `quiz-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title,
      topic: topic || subject || "General",
      questions: questions.map((question) => ({
        id: question.id,
        text: question.text,
        choices: question.type === "Multiple Choice" ? question.options.filter(Boolean) : undefined,
        answer: question.answer,
      })),
      author: user?.email || "teacher@evalora.com",
    });

    router.push("/protected/teacher/upload");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Create Quiz</h2>
        <p className="mt-2 text-slate-600">Create quizzes to test student knowledge.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Quiz Details</h3>
            <div className="mt-4 grid grid-cols-1 gap-6">
              <div>
                <label className="text-sm font-semibold text-slate-600">Quiz Title</label>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g., Calculus Chapter 1 Quiz"
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
                    {["Mathematics", "Physics", "Chemistry", "Biology"].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">Topic (Optional)</label>
                  <input
                    value={topic}
                    onChange={(event) => setTopic(event.target.value)}
                    placeholder="Select a topic"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-600">Quiz Type</label>
                  <select
                    value={quizType}
                    onChange={(event) => setQuizType(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none"
                  >
                    {[
                      "Topic-based Quiz",
                      "Unit Review",
                      "Diagnostic",
                      "Practice",
                    ].map((item) => (
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
                    placeholder="e.g., 30"
                    type="number"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                Quiz type selected: {quizType}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Questions ({questions.length})</h3>
              <button
                type="button"
                onClick={addQuestion}
                className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-500"
              >
                + Add Question
              </button>
            </div>

            <div className="mt-4 space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-700">Question {index + 1}</h4>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-600">Question Text</label>
                      <textarea
                        value={question.text}
                        onChange={(event) => updateQuestion(index, { text: event.target.value })}
                        placeholder="Enter your question here"
                        required
                        className="mt-2 min-h-[90px] w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-sm font-semibold text-slate-600">Question Type</label>
                        <select
                          value={question.type}
                          onChange={(event) => updateQuestion(index, { type: event.target.value as Question["type"] })}
                          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
                        >
                          <option value="Multiple Choice">Multiple Choice</option>
                          <option value="Short Answer">Short Answer</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-600">Points</label>
                        <input
                          value={question.points}
                          onChange={(event) => updateQuestion(index, { points: event.target.value })}
                          type="number"
                          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
                        />
                      </div>
                    </div>

                    {question.type === "Multiple Choice" ? (
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-600">Answer Options</label>
                        {question.options.map((option, optIndex) => (
                          <input
                            key={`${question.id}-option-${optIndex}`}
                            value={option}
                            onChange={(event) => updateOption(index, optIndex, event.target.value)}
                            placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
                          />
                        ))}
                      </div>
                    ) : null}

                    <div>
                      <label className="text-sm font-semibold text-slate-600">Correct Answer</label>
                      <input
                        value={question.answer}
                        onChange={(event) => updateQuestion(index, { answer: event.target.value })}
                        placeholder={
                          question.type === "Multiple Choice"
                            ? "Enter the correct option (A, B, C, or D)"
                            : "Enter the correct answer"
                        }
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
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
              Create Quiz
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
