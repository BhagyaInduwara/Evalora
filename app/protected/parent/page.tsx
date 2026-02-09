"use client";

export default function ParentPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-semibold text-slate-900">Parent Dashboard</h2>
        <p className="mt-2 text-slate-600">Stay connected to your child's learning journey.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Child Accounts</h3>
          <p className="mt-2 text-sm text-slate-600">View linked student accounts and their progress.</p>
          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            2 accounts linked
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Performance Overview</h3>
          <p className="mt-2 text-sm text-slate-600">Monitor grades, quiz progress, and engagement.</p>
          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Weekly summary ready
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Upcoming Milestones</h3>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            Math unit quiz scheduled for next Tuesday.
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            Progress report delivered every Friday.
          </div>
        </div>
      </section>
    </div>
  );
}
