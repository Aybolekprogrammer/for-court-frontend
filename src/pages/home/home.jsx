import React, { useContext, useEffect, useState } from 'react';
import './home.scss';
import { KeyboardArrowDown, SearchOutlined } from '@mui/icons-material';
import { GetAllAlimonies } from '../../api/Queries/get.js';
import AlimonyTable from '../../component/dataTable/alimonyData/alimony';
import { places, rule } from '../../places';
import { Context } from '../../context/context';
import { Get } from '../../api/services/api_helpers';

const Home = () => {
    const [isActiveModal, setIsActiveModal] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const [isClick2, setIsClick2] = useState(false);
    const [aliments, setAliments] = useState([])
    const { filter, setFilter } = useContext(Context)
    const [isLoading, setIsloading] = useState(false)

    // const clearFilter = () => {
    //     setFilter({
    //         recipient: "",
    //         location:"",
    //         began_paying: "",
    //         created_at: "",
    //         ruling: '',
    //     })
    //  }
    
    useEffect(() => {
        setIsloading(true)
        const fetchData = async () => {
            try {
                if (filter) {
                    Get(`allalimonies/filter/?Category=${filter?.location}&ruling=${filter?.ruling}&began_paying=${filter?.began_paying}&created_at=${filter?.created_at}&must_pay=${filter?.must_pay}&recipient=${filter?.recipient}`)
                        .then(function (resp) {
                            setAliments(resp)
                        })
                }
                else {
                    const res = await GetAllAlimonies()
                    setAliments(res);
                }
                setIsloading(false)
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [filter])


    return (
        <div className="home">
            <div className="homeContainer">
                <div className="topSearch">
                    <div className="header-search">
                        <div className="form">
                            <input 
                                type="search" 
                                name="Search" 
                                placeholder="Gözle..."
                                onChange={(e) => setFilter({...filter, must_pay: e.target.value})} 
                                required 
                            />
                            <button type="submit" className="btn-default" aria-label="Left Align">
                                <SearchOutlined className="searchIcon" />
                                Gözle
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
                                                    <div className='listContent' key={index}>
                                                        <span className="listName">
                                                            <span className="listPlaceName">{place.title} <span><KeyboardArrowDown /></span></span>
                                                            {place.content.map((c, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="li"
                                                                    onClick={() => setFilter({ ...filter, location: c.name })}
                                                                >
                                                                    {c.name}
                                                                </div>
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
                                                        <span
                                                            className="rulingList"
                                                            onClick={() => setFilter({ ...filter, ruling: r.name })}
                                                        >
                                                            {r.name}
                                                        </span>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className="list">
                                        <label htmlFor="recipient">Algydar</label>
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                name="recipient" 
                                                placeholder="" 
                                                onChange={(e) => setFilter({...filter, recipient: e.target.value})}
                                            />
                                            <SearchOutlined className="serachIconForFilter" />
                                        </div>
                                    </div>
                                    <div className='list'>
                                        <label htmlFor='began_paying'>Alimenti töläp başlan wagty</label>
                                        <input
                                            type='date'
                                            id='date'
                                            name='began_paying'
                                            placeholder='Senäni belläň'
                                            required
                                            onChange={(e) => setFilter({ ...filter, began_paying: e.target.value })}
                                        />
                                    </div>
                                    <div className='list'>
                                        <label htmlFor='date'>Işiň döredilen senesi boýunça</label>
                                        <input
                                            type='date'
                                            id='date'
                                            name='date'
                                            placeholder='Senäni belläň'
                                            required
                                            onChange={(e) => setFilter({ ...filter, created_at: e.target.value })}
                                        />
                                    </div>
                                    <div className="clearButton">
                                        <button>Arassala</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {isLoading ? <div className="loaderOut"><span className="productsLoading"></span> </div> :
                <div className="dataTableContainer">
                    {aliments.length ? (
                         <AlimonyTable data={aliments ?? []} rowsPerPage={10} />
                    ) : (
                        <div className="productNotFound"><h2>Gözlenilýän bölüm tapylmady...</h2></div>
                    )}
                </div>
             }
            </div>
        </div>
    )
}

export default Home;