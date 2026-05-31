import { useEffect } from "react";

/**
 * Warms DNS + TLS for the media host as soon as the URL is known (e.g. after
 * property fetch), so opening the launch modal hits a ready connection.
 */
export function usePreconnectMediaOrigin(url) {
  useEffect(() => {
    if (!url || typeof url !== "string") return;
    let origin;
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return;
      origin = parsed.origin;
    } catch {
      return;
    }

    const pre = document.createElement("link");
    pre.rel = "preconnect";
    pre.href = origin;

    const dns = document.createElement("link");
    dns.rel = "dns-prefetch";
    dns.href = origin;

    document.head.appendChild(pre);
    document.head.appendChild(dns);

    return () => {
      pre.remove();
      dns.remove();
    };
  }, [url]);
}
