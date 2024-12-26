import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../../context/BookmarkListProvider";

function AddNewBookmark() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState('')
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState("false")
  const {createBookmark} = useBookmark()

  const [lat, lng] = useUrlLocation();

  const navigate = useNavigate();
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const Base_GeoCoding_URL = "https://api-bdc.net/data/reverse-geocode-client";

  useEffect(() => {
    if (!lat, !lng) return

    async function fetchLocationData() {
        setIsLoadingGeoCoding(true)
      try {
        const {data} = await axios.get(
          `${Base_GeoCoding_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );
        if (!data.countryCode) {
            const message = "Here is not a specific city!"
            toast.error(message)
        }
        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setCountryCode(data.countryCode || "")
      } catch (error) {
        toast.error(error.message);
      } finally {setIsLoadingGeoCoding(false)}
    }
    fetchLocationData();
  }, [lat,lng]);

  /// this is a async-await function becasue first se create new bookmark and then we post it through createBookmark function,
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!cityName || !country) return;

    /// object of info want to store in dataset
    const newBookmark={
        cityName,
        country,
        countryCode,
        latitude: lat,
        longitude: lng,
        host_location: cityName + " " + country
    }
    /// post new bookmark to the dataset
    await createBookmark(newBookmark)
    /// after adding new data, navigate to the bookmark page
    navigate("/bookmark")
    
  }

  


  return (
    <div>
      <h2>Add New Bookmark</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">City Name</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            className="cityName"
            id="cityName"
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            className="country"
            id="country"
          />
          <ReactCountryFlag svg  countryCode={countryCode} className="flag"  />
        </div>
        <div className="buttons">
          <button className="btn btn--back" onClick={handleBack}>
            &larr; Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
