import { NextResponse } from 'next/server';

// จำลอง API ที่บางครั้ง fail (network/server error)
// เรียกด้วย /api/user?fail=true เพื่อบังคับ error, หรือ /api/user เพื่อสุ่ม 50/50
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const forceFail = searchParams.get('fail') === 'true';
  const shouldFail = forceFail || Math.random() < 0.5;

  // จำลอง network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (shouldFail) {
    return NextResponse.json(
      { message: 'Internal Server Error: user service unavailable' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    id: 1,
    name: 'Chotirot Khampheng',
    hobbies: ['hiking', 'mobile strategy games', 'unity dev'],
  });
}
