const Notification = ({ message, type = 'error', onClose }) => {
  if (!message) return null;
  
  const getNotificationStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      default:
        return 'bg-red-100 border-red-400 text-red-700';
    }
  };

  return (
    <div className={`${getNotificationStyles()} px-4 py-3 rounded relative text-center text-sm border mb-4 flex items-center justify-between`}>
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-current hover:opacity-70"
        >
          <FaTimes size={12} />
        </button>
      )}
    </div>
  );
};

export default Notification;