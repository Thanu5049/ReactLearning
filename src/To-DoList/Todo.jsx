import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, Table } from "react-bootstrap";
import UpdateForm from "./UpdateForm";
import AddForm from "./AddForm";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// const Todo = () => {
//   const [datum, setData] = useState([]); //array of first 10 rows
//   const[passedData,setPassedData]=useState(null); //selected data in the row
//   useEffect(() => {
//     const oper = async () => {
//       try {
//         const arr = await axios.get("https://jsonplaceholder.typicode.com/comments");
//         const firstTen = arr.data.slice(0, 10);
//         setData(firstTen);
//       } catch (error) {
//         console.log("Error is:", error);
//       }
//     };
//     oper();
//   }, []);
// const[visible,setVisible]=useState(false);
// const handleClick=(data)=>{
//   setVisible(true);
//   setPassedData(data);
// }

// const handleDelete=(data)=>{
//  let deletedArray= datum.filter(ele=>ele.id!=data.id);

//  setData(deletedArray);
//   console.log(deletedArray)
// }
// const[addForm,setAddForm]=useState(false);
// const handleAdd=()=>{
//   setAddForm(true);
// }
//   return (
//     <div className="m-5">
//       <Dropdown>  
//                   <Dropdown.Toggle variant="secondary">
//                   </Dropdown.Toggle>

//                   <Dropdown.Menu>
//                     <Dropdown.Item href="#" onClick={handleAdd}>Add</Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>
//       <Table bordered>
//         <thead>
//           <tr>
//             <th scope="col-4" >ID</th>
//             <th scope="col-4" >Name</th>
//             <th scope="col-4" >Email</th>
//             <th scope="col-4" style={{width:"500px"}} >Body

//             </th>
//             <th>Actions   

//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {datum.map((data, index) => (
//             <tr key={index}>
//               <td>{data.id}</td>
//               <td>{data.name}</td>
//               <td>{data.email}</td>
//               <td>
//                 {data.body}

//               </td>
//               <td> <Dropdown>
//                   <Dropdown.Toggle variant="secondary" id={`dropdown-button-${index}`}>
//                   </Dropdown.Toggle>

//                   <Dropdown.Menu>
//                     <Dropdown.Item href="#" ={() => handleClick(data)} >Update</Dropdown.Item>
//                     <Dropdown.Item href="#" onClick={()=>handleDelete(data)}>Delete</Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown></td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       {/* {visible && <UpdateForm datum={passedData} onClose={()=>setVisible(false) }/>} */}
//       {visible && (
//         <UpdateForm originalData={passedData} onClose={() => setVisible(false)} setData={setData}  />
//       )}
//       {addForm && (
//         <AddForm datum={datum}onClose={()=>setAddForm(false)} />
//       )}
//     </div>
//   );
// };
const Todo = () => {
  const [datum, setData] = useState([]); //array of first 10 rows
    const[passedData,setPassedData]=useState(null); //selected data in the row
    useEffect(() => {
      const oper = async () => {
        try {
          const arr = await axios.get("https://jsonplaceholder.typicode.com/comments");
          const firstTen = arr.data.slice(0, 10);
          setData(firstTen);
        } catch (error) {
          console.log("Error is:", error);
        }
      };
      oper();
    }, []);
  const[visible,setVisible]=useState(false);
  const handleClick=(data)=>{
    setVisible(true);
    setPassedData(data);
  }
  const handleDelete=(data)=>{
   let deletedArray= datum.filter(ele=>ele.id!=data.id)
   setData(deletedArray);
    console.log(deletedArray)
  }
  const[addForm,setAddForm]=useState(false);
  const handleAdd=()=>{
    setAddForm(true);
 }
  return (
    <>
       <Row xs={1} md={2}  className="g-4 container m-auto">
    {datum.map((ele,index)=>(
       <Card style={{ width: '18rem' }}>
       <Card.Img variant="top" src='man-pic.jpg' />
       <Card.Body>
         <Card.Title style={{ textAlign: "center" }}>{index+1}</Card.Title>
         <ListGroup className="list-group-flush">
           <ListGroup.Item>{ele.name}</ListGroup.Item>
           <ListGroup.Item>{ele.email}</ListGroup.Item>
           <ListGroup.Item>{ele.body}</ListGroup.Item>
         </ListGroup>

       </Card.Body>

       <Card.Body>
         <Card.Link href="#" className="m-5">Update</Card.Link>
         <Card.Link href="#">Remove</Card.Link>
       </Card.Body>
     </Card>

    ))}
   </Row>
    </>
  )
}
export default Todo;
