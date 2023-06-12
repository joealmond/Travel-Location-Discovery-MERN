import './App.css';
import React, { useState, useEffect } from 'react';
import LocationCard from './components/LocationCard.jsx'
import Nav from './components/Nav.jsx'; // had to import app for testing Nav component
import Search from './components/Search'; // had to import app for testing Search component
import LocationDetailsPage from './components/LocationDetailsPage';
import VisitedPOIList from './components/VisitedPOIList';
function App() {

  const [searchInput, setSearchInput] = useState('');
  const [foundPOIs, setFoundPOIs] = useState(null);
  const [recommendedPOIs, setRecommendedPOIs] = useState(null)
  const [randomPOIs, setRandomPOIs] = useState(null)
  const [currentPage, setCurrentPage] = useState('landing') // set the state with a button, and based on the values render the components conditionally 
  // I recomment to have the following pages for start: 
  // 'landing' - the starting up page with some card based on the location
  // 'search-result' - the search page with all the search results
  // 'visited' - a page with a list of the visited pages
  // 'wishlist' - a page with a list of the wishlisted pages
  // 'details' - a page with al the information about the selected POI
  const [selectedPOI, setSeclectedPOI] = useState(null);
  const [visitedBD, setVisitedDB] = useState(null);
  

  async function handleSearch(e) {
    e.preventDefault();
    console.log('Search term:', searchInput);
    const searchTerm = searchInput;
    const limit = 10;

    let response = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${searchTerm}&apikey=5ae2e3f221c38a28845f05b67591d488d91267af9454979e24c2fed5`)
    const geoname = await response.json();
    
    const lon = geoname.lon;
    const lat = geoname.lat;

    response = await fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=10000&limit=${limit}&lon=${lon}&lat=${lat}&apikey=5ae2e3f221c38a28845f05b67591d488d91267af9454979e24c2fed5`)
    const radius = await response.json();
    getDetailedPOIs(radius);
    setCurrentPage('search-result')
    setSearchInput('');
  }

  async function getDetailedPOIs(radiusList) {
    const poiPromises = radiusList.features.map(async feature => {
      const xid = feature.properties.xid;
      const res = await fetch(`https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=5ae2e3f221c38a28845f05b6d936af5939a9c23e9f508ba14d82710c`)
      return await res.json();
    });
    const detailedList = await Promise.all(poiPromises);
    setFoundPOIs(detailedList.filter(poi => poi.name.length > 0));
    console.log(detailedList);
  }

  useEffect(() => {
    displayRecommendedPOIsBasedOnUserLocation ()
  }, [])



    function displayRecommendedPOIsBasedOnUserLocation () {
      const successCallback = (position) => {
        console.log(position)
        console.log(position.coords.latitude);
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;

            fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=10000&limit=10&lon=${lon}&lat=${lat}&apikey=5ae2e3f221c38a28845f05b67591d488d91267af9454979e24c2fed5`)
                      .then(response => response.json())
                      .then(listOfRecommendedPOIs => {
                        getDetailedPOIs(listOfRecommendedPOIs);
                      })
      };
      
      // this runs if user declined. getCurrentPosition accepts a second callback which is invoked when there is an error.
      // The error callback provides an argument for an error object. For when permission is denied.
      const fetchRandomPOIs = (error) => {
        console.log('Error', error);

        displayRandomPOIsIfUserNotAllowsLocation ()
        console.log('random POI fetch called')
      };
      
      navigator.geolocation.getCurrentPosition(successCallback, fetchRandomPOIs);
    }

   async function displayRandomPOIsIfUserNotAllowsLocation () {

      const limit = 10;

      const citynames = ["Istanbul","Moscow","London","St. Petersburg","Berlin","Madrid","Rome","Kiev","Paris","Bucharest","Budapest","Hamburg","Warsaw",
        "Barcelona","Munich","Milan","Vienna","Prague","Sofia","Amsterdam"];
      
      const randomCity = citynames[Math.floor(Math.random()*citynames.length)];

      let response = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${randomCity}&apikey=5ae2e3f221c38a28845f05b67591d488d91267af9454979e24c2fed5`)
      const geoname = await response.json();
    
      const lon = geoname.lon;
      const lat = geoname.lat;

      response = await fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=10000&limit=${limit}&lon=${lon}&lat=${lat}&apikey=5ae2e3f221c38a28845f05b67591d488d91267af9454979e24c2fed5`)
      const radius = await response.json();
      getDetailedPOIs(radius);
    }

  function savePOIToServer (feature, listType, rating) {
    const image = 'https://images.pexels.com/photos/942317/pexels-photo-942317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

    const POItoSave = {
      xid: feature.xid,
      image: feature.preview ? feature.preview.source : image,
      name: feature.name,
      city: feature.address.city,
      countryCode: feature.address.country_code,
      kinds: feature.kinds,
      rating: rating,
      listType: listType
    }
    fetch("http://localhost:3000/visited", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // enter into the stringify the object to be saved
      body: JSON.stringify(POItoSave),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    setVisitedDB(showSavedPOIs());
  }, [])

  console.log(visitedBD);

  async function showSavedPOIs () {
    try {
      const response = await fetch("http://localhost:3000/visited", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      //setThisToAState(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteSavedPOI (id) {
    console.log("delete id: " + id);
    const response = await fetch(`http://localhost:3000/visited/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = "data deleted";
    return resData;
  }

  return (
    <>
    {currentPage === 'landing' && 
      <>
        {/* Here is the new search component:*/}
        <Search handleSearch={handleSearch} setSearchInput={setSearchInput} searchInput={searchInput} />
        {
        foundPOIs ? <LocationCard 
          POIList = {foundPOIs}
          setCurrentPage={setCurrentPage}
          setSeclectedPOI = {setSeclectedPOI}
          onSavePOIToDB = {savePOIToServer}
          onDeletePOIFromDB = {deleteSavedPOI}
          onListOfVisited = {showSavedPOIs}
          visitedDB = {visitedBD}
          />
                  : <>
                  {
        recommendedPOIs ? <LocationCard 
          POIList = {recommendedPOIs}
          setCurrentPage={setCurrentPage}
          setSeclectedPOI = {setSeclectedPOI}
          onSavePOIToDB = {savePOIToServer}
          onDeletePOIFromDB = {deleteSavedPOI}
          onListOfVisited = {showSavedPOIs}
          visitedDB = {visitedBD}
        />
        :
        randomPOIs &&
        <LocationCard
          POIList={randomPOIs}
          setCurrentPage={setCurrentPage}
          setSeclectedPOI = {setSeclectedPOI}
          onSavePOIToDB = {savePOIToServer}
          onDeletePOIFromDB = {deleteSavedPOI}
          onListOfVisited = {showSavedPOIs}
          visitedDB = {visitedBD}
        />
      }
                  </>
      }
      </>
    }
    {currentPage === 'search-result' && 
      <>
        {/* Here is the new nav component: */}
        <Nav handleSearch={handleSearch} setSearchInput={setSearchInput} searchInput={searchInput} setCurrentPage={setCurrentPage} />
  
        {/* We can clear this:*/}
          {/* <p>Search POI:</p>
          <div>
            <form onSubmit={handleSearch}>
              <input type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)} ></input>
            </form>
          </div> */}

        {/* We can add some more card here! Need to change 'foundPOIs' */}
        <LocationCard 
        POIList={foundPOIs} 
        setCurrentPage={setCurrentPage} 
        setSeclectedPOI = {setSeclectedPOI}
        onSavePOIToDB = {savePOIToServer}
        onDeletePOIFromDB = {deleteSavedPOI}
        onListOfVisited = {showSavedPOIs}
        visitedDB = {visitedBD}
        />
      </>

    }
    {currentPage === 'visited' && 
      <>
      
      <VisitedPOIList
      
      />
      </>
    }
    {currentPage === 'wishlist' && 
      <>
      
      <p>Wishlist page</p>
      </>
    }
    {currentPage === 'details' && 
      <>
        <Nav handleSearch={handleSearch} setSearchInput={setSearchInput} searchInput={searchInput} setCurrentPage={setCurrentPage} />
        <button onClick={()=>{setCurrentPage('search-result')}}>Back</button>
        <LocationDetailsPage
        details ={selectedPOI}
        setCurrentPage = {setCurrentPage}
        />
      </>
    }

    </>
  )
}

export default App
