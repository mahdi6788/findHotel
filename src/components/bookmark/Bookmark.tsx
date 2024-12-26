import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../../context/BookmarkListProvider";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import {HiOutlineTrash} from "react-icons/hi"


function Bookmark() {
  const { bookmarks, isLoading, currentBookmark, deleteBookmark } = useBookmark();

  /// here we use id to delete the item and change the dataset, so this is a async-await function
  const handleDelete = async (e, id) => {
    /// trashbin is in the Link tag so as a default action, user pass to anothe page.
    /// so we should use e.preventdefault() to prevent this act
    e.preventDefault()
    await deleteBookmark(id)
  }

  if (isLoading) return <Loading />;
  if (!bookmarks.length) return <p>There is no location in bookmark</p>
  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id && "current-bookmark"
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp;<strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                    <HiOutlineTrash/>
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
