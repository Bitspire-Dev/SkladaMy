"use client";

import React from "react";

export default function BackToTop() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <a
      href="#top"
      onClick={handleClick}
      className="inline-flex items-center text-primary hover:underline text-sm"
      aria-label="Powrót na górę strony"
    >
      ↑ Powrót na górę strony
    </a>
  );
}
