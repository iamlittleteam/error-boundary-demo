"use client";

import { useEffect, useState } from "react";
import { ApiError, UIError } from "./errors";

type Mode = "idle" | "loading" | "ok-user" | "ok-broken";

interface UserData {
  id: number;
  name: string;
  hobbies?: string[]; // optional -> broken-data endpoint omits this on purpose
}

export function DemoPanel({ mode }: { mode: "user" | "broken" }) {
  const [state, setState] = useState<Mode>("idle");
  const [data, setData] = useState<UserData | null>(null);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  useEffect(() => {
    setState("loading");
    setApiError(null);
    const url = mode === "user" ? "/api/user?fail=true" : "/api/broken-data";

    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new ApiError(body.message || "API failed", res.status);
        }
        return res.json();
      })
      .then((json: UserData) => {
        setData(json);
        setState(mode === "user" ? "ok-user" : "ok-broken");
      })
      .catch((err) => {
        setApiError(err instanceof ApiError ? err : new ApiError(err.message, 0));
        setState("idle");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // เคส 1: API error -> เก็บไว้ใน state แล้วดันเข้า render (throw ตอน render)
  if (apiError) {
    throw apiError;
  }

  if (state === "loading") {
    return <p className="text-gray-400">กำลังเรียก {mode === "user" ? "/api/user?fail=true" : "/api/broken-data"} ...</p>;
  }

  if (state === "ok-broken" && data) {
    // เคส 2: UI error -> data.hobbies ไม่มีจริง (API ตอบ 200 แต่ payload ผิดรูปแบบ)
    // .map ของ undefined จะ throw เองตามธรรมชาติของ JS ตอน render
    return (
      <div>
        <h4 className="font-semibold mb-2">{data.name}</h4>
        <ul className="list-disc list-inside">
          {data.hobbies!.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (state === "ok-user" && data) {
    return (
      <div>
        <h4 className="font-semibold mb-2">{data.name}</h4>
        <ul className="list-disc list-inside">
          {(data.hobbies ?? []).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <p className="text-gray-400">รอสถานะ...</p>;
}
