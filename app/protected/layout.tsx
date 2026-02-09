
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full">
      <div className="flex-1 w-full flex flex-col gap-10">
        <div className="flex-1 flex flex-col gap-10 w-full">
          {children}
        </div>
      </div>
    </main>
  );
}
