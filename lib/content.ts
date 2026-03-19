import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "content.json");
const SUBMISSIONS_FILE = path.join(process.cwd(), "data", "submissions.json");

export function getContent() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

export function saveContent(data: unknown) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export type Submission = {
  id: string;
  name: string;
  phone: string;
  service: string;
  message?: string;
  date: string;
  read: boolean;
};

export function getSubmissions(): Submission[] {
  if (!fs.existsSync(SUBMISSIONS_FILE)) return [];
  return JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf-8"));
}

export function addSubmission(sub: Omit<Submission, "id" | "date" | "read">) {
  const submissions = getSubmissions();
  const newSub: Submission = {
    ...sub,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    read: false,
  };
  submissions.unshift(newSub);
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), "utf-8");
  return newSub;
}

export function markSubmissionRead(id: string) {
  const submissions = getSubmissions();
  const updated = submissions.map(s => s.id === id ? { ...s, read: true } : s);
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(updated, null, 2), "utf-8");
}

export function deleteSubmission(id: string) {
  const submissions = getSubmissions();
  const updated = submissions.filter(s => s.id !== id);
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(updated, null, 2), "utf-8");
}
