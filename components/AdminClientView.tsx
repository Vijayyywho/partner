import React, { useState } from 'react';
import { ClientData, View, DeliverableType } from '../types';
import Dashboard from './Dashboard';
import Progress from './Progress';
import Contract from './Contract';
import Payments from './Payments';
import Support from './Support';
import { MOCK_RENEWAL_PLANS } from '../constants';
import { DashboardIcon, ProgressIcon, ContractIcon, PaymentsIcon, SupportIcon } from './icons';

interface AdminClientViewProps {
    clientData: ClientData;
    onUpdateDeliverables: (type: DeliverableType, change: 1 | -1) => void;
}

const TABS = [
    { id: View.Dashboard, label: 'Dashboard', icon: DashboardIcon },
    { id: View.Progress, label: 'Progress', icon: ProgressIcon },
    { id: View.Contract, label: 'Contract', icon: ContractIcon },
    { id: View.Payments, label: 'Payments', icon: PaymentsIcon },
    { id: View.Support, label: 'Support', icon: SupportIcon },
];

const AdminClientView: React.FC<AdminClientViewProps> = ({ clientData, onUpdateDeliverables }) => {
    const [activeTab, setActiveTab] = useState<View>(View.Dashboard);

    const renderContent = () => {
        switch (activeTab) {
            case View.Dashboard:
                return <Dashboard 
                    client={clientData.clientInfo} 
                    kpi={clientData.kpi}
                    contract={clientData.contract}
                    deliverablesCompleted={clientData.deliverablesCompleted}
                    onUpdateDeliverables={onUpdateDeliverables}
                />;
            case View.Progress:
                return <Progress tasks={clientData.tasks} />;
            case View.Contract:
                return <Contract contract={clientData.contract} />;
            case View.Payments:
                return <Payments invoices={clientData.invoices} renewalPlans={MOCK_RENEWAL_PLANS} addOnHistory={clientData.addOnRequests} />;
            case View.Support:
                return <Support tickets={clientData.supportTickets} />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-6 overflow-x-auto">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === tab.id
                                ? 'border-cyan-500 text-cyan-600'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="bg-slate-50 p-4 sm:p-6 lg:p-8 rounded-lg -m-4 sm:-m-6 lg:-m-8 mt-0">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminClientView;