import type { Metadata } from "next";
import "./globals.css";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const content = getContent();
    const seo = content.seo ?? {};
    return {
      title: seo.title || "מימוש מקיף | מיצוי זכויות ממשלתיות",
      description: seo.description || "מימוש מקיף — מומחים למיצוי זכויות מביטוח לאומי.",
      keywords: seo.keywords || "ביטוח לאומי, מיצוי זכויות",
      openGraph: {
        title: seo.ogTitle || seo.title || "מימוש מקיף",
        description: seo.ogDescription || seo.description || "",
        locale: "he_IL",
        type: "website",
      },
    };
  } catch {
    return {
      title: "מימוש מקיף | מיצוי זכויות ממשלתיות",
      description: "מימוש מקיף — מומחים למיצוי זכויות מביטוח לאומי.",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
