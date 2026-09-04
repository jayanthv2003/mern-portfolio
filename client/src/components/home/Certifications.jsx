import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import api from '../../api/axios.js';
import Loader from '../common/Loader.jsx';

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

const DEFAULT_CERTIFICATES = [
  {
    _id: 'default-cert-1',
    title: 'Full-Stack Web Development',
    issuer: 'Hands-on Production & Project Experience',
    issueDate: '2025-06-01',
    description: 'Hands-on experience building end-to-end, relational database-backed full-stack web applications.',
    credentialUrl: 'https://github.com/jayanthv2003',
  },
  {
    _id: 'default-cert-2',
    title: 'Problem Solving & DSA',
    issuer: 'LeetCode',
    issueDate: '2025-01-01',
    description: 'Active learner practicing Data Structures and Algorithms on LeetCode.',
    credentialUrl: 'https://leetcode.com/u/JayanthDev',
  },
];

const Certifications = () => {
  const [certificates, setCertificates] = useState(DEFAULT_CERTIFICATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data } = await api.get('/certificates');
        if (data.data && data.data.length > 0) {
          setCertificates(data.data);
        }
      } catch (err) {
        console.warn('Using default certifications:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <section id="certifications" className="container-px py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-2">{'// Certifications & Achievements'}</p>
        <h2 className="section-heading">Credentials &amp; Recognition</h2>
      </motion.div>

      <div className="mt-10">
        {loading && <Loader label="Loading certifications" />}

        {!loading && certificates.length === 0 && (
          <p className="text-ink/60 dark:text-mist/60 text-sm">
            No certifications added yet.
          </p>
        )}

        {!loading && certificates.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="card p-6 flex gap-4 border border-border-light dark:border-border-dark hover:border-signal transition-colors"
              >
                <FiAward className="text-signal shrink-0 mt-1" size={24} />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-semibold text-base mb-1">{cert.title}</h3>
                  <p className="text-xs text-circuit font-mono font-medium">{cert.issuer}</p>
                  {cert.description && (
                    <p className="text-xs text-ink/70 dark:text-mist/70 mt-2 leading-relaxed">
                      {cert.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-light/60 dark:border-border-dark/60">
                    <span className="font-mono text-[11px] text-ink/50 dark:text-mist/50">
                      {formatDate(cert.issueDate)}
                    </span>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-signal hover:underline"
                      >
                        View Profile / Link <FiExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
