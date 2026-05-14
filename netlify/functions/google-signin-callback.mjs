/**
 * Handles Google Sign-In redirect (POST with `credential` JWT).
 * Same HTML response as Vite dev middleware in vite.config.js.
 */
export const handler = async (event) => {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 302,
      headers: { Location: "/signin" },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
      body: "Method Not Allowed",
    };
  }

  const contentType =
    event.headers["content-type"] || event.headers["Content-Type"] || "";
  let credential = null;
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams(event.body || "");
    credential = params.get("credential");
  }

  const htmlMissing =
    '<!doctype html><meta charset="utf-8"><title>Sign in</title><p>Sign-in incomplete.</p><script>location.replace("/signin")</script>';

  if (!credential) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: htmlMissing,
    };
  }

  const embedded = JSON.stringify(credential);
  const body = `<!doctype html><meta charset="utf-8"><title>Redirecting…</title><script>
try { sessionStorage.setItem("gurudev_google_credential", ${embedded}); } catch (e) {}
location.replace("/signin");
</script>`;

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body,
  };
};
