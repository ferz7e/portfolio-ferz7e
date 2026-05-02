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

    const previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const projectId = project.id.replace(/\W+/g, "-").toLowerCase();
  const titleId = `project-modal-title-${projectId}`;
  const descriptionId = `project-modal-description-${projectId}`;

  return (
    <div
      className="project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={onClose}>
      <div className="project-modal__content" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="project-modal__close project-link" aria-label="Cerrar detalle del proyecto" onClick={onClose}>
          Cerrar
          <span className="project-modal__action-icon" aria-hidden="true">
            <GoX />
          </span>
        </button>

        <p className="project-modal__id">{project.id}</p>
        <h3 id={titleId} className="project-modal__title">
          {project.title}
        </h3>
        <p className="project-modal__subtitle">{project.subtitle}</p>

        <div id={descriptionId} className="project-modal__description">
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
            <span key={`${project.id}-${stackItem}`} className="project-tag">
              {stackItem}
            </span>
          ))}
        </div>

        <div className="project-modal__actions">
          {project.websiteUrl ? (
            <a className="project-link" href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
              Ver proyecto
              <span aria-hidden="true">
                <GoArrowUpRight />
              </span>
            </a>
          ) : (
            <span className="project-link project-link--disabled" aria-disabled="true">
              Demo privada
              <span aria-hidden="true">
                <GoArrowUpRight />
              </span>
            </span>
          )}

          {project.githubUrl ? (
            <a className="project-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
              <span aria-hidden="true">
                <GoArrowUpRight />
              </span>
            </a>
          ) : (
            <span className="project-link project-link--disabled" aria-disabled="true">
              GitHub privado
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
