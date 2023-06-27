import React, { useEffect, useState } from "react";
import "../modal.scss";
import person from '../../../images/login.png';
import { Get } from "../../../api/services/api_helpers";
import { ArrowRight, ArrowRightAltOutlined, ArrowRightSharp } from "@mui/icons-material";
import AddPay from  "../../../pages/add/add-child-pay/add-pay";
import AddAlimonyToMustPay from "../../../pages/add/add-new/add-new";

const MustpayModal = ({ activeModal, setActiveModal, id }) => {
    const [openLeftModal, setOpenLeftModal] = useState(false);
    const [modal, setmodal] = useState([])
    const [openAddPay, setOpenAddPay] = useState(false);
    const [openNewAdd, setOpenNewAdd] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            Get(`mustpayconfigbyid/${id}`)
                .then(function (res) {
                    setmodal(res)
                })
        }
        fetchData()
    }, [id])

    const [pay, setPay] = useState([]);
    useEffect(() => {
        const fetchData2 = async () => {
            Get(`mustpayreceipts/${modal.id}`)
                .then(function (response) {
                    setPay(response)
                })
        }
        fetchData2()
    }, [modal.id])

    console.log(modal.id);


    return (
        <div className="modall" onClick={() => setOpenLeftModal(false)}>
            <div className={activeModal ? "modalOut active" : "modalOut"} onClick={() => setActiveModal(false)}>
                <div className="blur"></div>
                <div className="modalBox" onClick={e => e.stopPropagation()}>
                    <div className="modalContainer" key={modal.id}>
                        <div className="top">
                            <h3>Bergidar barada umumy maglumat</h3>
                            <img src={person} alt="bergidar ady" />
                        </div>
                        <div className="flexBoxs">
                            <div className="flexBox">
                                <div className="head">Ady:</div>
                                <div className="text">{modal.name_and_lastname}</div>
                                <div className="right">
                                    <button>Giňişleýin</button>    {/*  <a href={require("../../../images/file.pdf")}></a> */}
                                </div>
                            </div>

                            <div className="flexBox2">
                                <div className="leftHead">Tölegleri:</div>
                                <div className="rightName">
                                    <div className="text2" onClick={(e) => setOpenLeftModal(!openLeftModal)}>
                                        <span>Ählisi</span>
                                        <ArrowRight />
                                        <div>
                                            {openLeftModal &&
                                                <div className="openLeftModal" onClick={e => e.stopPropagation()}>
                                                    {pay.map((p, id) => (
                                                        <div className="modalKey" key={id}>
                                                            <div className="openHoverBox">
                                                                <span className="flexbox"><div>Töleg:</div> {p.payment}</span>
                                                                <div className="hoveredText">
                                                                    <span className="flexText"><div>Töleg edilen wagt:</div> {p.payment_date}</span>
                                                                    <span className="flexText"><div>Walýuta:</div> {p.currency}</span>
                                                                    <span className="flexText"><div>Alimentiň göterimi:</div>{p.alimony_percent}</span>
                                                                </div>
                                                            </div>
                                                            <div className="right">
                                                               <button><a href={p.document_scan}>Giňişleýin</a></button>
                                                            </div>
                                                        </div>                                                        
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="flexBox">
                                <div className="head">Telefon nomeri:</div>
                                <div className="text">{modal.phone_number}</div>
                                <div className="right">
                                </div>
                            </div>
                            <div className="flexBox">
                                <div className="head">Öý salgysy:</div>
                                <div className="text">{modal.address}</div>
                                <div className="right">
                                </div>
                            </div>
                            <div className="flexBox">
                                <div className="head">Doglan senesi:</div>
                                <div className="text">{modal.birthday}</div>
                                <div className="right">
                                </div>
                            </div>
                            <div className="flexBox">
                                <div className="head">Işleýän ýeri:</div>
                                <div className="text">{modal.job_status}</div>
                                <div className="right">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="addd" onClick={() => setOpenAddPay(!openAddPay)}>Töleg goşmak</div>
                        <div className="out" onClick={() => setActiveModal(!activeModal)}>Çykmak</div>
                    </div>
                    <div className="add-new" onClick={() => setOpenNewAdd(!openNewAdd)}>
                        <span>Täze iş açmak</span> <ArrowRight className="arrowRight"/>
                    </div>
                    <AddPay openAddPay={openAddPay} setOpenAddPay={setOpenAddPay} id={modal?.id}/>
                    <AddAlimonyToMustPay openNewAdd={openNewAdd} setOpenNewAdd={setOpenNewAdd} id={modal?.id}/>
                </div>
            </div>
        </div>
    )
}

export default MustpayModal;

