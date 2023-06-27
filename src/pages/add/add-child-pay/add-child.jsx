import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './add-pay-child.scss';
import { DriveFolderUploadOutlined } from '@mui/icons-material';

function AddChild({ openAddChild, setOpenAddChild, id }) {
  const data = localStorage.getItem('token')
  const token = `Token ${data}`

  const [formData, setFormData] = useState({
    child: {
      recipient: `${id}`,
      name_and_lastname: '',
      birthday: '',
      document_scan: null
    }
  });
  useEffect(()=>{
    setFormData({ ...formData, child: { ...formData.child,recipient : id} })
  },[id])

  function handleRecipientChildDocumentScanChange(event) {
    formData.child.document_scan = event.target.files[0];
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    data.append('child[id]', formData.child.recipient);
    data.append('child[name_and_lastname]', formData.child.name_and_lastname);
    data.append('child[birthday]', formData.child.birthday);
    data.append('child[document_scan]', formData.child.document_scan);

    axios.post('http://127.0.0.1:8000/api/addchild', data, {
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
      <div className={openAddChild ? "openAdd active" : "openAdd"} onClick={() => setOpenAddChild(false)}>
        <div className="blur"></div>
        <form onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
          <div className='form-control'>
            <label> Çagasynyň ady: </label>
            <input
              type="text"
              value={formData.child.name_and_lastname}
              required
              onChange={event => setFormData({ ...formData, child: { ...formData.child, name_and_lastname: event.target.value } })}
            />
          </div>

          <div className='form-control'>
            <label>Doglan senesi:</label>
            <input
              type="text"
              required
              value={formData.child.birthday} 
              onChange={event => setFormData({ ...formData, child: { ...formData.child, birthday: event.target.value } })}
            />
          </div>

          <div className='form-control'>
            <label>Dokumenti:  </label>
            <div className="fileBox">
              <DriveFolderUploadOutlined className='fileIcon' />
              File saýlaň
              <input
                className='file'
                type="file"
                onChange={handleRecipientChildDocumentScanChange}
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

export default AddChild;
