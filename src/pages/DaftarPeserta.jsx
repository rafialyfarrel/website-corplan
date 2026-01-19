import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedTitle from "../components/AnimatedTitle";
import participantsData from "../../participants.json";

function Participants({ embedded = false }) {
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [branches, setBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = embedded ? 8 : 10;

  useEffect(() => {
    // Extract unique branches
    const uniqueBranches = [
      "All",
      ...new Set(participantsData.map((p) => p.Cabang)),
    ];
    setBranches(uniqueBranches);
    setFilteredParticipants(participantsData);
  }, []);

  useEffect(() => {
    // Filter participants based on selected branch
    if (selectedBranch === "All") {
      setFilteredParticipants(participantsData);
    } else {
      setFilteredParticipants(
        participantsData.filter((p) => p.Cabang === selectedBranch)
      );
    }
    // Reset to first page when filter changes
    setCurrentPage(1);
  }, [selectedBranch]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentParticipants = filteredParticipants.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const content = (
    <div className={`bg-black text-white ${embedded ? 'py-8 sm:py-12' : 'min-h-screen pt-16 pb-16'}`}>
      {/* Hero Section */}
      <div className={`container mx-auto px-4 ${embedded ? 'mb-6 sm:mb-8' : 'mb-12'}`}>
        <AnimatedTitle
          title="Participants"
          containerClass={embedded ? "!text-3xl sm:!text-5xl md:!text-6xl" : ""}
        />
        <p className={`text-center text-gray-400 mt-2 sm:mt-4 ${embedded ? 'text-xs sm:text-sm' : 'text-lg'}`}>
          Complete list of participants for KJPP RHR Corporate Planning 2026
        </p>
      </div>

      {/* Branch Filter */}
      <div className={`container mx-auto px-4 ${embedded ? 'mb-4 sm:mb-6' : 'mb-8'}`}>
        <p className="text-gray-300 mb-2 sm:mb-3 text-xs sm:text-sm">Filter by Branch:</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {branches.map((branch) => (
            <button
              key={branch}
              onClick={() => setSelectedBranch(branch)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm font-light tracking-wider transition-all duration-300 ${
                selectedBranch === branch
                  ? "text-black"
                  : "bg-transparent text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-300"
              }`}
              style={
                selectedBranch === branch
                  ? { backgroundColor: "#72b851" }
                  : {}
              }
            >
              {branch}
            </button>
          ))}
        </div>
      </div>

      {/* Participants Count */}
      <div className={`container mx-auto px-4 ${embedded ? 'mb-3 sm:mb-4' : 'mb-6'}`}>
        <p className="text-gray-400 text-xs sm:text-sm">
          Showing {startIndex + 1}-
          {Math.min(endIndex, filteredParticipants.length)} of{" "}
          {filteredParticipants.length} participant
          {filteredParticipants.length !== 1 ? "s" : ""}
          {selectedBranch !== "All" &&
            ` from kantor cabang ${selectedBranch}`}
        </p>
      </div>

      {/* Participants - Mobile Card Layout */}
      <div className="sm:hidden container mx-auto px-4">
        <div className="space-y-2">
          {currentParticipants.map((participant, index) => (
            <div
              key={index}
              className="bg-gray-900/50 rounded-lg p-3 border border-gray-800"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{participant.Nama}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{participant.Cabang}</p>
                </div>
                <span className="text-gray-600 text-xs">#{startIndex + index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Participants Table - Desktop */}
      <div className="hidden sm:block container mx-auto px-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className={`text-left ${embedded ? 'py-2 px-2 sm:py-3 sm:px-3' : 'py-4 px-4'} text-gray-400 font-light tracking-wider text-xs sm:text-sm`}>
                  No
                </th>
                <th className={`text-left ${embedded ? 'py-2 px-2 sm:py-3 sm:px-3' : 'py-4 px-4'} text-gray-400 font-light tracking-wider text-xs sm:text-sm`}>
                  Name
                </th>
                <th className={`text-left ${embedded ? 'py-2 px-2 sm:py-3 sm:px-3' : 'py-4 px-4'} text-gray-400 font-light tracking-wider text-xs sm:text-sm`}>
                  Branch
                </th>
              </tr>
            </thead>
            <tbody>
              {currentParticipants.map((participant, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-900 hover:bg-gray-900/30 transition-colors"
                >
                  <td className={`${embedded ? 'py-2 px-2 sm:py-2.5 sm:px-3' : 'py-4 px-4'} text-gray-300 text-xs sm:text-sm`}>
                    {startIndex + index + 1}
                  </td>
                  <td className={`${embedded ? 'py-2 px-2 sm:py-2.5 sm:px-3' : 'py-4 px-4'} text-white text-xs sm:text-sm`}>{participant.Nama}</td>
                  <td className={`${embedded ? 'py-2 px-2 sm:py-2.5 sm:px-3' : 'py-4 px-4'} text-gray-400 text-xs sm:text-sm`}>
                    {participant.Cabang}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Results */}
      {filteredParticipants.length === 0 && (
        <div className="container mx-auto px-4">
          <div className={`text-center ${embedded ? 'py-8' : 'py-12'}`}>
            <p className="text-gray-500 text-sm">
              No participants found for the selected branch
            </p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredParticipants.length > 0 && (
        <div className={`container mx-auto px-4 flex justify-center items-center gap-1 sm:gap-2 ${embedded ? 'mt-4 sm:mt-6' : 'mt-8'}`}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded text-xs sm:text-sm transition-all ${
              currentPage === 1
                ? "bg-gray-900 text-gray-600 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            Prev
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() =>
                typeof page === "number" && setCurrentPage(page)
              }
              disabled={page === "..."}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded text-xs sm:text-sm transition-all ${
                page === currentPage
                  ? "bg-white text-black"
                  : page === "..."
                    ? "bg-transparent text-gray-600 cursor-default"
                    : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded text-xs sm:text-sm transition-all ${
              currentPage === totalPages
                ? "bg-gray-900 text-gray-600 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <>
      <NavBar />
      {content}
    </>
  );
}

export default Participants;
