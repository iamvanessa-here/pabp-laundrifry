import React, { useState } from 'react';
import './AddCustomerModal.css';

const AddCustomerModal = ({ onClose, onAdd, existingCustomers }) => {
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', address: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nama wajib diisi';
    if (!formData.email) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email tidak valid';
    if (!formData.whatsapp) newErrors.whatsapp = 'WhatsApp wajib diisi';

    const isDuplicate = existingCustomers.some(c => 
      c.email.toLowerCase() === formData.email.toLowerCase() || c.whatsapp === formData.whatsapp
    );
    if (isDuplicate) newErrors.email = 'Email atau WhatsApp sudah terdaftar';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newCustomer = {
      id: `CUST-${String(existingCustomers.length + 1).padStart(3, '0')}`,
      ...formData,
      regDate: new Date().toISOString().split('T')[0]
    };
    onAdd(newCustomer);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Tambah Pelanggan Baru</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {['name', 'email', 'whatsapp', 'address'].map((field) => (
            <div className="form-group" key={field}>
              <label className="form-label">
                {field === 'whatsapp' ? 'Nomor WhatsApp' : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input 
                type={field === 'email' ? 'email' : 'text'} 
                className={`form-input ${errors[field] ? 'input-error' : ''}`}
                value={formData[field]}
                onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                placeholder={`Masukkan ${field === 'whatsapp' ? 'nomor WhatsApp' : field}...`}
              />
              {errors[field] && <span className="error-text">{errors[field]}</span>}
            </div>
          ))}
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Batal</button>
            <button type="submit" className="btn-primary">Simpan Pelanggan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal; // <-- PASTIKAN BARIS INI ADA