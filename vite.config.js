import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    exclude: ["url", "buffer", "events", "stream"],
  },
  Server: {
    host: true,
    port: 5173,
  },
})
