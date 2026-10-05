import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "/",

    server: {
      host: "::",
      port: 8080,
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
        },
      },
      hmr: {
        overlay: false,
      },
    },

    define: {
      "import.meta.env.VITE_EMAILJS_SERVICE_ID": JSON.stringify(env.VITE_EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID || ""),
      "import.meta.env.VITE_EMAILJS_TEMPLATE_ID": JSON.stringify(env.VITE_EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID || ""),
      "import.meta.env.VITE_EMAILJS_PUBLIC_KEY": JSON.stringify(env.VITE_EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY || ""),
    },

    plugins: [
      react(),
      mode === "development" ? componentTagger() : null,
    ].filter(Boolean),

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
