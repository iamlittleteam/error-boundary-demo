"use client";

import { useEffect, useState, useCallback } from "react";

interface User {
  id: number;
  name: string;
  hobbies: string[];
}

export default function ProfilePage() {
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch("/api/user")
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || `API error: ${res.status}`);
        }
        return res.json();
      })
      .then((json: User) => {
        setData(json);
        setLoading(false);
      })
      .catch((err: Error) => {
        // เก็บไว้ใน state ก่อน ยังไม่ throw ตรงนี้ (อยู่ใน async callback)
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // 🔑 จุดสำคัญ: throw "ระหว่าง render" ไม่ใช่ใน .catch()
  // พอ error state ไม่เป็น null -> re-render -> ถึงบรรทัดนี้ -> throw จริง
  // Next.js error.tsx (ในโฟลเดอร์เดียวกัน) จะดักจับได้ทันที
  if (error) {
    throw error;
  }

  if (loading) {
    return (
      <div className="card">
        <p>กำลังโหลดข้อมูล user... (มีโอกาส 50% ที่ API จะ fail)</p>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <h1 className="text-2xl font-bold">สวัสดี, {data!.name}</h1>
      <p className="text-gray-400">งานอดิเรก:</p>
      <ul className="list-disc list-inside">
        {data!.hobbies.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <button className="btn btn-outline" onClick={fetchUser}>
        โหลดใหม่ (ลองซ้ำจนกว่าจะเจอ error)
      </button>
    </div>
  );
}
