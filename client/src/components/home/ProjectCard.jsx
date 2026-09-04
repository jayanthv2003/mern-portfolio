import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="card overflow-hidden flex flex-col group"
    >
      <div className="aspect-video bg-border-light dark:bg-border-dark overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-xs text-ink/40 dark:text-mist/40">
            No preview available
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-lg mb-2">{project.title}</h3>
        <p className="text-sm text-ink/70 dark:text-mist/70 mb-4 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies?.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] px-2 py-1 rounded border border-border-light dark:border-border-dark text-circuit"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm hover:text-signal transition-colors"
            >
              <FiGithub /> Code
            </a>
          )}
          {project.liveDemoLink && (
            <a
              href={project.liveDemoLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm hover:text-signal transition-colors"
            >
              <FiExternalLink /> Live demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
