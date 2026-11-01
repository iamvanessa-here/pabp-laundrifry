import React from 'react';

const icons = {
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  orders: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 6H13M7 10H13M7 14H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  customers: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 17C2 14.239 4.239 12 7 12C9.761 12 12 14.239 12 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 13C16.209 13 18 14.791 18 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  services: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 5L10 2L17 5V15L10 18L3 15V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 10H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const SidebarIcon = ({ name }) => {
  return <span className="sidebar__icon">{icons[name] || icons.dashboard}</span>;
};

export default SidebarIcon;