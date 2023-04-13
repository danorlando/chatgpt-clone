import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from "react-oidc-context";
import MessageHandler from '../components/MessageHandler';
import Nav from '../components/Nav';
import MobileNav from '../components/Nav/MobileNav';
import Spinner from '../components/svg/Spinner.jsx';

export default function Root() {
  const [navVisible, setNavVisible] = useState(false);
  const auth = useAuth();

  // switch (auth.activeNavigator) {
  //   case "signinSilent":
  //       return (
  //         <div className="dark:gpt-dark-gray flex h-auto flex-col items-center text-sm">
  //           <p>Signing you in...</p>
  //           <Spinner />
  //         </div>
  //       );
  //   case "signoutRedirect":
  //       return (
  //         <div className="dark:gpt-dark-gray flex h-auto flex-col items-center text-sm">
  //           <p>Signing you out...</p>
  //           <Spinner />
  //         </div>
  //       );
  // }

  useEffect(() => {
    console.log("auth.isAuthenticated: ", auth.isAuthenticated)
    if (auth.error) {
      console.error("Auth Error: ", auth.error);
      return (
        <div className="dark:gpt-dark-gray flex h-auto flex-col items-center text-sm">
           Auth Error: {auth.error.message}
        </div>
      )
    }
    // if (!auth.isAuthenticated) {
    //   auth.signinRedirect();
    // }
    // else {
    //   console.log(`Logged in user: ${auth.user?.profile.sub}`)
    // }
  }, [auth.error, auth.isAuthenticated, auth.user]);
  
  if (!auth.isAuthenticated) {
    return (
      <div className="dark:gpt-dark-gray flex h-auto flex-col items-center text-sm m-auto">

      <button onClick={() => void auth.signinRedirect()}>Log in</button>;
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
//   else {
//     return (
//       <div className="dark:gpt-dark-gray flex h-auto flex-col items-center text-sm m-auto">
//         <Spinner />
//       </div>
//     );
//   }
// }
