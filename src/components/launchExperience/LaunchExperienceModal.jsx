import React, { useEffect, useRef } from "react";
import LaunchExperienceViewer from "./LaunchExperienceViewer";
import useIsMobile from "../../hooks/useIsMobile";

const enterFullscreen = (el) => {
  if (!el) return Promise.reject();
  const fn =
    el.requestFullscreen ||
    el.webkitRequestFullscreen ||
    el.msRequestFullscreen;
  if (!fn) return Promise.reject();
  try {
    return Promise.resolve(fn.call(el));
  } catch (e) {
    return Promise.reject(e);
  }
};

const LaunchExperienceModal = ({ onClose, view3durl, propertySlug, pageStyles }) => {
  const contentRef = useRef(null);
  const isMobile = useIsMobile(768);

  const toggleFullscreen = () => {
    const el = contentRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
      return;
    }
    enterFullscreen(el).catch(() => {});
  };

  // On mobile, present the launch experience full-screen AND landscape.
  // Strategy that always lands on landscape without the two fighting:
  //  - Try native fullscreen, then lock the device to landscape (Android Chrome).
  //    A real orientation change makes the portrait media query stop matching, so
  //    the CSS rotation switches off and the player fills the screen natively.
  //  - If fullscreen or the orientation lock isn't available/allowed (e.g. iOS),
  //    leave/exit fullscreen so the CSS rotation handles landscape instead.
  //    (Native fullscreen resets transforms, which would otherwise kill the
  //    rotation and leave it stuck portrait.)
  useEffect(() => {
    if (!isMobile) return undefined;
    let active = true;

    (async () => {
      const lockFn = window.screen?.orientation?.lock;
      try {
        await enterFullscreen(contentRef.current);
        if (lockFn) {
          await lockFn.call(window.screen.orientation, "landscape");
        } else if (active && document.fullscreenElement) {
          // Fullscreen worked but we can't lock to landscape — drop fullscreen
          // so the CSS rotation can take over instead of being reset to portrait.
          document.exitFullscreen?.();
        }
      } catch (e) {
        if (active && document.fullscreenElement) document.exitFullscreen?.();
      }
    })();

    return () => {
      active = false;
      try {
        window.screen?.orientation?.unlock?.();
      } catch (e) {
        /* no-op */
      }
      if (document.fullscreenElement) document.exitFullscreen?.();
    };
  }, [isMobile]);

  return (
    <div className={pageStyles.modal}>
      <div
        ref={contentRef}
        className={pageStyles.modalContent}
        style={{ display: "flex", flexDirection: "column", minHeight: 0 }}
      >
        <div className={pageStyles.modalHeader}>
          {!isMobile && (
            <button
              type="button"
              className={pageStyles.fullscreenButton}
              onClick={toggleFullscreen}
            >
              Fullscreen
            </button>
          )}
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
