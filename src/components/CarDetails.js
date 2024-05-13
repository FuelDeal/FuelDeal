import Rating from "./FuelEconomy";

const CarDetailes = () => {

    const carName = 'Toyota Corolla 2024';
    return (
        <>
        <div className="car-details-wrapper">
            <h1>{carName}</h1>
            <div className="card-details">
                <br/>
                <div className="fuel-prices">
                <Rating/>
                </div>
                <div className="car-info">
                <div className="fuel-econmy">Car Price: 77,000 <p id="sr">SR</p></div>
                    <p>Tank Size: 65L</p>
                    <div className="fuel-econmy">Fuel Economy: 17L/Km <p className="badge">Good</p></div>
                    <br/>
                    <div className="fuel-econmy">Fuel Annual Cost: 1540 <p id="sr">SR</p></div>
                </div>
            </div>
            <img className="car-image" src="https://fueldealpics.blob.core.windows.net/cars/corolla.png" />
        </div>
        </>
    )
}

export default CarDetailes