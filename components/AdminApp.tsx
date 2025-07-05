import React, { useState } from 'react';
import { User, ClientData, AdminView, AddOnRequest, ApprovalStatus, DeliverableType } from '../types';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import AdminClientView from './AdminClientView';
import Approvals from './Approvals';
import { ChevronLeftIcon } from './icons';

interface AdminAppProps {
    user: User;
    onLogout: () => void;
    clients: ClientData[];
    requests: AddOnRequest[];
    onUpdateRequestStatus: (requestId: string, status: ApprovalStatus) => void;
    onUpdateDeliverables: (clientId: string, deliverable: DeliverableType, change: 1 | -1) => void;
}

const AdminApp: React.FC<AdminAppProps> = ({ user, onLogout, clients, requests, onUpdateRequestStatus, onUpdateDeliverables }) => {
    const [currentView, setCurrentView] = useState<AdminView>(AdminView.Clients);
    const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

    const handleSelectClient = (client: ClientData) => {
        setSelectedClient(client);
    };

    const handleBackToClients = () => {
        setSelectedClient(null);
        setCurrentView(AdminView.Clients);
    };
    
    // When switching view from sidebar, de-select client
    const handleSetCurrentView = (view: AdminView) => {
        setSelectedClient(null);
        setCurrentView(view);
    }
    
    const handleDeliverableUpdateForClient = (deliverable: DeliverableType, change: 1 | -1) => {
        if (selectedClient) {
            onUpdateDeliverables(selectedClient.id, deliverable, change);
        }
    }

    const renderMainView = () => {
        if (selectedClient) {
            return <AdminClientView 
                clientData={selectedClient} 
                onUpdateDeliverables={handleDeliverableUpdateForClient}
            />;
        }

        switch(currentView) {
            case AdminView.Clients:
                return <AdminDashboard clients={clients} onSelectClient={handleSelectClient} />;
            case AdminView.Approvals:
                return <Approvals requests={requests} onUpdateRequestStatus={onUpdateRequestStatus} />;
            case AdminView.Settings:
                return <div className="p-6 bg-white rounded-lg shadow-sm">Settings coming soon.</div>;
            default:
                return <AdminDashboard clients={clients} onSelectClient={handleSelectClient} />;
        }
    }

    return (
        <div className="h-screen w-full bg-slate-100 flex text-slate-900">
            <AdminSidebar 
                user={user}
                currentView={currentView}
                setCurrentView={handleSetCurrentView}
                onLogout={onLogout}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                 <header className="flex-shrink-0 bg-white border-b border-slate-200">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        {selectedClient ? (
                             <div className="flex items-center gap-4">
                                <button onClick={handleBackToClients} className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-cyan-600">
                                    <ChevronLeftIcon className="w-5 h-5" />
                                    All Clients
                                </button>
                                <span className="h-6 w-px bg-slate-200"></span>
                                <h1 className="text-lg font-bold text-[#233D5B]">
                                    {selectedClient.clientInfo.company}
                                </h1>
                            </div>
                        ) : (
                            <h1 className="text-xl font-bold text-[#233D5B]">{currentView}</h1>
                        )}
                        <p className="text-sm text-slate-500">Welcome, <span className="font-semibold">{user.name}</span></p>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {renderMainView()}
                </main>
            </div>
        </div>
    );
};

export default AdminApp;