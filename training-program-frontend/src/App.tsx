import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  useRoutes
} from "react-router-dom";
import SignIn from './components/sign_in_page/SignInPage';
import SignUp from './components/sign_up_page/SignUpPage';


const AppRoutes = () => useRoutes([
  { path: "/", element: <SignIn/> },
  { path: "/auth/signin", element: <SignIn/> },
  { path: "/auth/signup", element: <SignUp/> }
]);

export default function App() {
  return (
    <Router>
      <AppRoutes/>
    </Router>
  )
}
