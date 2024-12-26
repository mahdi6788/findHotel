import { Outlet } from "react-router-dom";
import Map from "./Map";
import { useHotel } from "../context/HotelsProvider";

function AppLayout() {
  const { hotels } = useHotel();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />{" "}
        {/* this is a dynamic part for children components: Hotels and SigleHotel */}
      </div>
      <div className="mapContainer">
        <Map markerLocation={hotels} />
      </div>
    </div>
  );
}

export default AppLayout;



//// Note: this page "AppLayout" is layout so there are two types of components: the first components do not change like Map
////  but the second types change meaning that the content change in the same place by changing the route like Hotels and SingleHotel
