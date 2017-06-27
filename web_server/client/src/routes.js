import Base from './Base/Base';
import App from './App/App';
import LoginPage from './Login/LoginPage';
import SignUpPage from './SignUp/SignUpPage';
import Auth from './Auth/Auth';
import SearchPage from './Search/SearchPage';
import DemoPage from './Demo/DemoPage';

const routes = {
  component: Base,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, App);
        } else {
          callback(null, DemoPage);
        }
      }
    },
    {
      path: '/search',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, SearchPage);
        } else {
          callback(null, LoginPage);
        }
      }
    },
    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();
        // Change current URL to /
        replace('/');
      }
    }
  ]
};

export default routes;
