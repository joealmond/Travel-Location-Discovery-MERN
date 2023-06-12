/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import LocationDetailsPage from "./LocationDetailsPage";
export default function LocationCard({POIList, setSeclectedPOI, setCurrentPage, currentPage, onSavePOIToDB, onDeletePOIFromDB, onListOfVisited, visitedDB}) {
  async function waitVisitedDB() {
    const visitedList = await visitedDB;
    return visitedList;
  }
  console.log(POIList)
  console.log(waitVisitedDB());

/*   const POIListWithCheckmarks = POIList.map(poi => {
    if (visitedDB.find(visited => {
      visited.xid === poi.xid;
    })) {
      return {
        ...poi,
        visited: true,
      }
    } else {
      return {
        ...poi,
        visited: false,
      }
    }
  })
  console.log(POIListWithCheckmarks); */

  function clickForDetails(id){
    const chosenPOI = POIList.find(POI => POI.xid === id);
    setSeclectedPOI(chosenPOI);
    setCurrentPage('details') //added for conditional rendering based on this value
  }

  function handlePoiInDB(e, feature) {
    if (e.target.checked) {
      console.log(feature);
      onSavePOIToDB(feature, 'visited', 3);
    }
    if (!e.target.checked) {
      onDeletePOIFromDB(feature.xid);
    }
  }

  return (    
    <>
    <div className="location-container">
      {POIList.map((feature, index) =>{
      return(
      <div className="location-card" key={index}>
      <label className="container">Visited
        <input type="checkbox" onClick={(e)=>{handlePoiInDB(e, feature)}}></input>
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
