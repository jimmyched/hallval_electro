"use client";

import { forwardRef, type ComponentProps } from "react";
import { Link as LocaleLink } from "@/i18n/base-navigation";
import { themedHref } from "@/lib/theme";
import { useTheme } from "./ThemeProvider";

export const ThemeLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof LocaleLink>>(
  function ThemeLink({ href, ...props }, ref) {
    const theme = useTheme();
    let destination = href;
    if (typeof href === "string") {
      destination = themedHref(href, theme);
    } else if (theme !== "default" && !href.protocol && !href.host && href.pathname?.startsWith("/") && !href.pathname.startsWith("//")) {
      const query = new URLSearchParams(
        typeof href.query === "string" ? href.query : undefined,
      );
      if (typeof href.query === "object" && href.query !== null) {
        for (const [key, value] of Object.entries(href.query)) {
          for (const item of Array.isArray(value) ? value : [value]) {
            if (item != null) query.append(key, String(item));
          }
        }
      }
      if (!query.has("theme")) query.set("theme", theme);
      destination = { ...href, query: query.toString() };
    }
    return <LocaleLink ref={ref} href={destination} {...props} />;
  },
);
