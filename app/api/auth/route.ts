import { NextRequest, NextResponse } from "next/server";
import { getContent } from "@/lib/content";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const content = getContent();
    const adminPassword = content.settings?.adminPassword || "admin123";

    if (password === adminPassword) {
      const res = NextResponse.json({ success: true });
      res.cookies.set("admin_token", "authenticated", {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: "/",
        sameSite: "lax",
      });
      return res;
    } else {
      return NextResponse.json({ error: "סיסמה שגויה" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "שגיאה" }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
  return res;
}
