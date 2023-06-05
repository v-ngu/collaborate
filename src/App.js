// import basics
import { Routes, Route } from 'react-router-dom';

// import contexts
import { useProfile } from './contexts/ProfileContext';

// import components
import GlobalStyle from './styles/GlobalStyles';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LoadingPage from './pages/LoadingPage';
import NotFound from './pages/NotFound';

// App component
const App = () => {
  const { isAuthenticated, isLoading } = useProfile();
  console.log(isLoading, isAuthenticated)
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<HomePage />} />
        { isLoading && !isAuthenticated && <Route path='/dashboard' element={<LoadingPage />} />}
        { isAuthenticated && <Route path='/dashboard' element={<Dashboard />} /> }
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
