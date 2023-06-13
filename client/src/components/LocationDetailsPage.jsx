/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import LeafletMap from "./LeafletMap";
import { useNavigate } from 'react-router-dom';

export default function LocationDetailsPage({details,setCurrentPage}) {
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();
  console.log(details);

  function handleShowMap(){
    setShowMap(!showMap)
  }
  console.log(details)
  let img = undefined;
  if(details.preview){
    if(details.preview.source){
      img = details.preview.source;
    }
  }

//const img = details.preview.source;


  return (<>
     
    {img ? <div className='details-back'  style={{backgroundImage: `url("${img}")`} }>
        
        <div className='detail-containter'>
            {details.name ? <h1>{details.name}</h1> : <h1>No Name</h1>}
            {details.address.country ?<div>{details.address.country}</div> : <div>No Country name</div>}
            {details.address.city ? <div>{details.address.city}</div> : <div>No City Name</div>}
            {details.wikipedia_extracts  ? <>
              {!showMap && <button onClick={handleShowMap}>Show Map</button>}
              {showMap && <button onClick={handleShowMap}>Show Description</button>}
              {!showMap && details.wikipedia_extracts && <div>{details.wikipedia_extracts.text}</div>}
              {showMap && <section id="country-map"><LeafletMap details={details}/></section>}
            </>
                                        : 
            <section id="country-map"><LeafletMap details={details}/></section>

                                        }

            
        </div>
                
                
            
    </div>: <div className='details-back'>
        
        <div className='detail-containter'>
            {details.name ? <h1>{details.name}</h1> : <h1>No Name</h1>}
            {details.address.country ?<div>{details.address.country}</div> : <div>No Country name</div>}
            {details.address.city ? <div>{details.address.city}</div> : <div>No City Name</div>}
            {details.wikipedia_extracts ? <div>{details.wikipedia_extracts.text}</div> : <section id="country-map"><LeafletMap details={details}/></section>}
            
        </div>
                
                
    </div>}
    
    </>
  )
}
