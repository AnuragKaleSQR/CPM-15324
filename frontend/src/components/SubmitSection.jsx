import ConfirmationModal from "./ConfirmationModal";

const SubmitSection = ({ locked, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });


  const handleSubmitClick = () => {
    if (!locked) return;
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));

    setIsSubmitting(false);
    setNotification({
      message: '✅ Your answers have been submitted successfully!',
      type: 'success'
    });

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 5000);

    onSubmit();
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const clearNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={clearNotification}
      />

      {isSubmitting ? (
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00ABE4]"></div>
          <span className="text-[#00ABE4] font-semibold">Submitting...</span>
        </div>
      ) : (
        <>
          <button
            disabled={!locked}
            onClick={handleSubmitClick}
            className={`px-8 py-3 rounded-md text-white font-semibold text-lg transition-colors ${locked
                ? 'bg-[#00AB7D] hover:bg-[#0093c4]'
                : 'bg-gray-300 cursor-not-allowed'
              }`}
          >
            {locked ? 'Submit' : 'Complete All Responses to Submit'}
          </button>
          {!locked && (
            <p className="text-sm text-red-500 mt-2">
              Please answer all questions and lock your responses before submitting.
            </p>
          )}
        </>
      )}

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmSubmit}
        title="Confirm Submission"
        message="Confirm your answers and proceed to submit. Once submitted, you cannot make any changes."
      />
    </div>
  );
};


export default SubmitSection;