import React from 'react';
import './App.css';
import {NavLink, Route, Routes} from "react-router-dom";
import PageView from "./components/PageView/PageView";
import Form from "./components/Form/Form";
import PAGES from "./pages";
import Home from "./containers/Home/Home";

function App() {
  return (
    <div className="App">
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: 'lightgray'}}>
          <h3 style={{padding: "0px 16px", margin: '0'}}>Pages</h3>
          <ul className="nav">
              <li className="nav-item">
                  <NavLink to={"/"} className={({ isActive }) => isActive ? 'nav-link disabled' : 'nav-link'}>Home</NavLink>
              </li>
            {PAGES.map(page => (
                <li className="nav-item" key={page}>
                  <NavLink to={"/pages/" + page.toLowerCase()} className={({ isActive }) => isActive ? 'nav-link disabled' : 'nav-link'}>{page}</NavLink>
                </li>
            ))}
            <li className="nav-item">
              <NavLink to={"/pages/admin"} className={({ isActive }) => isActive ? 'nav-link disabled' : 'nav-link'}>Admin</NavLink>
            </li>
          </ul>
        </div>
      <Routes>
          <Route path="/" element={(
              <Home/>
          )}/>
        <Route path="/pages/:pageName" element={(
          <PageView/>
        )}/>
        <Route path="/pages/admin" element={(
          <Form/>
        )}/>
      </Routes>
    </div>
  );
}

export default App;
