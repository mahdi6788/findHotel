import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../../context/BookmarkListProvider";
import { useEffect } from "react";
import Loading from "../Loading";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getsingleBookmark, isLoadingCurrentBookmark, currentBookmark } =
    useBookmark();

  /// loading the page content by geting id from url via useParams and use it in getSingleBookmark
  useEffect(() => {
    getsingleBookmark(id);
  }, [id]);

  if (isLoadingCurrentBookmark || !currentBookmark) return <Loading />;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="btn btn--back"
        style={{ marginBottom: "5px" }}
      >
        Back
      </button>
      <div
        className={`bookmarkItem ${
          id === currentBookmark?.id && "current-bookmark"
        }`}
      >
        <div>
          <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
          &nbsp;<strong>{currentBookmark.cityName}</strong> &nbsp;
          <span>{currentBookmark.country}</span>
        </div>
      </div>
    </div>
  );
}

export default SingleBookmark;
