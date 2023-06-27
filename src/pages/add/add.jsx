import React, { useState } from 'react';
import axios from 'axios';
import './add.scss';
import logoBottom from '../../images/logo.png';
import { DriveFolderUploadOutlined } from "@mui/icons-material";


function Add() {
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
        mustpay: {
            name_and_lastname: '',
            birthday: '',
            phone_number: '',
            phone_number2: '',
            address: '',
            job_status: '',
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
            note: '',
            ruling_scan: null
        }
    });

    function handleRecipientDocumentScanChange(event) {
        formData.recipient.document_scan = event.target.files[0];
    }

    function handleMustPayDocumentScanChange(event) {
        formData.mustpay.document_scan = event.target.files[0];
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
        data.append('mustpay[name_and_lastname]', formData.mustpay.name_and_lastname);
        data.append('mustpay[birthday]', formData.mustpay.birthday);
        data.append('mustpay[phone_number]', formData.mustpay.phone_number);
        data.append('mustpay[phone_number2]', formData.mustpay.phone_number2);
        data.append('mustpay[address]', formData.mustpay.address);
        data.append('mustpay[job_status]', formData.mustpay.job_status);
        data.append('mustpay[document_scan]', formData.mustpay.document_scan);
        data.append('alimony[Category]', formData.alimony.Category);
        data.append('alimony[ruling]', formData.alimony.ruling);
        data.append('alimony[ruling_date]', formData.alimony.ruling_date);
        data.append('alimony[began_paying]', formData.alimony.began_paying);
        data.append('alimony[executor]', formData.alimony.executor);
        data.append('alimony[executor_register]', formData.alimony.executor_register);
        data.append('alimony[executor_date]', formData.alimony.executor_date);
        data.append('alimony[note]', formData.alimony.note);
        data.append('alimony[ruling_scan]', formData.alimony.ruling_scan);

        axios.post('http://127.0.0.1:8000/api/addalimony', data, {
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
            <div className="addContainer">
                <h2>Täze döretmek</h2>
                <form onSubmit={handleSubmit}>
                    <div className="left">
                        <div className='inputs'>
                            <label htmlFor='recipient-name'>Algydaryň ady:</label>
                            <input
                                type="text"
                                name='recipient-name'
                                value={formData.recipient.name_and_lastname}
                                onChange={event => setFormData({ ...formData, recipient: { ...formData.recipient, name_and_lastname: event.target.value } })}
                                required
                            />
                        </div>

                        <div className='inputs'>
                            <label htmlFor='recipient-birthday'>Algydaryň doglan senesi:</label>
                            <input
                                type="text"
                                name='recipient-birthday'
                                value={formData.recipient.birthday}
                                onChange={event => setFormData({ ...formData, recipient: { ...formData.recipient, birthday: event.target.value } })}
                                required
                            />
                        </div>

                        <div className='inputs'>
                            <label htmlFor='recipient-phone'>ALgydaryň telefon belgisi:</label>
                            <input
                                type="text"
                                name='recipient-phone'
                                value={formData.recipient.phone_number}
                                onChange={event => setFormData({ ...formData, recipient: { ...formData.recipient, phone_number: event.target.value } })}
                                required
                            />
                        </div>

                        <div className='inputs'>
                            <label htmlFor='recipient-address'>Algydaryň ýaşaýan salgysy:</label>
                            <input
                                type="text"
                                name='recipient-address'
                                value={formData.recipient.address}
                                onChange={event => setFormData({ ...formData, recipient: { ...formData.recipient, address: event.target.value } })}
                                required
                            />
                        </div>

                        <div className='inputs'>
                            <label htmlFor='recipient-scan'>Algydaryň dokumenti (pdf):</label>
                            <div className="fileBox">
                                <DriveFolderUploadOutlined className='fileIcon' />
                                File saýlaň
                                <input
                                    className='file'
                                    type="file"
                                    name='recipient-scan'
                                    onChange={handleRecipientDocumentScanChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className='inputs'>
                            <label htmlFor='mustpay-name'>Bergidaryň ady:</label>
                            <input
                                type="text"
                                name='mustpay-name'
                                value={formData.mustpay.name_and_lastname}
                                onChange={event => setFormData({ ...formData, mustpay: { ...formData.mustpay, name_and_lastname: event.target.value } })}
                                required
                            />
                        </div>

                        <div className='inputs'>
                            <label htmlFor='mustpay-birthday'> Bergidaryň doglan senesi:</label>
                            <input
                                type="text"
                                name='mustpay-birthday'
                                value={formData.mustpay.birthday}
                                onChange={event => setFormData({ ...formData, mustpay: { ...formData.mustpay, birthday: event.target.value } })}
                                required
                            />
                        </div>

                        <div className='inputs'>
                            <label htmlFor='mustpay-phone'>Bergidaryň telefon nomeri:</label>
                            <input
                                type="text"
                                name='mustpay-phone'
                                value={formData.mustpay.phone_number}
                                onChange={event => setFormData({ ...formData, mustpay: { ...formData.mustpay, phone_number: event.target.value } })}
                                required
                            />
                        </div>

                        <div className='inputs'>
                            <label htmlFor='mustpay-phone2'>Bergidaryň telefon nomeri(2):</label>
                            <input
                                type="text"
                                name='mustpay-phone2'
                                value={formData.mustpay.phone_number2}
                                onChange={event => setFormData({ ...formData, mustpay: { ...formData.mustpay, phone_number2: event.target.value } })}
                            />
                        </div>

                        <div className='inputs'>
                            <label htmlFor='mustpay-address'>Bergidaryň ýaşaýan salgysy:</label>
                            <input
                                type="text"
                                name='mustpay-address'
                                value={formData.mustpay.address}
                                onChange={event => setFormData({ ...formData, mustpay: { ...formData.mustpay, address: event.target.value } })}
                                required
                            />
                        </div>

                        <div className='inputs'>
                            <label htmlFor='mustpay-job'>Iş statusy:</label>
                            <input
                                type="text"
                                name='mustpay-job'
                                list='mustpay-job'
                                value={formData.mustpay.job_status}
                                onChange={event => setFormData({ ...formData, mustpay: { ...formData.mustpay, job_status: event.target.value } })}
                                required
                            />
                            <datalist id='mustpay-job'>
                                <option>Işleýär</option>
                                <option>Işlemeýär</option>
                                <option>Firmada işleýär</option>
                            </datalist>
                        </div>

                        <div className='inputs'>
                            <label htmlFor='mustpay-scan'>Bergidaryň dokumenti (pdf):</label>
                            <div className="fileBox">
                                <DriveFolderUploadOutlined className='fileIcon' />
                                File saýlaň
                                <input
                                    className='file'
                                    type="file"
                                    name='mustpay-scan'
                                    onChange={handleMustPayDocumentScanChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='right'>
                        <div className="r_top">
                            <div className="r_leftInputs">
                                <div className='inputs'>
                                    <label htmlFor='category'>Bölüm:</label>
                                    <input
                                        type="text"
                                        name='category'
                                        value={formData.alimony.Category}
                                        onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, Category: event.target.value } })}
                                        required
                                    />
                                </div>

                                <div className='inputs'>
                                    <label htmlFor='ruling'>Karary çykaran:</label>
                                    <input
                                        type="text"
                                        name='ruling'
                                        value={formData.alimony.ruling}
                                        onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, ruling: event.target.value } })}
                                        required
                                    />
                                </div>

                                <div className='inputs'>
                                    <label htmlFor='r_date'>Karar çykarylan sene:</label>
                                    <input
                                        type="text"
                                        name='r_date'
                                        value={formData.alimony.ruling_date}
                                        onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, ruling_date: event.target.value } })}
                                        required
                                    />
                                </div>

                                <div className='inputs'>
                                    <label htmlFor='began-paying'>Alimenti tölän wagty:</label>
                                    <input
                                        type="text"
                                        name='began-paying'
                                        value={formData.alimony.began_paying}
                                        onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, began_paying: event.target.value } })}
                                        required
                                    />
                                </div>

                                <div className='inputs'>
                                    <label htmlFor='executor'>Ýerine ýetirýän:</label>
                                    <input
                                        type="text"
                                        name='executor'
                                        value={formData.alimony.executor}
                                        onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, executor: event.target.value } })}
                                        required
                                    />
                                </div>

                                <div className='inputs'>
                                    <label htmlFor='register'>Önumçiligiň belgisi:</label>
                                    <input
                                        type="text"
                                        name='register'
                                        value={formData.alimony.executor_register}
                                        onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, executor_register: event.target.value } })}
                                        required
                                    />
                                </div>

                                <div className='inputs'>
                                    <label htmlFor='x-date'>Önumçiligiň senesi:</label>
                                    <input
                                        type="text"
                                        name='x-date'
                                        value={formData.alimony.executor_date}
                                        onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, executor_date: event.target.value } })}
                                        required
                                    />
                                </div>

                                <div className='inputs'>
                                    <label htmlFor='ruling-scan'>Kararyň nusgasy:</label>
                                    <div className="fileBox">
                                        <DriveFolderUploadOutlined className='fileIcon' />
                                        File saýlaň
                                        <input
                                            className='file'
                                            type="file"
                                            id='ruling-scan'
                                            onChange={handleAlimonyDocumentScanChange}
                                            required
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="r_rightLogo">
                                <div className="logo">
                                    <img src={logoBottom} alt="logo" />
                                </div>
                            </div>

                        </div>
                        <div className='r_bottom'>
                            <label>Bellik:</label>
                            <textarea
                                type="text"
                                value={formData.alimony.note}
                                onChange={event => setFormData({ ...formData, alimony: { ...formData.alimony, note: event.target.value } })}
                            />
                        </div>
                        <div className="addButton">
                            <button type="submit">Goşmak</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Add;

