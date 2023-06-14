import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisitedLocationCard from "./VisitedLocationCard";

function VisitedPoisList() {
  const navigate = useNavigate();
  const [visitedPois, setVisitedPois] = useState([]);

  const fetchVisitedPois = () => {
    return fetch("http://localhost:3000/visited")
      .then((res) => res.json())
      .then((pois) => {
        setVisitedPois(pois);
      });
  };

  useEffect(() => {
    fetchVisitedPois();
  }, []);

  return (
    <>
      <button onClick={() => navigate("/")}>Main Page</button>
      {visitedPois && (
        <VisitedLocationCard
          visitedDB={visitedPois}
          onDelete={() => fetchVisitedPois()}
        />
      )}
    </>
  );
}

export default VisitedPoisList;
