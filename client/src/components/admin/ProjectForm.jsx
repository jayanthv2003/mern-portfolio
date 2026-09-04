import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios.js';

const emptyForm = {
  title: '',
  description: '',
  technologies: '',
  githubLink: '',
  liveDemoLink: '',
  image: '',
  featured: false,
  order: 0,
};

/**
 * Shared create/edit form for projects.
 * Pass `editingProject` to prefill for editing; omit it for create mode.
 */
const ProjectForm = ({ editingProject, onSaved, onCancel }) => {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingProject) {
      setForm({
        title: editingProject.title || '',
        description: editingProject.description || '',
        technologies: (editingProject.technologies || []).join(', '),
        githubLink: editingProject.githubLink || '',
        liveDemoLink: editingProject.liveDemoLink || '',
        image: editingProject.image || '',
        featured: editingProject.featured || false,
        order: editingProject.order || 0,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingProject]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      technologies: form.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      order: Number(form.order) || 0,
    };

    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, payload);
        toast.success('Project updated');
      } else {
        await api.post('/projects', payload);
        toast.success('Project created');
      }
      onSaved();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full bg-transparent border border-border-light dark:border-border-dark rounded-md px-3 py-2 text-sm outline-none focus:border-signal transition-colors';

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <h3 className="font-display font-semibold text-lg">
        {editingProject ? 'Edit project' : 'Add new project'}
      </h3>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className={inputClass}
      />

      <textarea
        name="description"
        placeholder="Description"
        rows={3}
        value={form.description}
        onChange={handleChange}
        required
        className={inputClass}
      />

      <input
        name="technologies"
        placeholder="Technologies (comma separated, e.g. React, Node.js, MongoDB)"
        value={form.technologies}
        onChange={handleChange}
        required
        className={inputClass}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="githubLink"
          placeholder="GitHub link"
          value={form.githubLink}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="liveDemoLink"
          placeholder="Live demo link"
          value={form.liveDemoLink}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <input
        name="image"
        placeholder="Project image URL"
        value={form.image}
        onChange={handleChange}
        className={inputClass}
      />

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          Order
          <input
            type="number"
            name="order"
            value={form.order}
            onChange={handleChange}
            className={`${inputClass} w-20`}
          />
        </label>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? 'Saving...' : editingProject ? 'Update project' : 'Create project'}
        </button>
        {editingProject && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
