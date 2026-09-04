import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const CertificateTable = ({ certificates, onEdit, onDelete }) => {
  if (certificates.length === 0) {
    return <p className="text-sm text-ink/60 dark:text-mist/60">No certificates yet.</p>;
  }

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-border-light dark:border-border-dark font-mono text-xs uppercase text-ink/60 dark:text-mist/60">
            <th className="p-4">Title</th>
            <th className="p-4 hidden sm:table-cell">Issuer</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((cert) => (
            <tr key={cert._id} className="border-b border-border-light dark:border-border-dark last:border-0">
              <td className="p-4 font-medium">{cert.title}</td>
              <td className="p-4 hidden sm:table-cell text-ink/70 dark:text-mist/70">{cert.issuer}</td>
              <td className="p-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(cert)}
                    aria-label={`Edit ${cert.title}`}
                    className="hover:text-signal transition-colors"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(cert)}
                    aria-label={`Delete ${cert.title}`}
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

export default CertificateTable;
