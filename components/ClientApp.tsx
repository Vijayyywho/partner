import React, { useState, useCallback } from 'react';
import { User, ClientData, CartItem, Service, View, AddOnRequest } from '../types';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';
import Cart from './Cart';
import Dashboard from './Dashboard';
import Progress from './Progress';
import Contract from './Contract';
import Payments from './Payments';
import Store from './Store';
import Support from './Support';
import { MOCK_SERVICES, MOCK_RENEWAL_PLANS } from '../constants';

interface ClientAppProps {
    user: User;
    clientData: ClientData;
    onLogout: () => void;
    onAddOnRequest: (client: ClientData, items: CartItem[], total: number) => void;
}

const ClientApp: React.FC<ClientAppProps> = ({ user, clientData, onLogout, onAddOnRequest }) => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = useCallback((service: Service) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.service.id === service.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.service.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { service, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((serviceId: string, quantity: number) => {
    setCartItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.service.id !== serviceId);
      }
      return prevItems.map(item =>
        item.service.id === serviceId ? { ...item, quantity } : item
      );
    });
  }, []);
  
  const handleConfirmRequest = useCallback(() => {
    const total = cartItems.reduce((sum, item) => sum + item.service.rate * item.quantity, 0);
    onAddOnRequest(clientData, cartItems, total);
    alert('Request submitted! You can track its status under Payments > Add-On Request History.');
    setCartItems([]);
    setIsCartOpen(false);
  }, [clientData, cartItems, onAddOnRequest]);


  const renderView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <Dashboard 
          client={clientData.clientInfo} 
          kpi={clientData.kpi}
          contract={clientData.contract}
          deliverablesCompleted={clientData.deliverablesCompleted}
          onExploreAddons={() => setCurrentView(View.Store)}
          onAddToCart={handleAddToCart}
        />;
      case View.Progress:
        return <Progress tasks={clientData.tasks} />;
      case View.Contract:
        return <Contract contract={clientData.contract} />;
      case View.Payments:
        return <Payments 
                    invoices={clientData.invoices} 
                    renewalPlans={MOCK_RENEWAL_PLANS} 
                    addOnHistory={clientData.addOnRequests}
                />;
      case View.Store:
        return <Store services={MOCK_SERVICES} onAddToCart={handleAddToCart} />;
      case View.Support:
        return <Support tickets={clientData.supportTickets} />;
      default:
        return <Dashboard 
          client={clientData.clientInfo} 
          kpi={clientData.kpi}
          contract={clientData.contract}
          deliverablesCompleted={clientData.deliverablesCompleted}
          onExploreAddons={() => setCurrentView(View.Store)}
          onAddToCart={handleAddToCart}
        />;
    }
  };
  
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="h-screen w-full bg-slate-50 flex text-slate-900">
        <Sidebar 
            currentView={currentView}
            setCurrentView={setCurrentView}
            onLogout={onLogout}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
            <Header
                onCartClick={() => setIsCartOpen(true)}
                cartItemCount={cartItemCount}
             />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
                {renderView()}
            </main>
        </div>
        <BottomNav
            currentView={currentView}
            setCurrentView={setCurrentView}
        />
        <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onConfirmRequest={handleConfirmRequest}
        />
    </div>
  );
};

export default ClientApp;