import useFetch from "../../hooks/useFetch"
import Loading from "../Loading"

function LocationList() {
    const {data, isLoading} = useFetch("http://localhost:5000/hotels/", "")
    return(
        <div className="nearbyLocation">
            <h2>Nearby Location</h2>
            <Loading isLoading={isLoading}/>
            <div className="locationList">
            {data.map(item => {
                return (
                    <div key={item.id} className="locationItem">
                        <img src={item.xl_picture_url} alt={item.name} />
                        <div className="locationItemDesc">
                            <p className="location">{item.smart_location}</p>
                            <p className="name">{item.name}</p>
                            <p className="price">
                            € {item.price} &nbsp; 
                            <span>per night</span>
                            </p>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default LocationList