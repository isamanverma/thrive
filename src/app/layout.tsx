import { type Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script";
import { ClerkProvider } from "@clerk/nextjs";
import {
  Geist,
  Geist_Mono,
  Plus_Jakarta_Sans,
  DM_Sans,
  Space_Grotesk,
} from "next/font/google";
import UserSyncProvider from "@/components/UserSyncProvider";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";
import { cn } from "@/lib/utils";

const spaceGroteskHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Thrive - AI Meal Planning",
  description: "Discover delicious, personalized meal plans with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={cn(
          "font-sans",
          dmSans.variable,
          spaceGroteskHeading.variable,
        )}
      >
        <link rel="icon" href="/favicon.ico" />
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} antialiased bg-background text-foreground`}
        >
          <ThemeScript />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ScrollToTop />
            <UserSyncProvider>{children}</UserSyncProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
