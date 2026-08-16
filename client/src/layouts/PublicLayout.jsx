import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090D16]">
      <Navbar mode="public" />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
