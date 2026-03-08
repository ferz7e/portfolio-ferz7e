import "./App.css";
import MainBackground from "./components/MainBackground";
import Loader from "./components/Loader";
import { GoArrowUpRight } from "react-icons/go";

// Componente principal de la aplicación
function App() {
  return (
    <div className="layout">
      <Loader />
      <header className="header">
        <div className="header__navbar">
          <a href="/software_dev_fernandozarate.pdf" download="Fernando_Zarate_CV.pdf" className="header__navbar--item">
            Curriculum
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
            <h2 className="subtitle">Software Developer</h2>
          </div>

          {/* About - Descripción personal y cprofesional */}
          <div className="about">
            <p className="about__p">
              Soy Fernando Zárate, Software Developer especializado en desarrollo web, software a medida e inteligencia
              artificial. Ayudo a empresas y emprendedores a transformar sus ideas en soluciones digitales modernas y
              eficientes, desarrollando sitios web, aplicaciones y sistemas personalizados, además de implementar
              automatizaciones con IA que optimizan procesos y aumentan la productividad.
            </p>
          </div>
          {/* Stats - Estadisticas */}
          <div className="stats">
            <div className="stat">
              <span className="stat__title">Webs</span>
              <span className="stat__number">+6</span>
            </div>
            <div className="stat">
              <span className="stat__title">Clientes</span>
              <span className="stat__number">+3</span>
            </div>
            <div className="stat">
              <span className="stat__title">Software</span>
              <span className="stat__number">+1</span>
            </div>
            <div className="stat">
              <span className="stat__title">Automatizaciones</span>
              <span className="stat__number">+3</span>
            </div>
          </div>
        </div>

        {/* ----------------------------- */}
        {/* Sección derecha - Proyectos */}
        {/* ----------------------------- */}
        <div className="main__container--right">
          {/* Proyecto 1 */}
          <a
            className="proyect card card__hover"
            href="https://www.unexoapp.com/"
            target="_blank"
            rel="noopener noreferrer">
            {/* contenedor de title */}
            <div className="proyect__container--title">
              <p className="proyect__id">01.</p>
              <h3 className="proyect__title">Unexo</h3>
            </div>
            {/* subtitulo */}
            <p className="proyect__subtitle">Aplicación Web · Enero 2026</p>
            {/* contenedor de stack */}
            <div className="proyect__container--stack">
              <div className="proyect__stack--item">TypeScript</div>
              <div className="proyect__stack--item">Tailwind</div>
              <div className="proyect__stack--item">React</div>
              <div className="proyect__stack--item">ChakraUI</div>
              <div className="proyect__stack--item">Node.js</div>
              <div className="proyect__stack--item">Express</div>
              <div className="proyect__stack--item">PrismaORM</div>
              <div className="proyect__stack--item">PostgreSQL</div>
            </div>
            {/* contenedor de links */}
            <div className="proyect__container--links">
              <a
                className="proyect__link"
                href="https://github.com/ferz7e/unexo-showcase"
                target="_blank"
                rel="noopener noreferrer">
                Github
                <span>
                  <GoArrowUpRight />
                </span>
              </a>
            </div>
          </a>
          {/* Proyecto 2 */}
          <a
            className="proyect card card__hover"
            href="https://erco-website.vercel.app/"
            target="_blank"
            rel="noopener noreferrer">
            {/* contenedor de title */}
            <div className="proyect__container--title">
              <p className="proyect__id">02 - I .</p>
              <h3 className="proyect__title">Erco </h3>
            </div>
            {/* subtitulo */}
            <p className="proyect__subtitle">Web site · Marzo 2026</p>
            {/* contenedor de stack */}
            <div className="proyect__container--stack">
              <div className="proyect__stack--item">TypeScript</div>
              <div className="proyect__stack--item">Tailwind</div>
              <div className="proyect__stack--item">React</div>
            </div>
            {/* contenedor de links */}
            <div className="proyect__container--links">
              <a className="proyect__link" href="/" target="_blank" rel="noopener noreferrer">
                Github
                <span>
                  <GoArrowUpRight />
                </span>
              </a>
            </div>
          </a>
        </div>
      </main>
      {/* ============================= */}
      {/* Footer - información de autor */}
      {/* ============================= */}
      <footer className="footer">
        <div className="footer__wrapper">
          <p className="footer__p">&copy; Fernando Zárate</p>
        </div>
      </footer>

      {/* ============================= */}
      {/* Header - Barra de navegación */}
      {/* ============================= */}
    </div>
  );
}

export default App;
