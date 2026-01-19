import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="relative h-[100svh] w-full overflow-hidden bg-black sm:min-h-screen sm:overflow-x-hidden">
      <NavBar />
      <Hero />
      {/* <Features /> */}
      {/* <Contact /> */}
      {/* <NavBar /> */}
    </main>
  );
}

export default App;
