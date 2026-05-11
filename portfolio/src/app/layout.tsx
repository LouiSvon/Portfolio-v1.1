import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import type { Viewport } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  colorScheme: "dark",
  initialScale: 1,
  themeColor: "#0a0a0a",
  width: "device-width",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        {/* Restore accent color before first paint — no flash */}
        <Script
          id="accent-restore"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{var a=localStorage.getItem('accent-color');if(a)document.documentElement.style.setProperty('--accent',a)}catch(e){}`,
          }}
        />
        <Script
          id="fade-in-observer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}})},{threshold:0.1});function run(){document.querySelectorAll('.fade-in:not(.visible)').forEach(function(el){o.observe(el)})}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',run)}else{run()}})()`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
