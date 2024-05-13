
import React, { useEffect, useState } from "react";

const Rating = () => {

    const [data, setData] = useState(1);
    const [fuelPrice91, setFuelPrice91] = useState(1);
    const [fuelPrice95, setFuelPrice95] = useState(1);
    const [distance, setDistance] = useState(500);
    
    useEffect(()=>{
        const fuelCons = 17.6;
        const oilPrice91 = 2.18;
        const oilPrice95 = 2.33;
        const tank = 43;
            setFuelPrice91((tank*oilPrice91)*data)
            setFuelPrice95((tank*oilPrice95)*data)
            setDistance(data*(fuelCons*tank))
    }, [data])



    return(
        <div>
            <div>
            <span className="c-green">{fuelPrice91.toFixed(0)}<sup className="oil-type">91</sup></span>
                <span className="in-between"> I </span>
                <span className="c-red">{fuelPrice95.toFixed(0)}<sup className="oil-type">95</sup></span>
                <p id='sr'>In Saudi Riyals</p>
                
            </div>
            <br/>
        <div className="slider-content"><p>Empty</p> <input type="range" min='0' max="1" step="0.1" value={data} onChange={(e)=>setData(e.target.value)}/> <p>Full</p> </div>
        <p>You can drive for {distance.toFixed(0)} Km</p>
        <hr/>
        <br/>
        </div>
    );
}

export default Rating;