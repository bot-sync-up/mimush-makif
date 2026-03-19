import { NextRequest, NextResponse } from "next/server";
import { getSubmissions, addSubmission, markSubmissionRead, deleteSubmission } from "@/lib/content";

function isAuthed(req: NextRequest) {
  return req.cookies.get("admin_token")?.value === "authenticated";
}

// Public: submit contact form
export async function POST(req: NextRequest) {
  try {
    const { name, phone, service, message } = await req.json();
    if (!name || !phone) {
      return NextResponse.json({ error: "שם וטלפון הם שדות חובה" }, { status: 400 });
    }
    const sub = addSubmission({ name, phone, service: service || "לא צוין", message });
    return NextResponse.json({ success: true, id: sub.id });
  } catch {
    return NextResponse.json({ error: "שגיאה בשמירת הפנייה" }, { status: 500 });
  }
}

// Admin: get all submissions
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getSubmissions());
}

// Admin: mark read or delete
export async function PATCH(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, action } = await req.json();
  if (action === "read") markSubmissionRead(id);
  if (action === "delete") deleteSubmission(id);
  return NextResponse.json({ success: true });
}
