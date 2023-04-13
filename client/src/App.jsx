import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Root from './routes/Root';
import Chat from './routes/Chat';
import Search from './routes/Search';
import store from './store';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ScreenshotProvider } from './utils/screenshotContext.jsx';
import { useGetSearchEnabledQuery, useGetUserQuery, useGetEndpointsQuery, useGetPresetsQuery} from '~/data-provider';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  client_secret: import.meta.env.VITE_OIDC_CLIENT_SECRET,
  onSigninCallback: (user) => {
    console.log(user);
    // window.history.replaceState({}, document.title, window.location.pathname);
  }
};

console.log("oidcConfig", oidcConfig);
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="/chat/new"
            replace={true}
          />
        )
      },
      {
        path: 'chat/:conversationId?',
        element: <Chat />
      },
      {
        path: 'search/:query?',
        element: <Search />
      }
    ]
  }
]);

const App = () => {
  const [user, setUser] = useRecoilState(store.user);
  const setIsSearchEnabled = useSetRecoilState(store.isSearchEnabled);
  const setEndpointsConfig = useSetRecoilState(store.endpointsConfig);
  const setPresets = useSetRecoilState(store.presets);

  const searchEnabledQuery = useGetSearchEnabledQuery();
  const userQuery = useGetUserQuery();
  const endpointsQuery = useGetEndpointsQuery();
  const presetsQuery = useGetPresetsQuery();

  useEffect(() => {
    if(endpointsQuery.data) {
      setEndpointsConfig(endpointsQuery.data);
    } else if(endpointsQuery.isError) {
      console.error("Failed to get endpoints", endpointsQuery.error);
      window.location.href = '/auth/login';
    }
  }, [endpointsQuery.data, endpointsQuery.isError]);

  useEffect(() => {
    if(presetsQuery.data) {
      setPresets(presetsQuery.data);
    } else if(presetsQuery.isError) {
      console.error("Failed to get presets", presetsQuery.error);
      window.location.href = '/auth/login';
    }
  }, [presetsQuery.data, presetsQuery.isError]);

  useEffect(() => {
    if (searchEnabledQuery.data) {
      setIsSearchEnabled(searchEnabledQuery.data);
    } else if(searchEnabledQuery.isError) {
      console.error("Failed to get search enabled", searchEnabledQuery.error);
    }
  }, [searchEnabledQuery.data, searchEnabledQuery.isError]);

  useEffect(() => {
    if (userQuery.data) {
      setUser(userQuery.data);
    } else if(userQuery.isError) {
      console.error("Failed to get user", userQuery.error);
      window.location.href = '/auth/login';
    }
  }, [userQuery.data, userQuery.isError]);

  if (user)
    return (
      <AuthProvider {...oidcConfig}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    );
  else return <div className="flex h-screen"></div>;
};

export default () => (
  <ScreenshotProvider>
    <App />
  </ScreenshotProvider>
);
