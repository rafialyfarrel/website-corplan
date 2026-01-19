import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedTitle from "../components/AnimatedTitle";
import participantsData from "../../participants.json";

function Participants() {
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [branches, setBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-black text-white pt-20 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-12">
          <AnimatedTitle title="Participants" />
          <p className="text-center text-gray-400 mt-4 text-lg">
            Complete list of participants for KJPP RHR Corporate Planning 2026
          </p>
        </div>

        {/* Branch Filter */}
        <div className="container mx-auto px-4 mb-8">
          <p className="text-gray-300 mb-4 text-sm">Filter by Branch:</p>
          <div className="flex flex-wrap gap-3">
            {branches.map((branch) => (
              <button
                key={branch}
                onClick={() => setSelectedBranch(branch)}
                className={`px-6 py-2.5 rounded text-sm font-light tracking-wider transition-all duration-300 ${
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
        <div className="container mx-auto px-4 mb-6">
          <p className="text-gray-400 text-sm">
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredParticipants.length)} of{" "}
            {filteredParticipants.length} participant
            {filteredParticipants.length !== 1 ? "s" : ""}
            {selectedBranch !== "All" &&
              ` from kantor cabang ${selectedBranch}`}
          </p>
        </div>

        {/* Participants Table */}
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 text-gray-400 font-light tracking-wider">
                    No
                  </th>
                  <th className="text-left py-4 px-4 text-gray-400 font-light tracking-wider">
                    Name
                  </th>
                  <th className="text-left py-4 px-4 text-gray-400 font-light tracking-wider">
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
                    <td className="py-4 px-4 text-gray-300">
                      {startIndex + index + 1}
                    </td>
                    <td className="py-4 px-4 text-white">{participant.Nama}</td>
                    <td className="py-4 px-4 text-gray-400">
                      {participant.Cabang}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No Results */}
          {filteredParticipants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No participants found for the selected branch
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredParticipants.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded text-sm transition-all ${
                  currentPage === 1
                    ? "bg-gray-900 text-gray-600 cursor-not-allowed"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                Previous
              </button>

              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  disabled={page === "..."}
                  className={`px-4 py-2 rounded text-sm transition-all ${
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
                className={`px-4 py-2 rounded text-sm transition-all ${
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
      </div>
    </>
  );
}

export default Participants;
