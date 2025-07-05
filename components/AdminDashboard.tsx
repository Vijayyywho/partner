import React from 'react';
import { ClientData } from '../types';

interface AdminDashboardProps {
    clients: ClientData[];
    onSelectClient: (client: ClientData) => void;
}

const statusStyles: { [key: string]: string } = {
  Running: 'bg-green-100 text-green-700',
  'Renewal Due Soon': 'bg-amber-100 text-amber-700',
  Paused: 'bg-slate-100 text-slate-600',
  Completed: 'bg-blue-100 text-blue-700',
};


const ClientCard: React.FC<{ clientData: ClientData; onClick: () => void; }> = ({ clientData, onClick }) => {
    const { clientInfo, contract, projectStatus } = clientData;
    return (
        <button 
            onClick={onClick}
            className="w-full bg-white rounded-lg shadow-sm border border-slate-200 p-5 grid grid-cols-3 gap-4 items-center text-left hover:bg-slate-50 hover:shadow-md hover:border-cyan-300 transition-all duration-200 cursor-pointer"
        >
            <div className="col-span-3 sm:col-span-1">
                <p className="font-bold text-slate-800">{clientInfo.company}</p>
                <p className="text-sm text-slate-500">{clientInfo.name}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
                 <p className="font-semibold text-slate-700">{contract.planName}</p>
                 <p className="text-sm text-slate-500">Ends: {new Date(contract.endDate).toLocaleDateString()}</p>
            </div>
             <div className="col-span-1 sm:text-right">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[projectStatus]}`}>
                    {projectStatus}
                </span>
            </div>
        </button>
    )
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ clients, onSelectClient }) => {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold text-[#233D5B]">Client Overview</h1>
        <p className="text-slate-500">Manage all your clients from this central dashboard.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-bold text-[#233D5B] mb-4">All Clients ({clients.length})</h2>
        <div className="space-y-3">
            {clients.map(client => (
                <ClientCard key={client.id} clientData={client} onClick={() => onSelectClient(client)} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;