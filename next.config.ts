import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  devIndicators: false,
  distDir: process.env.ALBEA_BUILD_DIR || ".next",
};

export default withNextIntl(nextConfig);
