import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// styles, components
import './App.css';
import CreateUserPage from "./pages/CreateUser";
import LoginPage from "./pages/Login";
import UserProfilePage from "./pages/UserProfile";
import Header from "./components/Header";

const firebaseConfig = {
  apiKey: "AIzaSyDXHJe7XKD4yXJ6Xhm82n23vNbUFBo02d0",
  authDomain: "exercise-six-2add4.firebaseapp.com",
  projectId: "exercise-six-2add4",
  storageBucket: "exercise-six-2add4.appspot.com",
  messagingSenderId: "176896687562",
  appId: "1:176896687562:web:96de2e42271af7af5fa333"
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProfilePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/create",
    element: <CreateUserPage />,
  },
]);

function App() {
  const [appInitialized, setAppInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState({});

  useEffect(() => {
    initializeApp(firebaseConfig);
    setAppInitialized(true);
  }, []);

  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInformation(user);
        setIsLoggedIn(true);
      } else {
        setUserInformation({});
        setIsLoggedIn(false);
      }
        setIsLoading(false);
      });
    }
  }, [appInitialized]);

  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
