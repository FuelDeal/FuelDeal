import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';

function Home() {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [manufacturer, setManufacturer] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [cars, setCars] = useState([]);
  const [showCars, setShowCars] = useState(false);

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/FuelDeal/api/manu");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setManufacturers(data);
      } catch (error) {
        console.error('Error fetching manufacturers:', error);
      }
    };

    fetchManufacturers();
  }, []);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedManufacturer(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedManufacturer) {
      const selectedManu = manufacturers.find(m => m.manu_name === selectedManufacturer);
      if (selectedManu) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/FuelDeal/api/manu/cars_list/${selectedManu.id}`);
          console.log(selectedManu);
          setManufacturer(selectedManu);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCars(Array.isArray(data) ? data : []);
                setSelectedManufacturer(selectedManu.id)
          setShowCars(true);
        } catch (error) {
          console.error('Error fetching cars:', error);
          setCars([]);
        }
      }
    }
  };

  const handleCarClick = (manufacturerName, manufacturerId, carId) => {
    console.log(carId);
    navigate(`/car-details/${manufacturerName}/${manufacturerId}/${carId}`);
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
                {manufacturer.manu_name.toUpperCase()}
              </option>
            ))}
          </select>
          <button type="submit" className="submit-button">Next</button>
        </form>
        {showCars && Array.isArray(cars) && cars.map(car => (
          <div key={car.id} className="car-card" onClick={() => handleCarClick(manufacturer.manu_name,manufacturer.id, car.id)}>
            <img src={`https://fueldealpics.blob.core.windows.net/cars/${car.model_name.toLowerCase()}.png`} alt={`${car.model_name}`} style={{ width: '300px', height: 'auto' }} />
            <h3>{car.model_name}</h3>
              <p>Year: {car.year}</p>
              <p>Price: {car.price} SR</p>
              <p>Tank Capacity: {car.tank} liters</p>
              <p>Fuel Consumption: {car.fuel_cons} km/L</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Home;
