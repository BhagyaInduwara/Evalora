"use client";

const mockLeaderboard = [
  { name: "Alice", points: 980 },
  { name: "Bob", points: 870 },
  { name: "Charlie", points: 720 },
];

export default function StudentLeaderboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <div className="mt-4 grid gap-2 max-w-sm">
        {mockLeaderboard.map((p, i) => (
          <div key={i} className="p-3 border rounded flex justify-between">
            <div>{i + 1}. {p.name}</div>
            <div className="font-semibold">{p.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
