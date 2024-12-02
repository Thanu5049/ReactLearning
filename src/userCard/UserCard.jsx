 import "./UserCard.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { SocialIcon } from 'react-social-icons'

const UserCard=()=>{
    const myStyle={
        color:"red",
        fontSize:"40px"
    };
    return(
        <>
        <div className="container">
            <div className="left">
                <div className="photo-container"></div>
                <div className="name" style={myStyle}>John Doe</div>
                <div className="role">UI/UX designer</div>
             </div>
            <div className="right">
                <div className="info-container">
                <div className="headingOne"><u>INFORMATION</u></div>
                    <div className="details">
                        <div className="email">
                           <div className="child-one">Email:</div> 
                           <div className="child-two">johndoe@gmail.com</div> 
                        </div>
                        <div className="phone">
                           <div className="child-one">Phone:</div> 
                           <div className="child-two">010-123456</div> 
                        </div>
                    </div>
                </div>
                <div className="lower">
                    <div className="info-container">
                    <div className="heading"><u>PROJECTS</u></div>
                    <div className="project-list">
                        <ul>
                            <li>Online Journal</li>
                            <li>Chatbot</li>
                            <li>App Layout for Smart Television</li>
                        </ul>
                    </div>
                    <div className="networks">
                        <div className="box">
                        <SocialIcon url="https://twitter.com" /> 
                        </div>                       
                        <div className="box">
                            <SocialIcon url="https://discord.com/" />
                        </div>
                        <div className="box">
                        <SocialIcon url="https://in.linkedin.com/" />
                        </div>
                    </div>
                    </div>
                   
                </div>
            </div>
        </div>
        </>
    )
}
export default UserCard;