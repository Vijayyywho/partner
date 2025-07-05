import React from 'react';
import { AddOnRequest, ApprovalStatus } from '../types';

interface ApprovalsProps {
    requests: AddOnRequest[];
    onUpdateRequestStatus: (requestId: string, status: ApprovalStatus) => void;
}

const RequestCard: React.FC<{ request: AddOnRequest; onUpdate: (id: string, status: ApprovalStatus) => void; }> = ({ request, onUpdate }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50">
            <h3 className="font-bold text-slate-800">{request.clientCompany}</h3>
            <p className="text-sm text-slate-500">
                Requested by {request.clientName} on {new Date(request.requestDate).toLocaleDateString()}
            </p>
        </div>
        <div className="p-5 space-y-2">
            <h4 className="font-semibold text-sm text-slate-600">Requested Items:</h4>
            <ul className="space-y-1">
                {request.requestedItems.map(item => (
                    <li key={item.service.id} className="flex justify-between text-sm">
                        <span className="text-slate-700">{item.quantity} x {item.service.name}</span>
                        <span className="font-medium text-slate-800">₹{(item.quantity * item.service.rate).toLocaleString('en-IN')}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="p-5 border-t border-slate-200 flex justify-between items-center">
            <p className="text-lg font-bold text-slate-900">
                Total: ₹{request.totalAmount.toLocaleString('en-IN')}
            </p>
            {request.status === ApprovalStatus.Pending && (
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => onUpdate(request.id, ApprovalStatus.Rejected)}
                        className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
                    >
                        Reject
                    </button>
                    <button 
                        onClick={() => onUpdate(request.id, ApprovalStatus.Approved)}
                        className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                        Approve
                    </button>
                </div>
            )}
        </div>
    </div>
);

const HistoryItem: React.FC<{ request: AddOnRequest }> = ({ request }) => {
    const statusStyle = request.status === ApprovalStatus.Approved 
        ? 'text-green-600 border-green-200' 
        : 'text-red-600 border-red-200';
    
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
                <p className="font-semibold text-slate-700">{request.clientCompany}</p>
                <p className="text-sm text-slate-500">
                    ₹{request.totalAmount.toLocaleString('en-IN')} on {new Date(request.requestDate).toLocaleDateString()}
                </p>
            </div>
            <span className={`px-3 py-1 text-xs font-bold rounded-full border-2 ${statusStyle}`}>
                {request.status}
            </span>
        </div>
    );
};

const Approvals: React.FC<ApprovalsProps> = ({ requests, onUpdateRequestStatus }) => {
    const pendingRequests = requests.filter(r => r.status === ApprovalStatus.Pending);
    const processedRequests = requests.filter(r => r.status !== ApprovalStatus.Pending);

  return (
    <div className="space-y-8">
       <div>
            <h1 className="text-3xl font-bold text-[#233D5B]">Add-On Approvals</h1>
            <p className="text-slate-500">Review and respond to client requests for additional services.</p>
        </div>

        <div className="space-y-6">
            <section>
                <h2 className="text-xl font-bold text-[#233D5B] mb-4">Pending Requests ({pendingRequests.length})</h2>
                {pendingRequests.length > 0 ? (
                    <div className="space-y-4">
                        {pendingRequests.map(req => (
                            <RequestCard key={req.id} request={req} onUpdate={onUpdateRequestStatus} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                        <p className="text-slate-500">No pending requests.</p>
                    </div>
                )}
            </section>

            <section>
                 <h2 className="text-xl font-bold text-[#233D5B] mb-4">Approval History</h2>
                 {processedRequests.length > 0 ? (
                    <div className="space-y-3">
                        {processedRequests.slice().reverse().map(req => (
                            <HistoryItem key={req.id} request={req} />
                        ))}
                    </div>
                 ) : (
                    <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                        <p className="text-slate-500">No processed requests yet.</p>
                    </div>
                 )}
            </section>
        </div>
    </div>
  );
};

export default Approvals;