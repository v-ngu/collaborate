// import basics
import { Routes, Route } from 'react-router-dom';

// import contexts
import { useProfileContext } from './contexts/ProfileContext';

// import components
import GlobalStyle from './styles/GlobalStyles';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LoadingPage from './pages/LoadingPage';
import NotFound from './pages/NotFound';
import ProjectPage from './pages/ProjectPage';

// App component
const App = () => {
  const { userAccess, isLoadingProfile } = useProfileContext();

  // function to rendre private routes
  const renderPrivateRoutes = () => {
    if (userAccess !== "Logged Out") {
      if (isLoadingProfile) return <Route path='*' element={<LoadingPage />} />

      return (
        <>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/project/:projectId' element={<ProjectPage />} />
        </>
      )
    }
  };

  // rendering
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<HomePage />} />
        {renderPrivateRoutes()}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
