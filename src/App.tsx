import { useState } from "react";
import "./App.css";
import MainBackground from "./components/MainBackground";
import Loader from "./components/Loader";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import { projects } from "./data/projects";
import type { Project } from "./types/project";

interface ProfileLink {
  href: string;
  label: string;
  download?: string;
}

const profileLinks: ProfileLink[] = [
  {
    href: "/software_dev_fernandozarate.pdf",
    label: "Curriculum",
    download: "Fernando_Zarate_CV.pdf",
  },
  {
    href: "https://www.linkedin.com/in/ferz7e",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/ferz7e",
    label: "GitHub",
  },
  {
    href: "mailto:zaratefernandoanibal@gmail.com",
    label: "Contacto",
  },
];

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
        <nav className="header__navbar" aria-label="Enlaces principales">
          {profileLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="header__navbar-item"
              download={link.download}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="main">
        <MainBackground />

        <section className="main__container main__container--left" aria-label="Presentacion">
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
        </section>

        <section className="main__container main__container--right" aria-label="Proyectos">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpenModal={setSelectedProject} />
          ))}
        </section>
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
