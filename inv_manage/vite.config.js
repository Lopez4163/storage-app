import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import mkcert from "vite-plugin-mkcert"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  scripts: {
    dev: "vite --port $npm_package_scripts_port",
    build: "tsc && vite build",
    preview: "vite preview",
  },

  server: {
    port: 3000,
    https: {
      key: "ssl/key.pem",
      cert: "ssl/cert.pem",
    },
  },

  optimizeDeps: {
    exclude: ["url", "buffer", "events", "stream"],
  },
})
