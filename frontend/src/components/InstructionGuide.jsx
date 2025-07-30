import { X } from 'lucide-react';

const InstructionGuide = ({ onClose }) => {
  const instructions = [
    "Is the query intelligible?",
    "Is the query info-seeking?",
    "Is the query ambiguous?",
    "Is the query time-sensitive?",
    "Is the query currently trending in the news?",
    "Does the query have harmful intent or ask about sensitive topics?",
    "When needed, perform an internet search to understand the query (don't paste verbatim).",
    "Do not evaluate queries in languages outside your locale.",
    "Short but clear queries like 'coffee', 'manga', 'Mars' are valid.",
    "Truncated or unclear queries like 'What's the' are unintelligible.",
    "Commands like 'Play music', 'Make a reservation' are not info-seeking.",
    "Action requests (e.g., setting reminders or opening apps) are not info-seeking.",
    "Evaluate based on available context, including interaction history and reference date.",
    "Trending queries must have news coverage in the last 7 days.",
    "Harmful queries include illegal, offensive, or biased content."
  ];

  return (
    <div className="fixed right-6 bottom-6 z-50 bg-white border border-gray-300 shadow-xl rounded-xl w-[360px] max-h-[500px] overflow-y-auto p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-800">Instruction Guide</h2>
        <X className="cursor-pointer text-gray-500 hover:text-red-500" onClick={onClose} />
      </div>
      <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
        {instructions.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default InstructionGuide;
