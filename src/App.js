// import basics
import { Routes, Route, useLocation } from 'react-router-dom';

// import contexts
import { useProfileContext } from './contexts/ProfileContext';

// import components
import GlobalStyle from './styles/GlobalStyles';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LoadingPage from './pages/LoadingPage';
import NotFound from './pages/NotFound';
import ProjectPage from './pages/ProjectPage';
import Header from './components/Header';

// App component
const App = () => {
  const { userAccess, isLoadingProfile } = useProfileContext();
  const location = useLocation();

  // utils
  const isPathMatching = () => {
    const path = location.pathname;

    if (userAccess === "Logged In") {
      if (path.startsWith("/dashboard") || path.startsWith("/project")) {
        return true;
      }
    }

    return false;
  };

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
      {isPathMatching() && <Header />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        {renderPrivateRoutes()}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
