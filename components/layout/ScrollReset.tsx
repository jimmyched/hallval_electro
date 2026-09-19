"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Start every new page at its intended destination, including localized routes. */
export function ScrollReset() {
  const pathname = usePathname();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const id = window.location.hash.slice(1);
      if (id) {
        document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  return null;
}
