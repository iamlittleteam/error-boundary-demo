# Error Boundary Demo (Next.js App Router)

โปรเจกต์เดโมสาธิต Error Boundary ใน React/Next.js สองแบบ พร้อมแยกให้เห็นชัดว่า
**UI error** กับ **API error** จับด้วยกลไกเดียวกัน แต่ต้อง "ดัน" เข้า render
คนละวิธี

## วิธีรัน

```bash
npm install
npm run dev
```

เปิด http://localhost:3000

## โครงสร้าง / สิ่งที่ควรดู

### 1. `/profile` — Next.js built-in Error Boundary (`error.tsx`)

- `app/profile/page.tsx` — client component, fetch `/api/user`
  (สุ่ม fail 50/50) แล้วเก็บ error ไว้ใน state ก่อน แล้ว `throw error`
  **ระหว่าง render** (ไม่ใช่ใน `.catch()`)
- `app/profile/error.tsx` — ไฟล์ตาม convention ของ Next.js App Router
  ทุก route segment จะถูก wrap ด้วย error boundary อัตโนมัติถ้ามีไฟล์นี้
  ได้ `error` และ `reset()` มาใช้ฟรี ไม่ต้องเขียน class component เอง
- `app/profile/loading.tsx` — Suspense fallback ระหว่างโหลด

### 2. `/manual-demo` — Manual class-based Error Boundary + แยกประเภท error

- `components/errors.ts` — `ApiError` / `UIError` custom classes
- `components/ManualErrorBoundary.tsx` — class component ที่เขียนเอง
  (`getDerivedStateFromError` + `componentDidCatch`) เช็คด้วย
  `instanceof ApiError` เพื่อโชว์ fallback UI คนละแบบ
- `components/DemoPanel.tsx` — panel ที่ trigger ได้ทั้งสองเคส:
  - `mode="user"` → เรียก `/api/user?fail=true` (fail เสมอ) → API error
  - `mode="broken"` → เรียก `/api/broken-data` (สำเร็จ 200 แต่ payload
    ไม่มี field `hobbies`) → `.map()` ของ `undefined` throw เองตาม
    ธรรมชาติตอน render → UI error
- `app/manual-demo/page.tsx` — วาง 2 boundary แยกกัน คนละ panel
  ไม่ให้ error ฝั่งหนึ่งดึงอีกฝั่งพังไปด้วย พร้อมปุ่ม retry ที่ใช้
  `key` remount component ใหม่จริงๆ

## ประเด็นสำคัญที่เดโมนี้ตั้งใจสื่อ

| | UI Error | API Error |
|---|---|---|
| จุดเกิด error | ระหว่าง render เอง (JS throw อัตโนมัติ) | นอก render (async callback) |
| ต้องเขียน state เก็บ error เองไหม | ไม่ต้อง | ต้อง (`useState` + `if (error) throw`) |
| Error Boundary จับได้ไหม | ได้ทันที | ได้ ถ้าดันเข้า render phase ก่อน |

Error Boundary ไม่สนใจว่า error มาจากไหน สนใจแค่ว่า throw ตอนไหน —
ถ้า throw ระหว่าง render จับได้เสมอ ไม่ว่าต้นตอจะเป็น UI bug หรือ API fail

## หมายเหตุ

- ใช้ Next.js 14.2.35 (เวอร์ชันที่แพตช์ช่องโหว่ RSC ที่ประกาศเมื่อ
  ธ.ค. 2025 แล้ว)
- Tailwind CSS สำหรับ styling พื้นฐาน
