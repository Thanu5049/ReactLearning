import React from 'react';
import {useState} from 'react';
const EventLearning=()=>{
    const[value,setValue]=useState("");
    
return(
    <>
    <input value={value} onChange={(e)=>{setValue(e.target.value) ;    console.log(e);}}/>
    <h3>My name is {value}</h3>
    </>
)
}
export default EventLearning;