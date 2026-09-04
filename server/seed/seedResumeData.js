import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Certificate from '../models/Certificate.js';

dotenv.config();

const seedResumeData = async () => {
  await connectDB();

  console.log('Seeding resume data for Jayanth V...');

  // 1. Seed or Update Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'jayanthv2003@gmail.com';
  const adminName = process.env.ADMIN_NAME || 'Jayanth V';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPassword123!';

  const existingUser = await User.findOne({ email: adminEmail });
  if (!existingUser) {
    await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log(`Admin user ${adminEmail} already exists.`);
  }

  // 2. Seed Projects from Resume
  const projects = [
    {
      title: 'NovaChat – Context-Aware AI Chatbot & Dialogue Manager',
      description:
        'Engineered a full-stack conversational AI platform integrating spaCy NLU for real-time intent classification, sentiment scoring, and Named Entity Recognition (NER). Implemented a finite-state dialogue manager with sliding-window memory and turn summarization to maintain multi-turn context while minimizing token bloat. Integrated Hugging Face LLM APIs (Qwen2.5-7B, Zephyr-7B) with graceful fallback heuristics, along with a RESTful Flask backend and SQLite3 persistence supporting multi-format history exports (JSON, DOCX, PDF).',
      technologies: ['Python 3.x', 'Flask', 'Tailwind CSS', 'spaCy', 'Hugging Face API', 'SQLite3', 'JavaScript'],
      githubLink: 'https://github.com/jayanthv2003',
      image: '/projects/novachat-preview.svg',
      featured: true,
      order: 1,
    },
    {
      title: 'Pizza Palace – Online Food Order & Management System',
      description:
        'Engineered a full-stack web application automating customer registration, menu browsing, cart management, and real-time order tracking. Designed and normalized a MySQL database schema managing relational tables for users, orders, and inventory. Built a responsive administrative dashboard providing real-time order status tracking, customer records, and automated sales reports, hardened with input sanitization and prepared statements against SQL injection and XSS.',
      technologies: ['PHP', 'MySQL', 'JavaScript (ES6)', 'HTML5', 'CSS3', 'Tailwind CSS', 'XAMPP'],
      githubLink: 'https://github.com/jayanthv2003',
      image: '/projects/pizzapalace-preview.svg',
      featured: true,
      order: 2,
    },
  ];

  for (const p of projects) {
    const existing = await Project.findOne({ title: p.title });
    if (!existing) {
      await Project.create(p);
      console.log(`Project added: ${p.title}`);
    } else {
      await Project.updateOne({ _id: existing._id }, p);
      console.log(`Project updated: ${p.title}`);
    }
  }

  // 3. Seed Certifications & Achievements from Resume
  const certificates = [
    {
      title: 'Full-Stack Web Development',
      issuer: 'Hands-on Production & Project Experience',
      issueDate: new Date('2025-06-01'),
      credentialUrl: 'https://github.com/jayanthv2003',
    },
    {
      title: 'Problem Solving & Data Structures (DSA)',
      issuer: 'LeetCode',
      issueDate: new Date('2025-01-01'),
      credentialId: 'JayanthDev',
      credentialUrl: 'https://leetcode.com/u/JayanthDev',
    },
  ];

  for (const c of certificates) {
    const existing = await Certificate.findOne({ title: c.title });
    if (!existing) {
      await Certificate.create(c);
      console.log(`Certificate added: ${c.title}`);
    } else {
      await Certificate.updateOne({ _id: existing._id }, c);
      console.log(`Certificate updated: ${c.title}`);
    }
  }

  console.log('Resume data seeding completed successfully!');
  process.exit(0);
};

seedResumeData().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});

