import { useState } from "react";
import RHRGreenIdea from "./RHRGreenIdea";
import NavBar from "../components/Navbar";

// Mock NavBar Component

// Mock Footer Component
const Footer = () => (
  <footer className="bg-black border-t border-gray-800 py-8">
    <div className="container mx-auto px-5 text-center">
      <p className="text-gray-500 text-sm font-light tracking-wide">
        © 2026 KJPP RHR. All rights reserved.
      </p>
    </div>
  </footer>
);

// Mock AnimatedTitle Component
const AnimatedTitle = ({ title, containerClass }) => (
  <div className={containerClass}>
    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
      {title}
    </h1>
  </div>
);

const publications = [
  {
    id: 1,
    title: "Template",
    subtitle: "Paper Competition Template",
    description:
      "Access the official template for paper competition submissions. This standardized format ensures consistency and professionalism across all submissions.",
    icon: "📄",
    driveLink: "/documents/template_jurnal.docx",
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: 2,
    title: "Presentasi Pre Corplan",
    subtitle: "Pre Corporate Planning Presentations",
    description:
      "Review preliminary presentations and strategic discussions leading up to the main Corporate Planning event.",
    icon: "📊",
    driveLink: "/documents/presentasi-pre-corplan.pptx",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 3,
    title: "Presentasi Corplan",
    subtitle: "Corporate Planning Presentations",
    description:
      "Access the complete collection of Corporate Planning presentations, showcasing strategic initiatives and organizational direction.",
    icon: "📈",
    driveLink: "/documents/presentasi-corplan.pptx",
    color: "from-green-600 to-teal-600",
  },
];

const topics = [
  {
    title: "Implementasi SPM",
    description:
      "Masukan dan strategi terkait penerapan SPM sehingga standar mutu seluruh proses pekerjaan dan operasional di KJPP RHR dapat lebih baik",
  },
  {
    title: "Pelaksanaan Proses Penilaian",
    description:
      "Masukan dan strategi dalam menjaga pemenuhan SPI dan proses penilaian termasuk untuk meningkatkan dan memastikan penilai dalam melaksanakan KEPI SPI",
  },
  {
    title: "Riset dan Analisis",
    description:
      "Strategi dan ide untuk meningkatkan kualitas analisis dan efisiensi pekerjaan mendukung kualitas penilaian",
  },
];

