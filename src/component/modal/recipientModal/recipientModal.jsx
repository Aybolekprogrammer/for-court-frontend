import React, { useEffect, useState } from "react";
import "../modal.scss";
import person from '../../../images/login.png';
import { Get } from "../../../api/services/api_helpers";
import { ArrowRight } from "@mui/icons-material";
import AddChild from "../../../pages/add/add-child-pay/add-child";

const RecipientModal = ({ activeModal, setActiveModal, id }) => {
    const [modal, setmodal] = useState([])
    const [openLeftModal, setOpenLeftModal] = useState(false);
    const [openAddChild, setOpenAddChild] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            Get(`recipientconfigbyid/${id}`)
                .then(function (res) {
                    setmodal(res)
                })
        }
        fetchData()
    }, [id])


    const [child, setChild] = useState([])
    useEffect(() => {
        const fetchData2 = async () => {
            Get(`getrecipientchildren/${modal.id}`)
                .then(function (response) {
                    setChild(response)
                })
        }
        fetchData2()
    }, [modal.id])

    return (
        <div className="modall" onClick={() => setOpenLeftModal(false)}>
            <div className={activeModal ? "modalOut active" : "modalOut"} onClick={() => setActiveModal(false)}>
                <div className="blur"></div>
                <div className="modalBox" onClick={e => e.stopPropagation()}>
                    <div className="modalContainer" key={modal.id}>
                        <div className="top">
                            <h3>Algydar barada umumy maglumat</h3>
                            <img src={person} alt="bergidar ady" />
                        </div>
                        <div className="flexBoxs">
                            <div className="flexBox">
                                <div className="head">Ady:</div>
                                <div className="text">{modal.name_and_lastname}</div>
                                <div className="right">
                                    <button>Giňişleýin</button>
                                </div>
                            </div>
                            <div className="flexBox2">
                                <div className="leftHead">Çagalary:</div>
                                <div className="rightName">
                                    <div className="text2" onClick={(e) => setOpenLeftModal(!openLeftModal)}>
                                        <span>Ählisi</span>
                                        <ArrowRight />
                                        <div>
                                            {openLeftModal &&
                                                <div className="openLeftModal" onClick={e => e.stopPropagation()}>
                                                    {child.map((ch, id) => (
                                                        <div className="modalKey" key={id}>
                                                            <div className="openHoverBox">
                                                                <span className="flexbox"><div>{id + 1})</div> {ch.name_and_lastname}</span>
                                                                {/* <div className="hoveredText">
                                                                    <span className="flexText"><div>Doglan senesi:</div> {ch.birthday}</span>
                                                                </div> */}
                                                            </div>
                                                            <div className="right">
                                                                <button> Giňişleýin</button>
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
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="addd" onClick={() => setOpenAddChild(!openAddChild)}>Çaga goşmak</div> 
                        <div className="out" onClick={() => setActiveModal(!activeModal)}>Çykmak</div>
                    </div>
                </div>
            </div>
            <AddChild openAddChild={openAddChild} setOpenAddChild={setOpenAddChild} id={modal?.id}/>
        </div>
    )
}

export default RecipientModal;

