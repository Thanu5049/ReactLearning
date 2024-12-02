import './Home.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import {useForm} from "react-hook-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { format } from 'date-fns';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'; 

const Home=()=>{
  const [selectedDate, setSelectedDate] = useState(new Date());
let navigate=useNavigate();

  //validation for login
const{
  register:registerLogin,
  handleSubmit:handleSubmitLogin,reset,
  formState:{errors:loginErrors}
}=useForm();

const handleClose = () =>{ 
  setShow(false);
  reset();} 

const onLoginSubmit=(data)=>{
  const userEmail=data.loginemail;
  const passs=data.loginpassword;
  const users=JSON.parse(localStorage.getItem("users"))
  const user = users.find((user) => user.email === userEmail && user.password === passs);
  // console.log(user);

  if (user) {
    const userName=user["username"];
    localStorage.setItem("session",userName);
    navigate('/bus-list', { state: {userEmail:userEmail, from: stateFrom, to: stateTo, on: selectedDate, states: displayStates,userName:userName} });
  } else {
    alert("Invalid credentials");
    reset();
  }
  
}

//validation in the signup
const{
  register:registerSignup,
  handleSubmit:handleSubmitSignup,
  formState:{errors:signUpErrors},watch,
}=useForm();
 const password = watch("password"); // Watch password for confirmation
// console.log(password);

const onSignupSubmit=(data)=>{

  let users = JSON.parse(localStorage.getItem("users")) || [];  
   const value=({
    "email":data.email,
    "password":data.password,
    "username":data.name
  })
  const userExists = users.some(user => 
    user.email === value.email && 
    user.password === value.password && 
    user.username === value.username
  );

  if (userExists) {
    alert("The user data already exists");
  } else {
    users.push(value);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup was successful");
    reset();
  }
}
const [show, setShow] = useState(false);     
const handleShow = () => setShow(true);    
//Tabs switching in login page
const [key, setKey] = useState('home');
const handleTabSelect = (k) => {
  setKey(k);
  reset(); // Clear form data and errors when switching tabs
};
const formatDate = (date) => {
  return format(date, "dd MMM'' yy");// Format the date to '16 Nov' 24'
};


const displayStates=["Mumbai, Maharashtra","Bangalore, Karnataka","Pune,Maharashtra","Hyderabad, Telangana","Vijayawada, Andhra Pradesh","Chennai, Tamil Nadu"];
const[stateFrom,setStateFrom]=useState(displayStates[0]);
let isLoggedIn=false;
const[stateTo,setStateTo]=useState(
  displayStates.find((state) => state !== stateFrom)
);
const onSearch=()=>{
  if(!isLoggedIn)
    setShow(true);
}
    return(
      <>
      <div className="nav-bar">
      <Nav className="me-auto d-flex" style={{justifyContent:"space-between"}}>
        <div>
        <Nav.Link><img src="tr-logo-four.png" style={{height:"30px",width:"40px",borderRadius:"10px"}}/></Nav.Link>
        </div>
        <div style={{display:"flex"}}>
        <Nav.Link style={{color:'white',fontSize:'16px'}} href="#home">
        <FontAwesomeIcon icon="fa-solid fa-house" style={{color: "#ffffff",}} />
          Home </Nav.Link>
        <Nav.Link style={{color:'white',fontSize:'16px'}} href="#features">
        <FontAwesomeIcon icon="fa-solid fa-circle-info" style={{color: "#ffffff",}} />Services</Nav.Link>
        <Nav.Link style={{color:'white',fontSize:'16px'}} href="#pricing">
        <FontAwesomeIcon icon="fa-solid fa-ticket" style={{color: "#ffffff",}} />
          Tickets</Nav.Link>
        <Nav.Link style={{color:'white',fontSize:'16px'}} href="#pricing">
        <FontAwesomeIcon icon="fa-regular fa-circle-question" style={{color: "#ffffff",}} />
          About</Nav.Link>
        <Button variant="primary" className='login'  onClick={handleShow}>
      Login or Create Account
    </Button>
    </div>
      </Nav>
      </div>
 <div className="mn-container">
    <div className="container-one">
      
      <Modal show={show} onHide={handleClose} className="custom-modal login-main-container">
       
      <div className='login-container'>
        <Modal.Body>
          <Tabs activeKey={key}
      onSelect={handleTabSelect} style={{margin:"5px",borderRadius:"40px",border:"2px solid",display:"flex",gap:"20px"}}>
        <Tab eventKey="home" title="Login" >
         
    <Form  noValidate onSubmit={handleSubmitLogin(onLoginSubmit)} style={{margin:"15px"}}>
      <Form.Group className="mb-3" >
        <Form.Label style={{fontWeight:"600"}}>Email address</Form.Label>
        <Form.Control
         type="email"
          placeholder="Enter email" 
          {...registerLogin("loginemail",{
            required:"Please enter your email",
            pattern:{
               value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Please enter a valid email"
            }
          })}/>
          {loginErrors.loginemail  && loginErrors.loginemail.type==="required" 
          && (<p className='errorMsg'>{loginErrors.loginemail.message}</p>) 
          || loginErrors.loginemail && loginErrors.loginemail.type === "pattern" && (
        <p className='errorMsg'>{loginErrors.loginemail.message}</p> )}
      </Form.Group>

      <Form.Group className="mb-3"  >
        <Form.Label style={{fontWeight:"600"}}>Enter Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        {...registerLogin("loginpassword",{required:"Password is required"})}/>
        {loginErrors.loginpassword && loginErrors.loginpassword.type==="required" 
        && (<p className='errorMsg'>Password is required</p>)}
      </Form.Group>
      <Modal.Footer style={{border:"none"}}>
          <br/>
          <Button style={{backgroundColor:"red"}} onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" className="login-buttons"> Login</Button>        </Modal.Footer>
   </Form>
   </Tab>
 <Tab eventKey="profile" title="Signup" >
      <Form  noValidate onSubmit={handleSubmitSignup(onSignupSubmit)} style={{margin:"15px"}}>
      <Form.Group className="mb-3" >
        <Form.Label style={{fontWeight:"600"}}>Enter your username</Form.Label>
        <Form.Control
         type="text"
          placeholder="Enter username" 
          {...registerSignup("name",{
            required:"Please enter your name",
            maxLength:{
              value:4,
            message:"Name cannot exceed 4 characters"}
          })}/>
          {/* {signUpErrors.name && signUpErrors.name.type==="required" && (<p className='errorMsg'>{signUpErrors.name.message}</p>)} */}
          {signUpErrors.name && (
  <p className='errorMsg'>{signUpErrors.name.message}</p>
)}
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label style={{fontWeight:"600"}}>Enter Email address</Form.Label>
        <Form.Control
         type="email"
          placeholder="Enter email" 
          {...registerSignup("email",{
            required:"Please enter your email",
            pattern:{
               value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Please enter a valid email"
            }
          })}/>
          {signUpErrors.email && signUpErrors.email.type==="required" && (<p className='errorMsg'>{signUpErrors.email.message}</p>) || signUpErrors.email && signUpErrors.email.type === "pattern" && (
        <p className='errorMsg'>{signUpErrors.email.message}</p> )}
      </Form.Group>
      <Form.Group className="mb-3"  >
        <Form.Label style={{fontWeight:"600"}}>Enter Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        {...registerSignup("password",{required:"Password is required"})}/>
        {signUpErrors.password && signUpErrors.password.type==="required" && (<p className='errorMsg'>Password is required</p>)}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupConfirmPassword" >
        <Form.Label style={{fontWeight:"600"}}>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" 
        {...registerSignup("confirmpass",{required:"Please enter your password",
          validate: (value) => value === password || "Passwords do not match"
        })}/>
        {signUpErrors.confirmpass &&  (<p className='errorMsg'>{signUpErrors.confirmpass.message}</p>)}
      </Form.Group>
      <Modal.Footer style={{border:"none"}}>
          <br/>
          <Button className='close-button' onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  type="submit" className="login-buttons"
          >
          Signup
          </Button>
        </Modal.Footer>
   </Form> 
      </Tab>
      </Tabs>     
        </Modal.Body>
        </div>
      </Modal>
      


      <div className="search-container">
    <Form>
      <Row>
        <Col className="inner-sc">
        <div className="city-container-left hov">
          <div className='city-from'>From</div>
      <Form.Select
        size="lg"
        className="city"
        value={stateFrom}
        onChange={(event) => {
          const newStateFrom = event.target.value;
          setStateFrom(newStateFrom);
          // Update stateTo if it matches the new stateFrom
          if (stateTo === newStateFrom) {
            const alternativeState = displayStates.find((state) => state !== newStateFrom);
            setStateTo(alternativeState);
          }
        }}>
  {displayStates.map((state) => (
    <option key={state} value={state}>
      {state}
    </option>
  ))}
</Form.Select>
        </div>
        <div className="city-container-right hov">
          <div className='city-from'>To</div>
      <Form.Select
  size="lg"
  className="city"
  value={stateTo}
  onChange={(event) => setStateTo(event.target.value)}
>
  {displayStates
    .filter((state) => state !== stateFrom) // Exclude selected stateFrom
    .map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
</Form.Select>
      </div>
        <div className="date-picker-container hov">
        <div className="travel-div city-from">Travel Date</div>
        <DatePicker 
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)} // Update selected date
        value={formatDate(selectedDate)} // Format the date for display
        placeholderText="Click to select a date" // Placeholder text for input
        minDate={new Date()}
        customInput={
          <Form.Control style={{ height: "50px", width: "400px",border:"none",fontWeight:"700",fontSize:"25px" }}/>
        }
      />
      </div>
      </Col>
      </Row>
    
      <Row style={{ width: "50%", margin: "0 auto" }}>
        <div className='submit-div'>
       <Button variant="primary" className='submit-button' style={{fontSize:"25px",fontWeight:"700",marginTop:"10px"}} onClick={onSearch} >
          SEARCH
        </Button>
        </div>
      </Row>
    </Form>
    </div>
    <div className="carousel-div">
    <Carousel>
      <Carousel.Item>
        <img src="carousel-slide-1.avif" className="carousel-img" />
      </Carousel.Item>
      <Carousel.Item>
      <img src="carousel-slide-2.jpg" className="carousel-img"  />
      </Carousel.Item>
      <Carousel.Item>
      <img src="carousel-slide-33.webp"  className="carousel-img" />
      </Carousel.Item>
    </Carousel>
  </div>
 </div>

</div>
</>
  );
}


export default Home;