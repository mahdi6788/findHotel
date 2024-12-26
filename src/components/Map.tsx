import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../hooks/useGeoLocation";
import useUrlLocation from "../hooks/useUrlLocation"

//// the Map is a global componnt that sometimes we wnat to show hotels on map and sometimes we want to show selected places, so we use markerLocation and define that in each component
function Map({markerLocation}) {
  const [mapCenter, setMapCenter] = useState([36.2152, 57.6678]);
  const [lat, lng] = useUrlLocation()
  const {
    isLoading: isLoadingPosition, /// there was state with the same name isLoading so we should change this name
    position: GLPosition, /// there was state with the same name position so we should change this name
    error,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(()=>{
    if(GLPosition?.lat && GLPosition?.lng)
      setMapCenter([GLPosition.lat, GLPosition.lng])
  },
  [GLPosition])

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        {/* /// take location of user */}
        <button onClick={getPosition} className="getLocation">
          {isLoadingPosition ? "Loading..." : "My Location"}
          </button>
        <TileLayer
          attribution='&copy; 
          <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap
          </a> 
          contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {/* info based on the markerLocation */}
        {markerLocation.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>
              {/* <img style={{width:"200px"}} src={item.xl_picture_url} alt={item.price} /> */}
              € {item.price}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;

/// point to each location on map
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

/// click on the map and find info of the clicked location and use it to navigate to the defined path
function DetectClick(){
  const navigate = useNavigate()
  useMapEvent({
    click: e => navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
  return null
}