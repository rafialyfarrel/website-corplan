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
        className="relative mt-20 flex h-dvh w-screen flex-col items-center justify-center overflow-hidden"
      >
        <div className="px-5 text-center sm:px-10">
          <div className="text-center mb-16">
            <AnimatedTitle
              title={event_name}
              containerClass="text-center mb-8"
            />
          </div>
          <p className="mb-5 mt-5 max-w-4xl mx-auto text-lg font-light tracking-wide text-gray-400">
            Jadwal lengkap kegiatan Corporate Planning KJPP RHR 2026
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-24 sm:px-10">
        <div className="text-center mb-16">
          <AnimatedTitle title="Rundown " containerClass="text-center mb-8" />
          <p className="text-gray-300 mt-5 text-xl max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
            The event of Corporate Planning KJPP RHR 2026 :
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedDay("pra")}
            className={`rounded-lg px-6 py-3 font-medium transition-all ${
              selectedDay === "pra"
                ? "bg-[#72b851] text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Pra Corporate Planning
          </button>
          {corporate_planning.days.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(`day${index + 1}`)}
              className={`rounded-lg px-6 py-3 font-medium transition-all ${
                selectedDay === `day${index + 1}`
                  ? "bg-[#72b851] text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Hari {index + 1}
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/80 p-6 backdrop-blur-sm border border-gray-800">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-violet-400 mb-2">
              {currentAgenda.day}
            </h3>
            <p className="text-lg text-gray-300 mb-1">{currentAgenda.date}</p>
            <button
              onClick={() => openMap(currentAgenda.locationKey)}
              className="text-base font-light text-gray-400 hover:text-violet-400 transition-colors underline cursor-pointer"
            >
              {currentAgenda.location.venue}, {currentAgenda.location.city}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-3 pr-4 font-semibold text-violet-300 w-32">
                    Time
                  </th>
                  <th className="pb-3 pr-4 font-semibold text-violet-300 w-28">
                    Duration
                  </th>
                  <th className="pb-3 font-semibold text-violet-300">
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
                    <td className="py-4 pr-4 text-sm text-gray-300 align-top">
                      {item.start}
                      {item.end && item.end !== "end" && (
                        <span className="text-gray-500"> - {item.end}</span>
                      )}
                    </td>
                    <td className="py-4 pr-4 text-sm text-gray-400 align-top">
                      {formatDuration(item.duration)}
                    </td>
                    <td className="py-4 text-sm text-white">{item.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Participants />
      <Footer />
    </main>
  );
}

export default RundownKegiatan;
