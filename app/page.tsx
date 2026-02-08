import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <nav className="w-full flex justify-center border-b border-white/10 h-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold text-lg">
            <Link href="/" className="text-blue-600 dark:text-blue-400">
              📚 Evalora
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <ThemeSwitcher />
            <Link href="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5 w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Evalora
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            A modern platform for students, teachers, and parents to collaborate on learning and academic growth.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-md">
              <div className="text-3xl mb-2">👨‍🎓</div>
              <h3 className="font-semibold text-lg mb-2">For Students</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Access notes, quizzes, papers, and track your progress</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-md">
              <div className="text-3xl mb-2">👨‍🏫</div>
              <h3 className="font-semibold text-lg mb-2">For Teachers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Upload content, analyze student performance, and manage classes</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-md">
              <div className="text-3xl mb-2">👨‍👩‍👧</div>
              <h3 className="font-semibold text-lg mb-2">For Parents</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Monitor your child's academic progress and achievements</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/sign-up"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              Get Started
            </Link>
            <Link
              href="/auth/login"
              className="px-6 py-3 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-slate-600 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <footer className="w-full flex items-center justify-center border-t border-white/20 mx-auto text-center text-xs gap-8 py-8 bg-white/30 dark:bg-slate-800/30 backdrop-blur">
        <p className="text-gray-700 dark:text-gray-300">
          © 2025 Evalora. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
