import React from 'react';
import { Invoice, RenewalPlan, AddOnRequest, ApprovalStatus } from '../types';
import { DownloadIcon, ClockIcon } from './icons';

interface PaymentsProps {
  invoices: Invoice[];
  renewalPlans: RenewalPlan[];
  addOnHistory: AddOnRequest[];
}

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

const InvoiceItem: React.FC<{ invoice: Invoice }> = ({ invoice }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-slate-50 rounded-lg">
    <div>
        <p className="font-semibold text-slate-800">{invoice.id}</p>
        <p className="text-sm text-slate-500">{invoice.date}</p>
    </div>
    <div className="flex items-center justify-between mt-2 sm:mt-0 sm:justify-normal sm:space-x-8">
        <div className="text-right sm:text-left">
            <p className="font-bold text-slate-800">₹{invoice.amount.toLocaleString('en-IN')}</p>
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                invoice.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>
                {invoice.status}
            </span>
        </div>
        <button className="p-2 text-slate-500 hover:text-cyan-600 border border-slate-200 bg-white rounded-md shadow-sm">
            <DownloadIcon className="w-5 h-5"/>
        </button>
    </div>
  </div>
);

const RenewalPlanCard: React.FC<{ plan: RenewalPlan }> = ({ plan }) => (
    <div className={`p-5 rounded-lg border-2 ${plan.highlighted ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200 bg-white'}`}>
        <div className="flex justify-between items-baseline">
            <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
            {plan.saving && (
                <span className={`px-2 py-1 text-xs font-bold text-white ${plan.highlighted ? 'bg-cyan-500' : 'bg-slate-500'} rounded-full`}>{plan.saving}</span>
            )}
        </div>
        <p className="text-3xl font-extrabold text-slate-900 my-4">₹{plan.price.toLocaleString('en-IN')}</p>
        <button className={`w-full py-2.5 font-semibold rounded-lg ${
            plan.highlighted 
            ? 'bg-cyan-600 text-white shadow-md hover:bg-cyan-700' 
            : 'bg-white text-cyan-600 border-2 border-cyan-600 hover:bg-cyan-100'
        }`}>
            Select Plan
        </button>
    </div>
);

const StatusBadge: React.FC<{ status: ApprovalStatus }> = ({ status }) => {
    const styles: Record<ApprovalStatus, string> = {
        [ApprovalStatus.Approved]: 'bg-green-100 text-green-700',
        [ApprovalStatus.Pending]: 'bg-amber-100 text-amber-700',
        [ApprovalStatus.Rejected]: 'bg-red-100 text-red-700',
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>
            {status}
        </span>
    );
};

const AddOnHistoryItem: React.FC<{ item: AddOnRequest }> = ({ item }) => (
    <div className="p-4 bg-slate-50 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="font-semibold text-slate-800">Request for {item.requestedItems.length} service(s)</p>
                <p className="text-sm text-slate-500 flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1.5"/>
                    {new Date(item.requestDate).toLocaleDateString()} &bull; Total: ₹{item.totalAmount.toLocaleString('en-IN')}
                </p>
            </div>
            <div className="mt-2 sm:mt-0">
                <StatusBadge status={item.status} />
            </div>
        </div>
        <ul className="mt-3 ml-1 pl-4 border-l-2 border-slate-200 text-sm space-y-1">
           {item.requestedItems.map(reqItem => (
                <li key={reqItem.service.id} className="text-slate-600">
                    {reqItem.quantity} x {reqItem.service.name}
                </li>
           ))}
        </ul>
    </div>
);


const Payments: React.FC<PaymentsProps> = ({ invoices, renewalPlans, addOnHistory }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#233D5B]">Payments & Renewals</h1>
        <p className="text-slate-500">Manage your invoices and service plans.</p>
      </div>
      
      <div className="space-y-6">
        <Card title="Recent Invoices">
            <div className="space-y-3">
                {invoices.map(invoice => (
                    <InvoiceItem key={invoice.id} invoice={invoice} />
                ))}
            </div>
        </Card>

        <Card title="Add-On Request History">
            <div className="space-y-3">
                {addOnHistory.length > 0 ? (
                    addOnHistory.slice().reverse().map(item => (
                        <AddOnHistoryItem key={item.id} item={item} />
                    ))
                ) : (
                    <p className="text-center text-slate-500 py-4">No add-on requests have been made.</p>
                )}
            </div>
        </Card>

        <Card title="Renewal Plans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {renewalPlans.map(plan => (
                    <RenewalPlanCard key={plan.name} plan={plan} />
                ))}
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Payments;