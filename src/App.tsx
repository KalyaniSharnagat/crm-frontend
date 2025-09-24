import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LeadManagement from './components/LeadManagement';
import QuotationManager from './components/QuotationManager';
import StatusTracking from './components/StatusTracking';
import FollowUpData from './components/FollowUpData';



function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadManagement setActiveTab={setActiveTab} />;
        case 'follow':
        return <FollowUpData/>;
      case 'quotations':
        return <QuotationManager />;
      case 'status':
        return <StatusTracking />;
         case 'Payment':
        return <StatusTracking />;
         case 'settings':
        return <StatusTracking />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E1F3F3] to-[#C6E0E0]">
      <div className="flex h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Navbar userName="Andrea Pirlo" userRole="CRM Manager" />
          <div className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;