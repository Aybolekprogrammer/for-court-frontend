import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./add-new.scss";
import { DriveFolderUploadOutlined } from '@mui/icons-material';

function AddAlimonyToMustPay({ openNewAdd, setOpenNewAdd, id }) {
  const data = localStorage.getItem('token')
  const token = `Token ${data}`
  const [formData, setFormData] = useState({
    recipient: {
      name_and_lastname: '',
      birthday: '',
      phone_number: '',
      address: '',
      document_scan: null
    },
    alimony: {
      Category: '',
      ruling: '',
      ruling_date: '',
      began_paying: '',
      executor: '',
      executor_register: '',
      executor_date: '',
      must_pay: `${id}`,
      note: '',
      ruling_scan: null
    }
  });
  useEffect(()=>{
    setFormData({ ...formData,  alimony:{ ...formData.alimony,must_pay : id} })
  },[id])

  function handleRecipientDocumentScanChange(event) {
    formData.recipient.document_scan = event.target.files[0];
  }

  function handleAlimonyDocumentScanChange(event) {
    formData.alimony.ruling_scan = event.target.files[0];
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    data.append('recipient[name_and_lastname]', formData.recipient.name_and_lastname);
    data.append('recipient[birthday]', formData.recipient.birthday);
    data.append('recipient[phone_number]', formData.recipient.phone_number);
    data.append('recipient[address]', formData.recipient.address);
    data.append('recipient[document_scan]', formData.recipient.document_scan);
    data.append('mustpay[id]', formData.alimony.must_pay);
    data.append('alimony[Category]', formData.alimony.Category);
    data.append('alimony[ruling]', formData.alimony.ruling);
    data.append('alimony[ruling_date]', formData.alimony.ruling_date);
    data.append('alimony[began_paying]', formData.alimony.began_paying);
    data.append('alimony[executor]', formData.alimony.executor);
    data.append('alimony[executor_register]', formData.alimony.executor_register);
    data.append('alimony[executor_date]', formData.alimony.executor_date);
    data.append('alimony[note]', formData.alimony.note);
    data.append('alimony[ruling_scan]', formData.alimony.ruling_scan);

    axios.post('http://127.0.0.1:8000/api/addalimonytomustpay', data, {
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
      <div className={openNewAdd ? "openAdd active" : "openAdd"} onClick={() => setOpenNewAdd(false)}>
        <div className="blur"></div>
        <form className='form' onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
          <div className='form-control'>
            <label>Algydaryň ady:</label>
            <input
              type="text"
              value={formData.recipient.name_and_lastname}
              onChange={event => setFormData({ ...formData, recipient: { ...formData.recipient, name_and_lastname: event.target.value } })}
              required
            />
          </div>

          <div className='form-control'>
            <label>Algydaryň doglan senesi:</label>
            <input
              type="text"
              value={formData.recipient.birthday}
              onChange={event => setFormData({ ...formData, recipient: { ...formData.recipient, birthday: event.target.value } })}
              required
            />

          </div>

          <div className='form-control'>
            <label>Algydaryň doglan senesi:</label>
            <input
              type="text"
              value={formData.recipient.phone_number}
              onChange={event => setFormData({ ...formData, recipient: { ...formData.recipient, phone_number: event.target.value } })}
              required
            />

          </div>

          <div className='form-control'>
            <label>Algydaryň ýaşaýan salgysy:</label>
            <input
              type="text"
              value={formData.recipient.address}
              onChange={event => setFormData({ ...formData, recipient: { ...formData.recipient, address: event.target.value } })}
              required
            />
          </div>

          <div className='form-control'>
            <label>Algydaryň dokumenti:</label>
            <div className="fileBox">
              <DriveFolderUploadOutlined className='fileIcon' />
              File saýlaň
              <input
                className='file'
                type="file"
                onChange={handleRecipientDocumentScanChange}
                required
              />
            </div>
          </div>

          <div className='form-control'>
            <label>Kategoriýalar:</label>
            <input
              type="text"
              value={formData.alimony.Category}
              onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, Category: event.target.value } })}
              required
            />
          </div>

          <div className='form-control'>
            <label>Karary çykaran:</label>
            <input
              type="text"
              value={formData.alimony.ruling}
              onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, ruling: event.target.value } })}
              required
            />
          </div>

          <div className='form-control'>
            <label>Karar çykarylan sene:</label>
            <input
              type="text"
              value={formData.alimony.ruling_date}
              onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, ruling_date: event.target.value } })}
              required
            />
          </div>


          <div className='form-control'>
            <label>Töleg wagty:</label>
            <input
              type="text"
              value={formData.alimony.began_paying}
              onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, began_paying: event.target.value } })}
              required
            />
          </div>

          <div className='form-control'>
            <label>Ýerine ýetirýän:</label>
            <input
              type="text"
              value={formData.alimony.executor}
              onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, executor: event.target.value } })}
              required
            />
          </div>

          <div className='form-control'>
            <label>Önümçilik belgisi:</label>
            <input
              type="text"
              value={formData.alimony.executor_register}
              onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, executor_register: event.target.value } })}
              required
            />
          </div>

          <div className='form-control'>
            <label>Önumçiligiň senesi:</label>
            <input
              type="text"
              value={formData.alimony.executor_date}
              onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, executor_date: event.target.value } })}
              required
            />
          </div>

          <div className='form-control'>
            <label>Bellik:</label>
            <input
              type="text"
              value={formData.alimony.note}
              onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, note: event.target.value } })}
              required
            />
          </div>

          <div className='form-control'>
            <label>Kararyň nusgasy:</label>
            <div className="fileBox">
              <DriveFolderUploadOutlined className='fileIcon' />
              File saýlaň
              <input
                className='file'
                type="file"
                onChange={handleAlimonyDocumentScanChange}
                required
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

export default AddAlimonyToMustPay;
