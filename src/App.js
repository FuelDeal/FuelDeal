import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './assets/logo.png';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import SignUp from './components/Signup';
import CarDetails from './components/CarDetails'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <img src={logo} alt="Fuel Deal Logo" className="logo" />
          <nav className="nav-container">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/car-details/:manufacturer_name/:manufacturer_id/:car_id" element={<CarDetails />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
