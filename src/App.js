import './App.css';
import "./App.css";
import Todo from './To-DoList/Todo';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import{BrowserRouter as Router,Routes,Route} from "react-router-dom";
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
function App() {
  return (
   <>
  {/* <Home />   */}
   <SeatBooking />
   </>
  );
}

export default App;
library.add(fab, fas, far)
