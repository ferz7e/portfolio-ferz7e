/**
 * Modelo único de proyecto para cards y modal.
 * Centralizar este tipo evita desalineaciones entre vistas.
 */
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string[];
  highlights?: string[];
  stack: string[];
  websiteUrl?: string;
  githubUrl?: string;
  githubPrivacyNote?: string;
}
