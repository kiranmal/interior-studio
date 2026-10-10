import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Portfolio from './components/Portfolio.jsx';
import Process from './components/Process.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import AdminPage from './pages/AdminPage.jsx';
import HomeExperience from './components/HomeExperience.jsx';

export default function App() {
  if (window.location.pathname === '/admin') return <AdminPage />;
  return <><Navbar/><main><Hero/><HomeExperience/><Services/><Portfolio/><Process/><Contact/></main><Footer/><WhatsAppButton/></>;
}
