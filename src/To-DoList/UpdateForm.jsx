import React, { useEffect, useState } from "react";

const UpdateForm = ({ originalData, onClose, setData }) => {
  const [formData, setFormData] = useState(originalData);

  useEffect(() => {
    setFormData(originalData);
  }, [originalData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the data in the parent component
    setData(prevData => prevData.map(item => item.id === formData.id ? formData : item));
    alert("Submitted data SUCCESSFULLY: " + JSON.stringify(formData));
    onClose(); // Close the modal
  };

  return (
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Record</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="idInput">ID</label>
                <input
                  type="number"
                  className="form-control"
                  id="idInput"
                  value={formData.id}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="nameInput">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="emailInput">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bodyInput">Body</label>
                <input
                  type="text"
                  className="form-control"
                  id="bodyInput"
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
