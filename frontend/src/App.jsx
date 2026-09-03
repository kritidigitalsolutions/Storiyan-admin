import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { ToastContainer } from './components/ToastContainer';

// Pages
import { Dashboard } from './pages/Dashboard';
import { ContentManagement } from './pages/ContentManagement';
import { ContentPartners } from './pages/ContentPartners';
import { SubscriptionPlans } from './pages/SubscriptionPlans';
import { SubscribedUsers } from './pages/SubscribedUsers';
import { UserManagement } from './pages/UserManagement';
import { NotificationsHub } from './pages/NotificationsHub';
import { LegalCMS } from './pages/LegalCMS';
import { FAQManager } from './pages/FAQManager';
import { ContactUsInbox } from './pages/ContactUsInbox';
import { AdminSettings } from './pages/AdminSettings';

const MainLayout = () => {
  const { activeTab } = useApp();
  const [isCreateSeriesModalOpen, setIsCreateSeriesModalOpen] = useState(false);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onOpenNewSeriesModal={() => setIsCreateSeriesModalOpen(true)} />;
      case 'content':
        return (
          <ContentManagement
            isCreateModalOpen={isCreateSeriesModalOpen}
            onCloseCreateModal={() => setIsCreateSeriesModalOpen(false)}
          />
        );
      case 'partners':
        return <ContentPartners />;
      case 'plans':
        return <SubscriptionPlans />;
      case 'subscribers':
        return <SubscribedUsers />;
      case 'users':
        return <UserManagement />;
      case 'notifications':
        return <NotificationsHub />;
      case 'legal':
        return <LegalCMS />;
      case 'faqs':
        return <FAQManager />;
      case 'contact':
        return <ContactUsInbox />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#080A0F] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header onOpenNewSeriesModal={() => setIsCreateSeriesModalOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-[#080A0F]">
          {renderActivePage()}
        </main>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal />

      {/* Toast System */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
