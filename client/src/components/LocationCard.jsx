/* eslint-disable react/prop-types */
import { useState } from "react";
import LocationDetailsPage from "./LocationDetailsPage";
export default function LocationCard({ POIList, setSeclectedPOI, setCurrentPage, currentPage }) {
  
  
  console.log(POIList)

  function clickVisited() {
    console.log('check')
  }
  function clickForDetails(id) {
    const chosenPOI = POIList.find(POI => POI.xid === id);
    setSeclectedPOI(chosenPOI);
    setCurrentPage('details') //added for conditional rendering based on this value
  }

  return (
    <>
      <div className="location-container">
        {POIList.map((feature, index) => {
          return (
            <div className="location-card" key={index}>
              <form className='form-control' onSubmit={(e) => { e.preventDefault() }}>
                <label htmlFor={'checkbox' + index} >Visited?</label>
                <input name={'checkbox' + index} id={'chx' + index} type="checkbox" onClick={() => { clickVisited() }}></input>
              </form>

              <div id={feature.xid} className='border' onClick={(e) => { clickForDetails(e.target.parentNode.id) }}>
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
