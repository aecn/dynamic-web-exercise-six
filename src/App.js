import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// styles, components
import './App.css';
import CreateUserPage from "./pages/CreateUser";
import LoginPage from "./pages/Login";
import UserProfilePage from "./pages/UserProfile";
//import Header from "./components/Header";

const firebaseConfig = {
  apiKey: "AIzaSyDXHJe7XKD4yXJ6Xhm82n23vNbUFBo02d0",
  authDomain: "exercise-six-2add4.firebaseapp.com",
  projectId: "exercise-six-2add4",
  storageBucket: "exercise-six-2add4.appspot.com",
  messagingSenderId: "176896687562",
  appId: "1:176896687562:web:96de2e42271af7af5fa333"
};

function App() {
  const [appInitialized, setAppInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState({});
  // app is initialized when it is ready
  useEffect(() => {
    // initialize firebase
    initializeApp(firebaseConfig);
    setAppInitialized(true);
  }, []);
  // checks if user is logged in
  // user loads page, check their status
  // set state accordingly
  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user is signed in
        setUserInformation(user);
        setIsLoggedIn(true);
      } else {
        // user is signed out
        setUserInformation({});
        setIsLoggedIn(false);
      }
      // whenever state changes setLoading to false 
        setIsLoading(false);
      });
    }
  }, [appInitialized]);

  console.log({ userInformation });

  const router = createBrowserRouter([
    {
      path: "/",
      element: 
      <UserProfilePage 
        isLoggedIn={isLoggedIn}
        isLoading={isLoading}
        userInformation={userInformation}
        setIsLoggedIn={setIsLoggedIn}
        setUserInformation={setUserInformation} 
      />,
    },
    {
      path: "/login",
      element: 
      <LoginPage
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUserInformation={setUserInformation} 
      />,
    },
    {
      path: "/create",
      element: 
        <CreateUserPage
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
