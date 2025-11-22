// src/components/Layout/MainLayout.tsx

import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 w-full">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
