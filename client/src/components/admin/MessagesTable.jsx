import { FiMail, FiCheckCircle, FiTrash2 } from 'react-icons/fi';

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const MessagesTable = ({ messages, onMarkRead, onDelete }) => {
  if (messages.length === 0) {
    return <p className="text-sm text-ink/60 dark:text-mist/60">No messages yet.</p>;
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`card p-5 ${!msg.read ? 'border-signal/60' : ''}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {msg.read ? (
                  <FiCheckCircle className="text-ink/40 dark:text-mist/40 shrink-0" size={15} />
                ) : (
                  <FiMail className="text-signal shrink-0" size={15} />
                )}
                <h3 className="font-display font-semibold text-sm truncate">{msg.subject}</h3>
              </div>
              <p className="text-xs text-ink/60 dark:text-mist/60">
                {msg.name} &lt;{msg.email}&gt; · {formatDate(msg.createdAt)}
              </p>
              <p className="text-sm mt-3 text-ink/80 dark:text-mist/80 whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              {!msg.read && (
                <button
                  onClick={() => onMarkRead(msg)}
                  title="Mark as read"
                  className="hover:text-signal transition-colors"
                >
                  <FiCheckCircle size={16} />
                </button>
              )}
              <button
                onClick={() => onDelete(msg)}
                title="Delete message"
                className="hover:text-red-500 transition-colors"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesTable;
