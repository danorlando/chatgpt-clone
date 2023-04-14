import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import MessageHandler from '../components/MessageHandler';
import Nav from '../components/Nav';
import MobileNav from '../components/Nav/MobileNav';
import Spinner from '../components/svg/Spinner.jsx';
import { useOidc } from '@axa-fr/react-oidc';

export default function Root() {
  const [navVisible, setNavVisible] = useState(false);
  const { login, isAuthenticated} = useOidc();
  
  if (!isAuthenticated) {
    return (
      <div className="dark:gpt-dark-gray flex h-auto flex-col items-center text-sm m-auto">

      <button onClick={() => login()}>Log in</button>;
      </div>
    )
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
