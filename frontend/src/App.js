import styled from "styled-components"
import bg from './img/bg.png'


import { useMemo, useState } from "react";
import Orb from "./Components/Orb/Orb";
import { useGlobalContext } from "./Context/globalContext";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from "./pages/Home";
import { useAuthContext } from "./hooks/useAuthContext";
import usePreloadImage from "./hooks/usePreloadImage";

function App() {
  const { user } = useAuthContext()

  const global = useGlobalContext()

  const orbMemo = useMemo(() => {
  return <Orb />
  }, [])

    // Preload the background image
    const imageLoaded = usePreloadImage(bg);

    if (!imageLoaded) {
      return (
        <Loading>
          <div className="spinner"></div>
          Loading...
        </Loading>
      );
  }

  return (
    <AppStyled bg={bg} className="App">

    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Home /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/" />} 
        />
        <Route 
          path="/signup" 
          element={!user ? <Signup /> : <Navigate to="/" />} 
        />
      </Routes>
  </BrowserRouter>    
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.85);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(6px);
    border-radius: 32px;
    overflow-x: hidden;
    width: 100%;
    padding: 2rem;
    
    &::-webkit-scrollbar {
      width: 0;
    }
  }

  @media screen and (max-width: 768px) {
    main {
      padding: 1rem;
      border-radius: 16px;
    }
  }

  @media screen and (max-width: 480px) {
    main {
      padding: 0.5rem;
      border-radius: 10px;
    }
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  color: #333;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  position: relative;

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #333;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
    margin-bottom: 1.5rem;
  }

  &::after {
    content: 'Loading';
    animation: dots 1.5s steps(5, end) infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dots {
    0%, 20% {
      color: rgba(51, 51, 51, 0);
      text-shadow: 0.25em 0 0 rgba(51, 51, 51, 0),
                   0.5em 0 0 rgba(51, 51, 51, 0);
    }
    40% {
      color: #333;
      text-shadow: 0.25em 0 0 rgba(51, 51, 51, 0),
                   0.5em 0 0 rgba(51, 51, 51, 0);
    }
    60% {
      text-shadow: 0.25em 0 0 #333, 0.5em 0 0 rgba(51, 51, 51, 0);
    }
    80%, 100% {
      text-shadow: 0.25em 0 0 #333, 0.5em 0 0 #333;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
    
  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;



export default App;
