import { useState } from "react";

function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    setIsLoading(true);
    /// navigator is an option to get location, provided by browser.
    if (!navigator.geolocation) {
      return setError("Your location does not support geolocation");
    }
    navigator.geolocation.getCurrentPosition(
      /// successCallback: PositionCallback
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      /// errorCallback: PositionErrorCallback
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, position, error, getPosition };
}

export default useGeoLocation;
