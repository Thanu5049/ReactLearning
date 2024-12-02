import './InDec.css';
import {useState} from "react";
const IncDec=()=>{
const[count,setCount]=useState(0);
    const incrementHandler=()=>{
        setCount(count+1);
    }
    const decrementHandler=()=>{
        setCount(count-1);
    }
return(
    <div className="container">
        <div className="row">
            <div className="col-5 " style={{height:"300px",margin:"10% auto",border:"2px solid black",borderRadius:"5%"}}>
                <div className="number">
                    <div className="display">{count}</div>
                </div>
                <div className="counters d-flex">
                    <div className="increment" onClick={incrementHandler}>Increment</div>
                    <div className="decrement" onClick={decrementHandler}>Decrement</div>
                </div>
            </div>
        </div>
    </div>
)
}
export default IncDec;