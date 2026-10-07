import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro({
      preset: process.env.NITRO_PRESET || (process.env.VERCEL ? "vercel" : "vercel"),
    }),
    viteReact(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@radix-ui/react-dialog",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "lucide-react",
      "tailwind-merge",
    ],
  },
  server: {
    host: "::",
    port: 8080,
  },
});
