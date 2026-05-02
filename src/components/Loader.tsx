import { useEffect, useState } from "react";

const LOADER_FADE_DELAY_MS = 1700;
const LOADER_TOTAL_DURATION_MS = 2500;

/**
 * Splash inicial del portfolio.
 * Bloquea scroll temporalmente para asegurar una transición de entrada limpia.
 */
function Loader() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, LOADER_FADE_DELAY_MS);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = previousBodyOverflow;
    }, LOADER_TOTAL_DURATION_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`loader ${fadeOut ? "fade-out" : ""}`}>
      <div className="loader__container">
        <h1 className="loader__container--name">
          <span className="loader__name--initial">F</span>ernando <span className="loader__name--initial">Z</span>árate
        </h1>
        <p className="loader__container--subtitle">Software Developer</p>
      </div>
    </div>
  );
}

export default Loader;
