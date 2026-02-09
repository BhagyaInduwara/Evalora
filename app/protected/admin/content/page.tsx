"use client";

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Content Review</h2>
        <p className="mt-2 text-slate-600">Moderate uploaded content and approve visibility.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Content moderation queue coming soon.</p>
        <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
          Review flagged uploads, adjust visibility, and publish updates.
        </div>
      </div>
    </div>
  );
}
