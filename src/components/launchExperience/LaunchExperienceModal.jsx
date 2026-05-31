import React, { useRef } from "react";
import LaunchExperienceViewer from "./LaunchExperienceViewer";

const LaunchExperienceModal = ({ onClose, view3durl, propertySlug, pageStyles }) => {
  const contentRef = useRef(null);

  const toggleFullscreen = () => {
    const el = contentRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
      return;
    }
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  };

  return (
    <div className={pageStyles.modal}>
      <div
        ref={contentRef}
        className={pageStyles.modalContent}
        style={{ display: "flex", flexDirection: "column", minHeight: 0 }}
      >
        <div className={pageStyles.modalHeader}>
          <button
            type="button"
            className={pageStyles.fullscreenButton}
            onClick={toggleFullscreen}
          >
            Fullscreen
          </button>
          <span
            className={pageStyles.closeButton}
            onClick={onClose}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClose();
              }
            }}
          >
            &times;
          </span>
        </div>

        <LaunchExperienceViewer
          view3durl={view3durl}
          propertySlug={propertySlug}
          onExit={onClose}
        />
      </div>
    </div>
  );
};

export default LaunchExperienceModal;
