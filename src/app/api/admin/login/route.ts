import { NextResponse } from "next/server";
import { issueToken, setAuthCookie, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    if (typeof password !== "string" || !password) {
      return NextResponse.json({ error: "Password kosong" }, { status: 400 });
    }
    // small delay untuk slow brute force
    await new Promise((r) => setTimeout(r, 250));
    const ok = await verifyPassword(password);
    if (!ok) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }
    const token = await issueToken();
    await setAuthCookie(token);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[login]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
