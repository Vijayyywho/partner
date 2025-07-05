import React from 'react';
import { View } from '../types';
import { DashboardIcon, ProgressIcon, ContractIcon, PaymentsIcon, SupportIcon, LogoutIcon, KpmLogoGlyph } from './icons';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: View;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-cyan-600 text-white shadow-lg'
        : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'
    }`}
  >
    <span className="mr-3">{icon}</span>
    {label}
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, onLogout }) => {
  const navItems = [
    { icon: <DashboardIcon className="w-5 h-5" />, label: View.Dashboard },
    { icon: <ProgressIcon className="w-5 h-5" />, label: View.Progress },
    { icon: <ContractIcon className="w-5 h-5" />, label: View.Contract },
    { icon: <PaymentsIcon className="w-5 h-5" />, label: View.Payments },
    { icon: <SupportIcon className="w-5 h-5" />, label: View.Support },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-white flex-col p-4 border-r border-slate-200">
      <div className="flex items-center mb-10 pl-2">
        <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg mr-3">
            <KpmLogoGlyph className="w-6 h-6 text-white" />
        </div>
        <div>
            <h1 className="text-lg font-bold text-[#233D5B]">KPM Partner</h1>
            <p className="text-xs text-slate-500">Digital Solutions</p>
        </div>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={currentView === item.label}
            onClick={() => setCurrentView(item.label)}
          />
        ))}
      </nav>
      <div className="space-y-2">
        <button
            onClick={onLogout}
            className="flex items-center w-full px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
        >
            <LogoutIcon className="w-5 h-5 mr-3" />
            Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;