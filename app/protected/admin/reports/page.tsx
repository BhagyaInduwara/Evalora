"use client";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Reports</h2>
        <p className="mt-2 text-slate-600">Generate and review platform reports.</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Report generator UI coming soon.</p>
        <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
          Choose a report type, time range, and export format.
        </div>
      </div>
    </div>
  );
}
