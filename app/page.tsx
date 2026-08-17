import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Error Boundary Demo</h1>
        <p className="text-gray-400">
          Next.js (App Router) — เดโมการจับ UI error กับ API error
          คนละแบบ ด้วย <code>error.tsx</code> convention ของ Next.js
          และ class-based Error Boundary แบบ manual
        </p>
      </div>

      <div className="card space-y-3">
        <h2 className="text-xl font-semibold">
          1. Next.js built-in Error Boundary (<code>error.tsx</code>)
        </h2>
        <p className="text-gray-400 text-sm">
          หน้า <code>/profile</code> fetch ข้อมูล user จาก API ที่สุ่ม fail
          50/50 — ถ้า fail จะ throw ตอน render แล้วโดน{" "}
          <code>app/profile/error.tsx</code> จับไว้อัตโนมัติ พร้อมปุ่ม
          reset() ในตัว (Next.js ทำให้ฟรี ไม่ต้องเขียน class เอง)
        </p>
        <Link href="/profile" className="btn btn-primary inline-block">
          ไปหน้า /profile →
        </Link>
      </div>

      <div className="card space-y-3">
        <h2 className="text-xl font-semibold">
          2. Manual class Error Boundary + แยก UI error / API error
        </h2>
        <p className="text-gray-400 text-sm">
          หน้า <code>/manual-demo</code> ใช้ Error Boundary
          แบบ class component ที่เขียนเอง และแยก fallback UI
          ตามประเภท error (<code>ApiError</code> vs{" "}
          <code>UIError</code>) พร้อมปุ่มกดเลือกจำลองแต่ละเคส
        </p>
        <Link href="/manual-demo" className="btn btn-primary inline-block">
          ไปหน้า /manual-demo →
        </Link>
      </div>
    </main>
  );
}
