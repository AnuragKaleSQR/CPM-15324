// components/StatusFilter.jsx
const StatusFilter = ({ value, onChange }) => {
  const options = ['All', 'Completed', 'Pending'];

  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-3 py-1 rounded-full text-sm font-medium border transition   ${
            value === option
              ? 'bg-[#00AB7D] hover:bg-[#00996d] text-white border-[#00ABE4]'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-[#e0f7ff]'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
