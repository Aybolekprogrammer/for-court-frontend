import React, { useState, useContext } from "react";
import './sidebar.scss';
import { ArrowRight } from "@mui/icons-material";
import { Get } from "../../api/services/api_helpers";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/context";
import { places } from "./placesName";

const Sidebar = ({ isActiveSidebar, setIsActiveSidabar }) => {
    const [activeSubsidebar, setActiveSubsidebar] = useState(false)
    const [activeSubsidebar2, setActiveSubsidebar2] = useState(false);

    const handleClick = () => {
        setActiveSubsidebar(!activeSubsidebar)
        setActiveSubsidebar2(false)
    }
    const handleClick2 = () => {
        setActiveSubsidebar2(!activeSubsidebar2)
        setActiveSubsidebar(false)
    }

    const navigate = useNavigate()
    const { placeSearch, setPlaceSearch } = useContext(Context)

    const SearchClick = async (place) => {
        try {
            Get(`allalimonies/filter/?Category=${place}`)
            .then(function (res) {
                setPlaceSearch(res)
            })
            navigate('/byplace')
        } catch (error) {
            console.log(error);
        }
    }
    const Click = (place) => {
        SearchClick(place)
    }

    return (
        <div className={isActiveSidebar ? 'sidebar active' : 'sidebar'} onClick={() => setIsActiveSidabar(false)}>
            {places.map((pl, id) => (
                <div className="sidebarLeftOpen" onClick={e => e.stopPropagation()} key={id}>
                    <div className="flexText" onClick={handleClick}>
                        <p>Aşgabat şäheri</p>
                        <ArrowRight />
                        <>
                            {activeSubsidebar && (
                                <div className="subSidebar">
                                    {pl.content.map((pl, id) => (
                                        <div className="ag" key={id}>
                                            <p onClick={() => Click(pl.name)}>{pl.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    </div>
                    <div className="flexText" onClick={handleClick2}>
                        <p>Ahal welaýaty</p>
                        <ArrowRight />
                        {activeSubsidebar2 && (
                            <div className="subSidebar">
                                {pl.content2.map((pl, id) => (
                                    <div className="ag" key={id}>
                                        <p onClick={() => Click(pl.name)}>{pl.name}</p>
                                    </div>
                                ))}
                            </div>)
                        }
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Sidebar;

