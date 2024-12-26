import { Outlet } from "react-router-dom"
import Map from "./Map"
import { useBookmark } from "../context/BookmarkListProvider"

//// there is two section in Bookmark page one is map and the second is dynamic and has two children: list and add . so we should use Outlet 
function BookmarkLayout(){
    const {bookmarks} = useBookmark()
    return(
        <div className="appLayout">
            <div className="sidebar">
                <Outlet/>
            </div>
            <div className="mapContainer">
                <Map markerLocation={bookmarks}/>
            </div>
        </div>

    )
}

export default BookmarkLayout