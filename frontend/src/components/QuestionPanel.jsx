
const QuestionsPanel = ({ answers, setAnswers, locked, setLocked }) => {
  const questions = [
    { id: 'intelligible', text: 'Is the query intelligible?' },
    { id: 'infoSeeking', text: 'Is the query info-seeking?' },
    { id: 'ambiguous', text: 'Is the query ambiguous?' },
    { id: 'timeSensitive', text: 'Is the query time sensitive?' },
    { id: 'trending', text: 'Is the query currently trending in the news?' },
    { id: 'harmful', text: 'Does the query have harmful intent or ask about sensitive topics?' }
  ];

  const handleAnswerChange = (questionId, field, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value
      }
    }));
  };

  const allAnswered = questions.every(q =>
    answers[q.id]?.answer && answers[q.id]?.remark?.trim()
  );

  const handleLockToggle = () => {
    if (!allAnswered && !locked) {
      alert('Please answer all questions before locking your responses.');
      return;
    }
    setLocked(!locked);
  };

  return (
    <div className="bg-white p-6 rounded shadow h-full flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="font-bold text-lg text-gray-800 bg-[#E9F1FA] p-3 rounded flex-1">
          Conversation History
        </h3>
        <button
          onClick={handleLockToggle}
          disabled={!allAnswered && !locked}
          className={`ml-4 px-4 py-2 rounded-md font-semibold transition-colors ${
            locked
              ? 'bg-red-500 text-white hover:bg-red-600'
              : allAnswered
              ? 'bg-[#00ABE4] text-white hover:bg-[#008ec2]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {locked ? 'Unlock' : 'Lock Answers'}
        </button>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-2">
        {questions.map((question) => (
          <div key={question.id} className="border-b pb-4">
            <p className="font-bold text-gray-800 mb-3">{question.text}</p>

            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <span className="text-red-500 font-bold">*</span>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`${question.id}_answer`}
                    value="yes"
                    checked={answers[question.id]?.answer === 'yes'}
                    onChange={(e) => handleAnswerChange(question.id, 'answer', e.target.value)}
                    disabled={locked}
                    className="text-[#00ABE4]"
                  />
                  <span className="font-semibold">Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`${question.id}_answer`}
                    value="no"
                    checked={answers[question.id]?.answer === 'no'}
                    onChange={(e) => handleAnswerChange(question.id, 'answer', e.target.value)}
                    disabled={locked}
                    className="text-[#00ABE4]"
                  />
                  <span className="font-semibold">No</span>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-red-500 font-bold">*</span>
                <span className="font-semibold text-gray-700">Remarks:</span>
                <input
                  type="text"
                  placeholder="Enter your remarks..."
                  value={answers[question.id]?.remark || ''}
                  onChange={(e) => handleAnswerChange(question.id, 'remark', e.target.value)}
                  disabled={locked}
                  className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00ABE4] disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPanel;
