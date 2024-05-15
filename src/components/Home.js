import React, { useState } from 'react';
import logo from '../assets/logo.png';
import '../App.css';
import { toyota_car } from '../components/toyota_cars_response';

function Home() {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [showCars, setShowCars] = useState(false);

  const handleChange = (event) => {
    setSelectedManufacturer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowCars(selectedManufacturer === "Toyota");
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
            <option value="Toyota">Toyota</option>
          </select>
          <button type="submit" className="submit-button">Next</button>
        </form>
        {showCars && (
          <div className="car-list">
            {toyota_car.map((car, index) => (
              <div key={index} className="car-card">
                <h4>Toyota</h4> 
                <h3>{car.model_name} {new Date(car.year).getFullYear()}</h3>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
