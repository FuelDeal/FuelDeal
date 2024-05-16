import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';
import manufacturersData from './cars_manu';

function Home() {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [manufacturers, setManufacturers] = useState(manufacturersData);
  const [cars, setCars] = useState([]);
  const [showCars, setShowCars] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/FuelDeal/api/manu");
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); 
        setManufacturers(data);
        console.log(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedManufacturer(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedManufacturer) {
      const manufacturerFile = manufacturers.find(m => m.manu_name === selectedManufacturer).manu_name.toLowerCase();
      try {
        const module = await import(`./${manufacturerFile}.js`);
        setCars(module.default);
        setShowCars(true);
      } catch (error) {
        console.error('Error loading manufacturer data:', error);
        setCars([]);
      }
    }
  };

  const handleCarClick = (model, year) => {
    if (model.toLowerCase() === 'corolla' && year.includes('2022')) {
      navigate(`/car-details/${model}/${year.split('-')[0]}`);
    }
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
        {showCars && cars.map(car => (
          <div key={car.id} className="car-card" onClick={() => handleCarClick(car.model_name, car.year)}>
            <img src={car.image} alt={`${car.model_name}`} style={{ width: '300px', height: 'auto' }} />
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
