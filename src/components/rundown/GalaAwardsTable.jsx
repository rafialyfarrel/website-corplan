const GalaAwardsTable = ({ awards }) => {
  return (
    <>
      {/* Mobile Card Layout */}
      <div className="sm:hidden space-y-2">
        {Object.entries(awards).map(([category, data], index) => (
          <div
            key={index}
            className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50"
          >
            <p className="text-xs text-white font-medium mb-1">{category}</p>
            <p className="text-xs text-yellow-400">🏆 {data.winner}</p>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-white">
                Kategori
              </th>
              <th className="pb-2 text-xs sm:text-sm font-semibold text-white">
                Pemenang
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(awards).map(([category, data], index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-300 align-top">
                  {category}
                </td>
                <td className="py-2.5 text-xs sm:text-sm text-yellow-400">
                  🏆 {data.winner}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GalaAwardsTable;
