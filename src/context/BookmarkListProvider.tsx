import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

/// *** create context
const BookMarkList = createContext();

const initialState = {
  currentBookmark: null,
  bookmarks: [],
  isLoading: false,
  error: null,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
      };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter(item => item.id !== action.payload),
        currentBookmark: null
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action");
  }
}

/// *** make function for contex provider
function BookmarkListProvider({ children }) {
  const URL = "http://localhost:5000/bookmarks";

  // const [currentBookmark, setCurrentBookmark] = useState(null);
  // const [bookmarks, setBookmarks] = useState([])
  // const [isLoading, setIsLoading] = useState(false)

  /// *** instead of using several useState, we can use useReducer containing those states and we can update states in bookmarkreducer instead of setStates based on the actions came from dispatch.
  const [{ currentBookmark, bookmarks, isLoading, error }, dispatch] =
    useReducer(bookmarkReducer, initialState);

  /// here we get all bookmarks
  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(URL);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({ type: "rejected", payload: "There is an error!" });
      }
    }
    fetchBookmarkList();
  }, [URL]);

  /// here we get one possessing the id data from dataset with url
  async function getsingleBookmark(id) {
    if (id == currentBookmark?.id) return; // when we got the data already, do not need to get it again so put this condition to prevent from getting it again 

    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${URL}/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: "There is an error!" });
    }
  }
  /// here we post new created bookmark to the dataset in this url
  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(URL, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${URL}/${id}`);
      dispatch({
        type: "bookmark/deleted",
        payload: id,
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  /// *** return values containing states and functions created here in provider
  return (
    <BookMarkList.Provider
      value={{
        bookmarks,
        isLoading,
        getsingleBookmark,
        currentBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookMarkList.Provider>
  );
}

export default BookmarkListProvider;

/// *** useContext to use created context and we can call this function useBookmark in any component and use the values
export function useBookmark() {
  return useContext(BookMarkList);
}
