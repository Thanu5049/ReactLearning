import Button from 'react-bootstrap/Button';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { isValid, format } from 'date-fns';
import Form from 'react-bootstrap/Form';
import 'react-datepicker/dist/react-datepicker.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
const NavBar = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const { from = "Unknown", to = "Unknown", on = new Date(), states = [], userName = "User" } = location.state || {};

    const [selectedDate, setSelectedDate] = useState(
        isValid(new Date(on)) ? new Date(on) : new Date()
    );
    const [stateFrom, setStateFrom] = useState(from);
    const [stateTo, setStateTo] = useState(to);

    return (
        <>
            <div style={{ backgroundColor: "#dc3545", paddingLeft: "20px", marginTop: "10px", display: "flex" }}>
                <div className='nav-bar-seating' style={{ display: "flex", alignItems: "center", width: "50%", justifyContent: "space-between" }}>
                    <Form.Select
                        size="lg"
                        value={stateFrom}
                        className='city'
                        onChange={(event) => setStateFrom(event.target.value)}
                        style={{ fontSize: "20px" }}>
                        {states.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </Form.Select>
                    <span style={{ color: "white", fontSize: "20px", margin: "10px" }}>to</span>
                    <Form.Select
                        size="lg"
                        value={stateTo}
                        className='city'
                        style={{ fontSize: "20px" }}
                        onChange={(event) => setStateTo(event.target.value)}>
                        {states.filter((state) => state !== stateFrom).map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </Form.Select>
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)} // Update state when date changes
                            minDate={new Date()}
                            customInput={
                                <Form.Control style={{
                                    height: "50px",
                                    width: "150px",
                                    border: "none",
                                    fontWeight: "700",
                                    fontSize: "18px",
                                    marginLeft: "10px",
                                    backgroundColor: "white",
                                    paddingRight: "40px",
                                }} />
                            }
                        />
                        <FontAwesomeIcon icon="fa-solid fa-calendar" style={{
                            position: "absolute",
                            right: "20px", // Adjust this value based on your layout
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#000000",
                            pointerEvents: "none", // Prevents the icon from blocking clicks to the DatePicker
                        }} />
                    </div>
                    
                    <Button
                        variant="primary"
                        size="lg"
                        style={{ marginLeft: "10px", display: "flex", gap: "6px" }}
                        onClick={() => navigate("/bus-list", {
                            state: {
                                from: stateFrom,
                                to: stateTo,
                                on: selectedDate,
                                states
                            }
                        })}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" style={{ color: "#ffffff", marginTop: "6px" }} />
                        Search
                    </Button>
                </div>
                <div className='d-flex justify-content-end navbar-logo' style={{marginRight:"20px"}}>
                    <div className="name-display" style={{ display: "flex", gap: "10px" }}>
                        <div style={{ width: "33px", height: "33px", border: "2px solid", borderRadius: "70%", paddingLeft: "5px" }}>
                            <FontAwesomeIcon icon="fa-regular fa-user" style={{ color: "#000000", }} />
                        </div>
                        <DropdownButton id="dropdown-item-button" title={localStorage.getItem("session")} className="account-dropdown custom-button">
                            <Dropdown.Item as="button" style={{margin:"5px",height:"50px"}} onClick={()=>{navigate("/change-profile")}}>Cancel Ticket</Dropdown.Item>
                            <Dropdown.Item as="button" style={{margin:"5px",height:"50px"}} onClick={()=>{navigate("/change-profile")}}>Show My Ticket</Dropdown.Item>
                            <Dropdown.Item as="button" style={{margin:"5px",height:"50px"}} onClick={()=>{navigate("/change-profile")}}>My Profile</Dropdown.Item>
                            <Dropdown.Item as="button" style={{margin:"5px",height:"50px"}} onClick={()=>{ navigate("/"); localStorage.removeItem("session")}}>Sign Out</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    {/* <button className="s-logout glyphicon glyphicon-log-out" onClick={() => {
                        navigate("/");
                        localStorage.removeItem("session")
                    }} style={{ marginLeft: "10px" }}>Logout</button> */}
                </div>
            </div>
        </>
    );
};

export default NavBar;
