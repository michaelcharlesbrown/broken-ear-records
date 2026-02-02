interface TrackOutboundClickParams {
  artist: string;
  platform: string;
  destination: string;
  eventId?: string;
}

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    fbq?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export function trackOutboundClick({
  artist,
  platform,
  destination,
  eventId,
}: TrackOutboundClickParams): void {
  const generatedEventId = eventId || `event_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

  const event = {
    eventId: generatedEventId,
    artist,
    platform,
    destination,
    timestamp: new Date().toISOString(),
  };

  console.log("Outbound click tracked:", event);

  // Fire GA4 event
  try {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click_outbound", {
        artist,
        platform,
        destination,
        event_id: generatedEventId,
      });
    }
  } catch (error) {
    // Silently fail in development or if GA is blocked
    if (process.env.NODE_ENV === "development") {
      console.warn("GA4 event failed to send:", error);
    }
  }

  // Fire Meta Pixel event
  try {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", "OutboundClick", {
        artist,
        platform,
        destination,
        event_id: generatedEventId,
      });
    }
  } catch (error) {
    // Silently fail in development or if Meta Pixel is blocked
    if (process.env.NODE_ENV === "development") {
      console.warn("Meta Pixel event failed to send:", error);
    }
  }

  // Fire Meta Conversions API event (non-blocking)
  if (typeof window !== "undefined") {
    // Get fbp cookie if available
    const fbpCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_fbp="))
      ?.split("=")[1];

    // Fire and forget - don't block navigation
    fetch("/api/meta/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_name: "OutboundClick",
        event_id: generatedEventId,
        custom_data: {
          artist,
          platform,
          destination,
        },
        fbp: fbpCookie || undefined,
      }),
    }).catch(() => {
      // Silently fail - don't block navigation or show errors
    });
  }
}
