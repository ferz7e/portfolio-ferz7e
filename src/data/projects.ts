import type { Project } from "../types/project";

/**
 * Fuente de verdad para contenido de proyectos.
 * Mantener el copy aislado simplifica ediciones de portfolio sin tocar lógica de UI.
 */
export const projects: Project[] = [
  {
    id: "01.",
    title: "Unexo",
    subtitle: "Aplicación Web · Enero 2026",
    websiteUrl: "https://www.unexoapp.com/",
    githubUrl: "https://github.com/ferz7e/unexo-showcase",
    stack: ["TypeScript", "Tailwind", "React", "ChakraUI", "Node.js", "Express", "PrismaORM", "PostgreSQL"],
    description: [
      "Unexo es una plataforma social académica pensada para estudiantes universitarios (inicialmente orientada a la UNSJ) que centraliza material de estudio validado por la comunidad y lo organiza por facultad, carrera, año y materia.",
      "Nace para resolver un problema muy común: el conocimiento académico está fragmentado en grupos cerrados, cuesta encontrar material confiable y no existe una identidad académica digital clara para cada estudiante.",
      "En esta etapa, la app integra un sistema completo de autenticación y verificación por email, gestión de contribuciones (crear, editar, eliminar, aprobar/suspender), moderación por reportes y strikes, reputación con NexoPoints, guardados/likes/descargas, notificaciones, paneles con filtros por rol (user/admin/founder), estadísticas de plataforma, datos estáticos académicos y monetización con donaciones (alias CBU / Cafecito).",
      "También incluye un sistema de anuncios con contratos, tracking de clicks y jobs automáticos (limpieza de datos, avisos de vencimiento y expiración de contratos). Todo está desarrollado con arquitectura modular en capas (Controller -> Service -> Repository), Node.js + TypeScript + Express + Prisma + PostgreSQL, con enfoque en escalabilidad, seguridad y mantenibilidad.",
    ],
    highlights: [
      "Auth con sesión, verificación por correo y recuperación de contraseña.",
      "Contribuciones académicas con validaciones fuertes (incluye links de Drive/Docs).",
      "Filtros académicos en cascada (facultad/carrera/año/materia/tipo).",
      "Sistema de reputación (NexoPoints) con reglas de incentivos y penalizaciones.",
      "Moderación: reportes, estados de contribución, strikes y baneo de emails.",
      "Roles y permisos (user, admin, founder) con auditoría por logs.",
      "Notificaciones in-app y métricas para usuario y founder.",
      "Monetización de perfil (datos de donación) + módulo de ads con contratos y automatizaciones.",
    ],
  },
  {
    id: "02-I.",
    title: "Erco",
    subtitle: "Web site · Marzo 2026",
    websiteUrl: "https://erco-website.vercel.app/",
    stack: ["TypeScript", "Tailwind", "React"],
    githubPrivacyNote: "Repositorio privado por acuerdo de confidencialidad con el cliente.",
    description: [
      "Erco Website es un sitio corporativo frontend orientado a conversión para una empresa de seguridad privada en San Juan.",
      "El proyecto combina landing page one-page, rutas legales y formulario de postulación laboral, con foco en comunicación clara de servicios, confianza de marca y contacto rápido.",
      "La experiencia incluye navegación por secciones con scroll a hash, diseño responsive, animaciones de entrada con Motion, loader inicial de marca, bloques visuales para propuesta tecnológica y CTA directas a presupuesto, WhatsApp y app.",
      "Además, incorpora una página 'Trabaja con nosotros' conectada a backend, con validaciones de formulario, manejo de errores de negocio (email duplicado, link privado de Drive), estados de carga y feedback con toast.",
      "Está desarrollado con React 19 + TypeScript + Vite + Tailwind CSS v4, arquitectura por componentes reutilizables (layout, secciones, UI) y énfasis en mantenibilidad visual.",
    ],
    highlights: [
      "Landing modular con secciones: Hero, About, Services, Technology e Industries.",
      "Navbar fija con menú mobile, navegación por anclas y scroll suave.",
      "Hero con efecto typewriter, métricas de confianza y bloque visual de app.",
      "Servicios con íconos SVG custom animados (CCTV, geolocalización, energía, vigilancia).",
      "Sección Technology con capturas responsive desktop/mobile y CTA de descarga/acceso web.",
      "Formulario 'Trabaja con nosotros' con validación robusta de campos y envío a POST /applicants.",
      "Manejo de errores de API con mensajes específicos más estados de loading/toast.",
      "Páginas legales (/terms, /privacy), vista NotFound, footer con contacto, redes y mapa embebido.",
      "Loader inicial de marca con bloqueo temporal de scroll para una entrada más pulida.",
      "Base de diseño consistente con componentes reutilizables (Button, Heading, LinkA, Toast, etc.).",
    ],
  },
  {
    id: "02-II.",
    title: "Erco",
    subtitle: "Sistema de gestión interno + Capa externa para clientes · Abril 2026",
    stack: ["TypeScript", "Tailwind", "React", "Node.js", "Nest.js", "PrismaORM", "PostgreSQL"],
    githubPrivacyNote: "Repositorio privado por acuerdo de confidencialidad con el cliente.",
    description: [
      "Erco App es una plataforma backend para gestión operativa de una empresa de seguridad privada. Centraliza en un solo sistema la administración de clientes, servicios contratados, objetivos de vigilancia, guardias, planificación semanal de turnos y control de asistencia.",
      "Resuelve una operación fragmentada: antes la planificación y seguimiento se hacía entre planillas, mensajes y procesos manuales; ahora todo el ciclo operativo queda trazable, con reglas de negocio claras, validaciones por rol y datos consistentes para toma de decisiones.",
      "La arquitectura está orientada por features y capas (Controller -> Service -> Repository), construida con NestJS + TypeScript + Prisma + PostgreSQL, con foco en mantenibilidad, seguridad y escalabilidad.",
      "Problema que soluciona: evita la dispersión operativa de turnos, asignaciones, ausencias, novedades, sanciones y liquidación en herramientas separadas; reduce errores de asignación (solapamientos, género requerido, indisponibilidades, francos y cobertura incompleta); y aporta trazabilidad real con soft delete, auditoría temporal y estados operativos por semana.",
    ],
    highlights: [
      "Autenticación y sesión: login, refresh, logout, me, setup de contraseña y confirmación de cambio de email.",
      "Gestión de cuentas y servicios: alta/edición/baja lógica de cuentas cliente y vinculación de servicios contratados.",
      "Gestión de personal: ABM de guardias, cambio de email y catálogo de opciones para asignación.",
      "Reclutamiento: registro y gestión de postulantes con estados del pipeline.",
      "Objetivos de vigilancia: ABM de objetivos, plantillas semanales y plantillas de turnos por objetivo.",
      "Planificación semanal: WorkWeek con ciclo DRAFT -> PUBLISHED -> CLOSED y control de semana actual/siguiente.",
      "Turnos y cobertura: creación de shifts/slots, asignación manual y autoasignación con algoritmo de balanceo.",
      "Reglas operativas: género requerido, bloqueos por francos/indisponibilidades y prevención de solapamientos.",
      "Asistencia: creación transaccional de Attendance con ShiftAssignment y cambio manual de estados.",
      "Francos e indisponibilidades: gestión semanal manual y reglas recurrentes o por fecha específica.",
      "Operación y control: historial de warnings disciplinarios y estadísticas por guardia.",
      "Liquidaciones: endpoint de preview mensual basado en semanas cerradas y asistencia real.",
    ],
  },
];
