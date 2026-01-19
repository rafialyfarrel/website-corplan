// DaftarPeserta.jsx
import { useMemo, useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedTitle from "../components/AnimatedTitle";
import participantsData from "../../participants.json";
import pembagiankamarData from "../../pembagian_kamar.json";

// ===== Helpers: room index (name -> room info) =====
const buildRoomIndex = (data) => {
  const idx = new Map();

  const norm = (s) => String(s || "").trim().toLowerCase();

  const push = (groupName, row) => {
    const payload = {
      no_kamar: row?.no_kamar ?? "-",
      lantai: row?.lantai ?? "-",
      group: groupName,
    };

    if (row?.nama_1) idx.set(norm(row.nama_1), payload);
    if (row?.nama_2) idx.set(norm(row.nama_2), payload);
  };

  ["Partner", "Peserta", "Panitia"].forEach((g) => {
    (data?.[g] || []).forEach((row) => push(g, row));
  });

  return idx;
};

const getRoomInfoByName = (roomIndex, name) => {
  if (!name) return null;
  const key = String(name).trim().toLowerCase();
  return roomIndex.get(key) || null;
};

function Participants({ embedded = false }) {
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [branches, setBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = embedded ? 8 : 10;

  // Build room index once
  const roomIndex = useMemo(() => buildRoomIndex(pembagiankamarData), []);

  useEffect(() => {
    // Extract unique branches
    const uniqueBranches = ["All", ...new Set(participantsData.map((p) => p.Cabang))];
    setBranches(uniqueBranches);
    setFilteredParticipants(participantsData);
  }, []);

  useEffect(() => {
    // Filter participants based on selected branch
    if (selectedBranch === "All") {
      setFilteredParticipants(participantsData);
    } else {
      setFilteredParticipants(participantsData.filter((p) => p.Cabang === selectedBranch));
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
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
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
    <div className={`bg-black text-white ${embedded ? "" : "min-h-screen pt-14 pb-16"}`}>
      {/* Hero Section */}
      <div className={`text-center ${embedded ? "mb-6 sm:mb-12" : "container mx-auto px-4 mb-12"}`}>
        <AnimatedTitle
          title="Participants"
          containerClass={embedded ? "!text-3xl sm:!text-5xl md:!text-6xl mb-4 sm:mb-8" : ""}
        />
        <p
          className={`text-gray-300 mt-3 ${
            embedded
              ? "text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-light tracking-wide leading-relaxed"
              : "text-lg"
          }`}
        >
          Complete list of participants for KJPP RHR Corporate Planning 2026
        </p>
      </div>

      {/* Branch Filter */}
      <div className={`${embedded ? "mb-4 sm:mb-8" : "container mx-auto px-4 mb-8"}`}>
        <p className="text-gray-300 mb-2 sm:mb-3 text-xs sm:text-sm">Filter by Branch:</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {branches.map((branch) => (
            <button
              key={branch}
              onClick={() => setSelectedBranch(branch)}
              className={`rounded-lg px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-all ${
                selectedBranch === branch
                  ? "bg-[#72b851] text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {branch}
            </button>
          ))}
        </div>
      </div>

      {/* Participants Count */}
      <div className={`${embedded ? "mb-3 sm:mb-5" : "container mx-auto px-4 mb-6"}`}>
        <p className="text-gray-400 text-xs sm:text-sm">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredParticipants.length)} of{" "}
          {filteredParticipants.length} participant{filteredParticipants.length !== 1 ? "s" : ""}
          {selectedBranch !== "All" && ` from kantor cabang ${selectedBranch}`}
        </p>
      </div>

      <div
        className={`${
          embedded
            ? "rounded-xl sm:rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/80 p-3 sm:p-5 backdrop-blur-sm border border-gray-800"
            : ""
        }`}
      >
        {/* Participants - Mobile Card Layout */}
        <div className="sm:hidden space-y-2">
          {currentParticipants.map((participant, index) => {
            const roomInfo = getRoomInfoByName(roomIndex, participant.Nama);

            return (
              <div key={index} className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{participant.Nama}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{participant.Cabang}</p>

                    {roomInfo && (
                      <p className="text-gray-400 text-[11px] mt-1">
                        Kamar {roomInfo.no_kamar} • Lantai {roomInfo.lantai} • {roomInfo.group}
                      </p>
                    )}
                  </div>
                  <span className="text-gray-600 text-xs">#{startIndex + index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Participants Table - Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-white w-24 sm:w-32">
                  No
                </th>
                <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-white">
                  Name
                </th>
                <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-white">
                  Branch
                </th>
                <th className="pb-2 text-xs sm:text-sm font-semibold text-white w-48">
                  Room
                </th>
              </tr>
            </thead>
            <tbody>
              {currentParticipants.map((participant, index) => {
                const roomInfo = getRoomInfoByName(roomIndex, participant.Nama);

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-300 align-top">
                      {startIndex + index + 1}
                    </td>
                    <td className="py-2.5 pr-3 text-xs sm:text-sm text-white">
                      {participant.Nama}
                    </td>
                    <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-400">
                      {participant.Cabang}
                    </td>
                    <td className="py-2.5 text-xs sm:text-sm text-gray-300">
                      {roomInfo ? (
                        <span>
                          {roomInfo.no_kamar} / Lt {roomInfo.lantai}{" "}
                          <span className="text-gray-500">• {roomInfo.group}</span>
                        </span>
                      ) : (
                        <span className="text-gray-600">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Results */}
      {filteredParticipants.length === 0 && (
        <div className={`text-center ${embedded ? "py-8" : "py-12"}`}>
          <p className="text-gray-500 text-sm">No participants found for the selected branch</p>
        </div>
      )}

      {/* Pagination */}
      {filteredParticipants.length > 0 && (
        <div className={`flex justify-center items-center gap-1 sm:gap-2 ${embedded ? "mt-4 sm:mt-6" : "mt-8"}`}>
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
              onClick={() => typeof page === "number" && setCurrentPage(page)}
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

  if (embedded) return content;

  return (
    <>
      <NavBar />
      {content}
      <Footer />
    </>
  );
}

export default Participants;
