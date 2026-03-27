"use client";

import { useEffect, useState } from "react";

const THEME_SCRIPT = `(function(){try{var a=localStorage.getItem("theme");if(a){document.documentElement.classList.add(a)}else if(window.matchMedia("(prefers-color-scheme:dark)").matches){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export function ThemeScript() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (mounted) return null;

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  );
}
