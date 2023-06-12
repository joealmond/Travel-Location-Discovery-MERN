import React from "react";
import LocationCard from "./LocationCard";
import { useEffect, useState } from "react";

const fetchWishedPois = () => {
    return fetch("http://localhost:3000/wished").then((res) => res.json())
}

function WishedPoisList () {

    const [wishedPois, setWishedPois] = useState([])

    useEffect(() => {
        fetchWishedPois()
            .then((pois) => 
            setWishedPois(pois)
            )
    }, [])

    return (<>{wishedPois && <LocationCard
             POIList={wishedPois}
            />}
            </>)
}

export default WishedPoisList