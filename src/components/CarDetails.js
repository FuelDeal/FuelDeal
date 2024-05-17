import { useParams } from 'react-router-dom';
import Rating from "./FuelEconomy";
import { useEffect, useState } from 'react';

const CarDetails = () => {
  const { manufacturer_name,manufacturer_id, car_id } = useParams();
  const [car, setCar] = useState([]);
  const [oilPrice91, setOilPrice91] = useState(1);
  const [oilPrice95, setOilPrice95] = useState(1);
  const [annualFuelCost, setAnnualFuelCost] = useState(0);

  const [data, setData] = useState(1);
  const [fuelPrice91, setFuelPrice91] = useState(1);
  const [fuelPrice95, setFuelPrice95] = useState(1);
  const [distance, setDistance] = useState(500);
  const [rating, setRating] = useState('');
  const [ratingBadge, setRatingBadge] = useState('');

   useEffect(()  => {
    console.log('hi')
    console.log(car_id+' '+manufacturer_id);
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/FuelDeal/api/manu/cars_list/${manufacturer_id}/car/${car_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCar(data);
       // setFuelPrice91((car.tank*oilPrice91)*data);
        console.log(car);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    const fetchOilPrices = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/FuelDeal/api/getOilPrice`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOilPrice91(data.oil91)
        setOilPrice95(data.oil95)
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    function getAnnualFuelCost(){
      let months = 12;
      let factory = 2;
      return (((oilPrice91+oilPrice95)/2)*car.tank*months*factory);
    }
    fetchCarDetails();
    fetchOilPrices();
    setAnnualFuelCost(getAnnualFuelCost);
  }, []);

  
  useEffect(()=>{
        setFuelPrice91((car.tank*oilPrice91)*data)
        setFuelPrice95((car.tank*oilPrice95)*data)
        setDistance(data*(car.fuel_cons*car.tank))
  }, [data, car, oilPrice91, oilPrice95])

  useEffect(() => {
    if (car.fuel_cons > 15) {
      setRating('excellent');
      setRatingBadge('badge excellent');
    } else if (car.fuel_cons > 13) {
      setRating('good');
      setRatingBadge('badge good');
    } else if (car.fuel_cons > 10) {
      setRating('average');
      setRatingBadge('badge average');
    } else {
      setRating('very poor');
      setRatingBadge('badge very-poor');
    }
  }, [car.fuel_cons]);

  return ( car && 
    <>
      <div className="car-details-wrapper">
          <h1>{manufacturer_name} {car.model_name}</h1>
          <div className="card-details">
              <br/>
              <div className="fuel-prices">
              <div>
            <div>
            <span className="c-green">{fuelPrice91.toFixed(0)}<sup className="oil-type">91</sup></span>
                <span className="in-between"> I </span>
                <span className="c-red">{fuelPrice95.toFixed(0)}<sup className="oil-type">95</sup></span>
                <p id='sr'>In Saudi Riyals</p>
                
            </div>
            <br/>
        <div className="slider-content"><p>Empty</p> <input type="range" min='0' max="1" step="0.1" value={data} onChange={(e)=>setData(e.target.value)}/> <p>Full</p> </div>
        <h3>You can drive for {distance.toFixed(0)} Km</h3>
        <hr/>
        <br/>
        </div>
              </div>
              <div className="car-info">
              <div className="fuel-econmy">Car Price: {car.price} <p id="sr">SR</p></div>
                  <p>Tank Size: {car.tank}L</p>
                  <div className="fuel-econmy">Fuel Economy: {car.fuel_cons}km/L <p className={ratingBadge}>{rating}</p></div>
                  <br/>
                  <div className="fuel-econmy">Fuel Annual Cost: {(car.tank * 2.24 * 24).toFixed(0)} <p id="sr">SR</p></div>
              </div>
          </div>
          <img src={`https://fueldealpics.blob.core.windows.net/cars/${car.model_name}.png`} alt={`${car.model_name}`} />
      </div>
    </>
  )
}

export default CarDetails;
