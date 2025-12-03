"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonStar, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button aria-label="Toggle theme" className="p-2 rounded">
        <span className="opacity-0">
          <Sun />
        </span>
      </button>
    );
  }

  return (
    <button
      aria-label="Toggle theme"
      className="p-2 rounded-lg hover:bg-muted cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <MoonStar />}
    </button>
  );
};

export default ThemeToggle;
