import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import Programs from './pages/Programs.jsx';
import ProgramDetail from './pages/ProgramDetail.jsx';
import Admissions from './pages/Admissions.jsx';
import Corporate from './pages/Corporate.jsx';
import Research from './pages/Research.jsx';
import CyberLabs from './pages/CyberLabs.jsx';
import Events from './pages/Events.jsx';
import Blog from './pages/Blog.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import { ModalProvider } from './hooks/useModal.jsx';
import FloatingChat from './components/layout/FloatingChat.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ModalProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:slug" element={<ProgramDetail />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/corporate" element={<Corporate />} />
            <Route path="/research" element={<Research />} />
            <Route path="/cyber-labs" element={<CyberLabs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <FloatingChat />
      </ModalProvider>
    </BrowserRouter>
  );
}
