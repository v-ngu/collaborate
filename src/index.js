import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { ProfileProvider } from './contexts/ProfileContext';

// environment constants
const {
  REACT_APP_AUTH0_DOMAIN: domain,
  REACT_APP_AUTH0_CLIENT_ID: clientId,
  REACT_APP_AUTH0_CALLBACK_URL: redirectUri,
  REACT_APP_AUTH0_AUDIENCE: audience
} = process.env;

// root rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      // using local storage here is not the safest,
      // used for dev to have two users on the same browser
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
      }}
    >
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </Auth0Provider>
  </BrowserRouter>
);