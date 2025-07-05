import React from 'react';
import { View } from '../types';
import { DashboardIcon, ProgressIcon, ContractIcon, PaymentsIcon, SupportIcon } from './icons';

interface BottomNavProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
      isActive ? 'text-cyan-600' : 'text-slate-500 hover:text-cyan-500'
    }`}
  >
    {icon}
    <span className="text-xs font-medium mt-1">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { icon: <DashboardIcon className="w-6 h-6" />, label: View.Dashboard },
    { icon: <ProgressIcon className="w-6 h-6" />, label: View.Progress },
    { icon: <ContractIcon className="w-6 h-6" />, label: View.Contract },
    { icon: <PaymentsIcon className="w-6 h-6" />, label: View.Payments },
    { icon: <SupportIcon className="w-6 h-6" />, label: View.Support },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around z-30 shadow-top">
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
  );
};

export default BottomNav;