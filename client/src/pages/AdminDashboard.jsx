import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { FiLogOut } from 'react-icons/fi';
import api from '../api/axios.js';
import useAuth from '../hooks/useAuth.js';
import SEO from '../components/common/SEO.jsx';
import Loader from '../components/common/Loader.jsx';
import ProjectForm from '../components/admin/ProjectForm.jsx';
import ProjectTable from '../components/admin/ProjectTable.jsx';
import CertificateForm from '../components/admin/CertificateForm.jsx';
import CertificateTable from '../components/admin/CertificateTable.jsx';
import MessagesTable from '../components/admin/MessagesTable.jsx';

const TABS = ['Projects', 'Certificates', 'Messages'];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Projects');

  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProject, setEditingProject] = useState(null);
  const [editingCertificate, setEditingCertificate] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [projectsRes, certificatesRes, messagesRes] = await Promise.all([
        api.get('/projects'),
        api.get('/certificates'),
        api.get('/contact'),
      ]);
      setProjects(projectsRes.data.data);
      setCertificates(certificatesRes.data.data);
      setMessages(messagesRes.data.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // ---- Project handlers ----
  const handleProjectSaved = () => {
    setEditingProject(null);
    loadAll();
  };

  const handleDeleteProject = async (project) => {
    if (!window.confirm(`Delete project "${project.title}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/projects/${project._id}`);
      toast.success('Project deleted');
      loadAll();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ---- Certificate handlers ----
  const handleCertificateSaved = () => {
    setEditingCertificate(null);
    loadAll();
  };

  const handleDeleteCertificate = async (cert) => {
    if (!window.confirm(`Delete certificate "${cert.title}"?`)) return;
    try {
      await api.delete(`/certificates/${cert._id}`);
      toast.success('Certificate deleted');
      loadAll();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ---- Message handlers ----
  const handleMarkRead = async (msg) => {
    try {
      await api.put(`/contact/${msg._id}/read`);
      loadAll();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteMessage = async (msg) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${msg._id}`);
      toast.success('Message deleted');
      loadAll();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <>
      <SEO title="Admin Dashboard | Jayanth" description="Manage portfolio content." />
      <div className="container-px py-10 pt-24 min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-semibold text-2xl">Admin Dashboard</h1>
            <p className="text-sm text-ink/60 dark:text-mist/60">
              Signed in as {user?.name || user?.email}
            </p>
          </div>
          <button onClick={logout} className="btn-secondary">
            <FiLogOut /> Logout
          </button>
        </div>

        <div className="flex gap-2 border-b border-border-light dark:border-border-dark mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 font-mono text-sm relative ${
                activeTab === tab ? 'text-signal' : 'text-ink/60 dark:text-mist/60'
              }`}
            >
              {tab}
              {tab === 'Messages' && unreadCount > 0 && (
                <span className="ml-1.5 text-[10px] bg-signal text-midnight rounded-full px-1.5 py-0.5">
                  {unreadCount}
                </span>
              )}
              {activeTab === tab && (
                <span className="absolute left-0 -bottom-px w-full h-[2px] bg-signal" />
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader label="Loading dashboard data" />
        ) : (
          <>
            {activeTab === 'Projects' && (
              <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
                <ProjectForm
                  editingProject={editingProject}
                  onSaved={handleProjectSaved}
                  onCancel={() => setEditingProject(null)}
                />
                <ProjectTable
                  projects={projects}
                  onEdit={setEditingProject}
                  onDelete={handleDeleteProject}
                />
              </div>
            )}

            {activeTab === 'Certificates' && (
              <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
                <CertificateForm
                  editingCertificate={editingCertificate}
                  onSaved={handleCertificateSaved}
                  onCancel={() => setEditingCertificate(null)}
                />
                <CertificateTable
                  certificates={certificates}
                  onEdit={setEditingCertificate}
                  onDelete={handleDeleteCertificate}
                />
              </div>
            )}

            {activeTab === 'Messages' && (
              <MessagesTable
                messages={messages}
                onMarkRead={handleMarkRead}
                onDelete={handleDeleteMessage}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
