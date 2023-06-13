/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import LocationDetailsPage from "./LocationDetailsPage";
export default function VisitedLocationCard({onDelete, visitedDB}) {
  const [visited, setVisited] = useState(visitedDB);

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

  return (    
    <>
    <div className="location-container">
      {visited.map((feature, index) =>{
      return(
      <div className="location-card" key={index}>
      <label className="container">Visited
        <input type="checkbox" checked={true} onChange={() => deleteSavedPOI(feature.xid)}></input>
        <span className="checkmark"></span>
      </label>
        <div id={feature.xid} className='border' onClick={(e)=>{clickForDetails(e.target.parentNode.id)}}>
          <div>{feature.name}</div>
          <div>{feature.address && feature.address.city}</div>
          <div>{feature.address && feature.address.country}</div>
        </div>
      </div>)
    })}
    </div>
    </>   
  )
}
