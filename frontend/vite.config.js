import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        // Docker backend service name
        target: process.env.DOCKER_ENV === "true"
          ? "http://backend-service:5000"
          : "http://localhost:5000",

        changeOrigin: true,
        secure: false
      }
    }
  }
});
