import "./App.css";
import MainBackground from "./components/MainBackground";
import Loader from "./components/Loader";
import { GoArrowUpRight } from "react-icons/go";

// Componente principal de la aplicación
function App() {
  return (
    <div className="layout">
      <Loader />
      {/* ============================= */}
      {/* Footer - información de autor */}
      {/* ============================= */}
      <footer className="footer">
        <div className="footer__wrapper">
          <p className="footer__p">&copy; Fernando Zárate</p>
        </div>
      </footer>

      {/* ============================= */}
      {/* Main - Contenedor principal del contenido */}
      {/* ============================= */}
      <main className="main">
        {/* Background */}
        <MainBackground />
        {/* ----------------------------- */}
        {/* Sección izquierda - Hero + About */}
        {/* ----------------------------- */}
        <div className="main__container--left">
          {/* Hero - Nombre y subtítulo */}
          <div className="hero">
            <h1 className="name">
              <span className="name__initial">F</span>ernando <span className="name__initial">Z</span>árate
            </h1>
            <h2 className="subtitle">Frontend Developer</h2>
          </div>

          {/* About - Descripción personal y profesional */}
          <div className="about">
            <p className="about__p">
              <span className="highlight__initial">O</span>riginario de San Juan, Argentina, soy programador y músico. Para mí, un acorde o una línea de código representan lo mismo: un
              impulso de <span className="highlight">materializar</span> lo que antes no existía.
            </p>
            <p className="about__p">
              <span className="highlight__initial">P</span>ersigo el <span className="highlight">equilibrio</span> entre
              rigor y estética. Me enfoco en crear interfaces simples y memorables, priorizando la usabilidad y la
              eficiencia para reflejar la <span className="highlight">identidad</span> de cada producto.
            </p>
          </div>
        </div>

        {/* ----------------------------- */}
        {/* Sección derecha - Proyectos */}
        {/* ----------------------------- */}
        <div className="main__container--right">
          {/* Proyecto 1 */}
          <div className="proyect">
            <a className="proyect__a" href="https://www.unexoapp.com/" target="_blank" rel="noopener noreferrer">
              <div className="proyect__container">
                <p className="proyect__id">01.</p>
                <h3 className="proyect__title">Unexo</h3>
              </div>
              <p className="proyect__subtitle">Aplicación Web · Enero 2026 · Fullstack Developer</p>
            </a>
            <div className="proyect__containerLinks">
              <div className="proyect__containerLink">
                <a
                  className="proyect__link"
                  href="https://github.com/ferz7e/unexo-showcase"
                  target="_blank"
                  rel="noopener noreferrer">
                  Github
                </a>
                <GoArrowUpRight />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ============================= */}
      {/* Header - Barra de navegación */}
      {/* ============================= */}
      <header className="header">
        <div className="header__navbar">
          <a
            href="https://www.instagram.com/ferz7e"
            className="header__navbar--item"
            target="_blank"
            rel="noopener noreferrer">
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/ferz7e"
            className="header__navbar--item"
            target="_blank"
            rel="noopener noreferrer">
            Linkedin
          </a>
          <a
            href="https://github.com/ferz7e"
            className="header__navbar--item"
            target="_blank"
            rel="noopener noreferrer">
            Github
          </a>
          <a
            href="mailto:zaratefernandoanibal@gmail.com"
            className="header__navbar--item"
            target="_blank"
            rel="noopener noreferrer">
            Contacto
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
