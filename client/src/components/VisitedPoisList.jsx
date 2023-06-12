import React from "react";
import LocationCard from "./LocationCard";
import { useEffect, useState } from "react";

const fetchVisitedPois = () => {
    return fetch("http://localhost:3000/visited").then((res) => res.json())
}

function VisitedPoisList () {

    const [visitedPois, setVisitedPois] = useState([])

    useEffect(() => {
        fetchVisitedPois()
            .then((pois) => 
            setVisitedPois(pois)
            )
    }, [])

    return <LocationCard
            POIList={visitedPois}
            />
}

export default VisitedPoisList