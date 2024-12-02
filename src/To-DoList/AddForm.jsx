import {useState,useEffect} from "react";
const AddForm=({onClose,datum})=>{
    const[values,setValues]=useState({
        id:datum.length+1,
        name:"",
        email:"",
        body:""
    })
    console.log(datum);
    const[newArray,setNewArray]=useState(datum);
    const handleAddSubmit=(e)=>{
        e.preventDefault();
        console.log(values);
        datum.push(values);
        setNewArray(datum);
        console.log(newArray);
        onClose();
    }

    return(
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Record</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddSubmit} >
              <div className="form-group">
                <label htmlFor="idInput">ID</label>
                <input
                  type="number"
                  className="form-control"
                  id="idInput"
                  value={datum.length+1}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="nameInput">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  onChange={(e) => setValues({...values, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="emailInput">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  onChange={(e) => setValues({...values, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bodyInput">Body</label>
                <input
                  type="text"
                  className="form-control"
                  id="bodyInput"
                  onChange={(e) => setValues({ ...values, body: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
};
export default AddForm;