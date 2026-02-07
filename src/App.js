import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ModeProvider } from './context/modecontext';
import { AnimatePresence } from 'framer-motion';
import MeshGradientBackground from './components/MeshGradientBackground';

import Layout from './components/layout';

import LandingPage from './pages/LandingPage';
import AboutMe from './pages/AboutMe';
import Resume from './pages/Resume';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/res" element={<Resume />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ModeProvider>
      <BrowserRouter basename="/web">
      <MeshGradientBackground />
        <div className="overflow-x-hidden min-h-screen">
         
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </div>
      </BrowserRouter>
    </ModeProvider>
  );
}

export default App;