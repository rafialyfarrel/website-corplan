import Hero from "./components/Hero";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <main className="relative h-[100svh] w-full overflow-hidden bg-black sm:min-h-screen sm:overflow-x-hidden">
      <Navbar />
      <Hero />
      {/* <Features /> */}
      {/* <Contact /> */}
    </main>
  );
}

export default App;
