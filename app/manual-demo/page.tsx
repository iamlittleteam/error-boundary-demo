"use client";

import { useState } from "react";
import Link from "next/link";
import { ManualErrorBoundary } from "@/components/ManualErrorBoundary";
import { DemoPanel } from "@/components/DemoPanel";

export default function ManualDemoPage() {
  // key เปลี่ยนค่า = force remount DemoPanel ใหม่ทั้งตัว เวลากด "ลองใหม่"
  const [apiKey, setApiKey] = useState(0);
  const [uiKey, setUiKey] = useState(0);

  return (
    <main className="space-y-8">
      <div>
        <Link href="/" className="text-sm text-gray-400 hover:underline">
          ← กลับหน้าแรก
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">
          Manual Error Boundary: API error vs UI error
        </h1>
        <p className="text-gray-400 text-sm">
          ทั้งสอง panel ด้านล่างใช้ <code>ManualErrorBoundary</code>{" "}
          (class component) คนละตัวกัน — เพื่อไม่ให้ error ของ panel หนึ่ง
          ดึงอีก panel พังไปด้วย
        </p>
      </div>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">1. จำลอง API Error</h2>
        <p className="text-gray-400 text-sm">
          เรียก <code>/api/user?fail=true</code> ซึ่งตอบ 500 เสมอ → เก็บ
          error ไว้ใน state → <code>throw</code> ตอน render →{" "}
          <code>ManualErrorBoundary</code> เช็คว่าเป็น{" "}
          <code>instanceof ApiError</code> แล้วโชว์ fallback แบบ &quot;server
          ล่ม, กด retry&quot;
        </p>
        <ManualErrorBoundary key={apiKey} onReset={() => setApiKey((k) => k + 1)}>
          <DemoPanel mode="user" />
        </ManualErrorBoundary>
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">2. จำลอง UI Error</h2>
        <p className="text-gray-400 text-sm">
          เรียก <code>/api/broken-data</code> ซึ่งตอบ 200 สำเร็จ แต่ payload
          ไม่มี field <code>hobbies</code> → พอ render ถึง{" "}
          <code>data.hobbies.map()</code> จะ throw{" "}
          <code>TypeError</code> เองตามธรรมชาติ (ไม่ต้องเขียน throw เอง) →{" "}
          <code>ManualErrorBoundary</code> ตกไป fallback UI แบบ &quot;แสดงผล
          ไม่ได้&quot;
        </p>
        <ManualErrorBoundary key={uiKey} onReset={() => setUiKey((k) => k + 1)}>
          <DemoPanel mode="broken" />
        </ManualErrorBoundary>
      </section>
    </main>
  );
}
