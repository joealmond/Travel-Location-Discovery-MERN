
import VisitedLocationCard from "./VisitedLocationCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const fetchVisitedPois = () => {
    return fetch("http://localhost:3000/visited").then((res) => res.json())
}

function VisitedPoisList () {
const navigate = useNavigate()

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

    return (<>
    <button onClick={()=>navigate('/')}>Main Page</button> 
    {visitedPois && <VisitedLocationCard
             visitedDB={visitedPois}
             onDelete={fetchRefreshedVisitedPois}
            />}
            </>)
}

export default VisitedPoisList