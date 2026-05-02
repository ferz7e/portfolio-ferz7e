import { GoArrowUpRight } from "react-icons/go";
import type { KeyboardEvent, MouseEvent } from "react";
import type { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

/**
 * Card interactiva de proyecto.
 * - Click en card: abre modal
 * - Click en enlaces internos: navega sin abrir modal
 */
function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const stopPropagation = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as Element;

    // Evita abrir modal cuando el usuario hace click en enlaces/botones internos.
    if (target.closest("a, button")) return;
    onOpenModal(project);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    onOpenModal(project);
  };

  return (
    <article
      className="project-card"
      role="button"
      tabIndex={0}
      aria-label={`Abrir detalle del proyecto ${project.title}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}>
      <div className="project-card__header">
        {project.websiteUrl ? (
          <a
            className="project-card__visit"
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir sitio web de ${project.title}`}
            onClick={stopPropagation}>
            <GoArrowUpRight />
          </a>
        ) : (
          <span className="project-card__visit project-card__visit--disabled" aria-disabled="true" title="Demo privada">
            <GoArrowUpRight />
          </span>
        )}

        <div className="project-card__title-group">
          <p className="project-card__id">{project.id}</p>
          <h3 className="project-card__title">{project.title}</h3>
        </div>
      </div>

      <p className="project-card__subtitle">{project.subtitle}</p>

      <div className="project-card__stack">
        {project.stack.map((stackItem) => (
          <span key={stackItem} className="project-tag">
            {stackItem}
          </span>
        ))}
      </div>

      <div className="project-card__links">
        {project.githubUrl ? (
          <a
            className="project-link"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stopPropagation}>
            GitHub
            <span>
              <GoArrowUpRight />
            </span>
          </a>
        ) : (
          <span className="project-link project-link--disabled" aria-disabled="true">
            GitHub
            <span>
              <GoArrowUpRight />
            </span>
          </span>
        )}
      </div>

      {project.githubPrivacyNote ? <p className="project-card__privacy-note">{project.githubPrivacyNote}</p> : null}
    </article>
  );
}

export default ProjectCard;
