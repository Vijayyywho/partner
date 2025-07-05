import React from 'react';
import { Kpi, Contract as ContractType, Client, Service, DeliverableType } from '../types';
import { AddIcon, RemoveIcon } from './icons';
import { MOCK_SERVICES } from '../constants';

interface DashboardProps {
  client: Client;
  kpi: Kpi;
  contract: ContractType;
  deliverablesCompleted: { posts: number; reels: number; stories: number; };
  onExploreAddons?: () => void;
  onAddToCart?: (service: Service) => void;
  onUpdateDeliverables?: (type: DeliverableType, change: 1 | -1) => void;
}

const Card: React.FC<{ children: React.ReactNode; className?: string; }> = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-sm p-4 sm:p-6 ${className}`}>{children}</div>
);

const InfoCard: React.FC<{ title: string; value: string; valueColor: string; bgColor: string; icon?: React.ReactNode; }> = ({ title, value, valueColor, bgColor, icon }) => (
    <div className={`p-4 rounded-lg flex items-center justify-between ${bgColor}`}>
        <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        </div>
        {icon && <div className="text-3xl">{icon}</div>}
    </div>
);

const KpiCard: React.FC<{ title: string; value: string; color: string; }> = ({ title, value, color }) => (
    <Card>
        <p className="text-sm text-slate-500">{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </Card>
);

const ProgressBar: React.FC<{ 
    label: string; 
    value: number; 
    max: number; 
    color: string;
    interactive?: boolean;
    onUpdate?: (change: 1 | -1) => void;
}> = ({ label, value, max, color, interactive, onUpdate }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    return (
        <div>
            <div className="flex justify-between mb-1">
                <p className="font-medium text-slate-700">{label}</p>
                <div className="flex items-center gap-2">
                    {interactive && onUpdate && (
                         <div className="flex items-center gap-1">
                            <button onClick={() => onUpdate(-1)} className="p-0.5 rounded-full bg-slate-200 hover:bg-slate-300"><RemoveIcon className="w-3 h-3 text-slate-600"/></button>
                            <button onClick={() => onUpdate(1)} className="p-0.5 rounded-full bg-slate-200 hover:bg-slate-300"><AddIcon className="w-3 h-3 text-slate-600"/></button>
                        </div>
                    )}
                    <p className="text-sm font-medium text-slate-500">{value}/{max}</p>
                </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
                <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

const Dashboard: React.FC<DashboardProps> = ({ client, kpi, contract, deliverablesCompleted, onExploreAddons, onAddToCart, onUpdateDeliverables }) => {
  const { posts: totalPosts, reels: totalReels, stories: totalStories } = contract.monthlyDeliverables;
  const { posts: completedPosts, reels: completedReels, stories: completedStories } = deliverablesCompleted;
  
  const daysLeft = Math.ceil((new Date(contract.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const addonServicesPreview = MOCK_SERVICES.slice(0, 3);
  const isAdminView = !!onUpdateDeliverables;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#233D5B]">Welcome Back, {client.name}!</h1>
        <p className="text-slate-500">{client.company}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard title="Days Left" value={daysLeft.toString()} valueColor={daysLeft > 30 ? "text-green-600" : "text-amber-600"} bgColor={daysLeft > 30 ? "bg-green-100" : "bg-amber-100"} />
          <InfoCard title="Plan Type" value={contract.planName} valueColor="text-cyan-800" bgColor="bg-cyan-100" />
      </div>

      <Card>
        <h2 className="text-lg font-bold text-[#233D5B] mb-4">Performance KPIs</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Total Leads" value={kpi.leadsGenerated.toString()} color="text-blue-600" />
            <KpiCard title="Ad Spend" value={`₹${kpi.adsSpent.toLocaleString('en-IN')}`} color="text-emerald-600" />
            <KpiCard title="Total Reach" value={kpi.totalReach.toLocaleString('en-IN')} color="text-sky-600" />
            <KpiCard title="Engagement" value={kpi.engagement} color="text-amber-600" />
        </div>
      </Card>
      
      <Card>
        <h2 className="text-lg font-bold text-[#233D5B] mb-4">Monthly Progress</h2>
        <div className="space-y-4">
            <ProgressBar label="Posts" value={completedPosts} max={totalPosts} color="bg-cyan-500" interactive={isAdminView} onUpdate={onUpdateDeliverables ? (change) => onUpdateDeliverables('posts', change) : undefined} />
            <ProgressBar label="Reels" value={completedReels} max={totalReels} color="bg-teal-500" interactive={isAdminView} onUpdate={onUpdateDeliverables ? (change) => onUpdateDeliverables('reels', change) : undefined} />
            <ProgressBar label="Stories" value={completedStories} max={totalStories} color="bg-sky-500" interactive={isAdminView} onUpdate={onUpdateDeliverables ? (change) => onUpdateDeliverables('stories', change) : undefined} />
        </div>
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[#233D5B]">Explore Add-On Services</h2>
             {onExploreAddons && (
                <button onClick={onExploreAddons} className="text-sm font-semibold text-cyan-600 hover:text-cyan-800">
                    View All Services
                </button>
             )}
        </div>
        <div className="space-y-3">
            {addonServicesPreview.map(service => (
                <div key={service.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center">
                        <div className="p-2 bg-white rounded-lg shadow-sm mr-4"><service.icon className="w-5 h-5 text-cyan-500" /></div>
                        <div>
                            <p className="font-semibold text-slate-700">{service.name}</p>
                            <p className="text-sm text-slate-500">₹{service.rate.toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                    {onAddToCart && (
                        <button onClick={() => onAddToCart(service)} className="px-4 py-2 text-sm font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700">
                            Add
                        </button>
                    )}
                </div>
            ))}
        </div>
      </Card>

    </div>
  );
};

export default Dashboard;