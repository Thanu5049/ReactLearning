import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
const ChangeProfile=()=>{
    let navigate=useNavigate();
    return(
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
            <Profile />
        </>
    )
}
export default ChangeProfile;