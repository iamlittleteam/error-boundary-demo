"use client";

import { useEffect } from "react";

// Next.js (App Router) จะ auto-wrap ทุก route segment ด้วยไฟล์ error.tsx
// ที่อยู่ในโฟลเดอร์เดียวกันหรือโฟลเดอร์แม่ - นี่คือ Error Boundary
// ที่ Next.js สร้างให้ฟรี ไม่ต้องเขียน class component เอง
export default function ProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // ตรงนี้เทียบเท่า componentDidCatch — ใช้ log ไป Sentry/LogRocket ได้
    console.error("[ProfileError]", error);
  }, [error]);

  return (
    <div className="card space-y-3 border-red-900">
      <h2 className="text-xl font-semibold text-red-400">
        โหลดข้อมูลไม่สำเร็จ
      </h2>
      <p className="text-gray-400 text-sm">{error.message}</p>
      <button className="btn btn-danger" onClick={reset}>
        ลองใหม่
      </button>
    </div>
  );
}
