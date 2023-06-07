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
import Project from './pages/Project';

// App component
const App = () => {
  const { isAuthenticated, isLoadingProfile } = useProfile();

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<HomePage />} />
        {isLoadingProfile && <Route path='*' element={<LoadingPage />} />}
        {
          isAuthenticated &&
          <>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/project/:projectId' element={<Project />} />
          </>
        }
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
