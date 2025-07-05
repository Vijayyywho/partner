import React from 'react';
import { CartIcon, BellIcon, UserIcon, KpmLogoGlyph } from './icons';

interface HeaderProps {
  onCartClick: () => void;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, cartItemCount }) => {
  return (
    <header className="flex-shrink-0 bg-[#00AEEF] text-white shadow-md z-20">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo for Mobile */}
        <div className="flex items-center md:hidden">
            <KpmLogoGlyph className="w-8 h-8 text-white" />
        </div>
        
        {/* Spacer for desktop to push icons to right */}
        <div className="hidden md:block flex-1"></div>

        {/* Action Icons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button onClick={onCartClick} className="relative p-2 rounded-full hover:bg-black/10 transition-colors">
            <CartIcon className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-[#00AEEF] rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
          <button className="p-2 rounded-full hover:bg-black/10 transition-colors">
            <BellIcon className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full hover:bg-black/10 transition-colors">
            <UserIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;