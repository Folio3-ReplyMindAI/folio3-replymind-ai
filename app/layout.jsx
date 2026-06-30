import "./globals.css";
export const metadata = {
    title: "ReplyMind — Every customer message. One inbox.",
    description: "ReplyMind unifies WhatsApp, email, and website chat into one inbox and writes AI reply drafts you approve with a tap.",
    authors: [{ name: "ReplyMind" }],
    openGraph: {
        title: "ReplyMind — Every customer message. One inbox.",
        description: "Unified messaging with AI-drafted replies. Never miss a lead or lose a weekend to busywork again.",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "ReplyMind — Every customer message. One inbox.",
        description: "Unified messaging with AI-drafted replies. Never miss a lead or lose a weekend to busywork again.",
    },
};
export default function RootLayout({ children, }) {
    return (<html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Climate+Crisis&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"/>
      </head>
      <body className="min-h-full">{children}</body>
    </html>);
}
