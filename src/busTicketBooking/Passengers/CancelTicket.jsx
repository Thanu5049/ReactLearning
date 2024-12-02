import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';
const CancelTicket=()=>{
    let navigate=useNavigate();
    return(
        <>
        <div style={{ backgroundColor: "#dc3545", display: "flex" ,justifyContent:"end",width:"100%"}} className="nav-div">
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
        <div style={{height:"100vh",width:"100vw"}}>
             <Card style={{ width: "900px", height: "350px", marginTop:"8%",marginLeft:"15%", }} className="profile-cards">
                    <Card.Body style={{ padding: "30px 90px "}}>
                        <div style={{ marginTop: "30px" }}>
                            <fieldset>
                                <legend style={{ textAlign: "center" }}>
                                    Cancel your Ticket
                                    <hr /></legend>
                                <div style={{ display: "flex", justifyContent: "space-between",padding:"10px",alignItems:"center",padding:"20px 70px" }}>
                                    <div>
                                        
                                        <div style={{ fontWeight: "700",display:"flex",alignItems:"center" ,gap:"5px",borderBottom:"2px solid grey",marginTop:"10px"}}>
                                            <img src='ticketLogo.png' style={{marginLeft:"5px"}}/>
                                            <input type="text" placeholder='ENTER TICKET NO' style={{height:"40px",width:"200px",border:"none"}} />
                                        </div>
                                    </div>

                                    <div style={{marginLeft:"60px"}}>
                                    <Button variant="danger" style={{height:"40px",width:"150px",borderRadius:"0px"}}> CANCEL TICKET</Button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </Card.Body>
                </Card>

        </div>
        </>
    )
}
export default CancelTicket;