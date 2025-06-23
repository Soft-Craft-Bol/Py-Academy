import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../ui/organisms/Footer';
import { NavbarPublic } from '../ui/organisms/NavbarPublic';

export function PublicLayout() {
  return (
    <>
      <NavbarPublic />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
