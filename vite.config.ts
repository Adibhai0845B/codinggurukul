import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const port = Number(process.env.PORT || 5173);
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port,
  },
  preview: {
    host: "0.0.0.0",
    port,
  },
});