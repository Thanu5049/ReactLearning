import './Profile.css';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Profile = () => {
    const profileOptions = ["Cancel Ticket", "Show My Ticket", "My Profile", "Sign Out"];
     let navigate=useNavigate();
    //edit changes
    const [myProfile, setMyProfile] = useState(false);
    const [myChangeProfile, setMyChangeProfile] = useState(false);
    const [userName, setUserName] = useState(localStorage.getItem("session"));
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [birthday, setBirthday] = useState(new Date());

    //Show my tickets
    const[showTicket,setShowTicket]=useState(false);


    //Cancel tickets
    const[cancelTicket,setCancelTicket]=useState(false);

    const currentUser=localStorage.getItem("session");
    const currentUserDetails=
    console.log(currentUser);
    console.log(userName, gender);
    return (
        <div className="d-flex" >
            <div style={{
                width: "20%", height: "100vh", borderRight: "1px solid grey", paddingTop: "80px", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
            }} >
                <div className="profile-headings" style={{ borderTop: "none" }} onClick={()=>{navigate('/cancel-ticket')}}>
                    <FontAwesomeIcon icon="fa-regular fa-circle-xmark" style={{ color: "#000000", }} />
                    {profileOptions[0]}</div>
                <div className="profile-headings" style={{ border: "none" }} onClick={()=>{navigate('/show-ticket')}}>
                    <FontAwesomeIcon icon="fa-solid fa-ticket" style={{ color: "#0f0f0f", }} />
                    {profileOptions[1]}</div>
                <div className="profile-headings" onClick={(e) => { e.preventDefault(); setMyProfile(true); setMyChangeProfile(false) }} style={{
                    backgroundColor: myProfile ? 'rgb(204, 203, 203,0.5)' : 'transparent', borderBottom: "none"
                }}>
                    <FontAwesomeIcon icon="fa-solid fa-user" style={{ color: "#000000", }} />
                    {profileOptions[2]}</div>
                <div className="profile-headings" style={{ borderBottom: "none" }}>
                    <FontAwesomeIcon icon="fa-solid fa-power-off" />
                    {profileOptions[3]}</div>
            </div>
            {myProfile && (<div >

                <Card style={{ width: "900px", height: "450px", marginTop: "50px", marginLeft: "100px" }} className="profile-cards">
                    <div style={{ display: "flex", justifyContent: "end", marginTop: "30px", marginRight: "40px" }}>
                        <Button onClick={() => { setMyChangeProfile(true); setMyProfile(false) }} style={{ backgroundColor: "green" }}>EDIT</Button>
                    </div>
                    <Card.Body style={{ padding: "30px 60px " }}>


                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ width: "300px", border: "none" }}>
                                <div>YOUR NAME</div>
                                <div style={{ fontWeight: "700" }}>{localStorage.getItem("session")}</div>
                            </div>

                            <div style={{ width: "300px", border: "none" }}>
                                <div>DATE OF BIRTH</div>
                                <div>&ndash;&ndash;</div>
                            </div>
                        </div>
                        <div style={{ width: "200px", border: "none", marginTop: "20px" }}>
                            <div>GENDER</div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <input type="radio" name="gender" value="M" />
                                    <label style={{ margin: "5px" }}>Male</label>
                                </div>
                                <div>
                                    <input type="radio" name="gender" value="F" />
                                    <label style={{ margin: "5px" }}>Female</label>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: "30px" }}>
                            <fieldset>
                                <legend style={{ textAlign: "center" }}>
                                    CONTACT DETAILS
                                    <hr /></legend>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        <div>EMAIL ID</div>
                                        <div style={{ fontWeight: "700" }}>jaya@gmail.com</div>
                                    </div>

                                    <div>
                                        <div>MOBILE NUMBER</div>
                                        <div>&ndash;&ndash;</div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </Card.Body>
                </Card>


            </div>
            )}
            {myChangeProfile && (
                <div >
                    <Card style={{ width: "900px", height: "400px", marginLeft: "100px", marginTop: "50px" }} className="profile-cards">
                        <div style={{ display: "flex", justifyContent: "end", marginTop: "30px", marginRight: "30px" }}>
                            <Button variant="secondary" style={{ marginRight: "10px" }} onClick={() => { setMyProfile(true); setMyChangeProfile(false) }}>CANCEL</Button>
                            <Button variant="danger" onClick={() => { setMyChangeProfile(true); setMyProfile(false) }}>SAVE</Button>
                        </div>
                        <Card.Body style={{ padding: "30px 60px " }}>


                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ width: "300px", border: "none" }}>
                                    <div>YOUR NAME</div>
                                    <input style={{ fontWeight: "400", border: "none", borderBottom: "1px solid", outline: 'none' }} type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                </div>

                                <div style={{ width: "300px", border: "none", borderBottom: "1px solid" }}>
                                    <div>DATE OF BIRTH</div>
                                    <DatePicker
                                        selected={birthday}
                                        onChange={(date) => setBirthday(date)}
                                        maxDate={new Date()}
                                        customInput={
                                            <input
                                                style={{
                                                    fontWeight: "400",
                                                    border: "none",
                                                    outline: "none",

                                                    fontSize: "18px",
                                                    backgroundColor: "white",
                                                }}
                                                type="text"
                                                placeholder="YYY/MM/DD" />

                                        }
                                    />



                                </div>
                            </div>
                            <div style={{ width: "200px", border: "none", marginTop: "20px" }}>
                                <div>GENDER</div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        <input type="radio" name="gender" value="M" onChange={(e) => setGender(e.target.value)} />
                                        <label style={{ margin: "5px" }}>Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" value="F" onChange={(e) => setGender(e.target.value)} />
                                        <label style={{ margin: "5px" }}>Female</label>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: "10px" }}>
                                <fieldset>
                                    <legend style={{ textAlign: "center" }}>
                                        CONTACT DETAILS
                                        <hr /></legend>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>
                                            <div>EMAIL ID</div>
                                            <input style={{ fontWeight: "400", border: "none", borderBottom: "1px solid", outline: 'none' }} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>

                                        <div>
                                            <div>MOBILE NUMBER</div>
                                            <input style={{ fontWeight: "400", border: "none", borderBottom: "1px solid", outline: 'none' }} type="text" value={number} />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </Card.Body>
                    </Card>

                </div>
            )}


            {showTicket &&(
                <div><Card body>This is some text within a card body.</Card></div>
            )}
        </div>

    );
}
export default Profile;