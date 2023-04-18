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
import { OidcProvider, useOidc } from '@axa-fr/react-oidc';
import {configurationAuth0} from './auth/configs';
import {Profile} from './routes/Profile';

export const configuration = {
  client_id: '7a76N12nFlJTGX6LPyO9WToZ9BqiVQjJ',
  redirect_uri: window.location.origin + '/authentication/callback',
  silent_redirect_uri:
    window.location.origin + '/authentication/silent-callback',
  scope: 'openid profile email api offline_access',
  authority: 'https://dev-6p6dxb6obb331271.us.auth0.com',
  refresh_time_before_tokens_expiration_in_second: 86400,
  service_worker_relative_url: '/OidcServiceWorker.js',
  service_worker_only: false,
};

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
      }, 
      {
        path: 'profile',
        element: <Profile />
      },
      // {
      //   path: 'authentication/callback',
      //   element: <Callback />
      // }
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
      <OidcProvider configuration={configuration}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </OidcProvider>
    );
  else return <div className="flex h-screen"></div>;
};


export const Home = () => {
  const { login, logout, renewTokens, isAuthenticated } = useOidc();

  return (
    <div className='container-fluid mt-3'>
      <p className='card-text'>
        React Demo Application protected by OpenId Connect. More info on about
        oidc on{' '}
        <a href='https://github.com/AxaGuilDEv/react-oidc'>
          GitHub @axa-fr/react-oidc
        </a>
      </p>
      {!isAuthenticated && (
        <p>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => login('/profile')}
          >
            Login
          </button>
        </p>
      )}
      {isAuthenticated && (
        <p>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => logout('/profile')}
          >
            logout /profile
          </button>
        </p>
      )}
      {isAuthenticated && (
        <p>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => logout()}
          >
            logout
          </button>
        </p>
      )}
      {isAuthenticated && (
        <p>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => logout(null)}
          >
            logout whithout callbackredirect
          </button>
        </p>
      )}
      {isAuthenticated && (
        <p>
          <button
            type='button'
            className='btn btn-primary'
            onClick={async () =>
              console.log('renewTokens result', await renewTokens())
            }
          >
            renew tokens
          </button>
        </p>
      )}
    </div>
  );
};

export default () => (
  <ScreenshotProvider>
    <App />
  </ScreenshotProvider>
);
