import { useEffect, useState } from "react";
// Not used
export default function ThemeSwitcher() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 border rounded-md text-sm"
    >
      {dark ? "☀️ Light mode" : "🌙 Dark mode"}
    </button>
  );
}