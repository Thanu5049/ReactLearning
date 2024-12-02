import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import data from './data.json';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button';
import './Todo-Task.css';

const Task=()=>{
    const[datum,setDatum]=useState([]);
    useEffect(()=>{
        setDatum(data);
        console.log("i am in useEffect")
    },[])
    // setDatum(data);
    console.log("I am outside the useefdect");
const deleteHandler=(e)=>{
    let newArray=datum.filter((ele)=>(
        ele.id!=e
    ))
    setDatum(newArray);
}
const[updateButton,setUpdateButton]=useState(false);
const[presentTask,setPresentTask]=useState("");
const[storedId,setStoredId]=useState();
const updateHandler=(ele)=>{
    setUpdateButton(!updateButton);
    setPresentTask(ele.todo);
    setStoredId(ele.id);
}

const handleClickEvent=(e)=>{
    e.preventDefault();
    if(updateButton)
    {
        let id=storedId;
        console.log(id);
      const updatedDatum= datum.map((ele)=>{
                if(ele.id===id)
                {
                    ele.todo=presentTask;
                }
                return ele;
        });
        setDatum(updatedDatum);
        setUpdateButton(false);
        setPresentTask("");

    }
    else
    {
    if(presentTask.trim()){
    let newTask={"id":datum.length+1,"todo":presentTask,"done":false};
    setDatum([...datum,newTask]);
    setPresentTask('');
    }
    else
    {
        alert('please enter the task')
    }
    }
};
const[strike,setStrike]=useState(false);
const strikeHandler=(id)=>{
    setStrike(true);
   const updatedDatum=datum.map((elem)=>{
    if(elem.id===id)
    {
        {elem.done=!elem.done}
    }
    return elem;
   })
   setDatum(updatedDatum);
}
   return(
        <div className='container-width'>
        <Card className="container">
            <div>
            <form class="d-flex" onSubmit={handleClickEvent}>
        <input class="form-control me-2 mt-2" type="search" placeholder="Add a new task" aria-label="Search" value={presentTask} onChange={(e)=>setPresentTask(e.target.value)}/>
        <button class="btn btn-outline-success mt-2" type="submit"> {updateButton ? 'Update' : 'Add'}</button>
      </form>
            <Card.Header className='flex-grow-2 mt-2'>Tasks</Card.Header>
            </div>
      <Card.Body className='scrollable-container'>
      <ListGroup as="ol" >
        {datum.map((ele)=>{
            return(
                <div className='d-flex '>
         <ListGroup.Item as="li" 
        className={`m-1 border flex-grow-1 ${ele.done ? 'text-decoration-line-through' : ''}` }
        >{ele.todo}</ListGroup.Item>
         <div className='flex'>
         <Button variant="outline-primary" className={`btn-sm m-2 ${ele.done? 'disabled':''} `} onClick={()=>updateHandler(ele)}>
         <FontAwesomeIcon icon="fa-solid fa-pen" style={{color: "#0052e0",}} />
            </Button>{' '}
            <Button variant="outline-primary" className='btn-sm m-2' onClick={()=>deleteHandler(ele.id)}>
            <FontAwesomeIcon icon="fa-solid fa-trash" style={{color: "#ef0b0b",}} />
            </Button>{' '}
            <Button variant="outline-primary" className='btn-sm m-2' onClick={()=>strikeHandler(ele.id)} >
            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" checked={ele.done}/>
             </Button>{' '}
            </div>
         </div>
            )
})}
    </ListGroup>
    </Card.Body>
    </Card>
    </div>
    )
}
export default Task;