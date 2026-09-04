import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiSend, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import api from '../../api/axios.js';

const initialForm = { name: '', email: '', subject: '', message: '' };

const validate = (form) => {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!form.subject.trim()) errors.subject = 'Subject is required';
  if (!form.message.trim()) {
    errors.message = 'Message is required';
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  return errors;
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const email = import.meta.env.VITE_EMAIL || 'jayanthv2003@gmail.com';
  const phone = import.meta.env.VITE_PHONE || '+91-9448266577';
  const location = import.meta.env.VITE_LOCATION || 'Karnataka, India';
  const githubUrl = import.meta.env.VITE_GITHUB_URL || 'https://github.com/jayanthv2003';
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/jayanthv2003';
  const leetcodeUrl = import.meta.env.VITE_LEETCODE_URL || 'https://leetcode.com/u/JayanthDev';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await api.post('/contact', form);
      toast.success(data.message || 'Message sent!');
      setForm(initialForm);
    } catch (err) {
      toast.error(err.message || 'Could not send message. Please reach out directly via email.');
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (field) =>
    `w-full bg-transparent border rounded-md px-4 py-3 text-sm outline-none transition-colors
     ${errors[field]
       ? 'border-red-500'
       : 'border-border-light dark:border-border-dark focus:border-signal'}`;

  return (
    <section id="contact" className="container-px py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-2">{'// Contact'}</p>
        <h2 className="section-heading">Let&apos;s work together</h2>
        <p className="text-ink/70 dark:text-mist/70 max-w-lg mb-12">
          Have an exciting project, full-time opportunity, or just want to connect? Reach out directly
          or leave a message below.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
        {/* Contact Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="card p-6 border border-border-light dark:border-border-dark space-y-4">
            <h3 className="font-display font-semibold text-lg text-ink dark:text-mist mb-2">
              Contact Details
            </h3>

            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3.5 text-sm text-ink/80 dark:text-mist/80 hover:text-signal transition-colors group"
            >
              <div className="p-2.5 rounded-md bg-paper-muted dark:bg-midnight-muted border border-border-light dark:border-border-dark group-hover:border-signal">
                <FiMail size={16} />
              </div>
              <div>
                <p className="font-mono text-xs text-ink/50 dark:text-mist/50">Email</p>
                <p className="font-medium">{email}</p>
              </div>
            </a>

            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3.5 text-sm text-ink/80 dark:text-mist/80 hover:text-signal transition-colors group"
            >
              <div className="p-2.5 rounded-md bg-paper-muted dark:bg-midnight-muted border border-border-light dark:border-border-dark group-hover:border-signal">
                <FiPhone size={16} />
              </div>
              <div>
                <p className="font-mono text-xs text-ink/50 dark:text-mist/50">Phone</p>
                <p className="font-medium">{phone}</p>
              </div>
            </a>

            <div className="flex items-center gap-3.5 text-sm text-ink/80 dark:text-mist/80">
              <div className="p-2.5 rounded-md bg-paper-muted dark:bg-midnight-muted border border-border-light dark:border-border-dark">
                <FiMapPin size={16} />
              </div>
              <div>
                <p className="font-mono text-xs text-ink/50 dark:text-mist/50">Location</p>
                <p className="font-medium">{location}</p>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="card p-6 border border-border-light dark:border-border-dark">
            <h3 className="font-display font-semibold text-sm text-ink dark:text-mist mb-4">
              Connect Across the Web
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-md border border-border-light dark:border-border-dark text-xs font-mono hover:border-signal hover:text-signal transition-colors"
              >
                <FiGithub size={15} /> GitHub
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-md border border-border-light dark:border-border-dark text-xs font-mono hover:border-signal hover:text-signal transition-colors"
              >
                <FiLinkedin size={15} /> LinkedIn
              </a>
              <a
                href={leetcodeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-md border border-border-light dark:border-border-dark text-xs font-mono hover:border-signal hover:text-signal transition-colors"
              >
                <SiLeetcode size={15} /> LeetCode
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={fieldClass('name')}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                className={fieldClass('email')}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className={fieldClass('subject')}
            />
            {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
          </div>

          <div>
            <textarea
              name="message"
              rows={5}
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              className={fieldClass('message')}
            />
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
          </div>

          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
            <FiSend /> {submitting ? 'Sending...' : 'Send message'}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
