import './App.css';
import "./App.css";
import Todo from './To-DoList/Todo';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import UpdateForm from './To-DoList/UpdateForm';
import Task from './To-DoTasks/Task';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import IncDec from './IncDecApp/IncDec';
import CreatingForm from './Form/CreatingForm';
import Styles from './demo-1/Styles';
import Home from './busTicketBooking/pages/Home';
 import UserCard from'./userCard/UserCard';
 import EventLearning from './eventLearning';
 import SeatBooking from './busTicketBooking/Passengers/SeatBooking';
import DetailsFilling from './busTicketBooking/Passengers/DetailsFilling';
import ConfirmationDetails from './busTicketBooking/Passengers/ConfirmationDetails';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from './busTicketBooking/NavBar';
import BusList from './busTicketBooking/Passengers/BusList';
import PaymentDone from './busTicketBooking/Passengers/PaymentDone';
import Profile from './busTicketBooking/Passengers/Profile';
import ChangeProfile from './busTicketBooking/Passengers/ChangeProfile';
import ShowTicket from './busTicketBooking/Passengers/ShowTicket';
import CancelTicket from './busTicketBooking/Passengers/CancelTicket';
function App() {
  return (
<>
   <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/seat-booking' element={<SeatBooking />}/>
      <Route path="/bus-list" element={<BusList />}/>
      <Route path="/details-filling" element={<DetailsFilling />}/>
      <Route path="/confirm-details" element={<ConfirmationDetails/>}/>
      <Route path="/payment" element={<PaymentDone />}/>
      <Route path="/change-profile" element={<ChangeProfile />}/>
      <Route path="/show-ticket" element={<ShowTicket />}/>
      <Route path="/cancel-ticket" element={<CancelTicket />}/>

    </Routes>
   </Router>
   {/* <Profile /> */}
</>
  );
}

export default App;
library.add(fab, fas, far)
