import React from 'react';
import { Contract as ContractType } from '../types';
import { CheckCircleIcon, DownloadIcon } from './icons';

const Card: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`bg-white rounded-xl shadow-sm ${className}`}>
        <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-[#233D5B]">{title}</h2>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const DetailItem: React.FC<{ label: string; value: React.ReactNode; }> = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="font-semibold text-slate-800">{value}</p>
    </div>
);

const Contract: React.FC<{ contract: ContractType }> = ({ contract }) => {
    const daysRemaining = Math.ceil((new Date(contract.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    const isExpiringSoon = daysRemaining <= 30;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#233D5B]">Contract & Services</h1>
        <p className="text-slate-500">Overview of your current service agreement.</p>
      </div>
      
      <div className="space-y-6">
        <Card title="Contract Overview">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <DetailItem label="Plan Type" value={contract.planName} />
                <DetailItem label="Start Date" value={new Date(contract.startDate).toLocaleDateString('en-GB', { day:'numeric', month: 'short', year: 'numeric'})} />
                <DetailItem label="End Date" value={new Date(contract.endDate).toLocaleDateString('en-GB', { day:'numeric', month: 'short', year: 'numeric'})} />
                <DetailItem label="Days Remaining" value={
                    <span className={daysRemaining > 0 ? 'text-green-600' : 'text-red-600'}>
                        {daysRemaining}
                    </span>
                } />
            </div>
        </Card>
        
        <Card title="Services Included">
            <ul className="space-y-3">
                {contract.services.map(service => (
                    <li key={service} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{service}</span>
                    </li>
                ))}
            </ul>
        </Card>

        <Card title="Contract Actions">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
                 <button className="flex-1 text-center px-6 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 flex items-center justify-center">
                    <DownloadIcon className="w-5 h-5 mr-2" />
                    Download Contract (PDF)
                </button>
                 <button className="flex-1 text-center px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700">
                    Renew Contract Now
                </button>
            </div>
        </Card>

        {isExpiringSoon && (
             <div className="bg-red-500 text-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div>
                    <h3 className="text-lg font-bold">Contract Expiring Soon!</h3>
                    <p className="text-red-100">Your contract expires in {daysRemaining} days. Renew now to avoid service interruption.</p>
                </div>
                <button className="px-5 py-2 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50 whitespace-nowrap">
                    Renew Now
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Contract;