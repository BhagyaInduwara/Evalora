"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPapers, Paper } from "@/lib/mockData";
import Link from "next/link";

export default function PaperViewPage() {
  const params = useParams();
  const router = useRouter();
  const [paper, setPaper] = useState<Paper | null>(null);

  useEffect(() => {
    const papers = getPapers();
    const found = papers.find((p) => p.id === params.id);
    setPaper(found || null);
  }, [params.id]);

  if (!paper)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="w-full px-4 py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Paper not found</p>
          <div className="mt-4 flex justify-center gap-3">
            <Link
              href="/protected/student/papers"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg"
            >
              Back to Papers
            </Link>
            <Link
              href="/protected/student"
              className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Main content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Paper Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {paper.title}
          </h1>
          <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">
              {paper.subject}
            </span>
            <span>•</span>
            <span>{paper.term}</span>
            <span>•</span>
            <span>{paper.grade}</span>
            <span className="ml-auto bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded text-purple-700 dark:text-purple-300 font-semibold">
              {paper.marks} Marks
            </span>
          </div>
        </div>

        {/* Paper Details Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {/* Question Types */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-2xl">
                  📋
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Question Types</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {paper.questionTypes.join(", ")}
              </p>
            </div>

            {/* Essay Questions */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-2xl">
                  ✍️
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Question Format</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                Mixed
              </p>
            </div>

            {/* Duration */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-2xl">
                  ⏱️
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Duration</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {paper.duration} mins
              </p>
            </div>

            {/* Pass Requirement */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-2xl">
                  ✅
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Pass Req.</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {paper.passPercentage}%
              </p>
            </div>
          </div>

          {/* Start Button */}
          <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold text-lg rounded-lg transition transform hover:scale-105">
            Start Paper Attempt Now
          </button>
        </div>

        {/* Paper Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
            📌 Instructions
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>• Total duration: {paper.duration} minutes</li>
            <li>• Total marks: {paper.marks}</li>
            <li>• Passing score: {paper.passPercentage}% ({Math.ceil((paper.marks * paper.passPercentage) / 100)} marks)</li>
            <li>• Question types: {paper.questionTypes.join(", ")}</li>
            <li>• You can review all your answers before final submission</li>
          </ul>
        </div>

        {/* Back Links */}
        <div className="mt-8 flex gap-3 justify-center">
          <Link
            href={`/protected/student/papers/subject/${encodeURIComponent(paper.subject)}/term/${encodeURIComponent(paper.term)}`}
            className="px-6 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-semibold rounded-lg transition"
          >
            ← Back to {paper.term}
          </Link>
          <Link
            href="/protected/student/papers"
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition"
          >
            All Papers
          </Link>
        </div>
      </div>
    </div>
  );
}
