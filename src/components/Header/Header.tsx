import { MdLocationOn } from "react-icons/md";
import {
  HiMinus,
  HiOutlineCalendar,
  HiPlus,
  HiSearch,
  HiHome,
  HiBookmark,
  HiLogin,
  HiLogout,
} from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  Link,
  Navigate,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";

function Header() {
  const navigate = useNavigate();
  /// useSearchParams used to have searchParams generated before by createSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  /// the initial value of destination can be defined by previous location searched or nothing for the first search
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleOpertations = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      destination,
      date: JSON.stringify(date),
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  const [openDate, setOpenDate] = useState(false);

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Where to go"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiOutlineCalendar className="headerIcon dateIcon" />
          <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
            {`${format(date[0].startDate, "MM/dd//yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              onChange={(item) => setDate([item.selection])}
              ranges={date}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
              className="date"
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerPeople">
          <div id="optionDropDown" onClick={() => setOpenOption(!openOption)}>
            <ul>
              <li>&bull; {options.adult} adult</li>
              <li>&bull; {options.children} children</li>
              <li>&bull; {options.room} room</li>
            </ul>
          </div>
          {openOption && (
            <GuestOptionList
              options={options}
              handleOpertations={handleOpertations}
              setOpenOption={setOpenOption}
              exceptionId={"optionDropDown"}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button onClick={handleSearch} className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
        <div>
          <NavLink to={"/"}>
            <HiHome />
          </NavLink> {" "}
          <NavLink to={"/bookmark"}>
            <HiBookmark />
          </NavLink>
          <LogInOut />
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({
  options,
  handleOpertations,
  setOpenOption,
  exceptionId,
}) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, setOpenOption, exceptionId);
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        type="adult"
        options={options}
        minLimit={2}
        handleOpertations={handleOpertations}
      />
      <OptionItem
        type="children"
        options={options}
        minLimit={1}
        handleOpertations={handleOpertations}
      />
      <OptionItem
        type="room"
        options={options}
        minLimit={2}
        handleOpertations={handleOpertations}
      />
    </div>
  );
}

function OptionItem({ type, options, minLimit, handleOpertations }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[type] < minLimit}
          onClick={() => handleOpertations(type, "dec")}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOpertations(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

function LogInOut() {
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span>
           welcome {user.name}
          </span> {" "}
          <button>
            <HiLogout className="icon" onClick={handleLogout}/>
          </button>
        </div>
      ) : (
        <NavLink to={"/login"}>
          <HiLogin className="icon" />
        </NavLink>
      )}
    </div>
  );
}
