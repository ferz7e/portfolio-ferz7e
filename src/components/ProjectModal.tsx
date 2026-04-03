import { useEffect } from "react";
import { GoArrowUpRight, GoX } from "react-icons/go";
import type { Project } from "../types/project";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

/**
 * Modal de detalle de proyecto.
 * Se cierra con click en overlay, botón cerrar o tecla Escape.
 */
function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={onClose}>
      <div className="project-modal__content" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="project-modal__close proyect__link" onClick={onClose}>
          Cerrar
          <span className="project-modal__action-icon" aria-hidden="true">
            <GoX />
          </span>
        </button>

        <p className="project-modal__id">{project.id}</p>
        <h3 id="project-modal-title" className="project-modal__title">
          {project.title}
        </h3>
        <p className="project-modal__subtitle">{project.subtitle}</p>

        <div className="project-modal__description">
          {project.description.map((paragraph, index) => (
            <p key={`${project.id}-${index}`}>{paragraph}</p>
          ))}
        </div>

        {project.highlights?.length ? (
          <div className="project-modal__highlights">
            <p className="project-modal__section-title">Features clave</p>
            <ul className="project-modal__highlights-list">
              {project.highlights.map((feature) => (
                <li key={`${project.id}-${feature}`}>{feature}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="project-modal__stack">
          {project.stack.map((stackItem) => (
            <span key={`${project.id}-${stackItem}`} className="proyect__stack--item">
              {stackItem}
            </span>
          ))}
        </div>

        <div className="project-modal__actions">
          {project.websiteUrl ? (
            <a className="proyect__link" href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
              Ver proyecto
              <span aria-hidden="true">
                <GoArrowUpRight />
              </span>
            </a>
          ) : (
            <a className="proyect__link" href="/">
              Ver proyecto
              <span aria-hidden="true">
                <GoArrowUpRight />
              </span>
            </a>
          )}

          {project.githubUrl ? (
            <a className="proyect__link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              Github
              <span aria-hidden="true">
                <GoArrowUpRight />
              </span>
            </a>
          ) : (
            <span className="proyect__link proyect__link--disabled" aria-disabled="true">
              Github privado
              <span aria-hidden="true">
                <GoArrowUpRight />
              </span>
            </span>
          )}
        </div>

        {project.githubPrivacyNote ? <p className="project-modal__privacy-note">{project.githubPrivacyNote}</p> : null}
      </div>
    </div>
  );
}

export default ProjectModal;
