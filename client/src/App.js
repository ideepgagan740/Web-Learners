// import logo from './logo.svg';
import './App.css';
import React, { useReducer,createContext } from 'react';
import { Routes,Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from "./components/About";
import Contact from "./components/Contact";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Logout from './components/Logout';
import ErrorPage from './components/ErrorPage';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import {reducer,initialState} from "../src/reducer/UseReducer"
// ContextAPI
export const UserContext =createContext();
function App() {
  
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/*" element={<ErrorPage />}></Route>
      </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
