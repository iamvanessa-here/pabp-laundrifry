import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, subtitle, icon, color, bg, selectMonth, onMonthChange }) => {
  const renderIcon = () => {
    switch(icon) {
      case 'users':
        return <path d="M17 21V19C17 16.79 15.21 15 13 15H5C2.79 15 1 16.79 1 19V21M23 21V19C23 17.14 21.73 15.57 20 15.13M16 3.13C17.73 3.57 19 5.14 19 7C19 8.86 17.73 10.43 16 10.87M9 11C11.21 11 13 9.21 13 7C13 4.79 11.21 3 9 3C6.79 3 5 4.79 5 7C5 9.21 6.79 11 9 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>;
      case 'user-plus':
        return <path d="M16 21V19C16 16.79 14.21 15 12 15H5C2.79 15 1 16.79 1 19V21M23 11V17M20 14H26M9 11C11.21 11 13 9.21 13 7C13 4.79 11.21 3 9 3C6.79 3 5 4.79 5 7C5 9.21 6.79 11 9 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>;
      case 'refresh':
        return <path d="M4 4V9H4.58M19.94 11C19.45 7.05 16.08 4 12 4C8.64 4 5.77 6.07 4.58 9M4.58 9H9M20 20V15H15.42M15.42 15C14.23 17.93 11.36 20 8 20C3.92 20 0.55 16.95 0.06 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>;
      case 'clock':
        return <path d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22ZM12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>;
      default:
        return null;
    }
  };

  return (
    <div className="stat-card">
      <div className="stat-card__header">
        <div className="stat-card__icon" style={{ background: bg, color }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {renderIcon()}
          </svg>
        </div>
        {selectMonth && (
          <input 
            type="month" 
            className="stat-card__month-input" 
            value={selectMonth} 
            onChange={(e) => onMonthChange(e.target.value)} 
          />
        )}
      </div>
      <div className="stat-card__body">
        <h3 className="stat-card__value">{value}</h3>
        <p className="stat-card__title">{title}</p>
        {subtitle && <span className="stat-card__subtitle">{subtitle}</span>}
      </div>
    </div>
  );
};

export default StatCard; // <-- PASTIKAN BARIS INI ADA