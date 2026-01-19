// RundownKegiatan.jsx  (UPDATED: Pembagian Kamar grouped by Partner/Peserta/Panitia
// + filter buttons like Participants + pagination (5 per page) + next/prev)
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedTitle from "../components/AnimatedTitle";
import rundownData from "../../rundown_kegiatan_rev1.json";
import Participants from "./DaftarPeserta";
import pembagiankamarData from "../../pembagian_kamar.json";
import pembagianTeamData from "../../performance_team.json";


// ===== Helpers =====
const normalizeRoomRow = (row) => ({
  no: row?.no ?? null,
  no_kamar: row?.no_kamar ?? "-",
  lantai: row?.lantai ?? "-",
  nama_1: row?.nama_1 ?? null,
  nama_2: row?.nama_2 ?? null,
});

const getRoomRowsByGroup = (data, group) => {
  const rows = (data?.[group] || []).map(normalizeRoomRow);

  // optional sort by room numeric-friendly
  return rows.sort((a, b) => {
    const na = parseInt(a.no_kamar, 10);
    const nb = parseInt(b.no_kamar, 10);
    if (Number.isNaN(na) || Number.isNaN(nb)) {
      return String(a.no_kamar).localeCompare(String(b.no_kamar));
    }
    return na - nb;
  });
};

