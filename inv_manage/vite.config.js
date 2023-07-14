import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import mkcert from "vite-plugin-mkcert"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  scripts: {
    dev: "vite --host",
    build: "tsc && vite build",
    preview: "vite preview",
  },

  server: {
    host: "0.0.0.0.",
    https: {
      key: "ssl/key.pem",
      cert: "ssl/cert.pem",
    },
  },

  optimizeDeps: {
    exclude: ["url", "buffer", "events", "stream"],
  },
})
