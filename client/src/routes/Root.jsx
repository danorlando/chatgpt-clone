import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import MessageHandler from '../components/MessageHandler';
import Nav from '../components/Nav';
import MobileNav from '../components/Nav/MobileNav';

export default function Root() {
  const [navVisible, setNavVisible] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  if (!isAuthenticated) {
    loginWithRedirect();
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  else {
  return (
    <>
      <div className="flex h-screen">
        <Nav
          navVisible={navVisible}
          setNavVisible={setNavVisible}
        />
        <div className="flex h-full w-full flex-1 flex-col bg-gray-50 md:pl-[260px]">
          <div className="transition-width relative flex h-full w-full flex-1 flex-col items-stretch overflow-hidden bg-white pt-10 dark:bg-gray-800 md:pt-0">
            <MobileNav setNavVisible={setNavVisible} />
            <Outlet />
          </div>
        </div>
      </div>

      <MessageHandler />
    </>
  );
  }
}
