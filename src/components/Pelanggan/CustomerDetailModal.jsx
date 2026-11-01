import React, { useState } from 'react';
import './CustomerDetailModal.css';

const CustomerDetailModal = ({ customer, orders, onClose }) => {
  const [viewingOrder, setViewingOrder] = useState(null);

  const hasActiveOrder = orders.some(o => o.status === 'Dalam Proses');
  const completedOrders = orders.filter(o => o.status === 'Selesai');
  const totalSpent = completedOrders.reduce((sum, o) => sum + o.amount, 0);
  const latestOrder = orders.length > 0 
    ? orders.reduce((prev, current) => (new Date(prev.date) > new Date(current.date)) ? prev : current) 
    : null;

  if (viewingOrder) {
    return (
      <div className="modal-overlay" onClick={() => setViewingOrder(null)}>
        <div className="modal-content modal-content--sm" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">Detail Pesanan {viewingOrder.id}</h2>
            <button className="modal-close" onClick={() => setViewingOrder(null)}>✕</button>
          </div>
          <div className="detail-grid">
            <div className="detail-item"><span className="detail-label">Tanggal</span><span className="detail-value">{viewingOrder.date}</span></div>
            <div className="detail-item"><span className="detail-label">Layanan</span><span className="detail-value">{viewingOrder.service}</span></div>
            <div className="detail-item"><span className="detail-label">Status</span><span className={`badge badge--${viewingOrder.status === 'Selesai' ? 'success' : 'info'}`}>{viewingOrder.status}</span></div>
            <div className="detail-item"><span className="detail-label">Total</span><span className="detail-value font-medium">Rp {viewingOrder.amount.toLocaleString('id-ID')}</span></div>
          </div>
          <div className="modal-footer">
            <button className="btn-secondary" onClick={() => setViewingOrder(null)}>Kembali ke Profil</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content--lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{customer.name}</h2>
            <span className={`status-badge ${hasActiveOrder ? 'status-active' : 'status-inactive'}`}>
              {hasActiveOrder ? 'Aktif' : 'Tidak Aktif'}
            </span>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="detail-section">
          <h3 className="section-title">Informasi Pelanggan</h3>
          <div className="detail-grid">
            <div className="detail-item"><span className="detail-label">Email</span><span className="detail-value">{customer.email}</span></div>
            <div className="detail-item"><span className="detail-label">WhatsApp</span><span className="detail-value">{customer.whatsapp}</span></div>
            <div className="detail-item full-width"><span className="detail-label">Alamat</span><span className="detail-value">{customer.address}</span></div>
            <div className="detail-item"><span className="detail-label">Tanggal Registrasi</span><span className="detail-value">{customer.regDate}</span></div>
          </div>
        </div>

        <div className="detail-section">
          <h3 className="section-title">Statistik Transaksi</h3>
          <div className="stats-row">
            <div className="mini-stat"><span className="mini-stat-value">{orders.length}</span><span className="mini-stat-label">Total Pesanan</span></div>
            <div className="mini-stat"><span className="mini-stat-value">Rp {totalSpent.toLocaleString('id-ID')}</span><span className="mini-stat-label">Total Transaksi</span></div>
            <div className="mini-stat"><span className="mini-stat-value">{completedOrders.length}</span><span className="mini-stat-label">Transaksi Selesai</span></div>
            <div className="mini-stat"><span className="mini-stat-value">{latestOrder ? latestOrder.date : '-'}</span><span className="mini-stat-label">Transaksi Terakhir</span></div>
          </div>
        </div>

        {latestOrder && (
          <div className="detail-section">
            <h3 className="section-title">Pesanan Terbaru</h3>
            <div className="latest-order-card">
              <div className="latest-order-info">
                <span className="order-id">{latestOrder.id}</span>
                <span className="order-date">{latestOrder.date}</span>
                <span className="order-service">{latestOrder.service}</span>
                <span className={`badge badge--${latestOrder.status === 'Selesai' ? 'success' : 'info'}`}>{latestOrder.status}</span>
                <span className="order-amount">Rp {latestOrder.amount.toLocaleString('id-ID')}</span>
              </div>
              <button className="btn-link" onClick={() => setViewingOrder(latestOrder)}>Lihat Detail Pesanan →</button>
            </div>
          </div>
        )}
        {!latestOrder && <div className="empty-state">Pelanggan ini belum memiliki riwayat pesanan.</div>}
      </div>
    </div>
  );
};

export default CustomerDetailModal; // <-- PASTIKAN BARIS INI ADA