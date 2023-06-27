import React, { useState} from "react";
import './arhiw.scss';
import { SearchOutlined } from '@mui/icons-material';
// import ArchiveTable from "../../component/dataTable/arhiwData/arhiw";


const Arhiw = () => {
    const [isActiveModal, setIsActiveModal] = useState(false);
    return (
        <div className="arhiw">
            <div className="arhiwContainer" >
                <h2></h2>
                <div className="topSearch">
                    <div className="header-search">
                        <div className="form">
                            <input type="search" name="Search" placeholder="Gözle..." required />
                            <button type="submit" className="btn-default" aria-label="Left Align">
                                <SearchOutlined className="searchIcon" />
                                Gozle
                            </button>
                        </div>
                    </div>
                    <div className="dataFilter">
                        <div className="filterBox" >
                            <div className="filterTop" onClick={() => setIsActiveModal(!isActiveModal)}>
                                Filterle
                            </div>
                            {isActiveModal &&
                                <div className="filterList">
                                    <li tabIndex='1'>Birinji</li>
                                    <li tabIndex='1'>Ikinji</li>
                                    <li tabIndex='1'>Uchunji</li>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="dataTableContainer">
                    <div className="topYearBoxs">
                        <div className="yearBox" tabIndex='1'>
                            2020 ýyl
                        </div>
                        <div className="yearBox" tabIndex='1'>
                            2021 ýyl
                        </div>
                        <div className="yearBox" tabIndex='1'>
                            2022 ýyl
                        </div>
                        <div className="yearBox" tabIndex='1'>
                            2023 ýyl
                        </div>
                    </div>
                      {/* <ArchiveTable  data={b} rowsPerPage={8} /> */}
                </div>
            </div>
        </div>
    )
}

export default Arhiw;