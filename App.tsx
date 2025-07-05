import React, { useState, useCallback } from 'react';
import { User, UserRole, ClientData, CartItem, ApprovalStatus, AddOnRequest, DeliverableType } from './types';
import { MOCK_USERS, MOCK_CLIENTS_DATA, MOCK_APPROVAL_REQUESTS } from './constants';
import Login from './components/Login';
import ClientApp from './components/ClientApp';
import AdminApp from './components/AdminApp';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [clientsData, setClientsData] = useState<ClientData[]>(MOCK_CLIENTS_DATA);
  const [approvalRequests, setApprovalRequests] = useState<AddOnRequest[]>(MOCK_APPROVAL_REQUESTS);

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const handleAddOnRequest = useCallback((client: ClientData, items: CartItem[], total: number) => {
    const newRequest: AddOnRequest = {
        id: `req-${Date.now()}`,
        clientId: client.id,
        clientName: client.clientInfo.name,
        clientCompany: client.clientInfo.company,
        requestedItems: items,
        totalAmount: total,
        status: ApprovalStatus.Pending,
        requestDate: new Date().toISOString()
    };
    
    // Add to global list of requests for admin view
    setApprovalRequests(prev => [...prev, newRequest]);
    
    // Add to specific client's history for their view
    setClientsData(prev => prev.map(c => 
        c.id === client.id 
            ? { ...c, addOnRequests: [...c.addOnRequests, newRequest] } 
            : c
    ));

  }, []);

  const handleUpdateRequestStatus = useCallback((requestId: string, newStatus: ApprovalStatus) => {
    let updatedRequest: AddOnRequest | undefined;

    // Update the master list of requests
    setApprovalRequests(prev => prev.map(req => {
        if (req.id === requestId) {
            updatedRequest = { ...req, status: newStatus };
            return updatedRequest;
        }
        return req;
    }));

    if (updatedRequest) {
      // Update the request in the specific client's data
      setClientsData(prev => prev.map(client => {
          if (client.id === updatedRequest!.clientId) {
              const updatedClientRequests = client.addOnRequests.map(req => 
                  req.id === requestId ? { ...req, status: newStatus } : req
              );

              // If approved, update the total add-on charges
              const newTotalCharges = newStatus === ApprovalStatus.Approved
                  ? client.contract.totalAddOnCharges + updatedRequest!.totalAmount
                  : client.contract.totalAddOnCharges;
              
              return { 
                  ...client, 
                  addOnRequests: updatedClientRequests,
                  contract: { ...client.contract, totalAddOnCharges: newTotalCharges }
              };
          }
          return client;
      }));
    }
  }, []);
  
  const handleUpdateDeliverables = useCallback((clientId: string, deliverable: DeliverableType, change: 1 | -1) => {
    setClientsData(prev => prev.map(c => {
        if (c.id === clientId) {
            const currentCount = c.deliverablesCompleted[deliverable];
            const maxCount = c.contract.monthlyDeliverables[deliverable];
            const newCount = Math.max(0, Math.min(maxCount, currentCount + change)); // prevent going below 0 or above max
            return {
                ...c,
                deliverablesCompleted: {
                    ...c.deliverablesCompleted,
                    [deliverable]: newCount,
                }
            };
        }
        return c;
    }));
  }, []);


  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  if (currentUser.role === UserRole.Admin) {
    return (
        <AdminApp 
            user={currentUser} 
            onLogout={handleLogout} 
            clients={clientsData}
            requests={approvalRequests}
            onUpdateRequestStatus={handleUpdateRequestStatus}
            onUpdateDeliverables={handleUpdateDeliverables}
        />
    );
  }

  if (currentUser.role === UserRole.Client) {
    const clientData = clientsData.find(d => d.id === currentUser.clientDataId);
    if (!clientData) {
        return (
            <div className="flex items-center justify-center h-screen bg-red-100 text-red-800">
                Error: Client data not found for user.
                <button onClick={handleLogout} className="ml-4 p-2 bg-cyan-600 text-white rounded">Logout</button>
            </div>
        );
    }
    return (
        <ClientApp 
            user={currentUser} 
            clientData={clientData} 
            onLogout={handleLogout} 
            onAddOnRequest={handleAddOnRequest}
        />
    );
  }

  return null; // Should not be reached
};

export default App;