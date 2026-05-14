import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const coopHeader = {
  "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
};

/** GIS redirect mode POSTs here; store JWT in sessionStorage and return to /signin. */
function googleSignInCredentialPlugin() {
  const handler = (req, res, next) => {
    const path = (req.url || "").split("?")[0];
    if (req.method !== "POST" || path !== "/google-signin-callback") {
      next();
      return;
    }
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        const params = new URLSearchParams(raw);
        const credential = params.get("credential");
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.statusCode = 200;
        if (!credential) {
          res.end(
            '<!doctype html><meta charset="utf-8"><title>Sign in</title><p>Sign-in incomplete.</p><script>location.replace("/signin")</script>',
          );
          return;
        }
        const embedded = JSON.stringify(credential);
        res.end(
          `<!doctype html><meta charset="utf-8"><title>Redirecting…</title><script>
try { sessionStorage.setItem("gurudev_google_credential", ${embedded}); } catch (e) {}
location.replace("/signin");
</script>`,
        );
      } catch {
        res.statusCode = 500;
        res.end("Internal error");
      }
    });
  };

  return {
    name: "google-signin-credential-callback",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), googleSignInCredentialPlugin()],
  server: {
    headers: coopHeader,
  },
  preview: {
    headers: coopHeader,
  },
});
