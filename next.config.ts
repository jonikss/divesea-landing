import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  sassOptions: {
    prependData: `@use "@/app/styles/variables" as variables; @use "@/app/styles/mixins" as mixins;`,
  },
};

export default nextConfig;
