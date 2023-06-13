/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import LocationDetailsPage from "./LocationDetailsPage";
export default function LocationCard({POIList, setSeclectedPOI, setCurrentPage, currentPage, onSavePOIToDB, onDeletePOIFromDB, visitedDB}) {
  const POIListWithCheckmarks = [];

  for (const poi of POIList) {
    POIListWithCheckmarks.push({
      ...poi,
      visited: false,
    });
  }

  for (const visited of visitedDB) {
    for (const poi of POIListWithCheckmarks) {
      if (poi.xid === visited.xid) {
        poi.visited = true;
      }
    }
  }
  function clickForDetails(id) {
    const chosenPOI = POIList.find(POI => POI.xid === id);
    setSeclectedPOI(chosenPOI);
    setCurrentPage('details') //added for conditional rendering based on this value
  }

  function handlePoiInDB(e, feature) {
    if (e.target.checked) {
      onSavePOIToDB(feature, 'visited', 3);
    }
    if (!e.target.checked) {
      onDeletePOIFromDB(feature.xid);
    }
  }

  return (    
    <>
    <div className="location-container">
      {POIListWithCheckmarks.map((feature, index) =>{
      return(
      <div className="location-card" key={index}>
      <label className="container">Visited
        {feature.visited
          ? <input type="checkbox" defaultChecked onClick={(e)=>{handlePoiInDB(e, feature)}}></input>
          : <input type="checkbox" onClick={(e)=>{handlePoiInDB(e, feature)}}></input>
        }
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
