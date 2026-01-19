const TeamAccordion = ({ teamKey, members, isOpen, onToggle }) => {
  return (
    <div className="rounded-lg border border-gray-700/50 bg-gray-800/30 overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-3 sm:px-4 py-3 hover:bg-gray-800/50 transition-colors"
      >
        <div className="text-left">
          <p className="text-xs sm:text-sm font-semibold text-white">
            {teamKey}
          </p>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
            {members.length} member{members.length !== 1 ? "s" : ""}
          </p>
        </div>

        <span
          className={`text-gray-400 text-xs sm:text-sm transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
          <div className="pt-2 border-t border-gray-700/50">
            {/* Mobile: list */}
            <ul className="sm:hidden mt-2 space-y-1">
              {members.map((m, i) => (
                <li key={i} className="text-xs text-gray-200">
                  {i + 1}. {m}
                </li>
              ))}
            </ul>

            {/* Desktop: 2-column grid */}
            <div className="hidden sm:grid mt-3 grid-cols-2 gap-x-6 gap-y-2">
              {members.map((m, i) => (
                <div key={i} className="text-xs sm:text-sm text-gray-200">
                  <span className="text-gray-500 mr-2">{i + 1}.</span>
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamAccordion;
