"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getQuizzes, Quiz } from "@/lib/mockData";
import Link from "next/link";

export default function QuizAttemptPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const quizzes = getQuizzes();
    const found = quizzes.find((q) => q.id === params.id);
    setQuiz(found || null);
  }, [params.id]);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (!quiz) return;

    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.answer) correctCount++;
    });

    const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    setScore(percentage);
    setSubmitted(true);
  };

  if (!quiz)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Quiz not found</p>
          <Link
            href="/protected/student/quizzes"
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 underline"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>
    );

  if (submitted) {
    const totalQuestions = quiz.questions.length;
    const correctAnswers = quiz.questions.filter((q) => answers[q.id] === q.answer).length;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <div className="w-full px-4 sm:px-6 py-6">
            <div>
              <h1 className="text-4xl font-bold">Evalora</h1>
              <p className="text-purple-200 text-sm mt-1">Quiz Results</p>
            </div>

            <div className="flex gap-8 mt-6 text-sm font-medium">
              {["Dashboard", "Notes", "Quizzes", "Papers", "Progress", "Leaderboard"].map((item) => {
                const href = item === "Dashboard" ? "/protected/student" : item === "Quizzes" ? "/protected/student/quizzes" : `/protected/student/${item.toLowerCase()}`;
                return (
                  <Link
                    key={item}
                    href={href}
                    className={`pb-2 border-b-2 transition ${
                      item === "Quizzes" ? "border-white text-white" : "border-transparent text-purple-200 hover:text-white"
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full px-4 sm:px-6 py-12 flex items-center justify-center min-h-[500px]">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-12 text-center">
            <div className="text-6xl mb-6">{score === 100 ? "🎉" : score >= 80 ? "👏" : score >= 60 ? "👍" : "📚"}</div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quiz Complete!</h2>

            <div className={`text-6xl font-bold mb-4 ${score >= 80 ? "text-green-600 dark:text-green-400" : score >= 60 ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"}`}>{score}%</div>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              You scored <span className="font-bold text-gray-900 dark:text-white">{correctAnswers} out of {totalQuestions}</span>
            </p>

            {score >= 80 && <p className="text-green-600 dark:text-green-400 font-semibold mb-6">✓ Great work! You've mastered this topic.</p>}
            {score >= 60 && score < 80 && <p className="text-yellow-600 dark:text-yellow-400 font-semibold mb-6">Good effort! Review the topics and try again.</p>}
            {score < 60 && <p className="text-blue-600 dark:text-blue-400 font-semibold mb-6">Keep practicing! You'll improve with more attempts.</p>}

            <div className="flex gap-3 justify-center">
              <Link href="/protected/student/quizzes" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition transform hover:scale-105">Back to Quizzes</Link>
              <button onClick={() => { setSubmitted(false); setAnswers({}); setScore(0); }} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition transform hover:scale-105">Retry Quiz</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = ((Object.keys(answers).length / quiz.questions.length) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="w-full px-4 sm:px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold">Evalora</h1>
              <p className="text-purple-200 text-sm mt-1">Quiz Attempt</p>
            </div>
            <button onClick={() => router.back()} className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition">← Back</button>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
              <div className="bg-white h-full rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="w-full px-4 sm:px-6">
          <div className="flex gap-8 text-sm font-medium border-t border-white border-opacity-20">
            {["Dashboard", "Notes", "Quizzes", "Papers", "Progress", "Leaderboard"].map((item) => {
              const href = item === "Dashboard" ? "/protected/student" : item === "Quizzes" ? "/protected/student/quizzes" : `/protected/student/${item.toLowerCase()}`;
              return (
                <Link key={item} href={href} className={`py-4 px-1 border-b-2 transition ${item === "Quizzes" ? "border-white text-white" : "border-transparent text-purple-200 hover:text-white"}`}>
                  {item}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{quiz.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">{quiz.topic} • Question <span className="font-semibold">{Object.keys(answers).length || "??"}</span> of {quiz.questions.length}</p>
        </div>

        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <div key={question.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex-shrink-0">
                  <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{question.text}</h3>
                </div>
              </div>

              {question.choices && question.choices.length > 0 ? (
                <div className="space-y-3 ml-14">
                  {question.choices.map((choice, choiceIndex) => (
                    <label key={choice} className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition ${answers[question.id] === choice ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : "border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600"}`}>
                      <input type="radio" name={question.id} value={choice} checked={answers[question.id] === choice} onChange={(e) => handleAnswer(question.id, e.target.value)} className="w-4 h-4 text-purple-600" />
                      <span className="ml-3 flex items-center gap-2 text-gray-900 dark:text-white"><span className="font-medium text-sm text-gray-500 dark:text-gray-400">{String.fromCharCode(65 + choiceIndex)}.</span>{choice}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <textarea className="w-full rounded-lg border border-gray-300 dark:border-slate-600 px-4 py-3 dark:bg-slate-700 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-purple-400" value={answers[question.id] || ""} onChange={(e) => handleAnswer(question.id, e.target.value)} placeholder="Your answer..." rows={4} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <button onClick={handleSubmit} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition transform hover:scale-105 disabled:opacity-50" disabled={Object.keys(answers).length === 0}>Submit Quiz</button>
          <button onClick={() => router.back()} className="px-8 py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-semibold rounded-lg transition">Back to Quizzes</button>
        </div>
      </div>
    </div>
  );
}
