import './Home.css';
import Nav from 'react-bootstrap/Nav';
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


const Home=()=>{
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [show, setShow] = useState(false);       //this is for the login details close modal
  const handleClose = () =>{ setShow(false);
      reset();}    //this is for the login details close modal
  const handleShow = () => setShow(true);    //this is for the login details close modal

//validation in the modal
const{
  register,handleSubmit,reset,formState:{errors},watch
}=useForm();

const onSubmit=(data)=>{console.log(data);
}

console.log(errors.email)
//Tabs switching in login page
const [key, setKey] = useState('home');
const handleTabSelect = (k) => {
  setKey(k);
  reset(); // Clear form data and errors when switching tabs
};
const password = watch("password");

    return(
 <div className="mn-container">
    <div className="container-one">
       <div className="nav">
          <Nav className="me-auto">
            <Nav.Link><img src="tr-logo-four.png" style={{height:"30px",width:"40px",borderRadius:"10px"}}/></Nav.Link>
            <Nav.Link style={{color:'white',fontSize:'16px'}} href="#home">Home </Nav.Link>
            <Nav.Link style={{color:'white',fontSize:'16px'}} href="#features">Features</Nav.Link>
            <Nav.Link style={{color:'white',fontSize:'16px'}} href="#pricing">Pricing</Nav.Link>
            <Nav.Link style={{color:'white',fontSize:'16px'}} href="#pricing">Customer Service</Nav.Link>
            <Button variant="primary" className='login' size="md" onClick={handleShow}>
          Login or Create Account
        </Button>{' '}
          </Nav>
          </div>

        {/* //login modal  */}
          <Modal show={show} onHide={handleClose} >
        <Modal.Body>
          <Tabs activeKey={key}
      onSelect={handleTabSelect} style={{margin:"5px"}}>
        <Tab eventKey="home" title="Login" >
        <Form  noValidate onSubmit={handleSubmit(onSubmit)} style={{margin:"15px"}}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label style={{fontWeight:"600"}}>Email address</Form.Label>
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
          {errors.email  && (<p className='errorMsg'>{errors.email.message}</p>)}
          {errors.email && errors.email.type === "pattern" && (
        <p className='errorMsg'>{errors.email.message}</p> )}
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formGroupPassword" >
        <Form.Label style={{fontWeight:"600"}}>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        {...register("password",{required:true})}/>
        {errors.password && errors.password.type==="required" && (<p className='errorMsg'>Password is required</p>)}
      </Form.Group> */}
      <Form.Group className="mb-3" controlId="formGroupPassword" >
        <Form.Label style={{fontWeight:"600"}}>Enter Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        {...register("password",{required:"Password is required"})}/>
        {errors.password && errors.password.type==="required" && (<p className='errorMsg'>Password is required</p>)}
      </Form.Group>
      <Modal.Footer style={{border:"none"}}>
          <br/>
          <Button style={{backgroundColor:"red"}} onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  type="submit" >
          Login
          </Button>
        </Modal.Footer>
   </Form>
   </Tab>
      <Tab eventKey="profile" title="Signup">
      <Form  noValidate onSubmit={handleSubmit(onSubmit)} style={{margin:"15px"}}>
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
          {errors.email && errors.email.type==="required" && (<p className='errorMsg'>{errors.email.message}</p>)}
          {errors.email && errors.email.type === "pattern" && (
        <p className='errorMsg'>{errors.email.message}</p> )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword" >
        <Form.Label style={{fontWeight:"600"}}>Enter Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        {...register("password",{required:"Password is required"})}/>
        {errors.password && errors.password.type==="required" && (<p className='errorMsg'>Password is required</p>)}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupConfirmPassword" >
        <Form.Label style={{fontWeight:"600"}}>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" 
        {...register("confirmpass",{required:"Please confirm your password",
          validate: (value) => value === password || "Passwords do not match"
        })}/>
        {errors.confirmpass &&  (<p className='errorMsg'>Passwords do not match</p>)}
      </Form.Group>
      <Modal.Footer style={{border:"none"}}>
          <br/>
          <Button style={{backgroundColor:"red"}} onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  type="submit" >
          Signup
          </Button>
        </Modal.Footer>
   </Form>
      </Tab>
      </Tabs>
        </Modal.Body>
        
      </Modal>



      <div className="search-container">
    <Form>
      <Row>
        <Col className="inner-sc">
        <div className="city-container-left">
          <div className='city-from'>From</div>
          <Form.Select size="lg" className='city'>
        <option>Hyderabad, Telangana</option>
        <option>Vijayawada, Andhra Pradesh</option>
        <option>Mumbai, Maharashtra</option>
        <option>Delhi, Delhi</option>
        <option>Bangalore, Karnataka</option>
      </Form.Select>
        </div>
        <div className="city-container-right">
          <div className='city-from'>To</div>
          <Form.Select size="lg" className='city'>
        <option>Hyderabad, Telangana</option>
        <option>Vijayawada, Andhra Pradesh</option>
        <option>Mumbai, Maharashtra</option>
        <option>Delhi, Delhi</option>
        <option>Bangalore, Karnataka</option>
      </Form.Select>
      </div>
        <div className="date-picker-container">
        <div className="travel-div">Travel</div>
        <DatePicker 
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)} // Update selected date
        dateFormat="yyyy/MM/dd" // Customize the display format
        placeholderText="Click to select a date" // Placeholder text for input
        customInput={
          <Form.Control style={{ height: "75px", width: "400px" }}/>
        }
      />
      </div>
      </Col>
      </Row>
      
      <Row>
        <div className='submit-div'>
        <Col><Button variant="primary" className='submit-button' style={{fontSize:"25px",fontWeight:"700"}} >
          SEARCH
        </Button>{' '}</Col>
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
  );
}


export default Home;