const getPageNumbers = (currentPage, totalPages) => {
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

function RundownKegiatan() {
  const heroRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState("pra");

  // ===============================
  // Performance Team accordion
  // ===============================
  const [openTeamKey, setOpenTeamKey] = useState(null);

  const teamKeys = useMemo(() => {
    // Sort: Kelompok 1, 2, 3, ... 12
    const keys = Object.keys(pembagianTeamData || {});
    return keys.sort((a, b) => {
      const na = parseInt(a.replace(/\D/g, ""), 10);
      const nb = parseInt(b.replace(/\D/g, ""), 10);
      if (Number.isNaN(na) || Number.isNaN(nb)) {
        return a.localeCompare(b);
      }
      return na - nb;
    });
  }, []);

  // Pembagian Kamar filter + pagination
  const [selectedRoomGroup, setSelectedRoomGroup] = useState("Partner");
  const [roomPage, setRoomPage] = useState(1);
  const roomItemsPerPage = 5;

  const roomGroups = useMemo(() => ["Partner", "Peserta", "Panitia"], []);

  const roomRows = useMemo(() => {
    return getRoomRowsByGroup(pembagiankamarData, selectedRoomGroup);
  }, [selectedRoomGroup]);

  // reset pagination when group changes
  useEffect(() => {
    setRoomPage(1);
  }, [selectedRoomGroup]);

  const roomTotalPages = Math.ceil(roomRows.length / roomItemsPerPage) || 1;
  const roomStartIndex = (roomPage - 1) * roomItemsPerPage;
  const roomEndIndex = roomStartIndex + roomItemsPerPage;
  const currentRoomRows = roomRows.slice(roomStartIndex, roomEndIndex);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  const formatDuration = (duration) => {
    if (!duration) return "-";
    const [hours, minutes] = duration.split(":");
    const h = parseInt(hours);
    const m = parseInt(minutes);
    if (h > 0 && m > 0)
      return `${h} Hour${h > 1 ? "s" : ""} ${m} Minute${m > 1 ? "s" : ""}`;
    if (h > 0) return `${h} Hour${h > 1 ? "s" : ""}`;
    if (m > 0) return `${m} Minute${m > 1 ? "s" : ""}`;
    return "-";
  };

  const locations = {
    "Menara Kuningan": { lat: -6.21823500333064, lng: 106.83068271853284 },
    "R Hotel Rancamaya": {
      lat: -6.658684469347514,
      lng: 106.82344828177779,
    },
  };

  const openMap = (locationName) => {
    const location = locations[locationName];
    if (location) {
      window.open(
        `https://www.google.com/maps?q=${location.lat},${location.lng}`,
        "_blank"
      );
    }
  };

  const { event_name, pra_corporate_planning, corporate_planning } = rundownData;

  const getCurrentAgenda = () => {
    if (selectedDay === "pra") {
      return {
        day: pra_corporate_planning.day,
        date: "23 Januari 2026",
        location: pra_corporate_planning.location,
        locationKey: "Menara Kuningan",
        agenda: pra_corporate_planning.agenda,
      };
    } else {
      const dayIndex = parseInt(selectedDay.replace("day", "")) - 1;
      const dayData = corporate_planning.days[dayIndex];
      return {
        day: dayData.day,
        date: new Date(dayData.date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        location: corporate_planning.location,
        locationKey: "R Hotel Rancamaya",
        agenda: dayData.agenda,
      };
    }
  };

  const currentAgenda = getCurrentAgenda();

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-black text-white">
      <NavBar />

      <div
        ref={heroRef}
        className="relative mt-14 sm:mt-16 flex min-h-[35vh] sm:min-h-[45vh] w-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-10"
      >
        <div className="px-4 text-center sm:px-10">
          <div className="text-center mb-6 sm:mb-10">
            <AnimatedTitle
              title={event_name}
              containerClass="text-center mb-4 sm:mb-8 !text-4xl sm:!text-6xl md:!text-7xl"
            />
          </div>
          <p className="mb-3 mt-3 max-w-4xl mx-auto text-sm sm:text-base md:text-lg font-light tracking-wide text-gray-400">
            Jadwal lengkap kegiatan Corporate Planning KJPP RHR 2026
          </p>
        </div>
      </div>

      {/* Rundown Section */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-16">
        <div className="text-center mb-6 sm:mb-12">
          <AnimatedTitle
            title="Rundown "
            containerClass="text-center mb-4 sm:mb-8 !text-3xl sm:!text-5xl md:!text-6xl"
          />
          <p className="text-gray-300 mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
            The event of Corporate Planning KJPP RHR 2026 :
          </p>
        </div>

        <div className="mb-4 sm:mb-8 flex flex-wrap gap-1.5 sm:gap-2">
          <button
            onClick={() => setSelectedDay("pra")}
            className={`rounded-lg px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-all ${
              selectedDay === "pra"
                ? "bg-[#72b851] text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Pra Corplan
          </button>
          {corporate_planning.days.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(`day${index + 1}`)}
              className={`rounded-lg px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-all ${
                selectedDay === `day${index + 1}`
                  ? "bg-[#72b851] text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Hari {index + 1}
            </button>
          ))}
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/80 p-3 sm:p-5 backdrop-blur-sm border border-gray-800">
          <div className="mb-3 sm:mb-5">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              {currentAgenda.day}
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mb-0.5">
              {currentAgenda.date}
            </p>
            <button
              onClick={() => openMap(currentAgenda.locationKey)}
              className="text-xs sm:text-sm font-light text-gray-400 hover:text-white transition-colors underline cursor-pointer"
            >
              {currentAgenda.location.venue}, {currentAgenda.location.city}
            </button>
          </div>

          {/* Mobile Card Layout */}
          <div className="sm:hidden space-y-2">
            {currentAgenda.agenda.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-white">
                    {item.start}
                    {item.end && item.end !== "end" && (
                      <span className="text-gray-500"> - {item.end}</span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDuration(item.duration)}
                  </span>
                </div>
                <p className="text-xs text-white leading-relaxed">
                  {item.activity}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-white w-24 sm:w-32">
                    Time
                  </th>
                  <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-white w-20 sm:w-28">
                    Duration
                  </th>
                  <th className="pb-2 text-xs sm:text-sm font-semibold text-white">
                    Activity
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentAgenda.agenda.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-300 align-top">
                      {item.start}
                      {item.end && item.end !== "end" && (
                        <span className="text-gray-500"> - {item.end}</span>
                      )}
                    </td>
                    <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-400 align-top">
                      {formatDuration(item.duration)}
                    </td>
                    <td className="py-2.5 text-xs sm:text-sm text-white">
                      {item.activity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Performance Team Section (UPDATED) */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-16">
        <div className="text-center mb-6 sm:mb-12">
          <AnimatedTitle
            title="Performance Team"
            containerClass="text-center mb-4 sm:mb-8 !text-3xl sm:!text-5xl md:!text-6xl"
          />
          <p className="text-gray-300 mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
            Tim penampilan untuk Corporate Planning KJPP RHR 2026
          </p>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/80 p-3 sm:p-5 backdrop-blur-sm border border-gray-800">
          {teamKeys.length === 0 ? (
            <div className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
              <p className="text-xs sm:text-sm text-white">
                Informasi tim akan segera diumumkan
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {teamKeys.map((key) => {
                const members = pembagianTeamData[key] || [];
                const isOpen = openTeamKey === key;

                return (
                  <div
                    key={key}
                    className="rounded-lg border border-gray-700/50 bg-gray-800/30 overflow-hidden"
                  >
                    {/* BAR / HEADER */}
                    <button
                      type="button"
                      onClick={() => setOpenTeamKey((prev) => (prev === key ? null : key))}
                      className="w-full flex items-center justify-between gap-3 px-3 sm:px-4 py-3 hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="text-left">
                        <p className="text-xs sm:text-sm font-semibold text-white">
                          {key}
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

                    {/* CONTENT */}
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
              })}
            </div>
          )}
        </div>
      </div>


      {/* Pembagian Kamar Section (UPDATED) */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-16">
        <div className="text-center mb-6 sm:mb-12">
          <AnimatedTitle
            title="Pembagian Kamar"
            containerClass="text-center mb-4 sm:mb-8 !text-3xl sm:!text-5xl md:!text-6xl"
          />
          <p className="text-gray-300 mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
            Pembagian kamar peserta Corporate Planning KJPP RHR 2026
          </p>
        </div>

        {/* Group filter buttons (Partner/Peserta/Panitia) */}
        <div className="mb-4 sm:mb-8 flex flex-wrap gap-1.5 sm:gap-2">
          {roomGroups.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedRoomGroup(g)}
              className={`rounded-lg px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-all ${
                selectedRoomGroup === g
                  ? "bg-[#72b851] text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className="mb-3 sm:mb-5">
          <p className="text-gray-400 text-xs sm:text-sm">
            Showing {roomRows.length === 0 ? 0 : roomStartIndex + 1}-
            {Math.min(roomEndIndex, roomRows.length)} of {roomRows.length} data{" "}
            <span className="text-gray-500">({selectedRoomGroup})</span>
          </p>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/80 p-3 sm:p-5 backdrop-blur-sm border border-gray-800">
          {/* Mobile Card Layout */}
          <div className="sm:hidden space-y-2">
            {roomRows.length === 0 ? (
              <div className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
                <p className="text-xs text-white">
                  Informasi pembagian kamar akan segera diumumkan
                </p>
              </div>
            ) : (
              currentRoomRows.map((row, idx) => (
                <div
                  key={`${row.no_kamar}-${idx}`}
                  className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white font-medium">
                        Kamar {row.no_kamar}{" "}
                        <span className="text-gray-500">• Lt {row.lantai}</span>
                      </p>
                      <div className="mt-1 space-y-1">
                        {row.nama_1 && (
                          <p className="text-xs text-gray-200">{row.nama_1}</p>
                        )}
                        {row.nama_2 && (
                          <p className="text-xs text-gray-200">{row.nama_2}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-gray-600 text-xs">
                      #{roomStartIndex + idx + 1}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-white w-20">
                    No
                  </th>
                  <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-white w-32">
                    Nomor Kamar
                  </th>
                  <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-white w-20">
                    Lantai
                  </th>
                  <th className="pb-2 text-xs sm:text-sm font-semibold text-white">
                    Nama 1
                  </th>
                  <th className="pb-2 text-xs sm:text-sm font-semibold text-white">
                    Nama 2
                  </th>
                </tr>
              </thead>

              <tbody>
                {roomRows.length === 0 ? (
                  <tr className="border-b border-gray-800">
                    <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-300 align-top">
                      -
                    </td>
                    <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-300 align-top">
                      -
                    </td>
                    <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-300 align-top">
                      -
                    </td>
                    <td
                      className="py-2.5 text-xs sm:text-sm text-white"
                      colSpan={2}
                    >
                      Informasi akan segera diumumkan
                    </td>
                  </tr>
                ) : (
                  currentRoomRows.map((row, idx) => (
                    <tr
                      key={`${row.no_kamar}-${idx}`}
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-300 align-top">
                        {roomStartIndex + idx + 1}
                      </td>
                      <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-300 align-top">
                        {row.no_kamar}
                      </td>
                      <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-400 align-top">
                        {row.lantai}
                      </td>
                      <td className="py-2.5 text-xs sm:text-sm text-white">
                        {row.nama_1 || "-"}
                      </td>
                      <td className="py-2.5 text-xs sm:text-sm text-white">
                        {row.nama_2 || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination (same style as Participants) */}
        {roomRows.length > 0 && (
          <div className="flex justify-center items-center gap-1 sm:gap-2 mt-4 sm:mt-6">
            <button
              onClick={() => setRoomPage((prev) => Math.max(prev - 1, 1))}
              disabled={roomPage === 1}
              className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded text-xs sm:text-sm transition-all ${
                roomPage === 1
                  ? "bg-gray-900 text-gray-600 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Prev
            </button>

            {getPageNumbers(roomPage, roomTotalPages).map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === "number" && setRoomPage(page)}
                disabled={page === "..."}
                className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded text-xs sm:text-sm transition-all ${
                  page === roomPage
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
                setRoomPage((prev) => Math.min(prev + 1, roomTotalPages))
              }
              disabled={roomPage === roomTotalPages}
              className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded text-xs sm:text-sm transition-all ${
                roomPage === roomTotalPages
                  ? "bg-gray-900 text-gray-600 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Participants Section */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-16">
        <Participants embedded />
      </div>

      {/* Gala Awards 2026 Section (unchanged) */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-16">
        <div className="text-center mb-6 sm:mb-12">
          <AnimatedTitle
            title="Gala Awards 2026"
            containerClass="text-center mb-4 sm:mb-8 !text-3xl sm:!text-5xl md:!text-6xl"
          />
          <p className="text-gray-300 mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
            Penghargaan untuk para peserta Corporate Planning KJPP RHR 2026
          </p>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/80 p-3 sm:p-5 backdrop-blur-sm border border-gray-800">
          <div className="sm:hidden space-y-2">
            <div className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
              <p className="text-xs text-white font-medium mb-1">Kategori 1</p>
              <p className="text-xs text-white">
                Informasi pemenang akan diumumkan saat acara
              </p>
            </div>
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-white w-48">
                    Kategori
                  </th>
                  <th className="pb-2 text-xs sm:text-sm font-semibold text-white">
                    Pemenang
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-300 align-top">
                    -
                  </td>
                  <td className="py-2.5 text-xs sm:text-sm text-white">
                    Akan diumumkan saat acara
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default RundownKegiatan;
