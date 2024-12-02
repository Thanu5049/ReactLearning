import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SeatBooking from './SeatBooking';
import './SeatBooking.css';
import NavBar from '../NavBar';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import locations from '../location.json';

const BusList = () => {
  let location = useLocation();
  const { from = "Unknown", to = "Unknown", on = new Date(), states = [], userName = "User" } = location.state || {};
  const array = locations.find((item) => item.state === from);

  // States for filters
  const [selectedBusTypes, setSelectedBusTypes] = useState([]);
  const [selectedACTypes, setSelectedACTypes] = useState([]);

  // Available filter options
  const busTypes = ["seater", "sleeper"];
  const acTypes = ["AC", "NON-AC"];

  // Handlers for toggle filters
  const toggleBusType = (type) => {
    setSelectedBusTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const toggleACType = (type) => {
    setSelectedACTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const filteredBuses = array.busdetails.filter((bus) => {
    const matchesBusType = selectedBusTypes.length === 0 || selectedBusTypes.includes(bus.type);
    const matchesACType = selectedACTypes.length === 0 || selectedACTypes.includes(bus.ac);
    return matchesBusType && matchesACType;
  });

  return (
    <>
      <NavBar from={from} to={to} on={on} userName={userName} />
      <div style={{ display: "flex", marginTop: "30px" }}>
        <div style={{ display: "flex", flexDirection: "column", margin: "30px", width: "23%" }}>
          <div className="filter-div">
            <span className="filter-heading">FILTERS </span>
            
            {/* Bus Types */}
            <div style={{ margin: "30px", display: "flex", flexDirection: "column", gap: "5px" }}>
              <div className="filter-headings">BUS TYPES</div>
              {busTypes.map((type) => (
                <div key={type} onClick={() => toggleBusType(type)} style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon
                    icon={selectedBusTypes.includes(type) ? "fa-solid fa-square-check" : "fa-regular fa-square-check"}
                    style={{ color: "#000000" ,marginRight:"5px"}}
                  />
                  {type.toUpperCase()}
                </div>
              ))}
            </div>

            {/* AC Types */}
            <div style={{ margin: "30px", display: "flex", flexDirection: "column", gap: "5px" }}>
              <div className="filter-headings">AC TYPES</div>
              {acTypes.map((type) => (
                <div key={type} onClick={() => toggleACType(type.toLowerCase())} style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon
                    icon={selectedACTypes.includes(type.toLowerCase()) ? "fa-solid fa-square-check" : "fa-regular fa-square-check"}
                    style={{ color: "#000000",marginRight:"5px" }}
                  />
                  {type}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {filteredBuses?.map((item, index) => (
            <SeatBooking key={index} from={from} to={to} on={on} bus={item} userName={userName} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BusList;
