import React, { useEffect, useRef } from "react";
import styles from "./LaunchExperienceViewer.module.css";

const VideoPlayer = ({ src, className = "" }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    video.load();
    video.play().catch(() => {});
  }, [src]);

  if (!src) return null;

  return (
    <video
      ref={videoRef}
      src={src}
      className={`${styles.video} ${className}`}
      autoPlay
      loop
      muted
      playsInline
    />
  );
};

export default VideoPlayer;
