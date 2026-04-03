import { useState } from "react";
import "./App.css";
import MainBackground from "./components/MainBackground";
import Loader from "./components/Loader";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import { projects } from "./data/projects";
import type { Project } from "./types/project";

/**
 * Componente raíz de la interfaz pública del portfolio.
 * Gestiona la estructura general y el estado del modal de proyectos.
 */
function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

      <main className="main">
        <MainBackground />

        <div className="main__container--left">
          <div className="hero">
            <h1 className="name">
              <span className="name__initial">F</span>ernando <span className="name__initial">Z</span>árate
            </h1>
            <h2 className="subtitle">Software Developer</h2>
          </div>

          <div className="about">
            <p className="about__p">
              Soy Fernando Zárate, Software Developer especializado en desarrollo web, software a medida e inteligencia
              artificial.
            </p>
            <p className="about__p">
              Ayudo a empresas y emprendedores a convertir ideas en productos digitales modernos, claros y escalables.
            </p>
            <p className="about__p">
              Desarrollo sitios web, aplicaciones y sistemas personalizados, e implemento automatizaciones con IA para
              optimizar procesos y aumentar la productividad de los negocios de mis clientes.
            </p>
          </div>
        </div>

        <div className="main__container--right">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpenModal={setSelectedProject} />
          ))}
        </div>
      </main>

      <ProjectModal
        isOpen={selectedProject !== null}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <footer className="footer">
        <div className="footer__wrapper">
          <p className="footer__p">&copy; Fernando Zárate</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
