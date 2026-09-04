import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const ProjectTable = ({ projects, onEdit, onDelete }) => {
  if (projects.length === 0) {
    return <p className="text-sm text-ink/60 dark:text-mist/60">No projects yet.</p>;
  }

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-border-light dark:border-border-dark font-mono text-xs uppercase text-ink/60 dark:text-mist/60">
            <th className="p-4">Title</th>
            <th className="p-4 hidden sm:table-cell">Technologies</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="border-b border-border-light dark:border-border-dark last:border-0">
              <td className="p-4 font-medium">{project.title}</td>
              <td className="p-4 hidden sm:table-cell text-ink/70 dark:text-mist/70">
                {project.technologies?.join(', ')}
              </td>
              <td className="p-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(project)}
                    aria-label={`Edit ${project.title}`}
                    className="hover:text-signal transition-colors"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(project)}
                    aria-label={`Delete ${project.title}`}
                    className="hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
