"use client";
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngTuple, icon, DomUtil, Control } from 'leaflet';

// Cameroon coordinates for default center
const CAMEROON_COORDINATES: LatLngTuple = [7.3697, 12.3547];

// Blue icon for user
const userIcon = icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png', // Example icon URL
  iconSize: [25, 25],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

// Red icon for blood banks
const bloodBankIcon = icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png', // You can replace with a custom icon for blood banks
  iconSize: [25, 25],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

// Custom button component for recentering the map
const RecenterButton: React.FC<{ userLocation: LatLngTuple | null }> = ({ userLocation }) => {
  const map = useMap();
  const recenterControlRef = useRef<Control | null>(null); // Ref to track recenter control

  useEffect(() => {
    if (userLocation && !recenterControlRef.current) {
      const recenterControl = new Control({ position: 'bottomleft' });

      recenterControl.onAdd = () => {
        const button = DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');
        button.innerHTML = 'C'; // Icon for the button
        button.title = 'Recenter to your location';
        button.style.backgroundColor = 'blue'; // Change to blue
        button.style.width = '34px';
        button.style.height = '34px';
        button.style.cursor = 'pointer';

        button.onclick = () => {
          map.setView(userLocation, 13); // Recenters to user location with zoom level 13
        };

        return button;
      };

      recenterControl.addTo(map);
      recenterControlRef.current = recenterControl; // Set the reference once the control is added
    }

    return () => {
      if (recenterControlRef.current) {
        map.removeControl(recenterControlRef.current); // Remove the control properly using map.removeControl
        recenterControlRef.current = null; // Reset reference
      }
    };
  }, [map, userLocation]);

  return null;
};

// Zoom control component
const ZoomControl: React.FC = () => {
  const map = useMap();

  const zoomIn = () => {
    map.zoomIn();
  };

  const zoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-16 bg-white p-2 rounded shadow-lg">
      <button onClick={zoomIn} className="text-xl font-bold p-2">+</button>
      <button onClick={zoomOut} className="text-xl font-bold p-2">-</button>
    </div>
  );
};

const FindBloodPage: React.FC = () => {
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const [bloodBanks, setBloodBanks] = useState<any[]>([]); // Blood bank data state

  // Fetch blood bank data from the API
  useEffect(() => {
    async function fetchBloodBanks() {
      try {
        const response = await fetch('/api/bloodbank'); // API endpoint to fetch blood banks
        const data = await response.json();
        setBloodBanks(data); // Set the fetched blood banks data
      } catch (error) {
        console.error('Error fetching blood banks:', error);
      }
    }

    fetchBloodBanks();

    // Get user location
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation([position.latitude, position.longitude] as LatLngTuple);
    });
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-center text-3xl font-bold mb-4 text-red-600">Find Blood Banks Near You</h1>

        <MapContainer center={CAMEROON_COORDINATES} zoom={7} className="h-96" zoomControl={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution={false}
          />
          {userLocation && (
            <>
              <Marker position={userLocation} icon={userIcon}>
                <Popup>You are here</Popup>
              </Marker>
              <Circle 
                center={userLocation} 
                radius={300} // Smaller radius for user location (300 meters)
                color="blue" 
                fillColor="blue" 
                fillOpacity={0.3}
              />
              <RecenterButton userLocation={userLocation} />
            </>
          )}
          {bloodBanks.map(bank => (
            <Marker key={bank.id} position={JSON.parse(bank.coordinates as string)} icon={bloodBankIcon}>
              <Popup>
                <strong>{bank.name}</strong><br />
                <span>Location: {bank.town}, {bank.region}, {bank.country}</span><br />
                <span>Address: {bank.address}</span>
              </Popup>
              <Circle
                center={JSON.parse(bank.coordinates as string)}
                radius={200} // Smaller radius for blood bank location (200 meters)
                color="red"
                fillColor="red"
                fillOpacity={0.3}
              />
            </Marker>
          ))}
          <ZoomControl />
        </MapContainer>
      </div>
    </div>
  );
};

export default FindBloodPage;
