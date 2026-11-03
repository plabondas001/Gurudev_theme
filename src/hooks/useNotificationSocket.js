import { useEffect, useRef, useState } from "react";

// Server closes with 4003 when the token is missing/expired or belongs to another user
const AUTH_REJECTED = 4003;

function wsBaseUrl() {
  const explicit = import.meta.env.VITE_WS_URL;
  if (explicit) return explicit.trim();
  // e.g. https://shop.com/api -> wss://shop.com (Nginx routes /ws/ to the WebSocket server)
  const api = new URL(import.meta.env.VITE_API_BASE_URL || window.location.origin, window.location.origin);
  return `${api.protocol === "https:" ? "wss:" : "ws:"}//${api.host}`;
}

function userIdFromToken(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload)).user_id ?? null;
  } catch {
    return null;
  }
}

/**
 * Live notifications for the logged-in customer over ws/notifications/<user_id>/.
 * @param {() => string|null} getToken - returns the current access token (null when logged out)
 * @param {(notification: object) => void} onNotification
 */
export default function useNotificationSocket(getToken, onNotification) {
  const [isConnected, setIsConnected] = useState(false);
  const onNotificationRef = useRef(onNotification);

  useEffect(() => {
    onNotificationRef.current = onNotification;
  });

  useEffect(() => {
    if (!getToken) return;

    let socket = null;
    let retryTimer = null;
    let attempts = 0;
    let closed = false;

    const connect = () => {
      if (closed) return;
      // Read the token on every attempt so reconnects use a refreshed one
      const token = getToken();
      const userId = token && userIdFromToken(token);
      if (!userId) return;

      const url = `${wsBaseUrl()}/ws/notifications/${userId}/`
        .replace(/([^:])\/\//g, "$1/")
        .replace("/ws/ws/", "/ws/");
      socket = new WebSocket(`${url}?token=${token}`);

      socket.onopen = () => {
        attempts = 0;
        setIsConnected(true);
      };
      socket.onmessage = (event) => {
        try {
          onNotificationRef.current?.(JSON.parse(event.data));
        } catch {
          /* ignore malformed frames */
        }
      };
      socket.onclose = (event) => {
        setIsConnected(false);
        if (closed || event.code === 1000) return;
        // Back off longer after an auth rejection; the token may be refreshed meanwhile
        const base = event.code === AUTH_REJECTED ? 15000 : 1000;
        retryTimer = setTimeout(connect, Math.min(base * 2 ** attempts++, 60000));
      };
    };

    connect();

    return () => {
      closed = true;
      clearTimeout(retryTimer);
      socket?.close(1000);
    };
  }, [getToken]);

  return { isConnected };
}
