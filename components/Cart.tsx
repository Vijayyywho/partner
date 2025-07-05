import React from 'react';
import { CartItem } from '../types';
import { AddIcon, RemoveIcon, TrashIcon } from './icons';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (serviceId: string, quantity: number) => void;
  onConfirmRequest: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onConfirmRequest }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.service.rate * item.quantity, 0);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'bg-black/40' : 'pointer-events-none bg-transparent'
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-800">Your Request</h2>
            <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-slate-500 text-center mt-8">Your cart is empty.</p>
            ) : (
              cartItems.map(({ service, quantity }) => (
                <div key={service.id} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">{service.name}</h3>
                    <p className="text-sm text-slate-500">₹{service.rate.toLocaleString('en-IN')} / {service.unit}</p>
                  </div>
                  <div className="flex items-center border border-slate-200 rounded-md">
                    <button onClick={() => onUpdateQuantity(service.id, quantity - 1)} className="p-2 text-slate-500 hover:text-cyan-600"><RemoveIcon className="w-4 h-4" /></button>
                    <span className="px-3 text-sm font-medium">{quantity}</span>
                    <button onClick={() => onUpdateQuantity(service.id, quantity + 1)} className="p-2 text-slate-500 hover:text-cyan-600"><AddIcon className="w-4 h-4" /></button>
                  </div>
                   <button onClick={() => onUpdateQuantity(service.id, 0)} className="p-2 text-red-400 hover:text-red-600"><TrashIcon className="w-5 h-5" /></button>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <footer className="p-6 border-t border-slate-200 bg-slate-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-xl font-bold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <button
                onClick={onConfirmRequest}
                className="w-full py-3 px-4 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-transform transform hover:scale-105"
              >
                ✅ Confirm Request
              </button>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;