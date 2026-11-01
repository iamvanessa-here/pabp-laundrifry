import React, { useState, useMemo } from 'react';
import Card from '../../components/ui/Card';
import StatCard from '../../components/Pelanggan/StatCard';
import AddCustomerModal from '../../components/Pelanggan/AddCustomerModal';
import CustomerDetailModal from '../../components/Pelanggan/CustomerDetailModal';
import Pagination from '../../components/Pelanggan/Pagination';
import { mockCustomers, mockOrders } from '../../data/mockData';
import './Pelanggan.css';

const ITEMS_PER_PAGE = 10;

const Pelanggan = () => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [orders] = useState(mockOrders);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('terbaru'); // 'terbaru' | 'terlama'
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState('2026-10'); // Untuk statistik Pelanggan Baru
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // --- Helper: Mendapatkan tanggal transaksi terbaru pelanggan ---
  const getLatestTransactionDate = (customerId) => {
    const custOrders = orders.filter(o => o.customerId === customerId && o.status === 'Selesai');
    if (custOrders.length === 0) return null;
    return new Date(Math.max(...custOrders.map(o => new Date(o.date))));
  };

  // --- 1. Logika Pencarian & Pengurutan ---
  const filteredAndSortedCustomers = useMemo(() => {
    let result = customers.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.whatsapp.includes(searchTerm)
    );

    result.sort((a, b) => {
      const dateA = getLatestTransactionDate(a.id);
      const dateB = getLatestTransactionDate(b.id);

      if (!dateA && !dateB) return 0;
      if (!dateA) return 1; // Tidak ada transaksi -> paling bawah
      if (!dateB) return -1;

      return sortOrder === 'terbaru' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [customers, orders, searchTerm, sortOrder]);

  // Reset ke halaman 1 jika pencarian/pengurutan berubah
  const handleSearchChange = (val) => { setSearchTerm(val); setCurrentPage(1); };
  const handleSortChange = (val) => { setSortOrder(val); setCurrentPage(1); };

  // --- 2. Logika Paginasi ---
  const totalPages = Math.ceil(filteredAndSortedCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = filteredAndSortedCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Jika halaman saat ini melebihi total halaman setelah filter, kembali ke halaman valid
  if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);

  // --- 3. Perhitungan Statistik Dinamis ---
  const stats = useMemo(() => {
    const total = customers.length;
    
    // Pelanggan Baru (berdasarkan bulan yang dipilih)
    const newCustomers = customers.filter(c => c.regDate.startsWith(selectedMonth)).length;
    
    // Pelanggan Kembali (>= 2 pesanan)
    const returning = customers.filter(c => orders.filter(o => o.customerId === c.id).length >= 2).length;
    const returningPercent = total > 0 ? ((returning / total) * 100).toFixed(1) : 0;
    
    // Pesanan Aktif (Status "Dalam Proses")
    const activeOrders = orders.filter(o => o.status === 'Dalam Proses').length;

    return { total, newCustomers, returning, returningPercent, activeOrders };
  }, [customers, orders, selectedMonth]);

  // --- Handlers ---
  const handleAddCustomer = (newCustomer) => {
    setCustomers([newCustomer, ...customers]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="pelanggan">
      {/* Statistik Dashboard */}
      <div className="stats-grid">
        <StatCard title="Total Pelanggan" value={stats.total} icon="users" color="#2563EB" bg="#DBEAFE" />
        <StatCard 
          title="Pelanggan Baru" 
          value={stats.newCustomers} 
          subtitle={`Bulan ${selectedMonth}`}
          icon="user-plus" 
          color="#10B981" 
          bg="#D1FAE5"
          selectMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
        <StatCard 
          title="Pelanggan Kembali" 
          value={stats.returning} 
          subtitle={`${stats.returningPercent}% dari total`}
          icon="refresh" 
          color="#8B5CF6" 
          bg="#EDE9FE" 
        />
        <StatCard title="Pesanan Aktif" value={stats.activeOrders} icon="clock" color="#F59E0B" bg="#FEF3C7" />
      </div>

      {/* Action Bar */}
      <div className="action-bar">
        <div className="search-sort-group">
          <div className="search-box">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input 
              type="text" 
              placeholder="Cari nama, email, atau WhatsApp..." 
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <select 
            className="sort-select" 
            value={sortOrder} 
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="terbaru">Transaksi Terbaru</option>
            <option value="terlama">Transaksi Terlama</option>
          </select>
        </div>
        <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3V15M3 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Tambah Pelanggan
        </button>
      </div>

      {/* Tabel Pelanggan */}
      <Card className="table-card" padding="md">
        <div className="table-header">
          <h3 className="table-title">Pelanggan Terdaftar</h3>
          <span className="table-count">Menampilkan {paginatedCustomers.length} dari {filteredAndSortedCustomers.length} pelanggan</span>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nama Pelanggan</th>
                <th>Email</th>
                <th>WhatsApp</th>
                <th>Total Pesanan</th>
                <th>Total Transaksi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map(cust => {
                const custOrders = orders.filter(o => o.customerId === cust.id);
                const totalSpent = custOrders.filter(o => o.status === 'Selesai').reduce((sum, o) => sum + o.amount, 0);
                
                return (
                  <tr key={cust.id} onClick={() => setSelectedCustomer(cust)} className="clickable-row">
                    <td className="font-medium">{cust.name}</td>
                    <td>{cust.email}</td>
                    <td>{cust.whatsapp}</td>
                    <td>{custOrders.length}</td>
                    <td className="font-medium">Rp {totalSpent.toLocaleString('id-ID')}</td>
                    <td>
                      <button className="btn-icon" title="Lihat Detail" onClick={(e) => { e.stopPropagation(); setSelectedCustomer(cust); }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 3C4.5 3 2 8 2 8C2 8 4.5 13 8 13C11.5 13 14 8 14 8C14 8 11.5 3 8 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                          <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {paginatedCustomers.length === 0 && (
                <tr><td colSpan="6" className="text-center text-muted" style={{padding: '40px 0'}}>Tidak ada pelanggan yang cocok.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </Card>

      {/* Modals */}
      {isAddModalOpen && (
        <AddCustomerModal 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={handleAddCustomer} 
          existingCustomers={customers}
        />
      )}
      
      {selectedCustomer && (
        <CustomerDetailModal 
          customer={selectedCustomer} 
          orders={orders.filter(o => o.customerId === selectedCustomer.id)}
          onClose={() => setSelectedCustomer(null)} 
        />
      )}
    </div>
  );
};

export default Pelanggan;