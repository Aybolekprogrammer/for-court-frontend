import React, { useState, useEffect, useContext } from "react";
import './borchlylar.scss';
import { SearchOutlined, KeyboardArrowDown, } from '@mui/icons-material';
import { Getinsolvents } from "../../api/Queries/get.js";
import { places, rule } from '../../places';
import { Context } from '../../context/context';
import InsolventsTable from "../../component/dataTable/insolventsData/insolvents";

const Borchlylar = () => {
    const [isActiveModal, setIsActiveModal] = useState(false);
    const { filterAlimony, setFilterAlimony } = useContext(Context);
    const [insolvents, setInsolvents] = useState([])
    const [isClick, setIsClick] = useState(false);
    const [isClick2, setIsClick2] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await Getinsolvents()
            setInsolvents(res)
        }
        fetchData()
    }, [])

    return (
        <div className="borchMain">
            <div className="borchMainContainer">
                <h2>Ähli borçly bergidarlaryň sanawy</h2>
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
                        <div className="filterBox">
                            <div className="filterTop" onClick={() => setIsActiveModal(!isActiveModal)}>
                                Filterle
                            </div>
                            {isActiveModal &&
                                <div className="filterList">
                                    <div className='list'>
                                        <div className="input" onClick={(e) => setIsClick(!isClick)}>
                                            <div className="searchMainName">Ýeri boýunça</div>
                                            <KeyboardArrowDown />
                                        </div>
                                        {isClick &&
                                            <div className="output">
                                                {places.map((place, index) => (
                                                    <div className="listContent" key={index}>
                                                        <span className="listName">
                                                            <span className="listPlaceName">{place.title} <span><KeyboardArrowDown /></span></span>
                                                            {place.content.map((c, i) => (
                                                                <div key={i} className="li" onClick={() => setFilterAlimony({ ...filterAlimony, c: c.name })} >{c.name}</div>
                                                            ))}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                    <div className="list">
                                        <div className="input" onClick={(e) => setIsClick2(!isClick2)}>
                                            <div className="searchMainName">Karary çykaran</div>
                                            <KeyboardArrowDown />
                                        </div>
                                        {isClick2 &&
                                            <div className="output">
                                                {rule.map((r) => (
                                                    <div className='rulingLists' key={r.id}>
                                                        <span className="rulingList">{r.name}</span>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className="list">
                                        <label htmlFor="phone">Telefon nomeri boýunça</label>
                                        <div className="form-group">
                                            <input type="text" name="phone" placeholder="+993" />
                                            <SearchOutlined className="serachIconForFilter"/>
                                        </div>
                                    </div>
                                    <div className="list">
                                        <label htmlFor="home">Ýaşaýan ýeri boýunça</label>
                                        <div className="form-group">
                                            <input type="text" name="home" placeholder="Öý salgysy" />
                                            <SearchOutlined className="serachIconForFilter"/>
                                        </div>
                                    </div>
                                    <div className="list">
                                        <label htmlFor="birthday">Doglan senesi boýunça</label>
                                        <input type="date" name="birthday" placeholder="Sene" required />
                                    </div>
                                    <div className="clearButton">
                                        <button>Arassala</button> 
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="dataTable">
                    <InsolventsTable data={insolvents ?? []} rowsPerPage={8} />
                </div>
            </div>
        </div>
    )
}


export default Borchlylar;