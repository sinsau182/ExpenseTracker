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

function App() {
  

  const { user } = useAuthContext()

  const global = useGlobalContext()
  console.log(global);

  

const orbMemo = useMemo(() => {
  return <Orb />
}, [])
  
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
    max-width: 1200px;
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



export default App;
