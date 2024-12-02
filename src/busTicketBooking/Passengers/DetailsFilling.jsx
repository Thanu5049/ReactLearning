import './InfoFilling.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TravellerDetails from './TravellerDetails';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
const DetailsFilling = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate();
    const location = useLocation();
    const {
        price = "0",
        seatsCount = "0",
        from = "Unknown", 
        to = "Unknown",
        on = new Date(),
        pickuppoint = "Unknown",
        droppoint = "Unknown",
        userName = "User",
        selectedSeatLabels = [],
        genderArray=[],
        busName = "Unknown"
    } = location.state || {};
console.log(genderArray)
    const onSubmit = (data) => {
      console.log(data.travellers);

    const updatedTravellers = Object.entries(data.travellers).map(([key, value], index) => {
        return {
            ...value,
            gender: genderArray[index] // Assign gender from genderArray
        };
    });

    console.log(updatedTravellers);

    // Create the final updatedData object
    const updatedData = {
        ...data,
        travellers: updatedTravellers,
        genderArray // Add the genderArray as a separate key
    };


    console.log(updatedData);  
    console.log(selectedSeatLabels);    

        navigate('/confirm-details', {
            state: { 
                updatedData, 
                pickuppoint, 
                droppoint, 
                selectedSeatLabels, 
                price, 
                from, 
                to, 
                on, 
                userName, 
                busName ,
                genderArray
            }
        });
        
    };

    return (
        <> 
            <div style={{ backgroundColor: "#dc3545", paddingLeft: "20px", display: "flex" ,justifyContent:"end"}} className="nav-div">
                <div className='d-flex justify-content-end navbar-logo' style={{marginRight:"20px"}}>
                    <div className="name-display" style={{ display: "flex", gap: "10px" }}>
                        <div style={{ width: "33px", height: "33px", border: "2px solid", borderRadius: "70%", paddingLeft: "5px" }}>
                            <FontAwesomeIcon icon="fa-regular fa-user" style={{ color: "#000000", }} />
                        </div>
                        <DropdownButton id="dropdown-item-button" title={localStorage.getItem("session")} className="account-dropdown custom-button">
                            <Dropdown.Item as="button" style={{margin:"5px",height:"50px"}}>Cancel Ticket</Dropdown.Item>
                            <Dropdown.Item as="button" style={{margin:"5px",height:"50px"}}>Show My Ticket</Dropdown.Item>
                            <Dropdown.Item as="button" style={{margin:"5px",height:"50px"}}>My Profile</Dropdown.Item>
                            <Dropdown.Item as="button" style={{margin:"5px",height:"50px"}} onClick={()=>{ navigate("/"); localStorage.removeItem("session")}}>Sign Out</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </div>
            <div className='outer-info-div'>
                <div className="left-info-div">
                    <div className="upper-info-div" ><span style={{ fontWeight: "700", marginBottom: "10px" }}>Traveller Details</span></div>
                    <Form noValidate onSubmit={handleSubmit(onSubmit)} className="w-90">
                        {selectedSeatLabels.map((seat, index) => (
                            <TravellerDetails 
                                key={index} 
                                seatNumber={seat} 
                                register={register} 
                                errors={errors} 
                            />
                        ))}
                         <Row>
                           <Form.Group className="mb-3" controlId="formGroupEmail">
                           <Form.Label style={{fontWeight:"600"}}>Enter Email address</Form.Label>
                           <Form.Control
                            type="email"
                             placeholder="Enter email" 
                             {...register("email",{
                               required:"Please enter your email",
                               pattern:{
                                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                   message: "Please enter a valid email"
                               }
                             })}/>
                             {errors.email && errors.email.type==="required" && (<p className='errorMsgs'>{errors.email.message}</p>) || errors.email && errors.email.type === "pattern" && (
                           <p className='errorMsgs'>{errors.email.message}</p> )}
                         </Form.Group>
                       </Row>

                        <Row>
                            <Button type="submit">Proceed to Pay
                                <FontAwesomeIcon icon="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }} />
                            </Button>
                        </Row>
                    </Form>
                </div>
                <div className="right-info-div" style={{ fontWeight: "600" }}>
                    <div className="right-upper-div">Your Booking Status</div>
                    <div className="right-lower-div">
                        <div className="detail-one">Bus Travels - {busName}</div>
                        <div className="from-div">
                            <div>From: {from}</div>
                            <span className="custom-dash">&ndash;</span>
                            <div>To: {to}</div>
                        </div>
                        <div className="from-div">
                            <div>Arrive at: 4:00 PM</div>
                            <span className="custom-dash">&ndash;</span>
                            <div>Depart at: 3:50 PM</div>
                        </div>
                        <div className="from-div">
                            <div>Total No. of Seats</div>
                            <div>{seatsCount}</div>
                        </div>
                        <div className="from-div">
                            <div>Total Amount</div>
                            <div>{price}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailsFilling;
