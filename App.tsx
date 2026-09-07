import { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import HeatBountyBar from './components/ui/HeatBountyBar';
import SpeedometerHud from './components/ui/SpeedometerHud';

export default function App() {
  const [isSepiaActive, setIsSepiaActive] = useState(true);

  return (
    <div className={`app ${isSepiaActive ? 'app--sepia-glare' : ''}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Top Telemetry & Pursuit Status Bar */}
      <HeatBountyBar
        isSepiaActive={isSepiaActive}
        onToggleSepia={() => setIsSepiaActive(!isSepiaActive)}
      />

      <Header />

      <main className="app__main" id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      {/* Interactive Speedometer & Tachometer HUD */}
      <SpeedometerHud />

      <Footer />
    </div>
  );
}
