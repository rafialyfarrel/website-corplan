import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedTitle from "../components/AnimatedTitle";
import rundownData from "../../rundown_kegiatan_rev1.json";
import Participants from "./DaftarPeserta";

function RundownKegiatan() {
  const heroRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState("pra");

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
    "R Hotel Rancamaya": { lat: -6.658684469347514, lng: 106.82344828177779 },
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

  const { event_name, pra_corporate_planning, corporate_planning } =
    rundownData;

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

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-24">
        <div className="text-center mb-6 sm:mb-12">
          <AnimatedTitle title="Rundown " containerClass="text-center mb-4 sm:mb-8 !text-3xl sm:!text-5xl md:!text-6xl" />
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
            <h3 className="text-lg sm:text-xl font-bold text-violet-400 mb-1">
              {currentAgenda.day}
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mb-0.5">{currentAgenda.date}</p>
            <button
              onClick={() => openMap(currentAgenda.locationKey)}
              className="text-xs sm:text-sm font-light text-gray-400 hover:text-violet-400 transition-colors underline cursor-pointer"
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
                  <span className="text-xs font-medium text-violet-300">
                    {item.start}
                    {item.end && item.end !== "end" && (
                      <span className="text-gray-500"> - {item.end}</span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDuration(item.duration)}
                  </span>
                </div>
                <p className="text-xs text-white leading-relaxed">{item.activity}</p>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-violet-300 w-24 sm:w-32">
                    Time
                  </th>
                  <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-violet-300 w-20 sm:w-28">
                    Duration
                  </th>
                  <th className="pb-2 text-xs sm:text-sm font-semibold text-violet-300">
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
                    <td className="py-2.5 text-xs sm:text-sm text-white">{item.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Participants embedded />
      <Footer />
    </main>
  );
}

export default RundownKegiatan;
