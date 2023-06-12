import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './leaflet/leaflet.css'

function LeafletMap({ details }) {
  // add country obj to prop

  const position = [details.point?.lat, details.point?.lon];

    return (
      <MapContainer center={position} zoom={12} scrollWheelZoom={false} style={{ width: "100%", height: "13rem" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {details?.name + ", " + details.address?.city }
          </Popup>
        </Marker>
      </MapContainer>
    );
  }

  export default LeafletMap;

  