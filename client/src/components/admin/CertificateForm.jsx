import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios.js';

const emptyForm = {
  title: '',
  issuer: '',
  issueDate: '',
  credentialId: '',
  credentialUrl: '',
  image: '',
};

const CertificateForm = ({ editingCertificate, onSaved, onCancel }) => {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingCertificate) {
      setForm({
        title: editingCertificate.title || '',
        issuer: editingCertificate.issuer || '',
        issueDate: editingCertificate.issueDate
          ? editingCertificate.issueDate.substring(0, 10)
          : '',
        credentialId: editingCertificate.credentialId || '',
        credentialUrl: editingCertificate.credentialUrl || '',
        image: editingCertificate.image || '',
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingCertificate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCertificate) {
        await api.put(`/certificates/${editingCertificate._id}`, form);
        toast.success('Certificate updated');
      } else {
        await api.post('/certificates', form);
        toast.success('Certificate added');
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
        {editingCertificate ? 'Edit certificate' : 'Add new certificate'}
      </h3>

      <input
        name="title"
        placeholder="Certificate title"
        value={form.title}
        onChange={handleChange}
        required
        className={inputClass}
      />

      <input
        name="issuer"
        placeholder="Issuing organization"
        value={form.issuer}
        onChange={handleChange}
        required
        className={inputClass}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="date"
          name="issueDate"
          value={form.issueDate}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <input
          name="credentialId"
          placeholder="Credential ID (optional)"
          value={form.credentialId}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <input
        name="credentialUrl"
        placeholder="Credential verification URL"
        value={form.credentialUrl}
        onChange={handleChange}
        className={inputClass}
      />

      <input
        name="image"
        placeholder="Badge/thumbnail image URL"
        value={form.image}
        onChange={handleChange}
        className={inputClass}
      />

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? 'Saving...' : editingCertificate ? 'Update' : 'Create'}
        </button>
        {editingCertificate && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CertificateForm;
