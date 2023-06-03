import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import GlobalStyle from './styles/GlobalStyles';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<HomePage />} />
        {
          isAuthenticated &&
          <Route path='/dashboard' element={<Dashboard />} />
        }
      </Routes>
    </>
  );
}

export default App;
