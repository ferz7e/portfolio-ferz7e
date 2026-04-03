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
      className="proyect"
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}>
      <div className="proyect__header">
        {project.websiteUrl ? (
          <a
            className="proyect__visit"
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir sitio web de ${project.title}`}
            onClick={(event) => event.stopPropagation()}>
            <GoArrowUpRight />
          </a>
        ) : (
          <span className="proyect__visit proyect__visit--disabled" aria-disabled="true" title="Demo privada">
            <GoArrowUpRight />
          </span>
        )}

        <div className="proyect__container--title">
          <p className="proyect__id">{project.id}</p>
          <h3 className="proyect__title">{project.title}</h3>
        </div>
      </div>

      <p className="proyect__subtitle">{project.subtitle}</p>

      <div className="proyect__container--stack">
        {project.stack.map((stackItem) => (
          <div key={stackItem} className="proyect__stack--item">
            {stackItem}
          </div>
        ))}
      </div>

      <div className="proyect__container--links">
        {project.githubUrl ? (
          <a
            className="proyect__link"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}>
            Github
            <span>
              <GoArrowUpRight />
            </span>
          </a>
        ) : (
          <span className="proyect__link proyect__link--disabled" aria-disabled="true">
            Github
            <span>
              <GoArrowUpRight />
            </span>
          </span>
        )}
      </div>

      {project.githubPrivacyNote ? <p className="proyect__privacy-note">{project.githubPrivacyNote}</p> : null}
    </article>
  );
}

export default ProjectCard;
