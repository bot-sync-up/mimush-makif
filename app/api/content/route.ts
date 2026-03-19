import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";

function isAuthed(req: NextRequest) {
  return req.cookies.get("admin_token")?.value === "authenticated";
}

export async function GET() {
  try {
    const content = getContent();
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    saveContent(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { section, data } = await req.json();
    const current = getContent();
    current[section] = data;
    saveContent(current);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save section" }, { status: 500 });
  }
}
