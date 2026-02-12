import "./App.css";
import MainBackground from "./components/MainBackground";

// Componente principal de la aplicación
function App() {
  return (
    <div className="layout">
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
            <h2 className="subtitle">Developer & Designer</h2>
          </div>

          {/* About - Descripción personal y profesional */}
          <div className="about">
            <p className="about__p">
              <span className="highlight__initial">O</span>riginario de San Juan, Argentina, soy diseñador,
              desarrollador y músico. Para mí, un acorde, un trazo o una línea de código representan lo mismo: un
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
          <div className="proyect">
            <div className="proyect__container">
              <p className="proyect__id">01.</p>
              <h3 className="proyect__title">Unexo</h3>
            </div>
            <p className="proyect__subtitle">Enero 2026 · Fullstack Developer · Designer</p>
          </div>
        </div>
      </main>

      {/* ============================= */}
      {/* Header - Barra de navegación */}
      {/* ============================= */}
      <header className="header">
        <div className="header__navbar">
          <a href="https://ejemplo.com" className="header__navbar--item" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/fernandozaratedev/"
            className="header__navbar--item"
            target="_blank"
            rel="noopener noreferrer">
            Linkedin
          </a>
          <a href="https://ejemplo.com" className="header__navbar--item" target="_blank" rel="noopener noreferrer">
            Github
          </a>
          <a href="https://ejemplo.com" className="header__navbar--item" target="_blank" rel="noopener noreferrer">
            Contacto
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
