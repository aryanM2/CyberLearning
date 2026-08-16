import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';

export function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#080C14]">
      <Navbar mode="user" />
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Sidebar isAdmin={true} />
        <main className="flex-1 py-8 lg:pl-8 overflow-y-auto w-full min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
