import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axios.js';
import ProjectCard from './ProjectCard.jsx';
import Loader from '../common/Loader.jsx';

const DEFAULT_PROJECTS = [
  {
    _id: 'default-proj-1',
    title: 'NovaChat – Context-Aware AI Chatbot & Dialogue Manager',
    description:
      'Full-stack conversational AI platform integrating spaCy NLU for real-time intent classification, sentiment scoring, and Named Entity Recognition (NER). Features a finite-state dialogue manager with sliding-window memory and turn summarization to maintain multi-turn context. Integrates Hugging Face LLM APIs (Qwen2.5-7B, Zephyr-7B) with fallback heuristics, and a RESTful Flask backend with SQLite3 persistence and multi-format history exports (JSON, DOCX, PDF).',
    technologies: ['Python 3.x', 'Flask', 'Tailwind CSS', 'spaCy', 'Hugging Face API', 'SQLite3', 'JavaScript'],
    githubLink: 'https://github.com/jayanthv2003',
    image: '/projects/novachat-preview.svg',
    featured: true,
  },
  {
    _id: 'default-proj-2',
    title: 'Pizza Palace – Online Food Order & Management System',
    description:
      'Full-stack web application automating customer registration, menu browsing, cart management, and real-time order tracking. Built with a normalized MySQL database schema for users, orders, and menu inventory, paired with a responsive administrative dashboard for order tracking and automated sales reports. Secured with input sanitization and prepared statements against SQL injection and XSS.',
    technologies: ['PHP', 'MySQL', 'JavaScript (ES6)', 'HTML5', 'CSS3', 'Tailwind CSS', 'XAMPP'],
    githubLink: 'https://github.com/jayanthv2003',
    image: '/projects/pizzapalace-preview.svg',
    featured: true,
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        if (data.data && data.data.length > 0) {
          setProjects(data.data);
        }
      } catch (err) {
        // Fall back gracefully to DEFAULT_PROJECTS if backend is starting or unseeded
        console.warn('Using default projects:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="container-px py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-2">{'// Projects'}</p>
        <h2 className="section-heading">Featured Projects</h2>
      </motion.div>

      <div className="mt-10">
        {loading && <Loader label="Loading projects" />}

        {!loading && projects.length === 0 && (
          <p className="text-ink/60 dark:text-mist/60 text-sm">
            No projects yet — add some from the admin dashboard.
          </p>
        )}

        {!loading && projects.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
