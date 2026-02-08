"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getQuizzes, Quiz } from "@/lib/mockData";

export default function QuizAttemptPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const quizzes = getQuizzes();
    const found = quizzes.find((q) => q.id === params.id);
    setQuiz(found || null);
  }, [params.id]);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    alert("Quiz submitted! (mock data only)");
  };

  if (!quiz) return <div className="p-6">Quiz not found</div>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold">{quiz.title}</h1>
      <p className="text-sm text-gray-600 mt-1">Topic: {quiz.topic}</p>
      
      <div className="mt-6 grid gap-6">
        {quiz.questions.map((q, i) => (
          <div key={q.id} className="p-4 border rounded">
            <h3 className="font-semibold">Q{i + 1}: {q.text}</h3>
            {q.choices && q.choices.length > 0 ? (
              <div className="mt-3 grid gap-2">
                {q.choices.map((choice) => (
                  <label key={choice} className="flex items-center">
                    <input
                      type="radio"
                      name={q.id}
                      value={choice}
                      checked={answers[q.id] === choice}
                      onChange={(e) => handleAnswer(q.id, e.target.value)}
                      className="mr-2"
                    />
                    {choice}
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                className="mt-3 w-full border rounded px-2 py-1"
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswer(q.id, e.target.value)}
                placeholder="Your answer..."
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={submitted}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {submitted ? "Submitted" : "Submit Quiz"}
        </button>
        <button onClick={() => router.back()} className="px-4 py-2 border rounded">
          Back
        </button>
      </div>
    </div>
  );
}