function RHRPublication() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-black">
      <NavBar />

      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-black pt-32">
        <div className="container mx-auto px-5 py-16">
          <div className="text-center mb-20">
            <AnimatedTitle
              title="Publications"
              containerClass="text-center mb-8"
            />
            <p className="text-gray-300 mt-5 text-xl max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
              Explore our comprehensive collection of templates, presentations,
              and innovative ideas driving excellence at KJPP RHR
            </p>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
            {publications.map((pub) => (
              <div
                key={pub.id}
                className="group relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden transition-all duration-500 hover:border-gray-600 hover:shadow-2xl hover:shadow-white/10"
                onMouseEnter={() => setHoveredCard(pub.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pub.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative p-8">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    {pub.icon}
                  </div>

                  <h3 className="text-white text-2xl font-light tracking-wide mb-3">
                    {pub.title}
                  </h3>

                  <p className="text-gray-400 text-sm font-light tracking-wider mb-4">
                    {pub.subtitle}
                  </p>

                  <p className="text-gray-500 text-sm font-light leading-relaxed mb-8">
                    {pub.description}
                  </p>

                  <a
                    href={pub.driveLink}
                    download={
                      pub.id === 1 ? "template_jurnal.docx" :
                      pub.id === 2 ? "presentasi-pre-corplan.pptx" :
                      pub.id === 3 ? "presentasi-corplan.pptx" : undefined
                    }
                    className="inline-flex items-center gap-2 text-white bg-transparent border border-gray-700 px-6 py-3 rounded-lg text-sm font-light tracking-wider transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    Access Files
                  </a>
                </div>

                {/* Hover Border Effect */}
                <div
                  className={`absolute inset-0 border-2 border-white rounded-xl pointer-events-none transition-opacity duration-300 ${hoveredCard === pub.id ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            ))}
          </div>

          {/* RHR Root & Rise Idea Section */}
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-transparent bg-clip-text mb-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  RHR ROOT & RISE IDEA
                </h2>
              </div>
              <p className="text-gray-400 text-lg font-light tracking-wide mt-4">
                Paper Competition 2026
              </p>
            </div>

            {/* Theme Banner */}
            <div className="relative bg-gradient-to-r from-green-900/30 to-teal-900/30 border border-green-800/50 rounded-2xl p-12 mb-12 overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

              <div className="relative text-center">
                <h3 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wide">
                  "Rooted Responsibility, Flourishing Transformation"
                </h3>
                <p className="text-gray-300 text-lg font-light italic max-w-4xl mx-auto leading-relaxed">
                  Pertumbuhan kita bukan hanya soal angka, tapi tanggung jawab.
                  Melalui setiap tindakan kecil, kita membangun dampak yang tak
                  terhapuskan bagi industri dan masyarakat
                </p>
                <div className="mt-8 flex justify-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>30 Januari – 1 Februari 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Presentasi: 31 Januari 2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              {["overview", "topics", "rules"].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-8 py-3 rounded-lg text-sm font-light tracking-wider transition-all duration-300 ${
                    activeSection === section
                      ? "bg-white text-black"
                      : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-600"
                  }`}
                >
                  {section === "overview" && "Latar Belakang & Tujuan"}
                  {section === "topics" && "Topik Lomba"}
                  {section === "rules" && "Ketentuan Lomba"}
                </button>
              ))}
            </div>

            {/* Content Sections */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-10">
              {activeSection === "overview" && (
                <div className="space-y-12">
                  {/* Background */}
                  <div>
                    <h4 className="text-2xl font-light text-white mb-6 flex items-center gap-3">
                      <span className="text-3xl">🌱</span>
                      Latar Belakang
                    </h4>
                    <div className="space-y-4 text-gray-300 font-light leading-relaxed">
                      <p>
                        Tema CORPLAN{" "}
                        <span className="text-green-400">
                          "Rooted Responsibility, Flourishing Transformation"
                        </span>{" "}
                        menegaskan bahwa setiap individu di KJPP RHR memiliki
                        peran dan tanggung jawab dalam membangun transformasi
                        organisasi yang berakar pada nilai profesionalisme.
                      </p>
                      <p>
                        Upaya RHR untuk mendukung peningkatan mutu dan
                        transformasi keberlanjutan di KJPP RHR melalui masukan,
                        ide, dan solusi terhadap proses kerja.
                      </p>
                    </div>
                  </div>

                  {/* Objectives */}
                  <div>
                    <h4 className="text-2xl font-light text-white mb-6 flex items-center gap-3">
                      <span className="text-3xl">🎯</span>
                      Tujuan
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        "Menganalisis kondisi dan isu aktual yang berkaitan dengan penerapan standar, proses penilaian, serta kualitas riset dan analisis di lingkungan KJPP RHR",
                        "Memberikan masukan dan rekomendasi strategis yang rasional, sistematis, dan berbasis analisis untuk mendukung peningkatan mutu proses kerja",
                        "Mengusulkan ide atau inovasi yang aplikatif, baik dalam bentuk perbaikan prosedur, penguatan metodologi, maupun peningkatan efisiensi kerja",
                        "Mendukung transformasi berkelanjutan (flourishing transformation) di KJPP RHR agar mampu menghasilkan kualitas penilaian yang unggul dan berdaya saing tinggi",
                      ].map((objective, idx) => (
                        <div
                          key={idx}
                          className="bg-black/30 border border-gray-800 rounded-lg p-6 hover:border-green-600/50 transition-colors duration-300"
                        >
                          <div className="flex gap-4">
                            <span className="text-green-400 font-bold text-xl">
                              {idx + 1}
                            </span>
                            <p className="text-gray-300 font-light leading-relaxed">
                              {objective}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "topics" && (
                <div>
                  <h4 className="text-2xl font-light text-white mb-8 flex items-center gap-3">
                    <span className="text-3xl">📚</span>
                    Topik Lomba Paper
                  </h4>
                  <div className="space-y-6">
                    {topics.map((topic, idx) => (
                      <div
                        key={idx}
                        className="bg-black/30 border border-gray-800 rounded-xl p-8 hover:border-green-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/10"
                      >
                        <div className="flex items-start gap-6">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h5 className="text-xl text-white font-light mb-3">
                              {topic.title}
                            </h5>
                            <p className="text-gray-400 font-light leading-relaxed">
                              {topic.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "rules" && (
                <div>
                  <h4 className="text-2xl font-light text-white mb-8 flex items-center gap-3">
                    <span className="text-3xl">📋</span>
                    Ketentuan Lomba
                  </h4>
                  <div className="space-y-6 text-gray-300 font-light leading-relaxed">
                    {[
                      'Lomba abstrak/paper sesuai dengan tema CORPLAN "Rooted Responsibility, Flourishing Transformation" dengan filosofi bahwa pertumbuhan kita bukan hanya soal angka, tapi tanggung jawab.',
                      "Lomba paper dilakukan dengan mengajukan paper dimana tiap paper maksimal dapat disusun oleh 2 (dua) orang, bisa lintas cabang/divisi, dan tercantum sebagai penulis paper.",
                      "Setiap divisi dan cabang wajib mengalokasikan orang yang memenuhi kriteria untuk menjadi peserta. Alokasi orang dari tiap divisi dan cabang disampaikan atas persetujuan kepala divisi atau kepala cabang.",
                      "Tiap paper disusun dengan menyatakan pengarah/supervisor yang bertindak sebagai pengarah/advisor/reviewer. Pengarah/supervisor dapat memberikan masukan dan catatan atas paper yang disusun.",
                    ].map((rule, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center text-green-400 font-bold">
                          {idx + 1}
                        </div>
                        <p className="flex-1 pt-1">{rule}</p>
                      </div>
                    ))}
                  </div>

                  {/* Key Dates Highlight */}
                  <div className="mt-10 bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-800/30 rounded-xl p-8">
                    <h5 className="text-xl text-white font-light mb-6 flex items-center gap-3">
                      <svg
                        className="w-6 h-6 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Timeline Penting
                    </h5>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center p-6 bg-black/30 rounded-lg">
                        <p className="text-gray-400 text-sm mb-2">
                          Corporate Planning
                        </p>
                        <p className="text-white text-2xl font-light">
                          30 Jan - 1 Feb 2026
                        </p>
                      </div>
                      <div className="text-center p-6 bg-black/30 rounded-lg">
                        <p className="text-gray-400 text-sm mb-2">
                          Presentasi Offline
                        </p>
                        <p className="text-white text-2xl font-light">
                          31 Januari 2026
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16 pb-10">
              <p className="text-gray-500 text-sm font-light tracking-wide mb-8">
                Tiga karya terbaik akan dipresentasikan dan berkesempatan
                memperoleh hadiah menarik
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-3 text-black bg-white px-10 py-4 rounded-lg text-base font-light tracking-wider transition-all duration-300 hover:bg-gray-200 hover:shadow-lg hover:shadow-white/20"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Template & Guidelines
              </a>
            </div>
          </div>
        </div>
      </section>
      <RHRGreenIdea />

      <Footer />
    </main>
  );
}

export default RHRPublication;
