import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  
  return (
    <div className="pagination">
      <button 
        className="page-btn" 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Sebelumnya
      </button>
      <span className="page-info">Halaman {currentPage} dari {totalPages}</span>
      <button 
        className="page-btn" 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
      >
        Selanjutnya →
      </button>
    </div>
  );
};

export default Pagination; // <-- PASTIKAN BARIS INI ADA