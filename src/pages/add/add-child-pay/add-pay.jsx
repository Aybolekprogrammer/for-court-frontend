import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './add-pay-child.scss';
import { DriveFolderUploadOutlined } from '@mui/icons-material';

function AddPay({ openAddPay, setOpenAddPay, id }) {
  const data = localStorage.getItem('token')
  const token = `Token ${data}`
  const [formData, setFormData] = useState({
    receipt: {
      must_pay: `${id}`,
      payment: '',
      payment_date: '',
      currency: '',
      alimony_percent: '',
      document_scan: null
    }
  });
  useEffect(()=>{
    setFormData({ ...formData,  receipt:{ ...formData.receipt,must_pay : id} })
  },[id])

  function handleMustPayReceiptDocumentScanChange(event) {
    formData.receipt.document_scan = event.target.files[0];
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    data.append('receipt[id]', formData.receipt.must_pay);
    data.append('receipt[payment]', formData.receipt.payment);
    data.append('receipt[payment_date]', formData.receipt.payment_date);
    data.append('receipt[currency]', formData.receipt.currency);
    data.append('receipt[alimony_percent]', formData.receipt.alimony_percent);
    data.append('receipt[document_scan]', formData.receipt.document_scan);

    axios.post('http://127.0.0.1:8000/api/addreceipt', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token
      }
    })
      .then(response => {
        console.log(response.data);
        alert('Üstünlikli goşuldy')
      })
      .catch(error => {
        console.error(error);
        alert('Täzeden synanyşyň')
      });
  }

  return (
    <div className="add">
      <div className={openAddPay ? "openAdd active" : "openAdd"} onClick={() => setOpenAddPay(false)}>
        <div className="blur"></div>
        <form onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>

          <div className='form-control'>
            <label>Töleg: </label>
            <input
              type="text"
              value={formData.receipt.payment}
              onChange={event => setFormData({ ...formData, receipt: { ...formData.receipt, payment: event.target.value } })}
            />
          </div>

          <div className='form-control'>
            <label>Töleg wagty:</label>
            <input
              type="text"
              value={formData.receipt.payment_date}
              required
              onChange={event => setFormData({ ...formData, receipt: { ...formData.receipt, payment_date: event.target.value } })}
            />
          </div>

          <div className='form-control'>
            <label > Walýuta:</label>
            {/* <select>
                <option value={formData.receipt.currency}  onChange={event => setFormData({ ...formData, receipt: { ...formData.receipt, currency: event.target.value } })}>tmt</option>
                <option value={formData.receipt.currency}  onChange={event => setFormData({ ...formData, receipt: { ...formData.receipt, currency: event.target.value } })}>dollar</option>
            </select> */}
            <input
              type="text"
              value={formData.receipt.currency}
              onChange={event => setFormData({ ...formData, receipt: { ...formData.receipt, currency: event.target.value } })}
            />
          </div>

          <div className='form-control'>
            <label>Göterim:</label>
            <input
              type="text"
              value={formData.receipt.alimony_percent}
              required
              onChange={event => setFormData({ ...formData, receipt: { ...formData.receipt, alimony_percent: event.target.value } })}
            />
          </div>

          <div className='form-control'>
            <label> Dokumenti: </label>
            <div className="fileBox">
              <DriveFolderUploadOutlined className='fileIcon' />
              File saýlaň
            <input
              className='file'
              type="file"
              required
              onChange={handleMustPayReceiptDocumentScanChange}
            />
            </div>
          </div>

          <div className="submit">
             <button type="submit">Goşmak</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPay;