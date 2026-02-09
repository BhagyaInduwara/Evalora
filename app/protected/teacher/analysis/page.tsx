"use client";

const overviewCards = [
  { label: "Average Mastery", value: "74%", helper: "Across all subjects" },
  { label: "Most Improved", value: "Algebra", helper: "Up 9% this month" },
  { label: "At Risk Students", value: "4", helper: "Need follow up" },
];

export default function TeacherAnalysisPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Analytics</h2>
        <p className="mt-2 text-slate-600">
          Track class performance, subject trends, and at-risk students.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {overviewCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</p>
            <p className="mt-1 text-xs text-slate-500">{card.helper}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Class Performance</h3>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
              Last 30 days
            </span>
          </div>
          <div className="mt-6 grid gap-4">
            <div className="h-48 rounded-xl border border-dashed border-slate-200 bg-slate-50/60" />
            <div className="grid grid-cols-3 gap-4 text-xs text-slate-500">
              <div>
                <p className="font-semibold text-slate-700">Peak Day</p>
                <p>Tuesday</p>
              </div>
              <div>
                <p className="font-semibold text-slate-700">Avg. Score</p>
                <p>74%</p>
              </div>
              <div>
                <p className="font-semibold text-slate-700">Completion</p>
                <p>89%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Subject Breakdown</h3>
            <div className="mt-4 space-y-4">
              {[
                { subject: "Mathematics", value: 82 },
                { subject: "Physics", value: 69 },
                { subject: "Chemistry", value: 61 },
              ].map((item) => (
                <div key={item.subject}>
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                    <span>{item.subject}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">At-Risk Signals</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="rounded-xl bg-pink-50 p-3">
                Quiz completion down by 12% in Physics.
              </div>
              <div className="rounded-xl bg-purple-50 p-3">
                3 students missed last submission window.
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                Average time per quiz increased by 6 minutes.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
