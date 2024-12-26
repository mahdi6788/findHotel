import { useContext, useState } from "react";
import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();

function HotelsProvider({ children }) {
  /// get states created before
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  /// get inforamtion from database using created useFetch hook
  /// url of server (database)
  const URL = "http://localhost:5000/hotels";
  // const URL = "https://bookinghotel-opal.vercel.app/db.json";

  /// filter from database
  const query = `name_like=${destination || ""}&accommodates_gte=${
    room || 1
  }&host_location_like=${destination || ""}`;
  /// note: if we want to search in all query string, we should use q instead of name or accommodation:
  /// name_like=${destination || ""} ===> q=${destination || ""}
  const { data: hotels, isLoading } = useFetch(URL, query);

  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);

  async function getsingleHotel(id) {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${URL}/${id}`);
      setCurrentHotel(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        hotels,
        isLoading,
        getsingleHotel,
        isLoadingCurrentHotel,
        currentHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelsProvider;

export function useHotel() {
  return useContext(HotelContext);
}
