import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './components/global/Footer';
import Navigation from './components/global/Navigation';
import Loader from './components/loader/Loader';
import AdminRoute from './components/routing/AdminRoute';
import PrivateRoute from './components/routing/PrivateRoute';
import PublicRoute from './components/routing/PublicRoute';
import GlobalStyle from './theme/globalStyles';

const Main = styled.main`
  margin-top: 6rem;
`;

const Landing = lazy(() =>
  import('./components/pages/Landing')
);

const Login = lazy(() =>
  import('./components/auth/Login')
);

const Logout = lazy(() =>
  import('./components/auth/Logout')
);

const Register = lazy(() =>
  import('./components/auth/Register')
);

const ForgotPassword = lazy(() =>
  import('./components/auth/ForgotPassword')
);

const ManageUsers = lazy(() =>
  import('./components/admin/ManageUsers')
);

const Error404 = lazy(() =>
  import('./components/error/Error404')
);

const Privacy = lazy(() =>
  import('./components/pages/Privacy')
);

const UserSettings = lazy(() =>
  import('./components/profile/UserSettings')
);

const Terms = lazy(() =>
  import('./components/pages/Terms')
);

const UserProfile = lazy(() =>
  import('./components/profile/ViewProfile')
);

const App = () => {
  return (
      <Suspense fallback={<Loader />}>
        <Navigation />
        <Main>
          <div className='container-fluid'>
            <Routes>
              {/* Begin Public Routes */}
              <Route path='/' element={<Landing />} />
              <Route
                path={process.env.REACT_APP_LOGIN_ROUTE}
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path={process.env.REACT_APP_REGISTER_ROUTE}
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
              <Route
                path={process.env.REACT_APP_FORGOTPASSWORD_ROUTE}
                element={
                  <ForgotPassword />
                }
              />
              <Route
                path={process.env.REACT_APP_VIEW_USER_PROFILE_ROUTE}
                element={
                  <UserProfile />
                }
              />
              <Route path={process.env.REACT_APP_PRIVACY_ROUTE} element={<Privacy />} />
              <Route path={process.env.REACT_APP_TOS_ROUTE} element={<Terms />} />
              {/* End Public Routes */}
              {/* Begin Private Routes */}
              <Route
                path={process.env.REACT_APP_LOGOUT_ROUTE}
                element={
                  <PrivateRoute>
                    <Logout />
                  </PrivateRoute>
                }
              />
              <Route
                path={process.env.REACT_APP_USER_SETTINGS_ROUTE}
                element={
                  <PrivateRoute>
                    <UserSettings />
                  </PrivateRoute>
                }
              />
              {/* End Private Routes */}
              {/* Begin Admin Routes */}
              <Route
                path={process.env.REACT_APP_MANAGE_USERS_ROUTE}
                element={
                  <AdminRoute>
                    <ManageUsers />
                  </AdminRoute>
                }
              />
              {/* End Admin Routes */}
              <Route path='*' element={<Error404 />} />
            </Routes>
          </div>
        </Main>
        <Footer />
        <GlobalStyle />
      </Suspense>
  );
};

export default App;