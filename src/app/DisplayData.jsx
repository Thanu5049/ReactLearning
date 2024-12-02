import {useState,useEffect} from "react";
import axios from "axios";

const DisplayData=()=>{
    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8001/posts")
        .then(res=>console.log(res.json))
        .catch(error=>console.log(error));
    },[])
    return(
        <>
        
        </>
    )
}
export default DisplayData;