import { useState, useEffect } from "react";

/**
 * Splash inicial del portfolio.
 * Bloquea scroll temporalmente para asegurar una transición de entrada limpia.
 */
const Loader = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    // Bloquear scroll al entrar
    document.body.style.overflow = "hidden";

    // 1. Inicia salida a los 1.7s (para terminar a los 2.5s)
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1700);

    // 2. Desmonta el componente a los 2.5s
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "unset";
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
};

export default Loader;
