"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  // Store randomly selected videos once per page load
  const selectedVideosRef = useRef<{ desktop: string; mobile: string } | null>(null);

  useEffect(() => {
    // Randomly select videos once per page load
    if (!selectedVideosRef.current) {
      const desktopVideos = [
        "/video/broken-ear-hero-desktop-v1.mp4",
        "/video/broken-ear-hero-desktop-v2.mp4",
      ];
      const mobileVideos = [
        "/video/broken-ear-hero-mobile-v1.mp4",
        "/video/broken-ear-hero-mobile-v2.mp4",
      ];
      
      selectedVideosRef.current = {
        desktop: desktopVideos[Math.floor(Math.random() * desktopVideos.length)],
        mobile: mobileVideos[Math.floor(Math.random() * mobileVideos.length)],
      };
    }

    // Use matchMedia to detect viewport size (768px = Tailwind md breakpoint)
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    
    // Get video source based on viewport using pre-selected videos
    const getVideoSource = () => {
      return mediaQuery.matches
        ? selectedVideosRef.current!.desktop
        : selectedVideosRef.current!.mobile;
    };

    // Set initial source
    setVideoSrc(getVideoSource());

    // Listen for viewport changes
    const handleChange = () => {
      const newSrc = getVideoSource();
      setVideoSrc((prevSrc) => {
        // Only reload if source actually changed
        if (prevSrc !== newSrc && videoRef.current) {
          videoRef.current.load();
        }
        return newSrc;
      });
    };

    // Modern browsers support addEventListener on MediaQueryList
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Don't render video until we know which source to use
  if (!videoSrc) {
    return null;
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover border-0 outline-0 block"
      style={{ margin: 0, padding: 0, display: 'block' }}
    >
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
