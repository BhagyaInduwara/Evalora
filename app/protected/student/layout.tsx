"use client";

import { usePathname } from "next/navigation";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudentRoute = pathname?.startsWith("/protected/student");

  // For student routes, bypass parent layout styling
  if (isStudentRoute) {
    return (
      <div className="min-h-screen w-screen overflow-hidden" style={{ margin: 0, padding: 0, maxWidth: "100vw" }}>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  );
}
