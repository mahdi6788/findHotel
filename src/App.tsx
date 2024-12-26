import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Hotels from "./components/Hotels";
import SingleHotel from "./components/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout";
import BookmarkListProvider from "./context/BookmarkListProvider";
import Bookmark from "./components/bookmark/Bookmark";
import HotelsProvider from "./context/HotelsProvider";
import AppLayout from "./components/AppLayout";
import SingleBookmark from "./components/singleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import Login from "./components/Login";
import AuthContextProvider from "./context/AuthContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import LocationList from "./components/LocationList/LocationList";

function App() {
  return (
    <AuthContextProvider>
      <BookmarkListProvider>
        <HotelsProvider>
          <div>
            <Toaster />
            <Header />
            <Routes>
              <Route path="/" element={<LocationList />} />     {/* Home page */}
              <Route path="/login" element={<Login />} />
              <Route
                path="/bookmark"
                element={
                  <ProtectedRoute>
                    <BookmarkLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Bookmark />} />
                <Route path="add" element={<AddNewBookmark />} />
                <Route path=":id" element={<SingleBookmark />} />
              </Route>
              <Route path="/hotels" element={<AppLayout />}>
                <Route index element={<Hotels />} />
                <Route path=":id" element={<SingleHotel />} />
              </Route>
            </Routes>
          </div>
        </HotelsProvider>
      </BookmarkListProvider>
    </AuthContextProvider>
  );
}

export default App;
