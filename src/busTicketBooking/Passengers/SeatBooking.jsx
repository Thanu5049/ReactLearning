import Card from 'react-bootstrap/Card';
import './SeatBooking.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { MdOutlineChair } from "react-icons/md";
import { PiSteeringWheelDuotone } from "react-icons/pi";
import {useState,useEffect} from "react";
import Table from 'react-bootstrap/Table';

const SeatBooking=()=>{
  const[price,setPrice]=useState(0);
       const totalSeats=40;
  const seatsPerColumn=10;
  const[color,setColor]=useState(new Array(totalSeats).fill(false));
  const changeColor=(index)=>{
    const newSeatColors=[...color];
    newSeatColors[index]=!newSeatColors[index];
    setColor(newSeatColors);
  }
  //calculating the total price
  useEffect( ()=>{
    const selectedSeatsCount=color.filter((seat)=>seat===true).length;
    setPrice(selectedSeatsCount*560);
  },[color]);
  const splitSeatsIntoColumns=()=>{
    const columns=[];
    for(let i=0;i<totalSeats;i+=seatsPerColumn){
      columns.push(color.slice(i,i+seatsPerColumn));
    }
    return columns;
  }

  const seatColumns=splitSeatsIntoColumns();
const[selectPoint,setSelectPoint]=useState(false);
const showSelect=()=>{
  setSelectPoint(!selectPoint);
}

  console.log(price);
return(
    <div>
      <div className='nav-bar'>tgf</div>
    <Card >
      <Card.Body style={{padding:"20px"}}>
        <Card.Title className='card-title-div'>
            <div className="bus-name">Laxmi holidays</div>
            <div className="hours-div">23:20
            <span  className="custom-dash">&ndash;</span> 
                 <span style={{fontWeight:"100",color:"grey",fontSize:"17px"}}>08hrs 40mins</span>
                 <span  className="custom-dash">&ndash;</span> 
                 08:00</div>
            <div className="price-div">
            <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" /> 635
            </div>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Bharat Benz A/C Seater /Sleeper (2+1)
</Card.Subtitle>
        <Card.Text className="bus-info">
          <div className="rating-div">
            <div className="star-div"><FontAwesomeIcon icon="fa-solid fa-star" size="2xs" /></div>
            <div className="number-div">4.6</div>
          </div>
          <div className="raters-div">1126 Ratings</div>
          <div className="track-div"><FontAwesomeIcon icon="fa-solid fa-location-crosshairs" size="lg" style={{color: "#babcbf",}} /> Live Tracking</div>
        </Card.Text>
        <hr />
        <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0" style={{border:"none"}}></Accordion.Item>
      <Accordion.Header 
      ><Button as="input" type="button" value="SELECT SEATS" style={{marginLeft:"90%"}} /></Accordion.Header>
        <Accordion.Body style={{display:"flex"}}>
          <div className="seats-div">
            <div className="seat-layout">
            <PiSteeringWheelDuotone style={{fontSize:"23px",marginLeft:"85%",marginBottom:"5%"}}/>
            <div className="seats">
            {seatColumns.map((column, colIndex) => (
                      <div key={colIndex} className="seat-column">
                        {column.map((isSelected, seatIndex) => {
                          // Calculate the overall index for each seat
                          const globalIndex = colIndex * seatsPerColumn + seatIndex;
                          return (
                            <div key={globalIndex} className="whole-seat" onClick={() => changeColor(globalIndex)}>
                              <MdOutlineChair
                                style={{ fontSize: "23px" }}
                                className={isSelected ? "changeSeatColor" : ""} // Apply class based on selection
                              />
                              <div className="price-div">
                                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{ color: "#020203" }} /> 560
                              </div>
                            </div>
                          );
                        })}
                        </div>
                    ))}
            {/* <div className="left-seats">
              <div className="left-first-column">
              {color.map((isBlue, index) => (
                          <div className="whole-seat" key={index} onClick={() => changeColor(index)}>
                            <MdOutlineChair style={{ fontSize: "23px" }} className={isBlue ? "changeSeatColor" : ""} />
                            <div className="price-div">
                              <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{ color: "#020203" }} /> 560
                            </div>
                          </div>
                        ))}
                {/* <div className="whole-seat" key={index} onClick={()=>changeColor(index)}>
                <MdOutlineChair style={{fontSize:"23px"}} className={`${color?"changeSeatColor":""}`}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat" key={index} onClick={()=>changeColor(index)}>
                <MdOutlineChair style={{fontSize:"23px"}} />
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>

              </div>
              <div className="left-second-column">
              <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
              */}
            {/* </div>
            </div> */} 

            {/* <div className="right-seats">
              <div className="right-first-column">
              <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
              </div>
              <div className="right-second-column">
              <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
                <div className="whole-seat">
                <MdOutlineChair style={{fontSize:"23px"}}/>
                <div className="price-div">
                <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{color: "#020203",}} /> 560
                </div>
                </div>
              </div>
            
           
            </div>               */}
             </div> 
            </div>
          </div>
          <div className="whole-div">
          <div className="location-div">
          <div className="pickup-div">
            <Table style={{overflowY: "auto", maxHeight: "570px", display: "block"}}>
            <thead >
              <tr>
                 <th><span className='time-div'>19:40, 14 Nov</span><br />
                 Gachibowli
                 <FontAwesomeIcon icon="fa-regular fa-circle-check" size="lg" style={{color: "#000000",marginLeft:"40px"}}  />
                 </th>

                 <td>Infront of INOX Prism Mall, Towards Kondapur (Van Pickup) (Hyderabad)
                 </td>
              </tr>
              <tr>
              <th><span className='time-div'>19:50, 14 Nov</span><br />
                 Kondapur</th>
                 <td>Infront of Bicha Reddy Sweet Shop, Towards Allwyn X Road (Van Pickup) (Hyderabad)</td>
              </tr>
              <tr>
              <th><span className='time-div'>19:50, 14 Nov</span><br />
                 Kondapur</th>
                 <td>Infront of Bicha Reddy Sweet Shop, Towards Allwyn X Road (Van Pickup) (Hyderabad)</td>
              </tr>
              <tr>
              <th><span className='time-div'>19:50, 14 Nov</span><br />
                 Kondapur</th>
                 <td>Infront of Bicha Reddy Sweet Shop, Towards Allwyn X Road (Van Pickup) (Hyderabad)</td>
              </tr>
              <tr>
                 <th><span className='time-div'>19:40, 14 Nov</span><br />
                 Gachibowli</th>
                 <td>Infront of INOX Prism Mall, Towards Kondapur (Van Pickup) (Hyderabad)</td>
              </tr>
            </thead>
            <tbody style={{border:"1px solid black"}}></tbody>
            
            </Table>
          </div>
          <div className="drop-div">
          <Table style={{overflowY: "auto", maxHeight: "570px", display: "block"}}>
            <thead >
              <tr onClick={showSelect}>
                 <th><span className='time-div'>19:40, 14 Nov</span><br />
                 Gachibowli
                 <FontAwesomeIcon icon="fa-regular fa-circle-check" size="lg" style={{color: "#000000",marginLeft:"40px"}} />
                 </th>

                 <td>Infront of INOX Prism Mall, Towards Kondapur (Van Pickup) (Hyderabad)
                 </td>
              </tr>
              <tr>
              <th><span className='time-div'>19:50, 14 Nov</span><br />
                 Kondapur</th>
                 <td>Infront of Bicha Reddy Sweet Shop, Towards Allwyn X Road (Van Pickup) (Hyderabad)</td>
              </tr>
              <tr>
              <th><span className='time-div'>19:50, 14 Nov</span><br />
                 Kondapur</th>
                 <td>Infront of Bicha Reddy Sweet Shop, Towards Allwyn X Road (Van Pickup) (Hyderabad)</td>
              </tr>
              <tr>
              <th><span className='time-div'>19:50, 14 Nov</span><br />
                 Kondapur</th>
                 <td>Infront of Bicha Reddy Sweet Shop, Towards Allwyn X Road (Van Pickup) (Hyderabad)</td>
              </tr>
              <tr>
                 <th><span className='time-div'>19:40, 14 Nov</span><br />
                 Gachibowli</th>
                 <td>Infront of INOX Prism Mall, Towards Kondapur (Van Pickup) (Hyderabad)</td>
              </tr>
            </thead>
            <tbody style={{border:"1px solid black"}}></tbody>
            
            </Table>
          </div>
          </div>
          <div className="checkout-div">
            <div className="upper-div">
            <div className="checkseats"><span style={{fontWeight:"700"}}>Selected Seats</span> </div>
            <div className="price-div"><span style={{fontWeight:"700",fontSize:"20px"}}>
            <FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" size="xs" style={{ color: "#020203" }} />
              {price}</span></div>
              </div>
            <div className="continue-div">
            <Button variant="primary" style={{width:"30%"}}>Continue</Button>
            </div>
          </div>
          </div>
        </Accordion.Body>
        </Accordion>
      </Card.Body>
    </Card>
    </div>
)
}
export default SeatBooking;