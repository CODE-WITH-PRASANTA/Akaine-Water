import React, { useState } from 'react';
import { IoTrashOutline, IoPencilOutline } from 'react-icons/io5'; // Removed IoChevronDown
import './FailedDelivery.css';

const FailedDelivery = () => {
  const [formData, setFormData] = useState({ id: '', location: '', return: '', feedback: '' });
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedData = [...tableData];
      updatedData[editIndex] = formData;
      setTableData(updatedData);
      setEditIndex(null);
    } else {
      setTableData([...tableData, formData]);
    }
    setFormData({ id: '', location: '', return: '', feedback: '' });
  };

  const deleteRow = (index) => setTableData(tableData.filter((_, i) => i !== index));
  const editRow = (index) => {
    setFormData(tableData[index]);
    setEditIndex(index);
  };

  return (
    <div className="MainContainer">
      <div className="FormSection">
        <form className="card" onSubmit={handleSubmit}>
          <div className="header">
            <div className="headerNumber">8</div>
            <h2 className="headerTitle">Failed Delivery</h2>
          </div>
          <div className="formGroup">
            <label className="label">Customer ID</label>
            <input type="text" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} className="input" required />
          </div>
          <div className="formGroup">
            <label className="label">Location</label>
            <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="input" required />
          </div>
          
          <div className="formGroup">
            <label className="label">Return</label>
            <div className="selectWrapper">
              {/* Removed IoChevronDown component */}
              <select value={formData.return} onChange={(e) => setFormData({...formData, return: e.target.value})} className="select" required>
                <option value="" disabled>Select option</option>
                <option value="Damage">Damage</option>
                <option value="Wrong item">Wrong item</option>
                <option value="Refused">Refused</option>
              </select>
            </div>
          </div>

          <div className="formGroup">
            <label className="label">Feedback</label>
            <textarea value={formData.feedback} onChange={(e) => setFormData({...formData, feedback: e.target.value})} className="textarea" rows={3} />
          </div>
          <button type="submit" className="submitBtn">{editIndex !== null ? 'Update' : 'Submit'}</button>
        </form>
      </div>

      <div className="TableSection">
        <div className="card">
          <table className="deliveryTable">
            <thead>
              <tr><th>ID</th><th>Location</th><th>Return</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td><td>{row.location}</td><td>{row.return}</td>
                  <td className="actions">
                    <button onClick={() => editRow(index)} className="editBtn"><IoPencilOutline/></button>
                    <button onClick={() => deleteRow(index)} className="delBtn"><IoTrashOutline/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FailedDelivery;