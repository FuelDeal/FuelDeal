import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import '../App.css';

function Home() {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [manufacturers, setManufacturers] = useState([]);
  const [showCars, setShowCars] = useState(false);

  useEffect(() => {
    fetch("https://6040-2001-16a2-fd3a-1c00-dd46-2b94-ad34-919b.ngrok-free.app/FuelDeal/api/manu")
      .then(response => response.json())
      .then(data => {
        setManufacturers(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedManufacturer(event.target.value);
    console.log("Selected Manufacturer:", event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowCars(true);
  };

  return (
    <div className="App">
      <main className="main-content">
        <div className="logo-container">
          <img src={logo} alt="Company Logo" className="home-logo" />
        </div>
        <h2>Select the manufacturer</h2>
        <form onSubmit={handleSubmit} className="form-content">
          <select 
            value={selectedManufacturer}
            onChange={handleChange}
            className="select-box"
          >
            <option value="">Pick from the list</option>
            {manufacturers.map((manufacturer) => (
              <option key={manufacturer.id} value={manufacturer.manu_name}>
                {manufacturer.manu_name}
              </option>
            ))}
          </select>
          <button type="submit" className="submit-button">Next</button>
        </form>
        {showCars && (
          <div className="car-list">
            
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
