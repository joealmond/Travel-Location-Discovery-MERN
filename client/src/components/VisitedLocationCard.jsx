/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import LocationDetailsPage from "./LocationDetailsPage";
export default function VisitedLocationCard({onDelete, visitedDB}) {
  const [visited, setVisited] = useState(visitedDB);
  const [selectedPOI, setSelectedPOI] = useState(null);

  useEffect(() => {
    setVisited(visitedDB);
  }, [visitedDB]);

  async function deleteSavedPOI (id) {
    console.log("delete id: " + id);
    const response = await fetch(`http://localhost:3000/visited/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = "data deleted";
    onDelete();
    return resData;
  }

  async function handleSelectedPOI(feature) {
    const response = await fetch(`https://api.opentripmap.com/0.1/en/places/xid/${feature.xid}?apikey=5ae2e3f221c38a28845f05b6d936af5939a9c23e9f508ba14d82710c`);
    const selected = await response.json();
    setSelectedPOI(selected);
  }

  return (    
    <>
    {
      selectedPOI
        ? <LocationDetailsPage
        details ={selectedPOI} />
        : <div className="location-container">
        {visited.map((feature, index) =>{
        return(
        <div className="location-card" key={index}>
        <label className="container">Visited
          <input type="checkbox" checked={true} onChange={() => deleteSavedPOI(feature.xid)}></input>
          <span className="checkmark"></span>
        </label>
          <div id={feature.xid} className='border' onClick={() => handleSelectedPOI(feature)}>
            <div>{feature.name}</div>
            <div>{feature.address && feature.address.city}</div>
            <div>{feature.address && feature.address.country}</div>
          </div>
        </div>)
      })}
      </div>
    }
    
    </>   
  )
}
