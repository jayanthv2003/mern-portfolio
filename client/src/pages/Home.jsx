import SEO from '../components/common/SEO.jsx';
import Hero from '../components/home/Hero.jsx';
import About from '../components/home/About.jsx';
import Skills from '../components/home/Skills.jsx';
import Projects from '../components/home/Projects.jsx';
import Certifications from '../components/home/Certifications.jsx';
import Contact from '../components/home/Contact.jsx';

const Home = () => {
  return (
    <>
      <SEO />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
    </>
  );
};

export default Home;
