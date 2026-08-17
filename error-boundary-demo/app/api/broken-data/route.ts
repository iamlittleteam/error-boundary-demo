import { NextResponse } from 'next/server';

// จำลอง API ที่ "สำเร็จ" (status 200) แต่ payload ผิดรูปแบบที่ UI คาดไว้
// ทำให้เกิด UI/render error (เช่น .map() ของ undefined) ไม่ใช่ API error
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return NextResponse.json({
    id: 1,
    name: 'Chotirot Khampheng',
    // ⚠️ ไม่มี field "hobbies" ตามที่ UI คาดหวัง -> จะพังตอน render
  });
}
