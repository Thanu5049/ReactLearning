import Card from 'react-bootstrap/Card';
import './SeatBooking.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { MdOutlineChair } from "react-icons/md";
import { PiSteeringWheelDuotone } from "react-icons/pi";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import location from '../location.json';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const SeatBooking = (props) => {
  const [modalShow, setModalShow] = useState(false)
  const handleOpenModal = () => setModalShow(true);
  const [price, setPrice] = useState(0);
    const { from, to, on, bus, userName } = props;
    const totalSeats = 40;
    const seatsPerColumn = 10;
    const [color, setColor] = useState(new Array(totalSeats).fill(false));
    const [selectedSeatLabels, setSelectedSeatLabels] = useState([]); // State to store selected seats with labels
    const [disabledSeats, setDisabledSeats] = useState([]); // To store already booked seats
    const [gender, setGender] = useState("");
    const [hoveredSeat, setHoveredSeat] = useState(null); 
    const [genderArray, setGenderArray] = useState([]);
    //for counting the seats
    useEffect(() => {
      const count = color.filter((seat) => seat === true).length;
      if (count <= 6) {
        setSelectedSeatsCount(count);
        setPrice(count * bus.price);
      }
     
      else {
        alert("You cannot select more than 6 seats .");
        return;
      }
      console.log("1")
    }, [color]);

    useEffect(() => {
      const formattedDate = JSON.stringify({
        date: on.getDate(),
        month: on.getMonth() + 1,
        year: on.getFullYear(),
      });
      const searchKey = `${from}:${to}:${formattedDate}`;
      const storedData = localStorage.getItem(searchKey);
      if (storedData) {
        const bookings = JSON.parse(storedData);
        const relevantBookings = bookings.filter(
          (booking) => booking.travelName === bus.busname
        );
        console.log(relevantBookings);
        if (relevantBookings.length > 0) {
          const bookedSeats = relevantBookings.flatMap((booking) =>
            booking.seatsBooked.map((seat, index) => ({
              label: seat,
              //gender: booking.gender[index], // Use the gender array to assign gender
            }))
          );
          console.log(bookedSeats);
    
          const bookedIndices = bookedSeats.map(({ label, gender }) => {
            const row = label.charCodeAt(0) - "A".charCodeAt(0);
            const column = parseInt(label.slice(1), 10) - 1; 
            const index = column * seatsPerColumn + row;
            console.log(row, column, index);
    
            // Assign color based on gender
            color[index] = gender === "F" ? "pink" : "green"; // Color the seat based on gender
            return index;
          });
          console.log(bookedIndices);
          setDisabledSeats(bookedIndices); // Update disabled seats
          setColor([...color]); // Update seat colors
        }
      }
    }, [from, to, on, bus]);
    


    const changeColor = (index) => {
      if (disabledSeats.includes(index)) return; // Ignore clicks on disabled seats
  
      const newSeatColors = [...color];
      const selectedSeatsCount = color.filter((seat) => seat === true).length;
      if (!newSeatColors[index]) {
        if (selectedSeatsCount >= 6) {
          alert("You cannot select more than 6 seats.");
          return;
        }
      }
  
      newSeatColors[index] = !newSeatColors[index]; // Toggle the seat selection
      setColor(newSeatColors);
  
      const rowLabel = alphabets[index % seatsPerColumn];
      const seatLabel = `${rowLabel}${Math.floor(index / seatsPerColumn) + 1}`;
  
      if (newSeatColors[index]) {
        // Seat is selected
        setSelectedSeatLabels((prev) => [...prev, seatLabel]);
      } else {
        // Seat is deselected
        setSelectedSeatLabels((prev) => prev.filter((seat) => seat !== seatLabel));
        setGenderArray((prev) => prev.filter((_, i) => selectedSeatLabels[i] !== seatLabel));
  
      }
    };
  
    const [selectedSeatsCount, setSelectedSeatsCount] = useState(0); 


    const splitSeatsIntoColumns = () => {
      const columns = [];
      for (let i = 0; i < totalSeats; i += seatsPerColumn) {
        columns.push(color.slice(i, i + seatsPerColumn));
      }
      return columns;
    }
  
    const seatColumns = splitSeatsIntoColumns();
  
    const [pickuppoint, setPickuppoint] = useState('');
    const [droppoint, setDroppoint] = useState('');
  
    const [selectedPickupIndex, setSelectedPickupIndex] = useState(null); // Track selected pickup row
    const [selectedDropIndex, setSelectedDropIndex] = useState(false); // Track selected drop row
  
    const showPickupSelect = (pickuplocality, index) => {
  
      const newPickup = `${pickuplocality}`;
      setPickuppoint(newPickup);
      setSelectedPickupIndex(index); // Store the selected pickup row index
      console.log(newPickup);
    };
  
    const showDropSelect = (droplocality, index) => {
      const newDrop = `${droplocality}`;
      setDroppoint(newDrop);
      setSelectedDropIndex(index); // Store the selected drop row index
      console.log(newDrop);
    };
  
    let navigate = useNavigate();
    const onContinue = () => {
      if (price > 0 && pickuppoint != "" && droppoint != "") {
        if (selectedSeatLabels.length !== genderArray.length) {
          alert("Please select a gender for all selected seats before proceeding!");
          return;
        }
        navigate('/details-filling', {
          state: {
            price: price,
            seatsCount: selectedSeatsCount,
            pickuppoint: pickuppoint,
            droppoint: droppoint,
            selectedSeatLabels: selectedSeatLabels,
            genderArray: genderArray, 
            from: from,
            to: to,
            on: on,
            userName: userName,
            busName: bus.busname
          }
        });
        console.log({ from, to })
      }
      else if (pickuppoint === "") {
        alert("Please select the pickup point to proceed with the next step!!");
  
      }
      else if (droppoint === "") {
        alert("Please select the drop point to proceed with the next step!!");
  
      }
      else {
        alert("Please select the seats to proceed with the next step!!");
      }
    };
  
    const selectedPickupLocation = location.find((item) => (item.state === from));
    const selectedDropLocation = location.find((item) => (item.state === to));
    // console.log(selectedPickupLocation,selectedDropLocation)
    //LAbeling the seats
    const alphabets = "ABCDEFGHIJ";
    // Initialize disabledSeats from localStorage
  
  

    const fetchGender = () => {
      if (!gender || gender === "Gender") {
        alert("Please select your gender before proceeding!");
        return;
      }
      if (selectedSeatLabels.length > genderArray.length) {
        setGenderArray((prevGenderArray) => [...prevGenderArray, gender]);
  
      } else {
        alert("Please select gender for the seat(s)");
      }
    }
  
    const handleCloseModal = () => {
      setModalShow(false);
      setColor(new Array(totalSeats).fill(false)); 
      setSelectedSeatLabels([]); // Clear selected seat labels
      setGenderArray([]); // Clear gender selections
      setPickuppoint(''); // Clear pickup point
      setDroppoint('');
      setSelectedPickupIndex(null); 
      setSelectedDropIndex(null); 
      setPrice(0); 
      setSelectedSeatsCount(0);
    };


  return (
    <div>
      <Card style={{ height: "200px", margin: "15px" }}>
        <Card.Body style={{ padding: "15px", height: "400px" }}>
          <Card.Title className="card-title-div">
            <div className="bus-name">{bus.busname}</div>
            <div className="hours-div">
              23:20
              <span className="custom-dash">&ndash;</span>
              <span style={{ fontWeight: "100", color: "grey", fontSize: "17px" }}>
                08hrs 40mins
              </span>
              <span className="custom-dash">&ndash;</span>
              08:00
            </div>
            <div className="price-div">
              <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" /> {bus.price}
            </div>
          </Card.Title>
          <Card.Subtitle style={{width:"40%"}} className="mb-2 text-muted">Bharat Benz A/C Seater /Sleeper (2+1)
        </Card.Subtitle>
        <Card.Text className="bus-info">
          <div className="rating-div">
            <div className="star-div"><FontAwesomeIcon icon="fa-solid fa-star" size="2xs" /></div>
            <div className="number-div">{bus.rating}</div>
          </div>
          <div className="raters-div">{bus.ratings} Ratings</div>
          <div className="track-div"><FontAwesomeIcon icon="fa-solid fa-location-crosshairs" size="lg" style={{ color: "#babcbf" }} /> Live Tracking</div>
        </Card.Text>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <Button
                  as="input"
                  type="button"
                  value="SELECT SEATS"
                  style={{ marginLeft: "87%", marginTop: "10px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal();
                  }}
                />
              </Accordion.Header>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>

      {/* Modal for Seat Selection */}
      <Modal
        show={modalShow}
        onHide={handleCloseModal}
        size="xl"
      >
<Modal.Header>
                <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
                    <h5 style={{ margin: 0 }}>Seats Booking</h5>
                    <Button
                        variant="secondary"
                        onClick={handleCloseModal}
                        style={{
                            marginLeft: "auto",
                            whiteSpace: "nowrap" // Prevents the button from wrapping text
                        }}
                    >
                        Close
                    </Button>
                </div>
            </Modal.Header>

        <Modal.Body>
          {/* Replace this with the original seats-div */}
          <div style={{ display: "flex", padding: "0", marginTop: "5px", width: "100%", zIndex: "10", position: "absolute", right: "2px", border: "1px solid grey" }}>
            <div className="seats-div" >
              <div style={{ fontWeight: "700", height: "30px", borderBottom: "0.4px solid", paddingLeft: "20px" }}>Select Seats</div>
              <div className="seat-layout">
                <PiSteeringWheelDuotone style={{ fontSize: "23px", marginLeft: "85%", marginBottom: "5%" }} />
                <div className="seats">
                  {seatColumns.map((column, colIndex) => (
                    <div key={colIndex} className="seat-column">
                      {column.map((isSelected, seatIndex) => {
                        // Calculate the overall index for each seat
                        const globalIndex = colIndex * seatsPerColumn + seatIndex;
                        const rowLabel = alphabets[seatIndex];
                        const seatLabel = `${rowLabel}${colIndex + 1}`;
                        const isDisabled = disabledSeats.includes(globalIndex);

                        return (
                          <div key={globalIndex} className={`whole-seat ${isDisabled ? "disabled-seat" : ""
                            }`} onClick={() => !isDisabled && changeColor(globalIndex)}
                            onMouseEnter={() => setHoveredSeat(globalIndex)}
                            onMouseLeave={() => setHoveredSeat(null)}

                          >
                            {hoveredSeat === globalIndex && ( // showing label
                              <div className="hover-seat-label">{seatLabel}</div>
                            )}
                            <MdOutlineChair
                              style={{
                                fontSize: "23px",
                                color: isDisabled
                                  ? color[globalIndex] === "pink"
                                    ? "pink"
                                    : "green"
                                  : isSelected
                                    ? "blue" 
                                    : "grey", 
                              }}
                              className={isSelected ? "changeSeatColor" : ""}
                            />
                            <div className="price-div">
                              <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{ color: "#020203" }} />{bus.price}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="whole-div">
              <div style={{ fontWeight: "700", height: "30px", borderBottom: "0.4px solid", paddingLeft: "20px",backgroundColor:"white" }}>Select Pickup and Drop Points</div>
              <div className="location-div">
                <div className="pickup-div">
                  <Table style={{ overflowY: "auto", maxHeight: "570px", display: "block" ,width:"100%"}}>

                    {selectedPickupLocation.points.map((item, index) => (
                      <thead key={index}>
                        <tr onClick={() => showPickupSelect(item.locality, index)}
                          style={{
                            cursor: "pointer",
                          }}>
                          <th><span className='time-div'>19:40, 14 Nov</span><br />
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            {item.locality}
                            {selectedPickupIndex === index &&
                              <FontAwesomeIcon icon="fa-solid fa-circle-check" style={{ color: "#0071eb", marginLeft: "10px" }} />
                            }
                            </div>
                          </th>
                          <td>{item.add}
                          </td>
                        </tr>
                      </thead>
                    ))}

                  </Table>
                </div>
                <div className="drop-div">
                  <Table style={{ overflowY: "auto", maxHeight: "570px", display: "block" }}>

                    {selectedDropLocation.points.map((item, index) => (
                      <thead style={{width:"100%"}}>
                        <tr key={index} onClick={() => showDropSelect(item.locality, index)}
                          style={{
                            cursor: "pointer",
                            width:"100%"
                          }}>
                          <th style={{width:"100%"}}><span className='time-div'>19:40, 14 Nov</span><br />
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            {item.locality}
                            {selectedDropIndex === index && (
                              <FontAwesomeIcon
                                icon="fa-solid fa-circle-check"
                                style={{ color: "#0071eb", marginLeft: "10px" }}
                              />
                            )}
                            </div>
                          </th>
                          <td>{item.add}
                          </td>
                        </tr>
                      </thead>
                    ))}
                  </Table>
                </div>
              </div>
              <div className="checkout-div">
                <div className="upper-div">
                  <div className="selected-seats-div">
                    <span style={{ fontWeight: "700" }}>Selected Seats</span>
                    <div className="selected-seat-div"> {selectedSeatLabels.join(" ,")}</div>
                  <div>{genderArray.join(" ,")}</div>
                  </div>
                  <Form.Select aria-label="Default select example" style={{ width: "100px", height: "40px", margin: "5px" }}
                    onChange={(event) => setGender(event.target.value)}
                  >
                    <option value="" disabled selected>Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Form.Select>
                  <Button variant='primary' size='sm' style={{ margin: "10px",height:"30px" }} onClick={fetchGender}>Ok</Button>
                  
                </div>
                <div className="lower-div" style={{ marginTop: "10px" }}>
                <Button 
                   variant="primary" 
                   style={{ width: "30%", marginBottom: "10px",height:"40px"}} 
                   onClick={onContinue}
                   disabled={selectedSeatLabels.length === 0 || genderArray.length !== selectedSeatLabels.length}
                  >
                    Continue
                  </Button>
                  <div className="price-divs" >
                    <span style={{ fontWeight: "700", fontSize: "20px", height: "40px", marginLeft: "5px" }}>
                      <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{ color: "#020203" }} />
                      {price}</span></div>

                </div>
              </div>

            </div>
</div>

        </Modal.Body>
      </Modal>
    </div>
  );
};
export default SeatBooking;