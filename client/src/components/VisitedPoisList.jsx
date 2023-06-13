import React from "react";
import VisitedLocationCard from "./VisitedLocationCard";
import { useEffect, useState } from "react";

const fetchVisitedPois = () => {
    return fetch("http://localhost:3000/visited").then((res) => res.json())
}

function VisitedPoisList () {

    const [visitedPois, setVisitedPois] = useState([])

    function fetchRefreshedVisitedPois() {
        fetchVisitedPois()
            .then((pois) => {
                setVisitedPois(pois);
            })
    }

    useEffect(() => {
        fetchVisitedPois()
            .then((pois) => 
            setVisitedPois(pois)
            )
    }, [])

    return (<>{visitedPois && <VisitedLocationCard
             visitedDB={visitedPois}
             onDelete={fetchRefreshedVisitedPois}
            />}
            </>)
}

export default VisitedPoisList