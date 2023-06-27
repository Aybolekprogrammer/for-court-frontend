import React, { useState, useEffect, useContext } from "react";
import './bergidarlar.scss';
import { SearchOutlined } from '@mui/icons-material';
import { GetMustpay } from "../../api/Queries/get";
import MustpayTable from "../../component/dataTable/mustpayData/mustpay";
import { Context } from "../../context/context";
import { Get } from "../../api/services/api_helpers";

const Bergidarlar = () => {
    const [isActiveModal, setIsActiveModal] = useState(false);
    const [mustpay, setMustpay] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const { filterMustpay, setFilterMustpay } = useContext(Context);
    const clearFilter = () => {
        setFilterMustpay({
            birthday: '',
            phone_number: '',
            address: ''
        })
     }

    useEffect(() => {
        setIsloading(true)
        const fetchData = async () => {
            try {
                if(filterMustpay) {
                    Get(`allmustpays/filter/?birthday=${filterMustpay?.birthday}&phone_number=${filterMustpay?.phone_number}&address=${filterMustpay?.address}&name_and_lastname=${filterMustpay?.name_and_lastname}`)
                        .then(function (resp) {
                            setMustpay(resp)
                        })
                } else {
                    const res = await GetMustpay()
                    setMustpay(res)
                }
                setIsloading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [filterMustpay])

    return (
        <div className="brgMain">
            <div className="brgMainContainer">
                <h2>Ähli bergidarlaryň sanawy</h2>
                <div className="topSearch">
                    <div className="header-search">
                        <div className="form">
                            <input 
                                type="search" 
                                name="Search" 
                                placeholder="Gözle..."
                                onChange={(e) => setFilterMustpay({...filterMustpay, name_and_lastname: e.target.value})} 
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
                                    <div className="list">
                                        <label htmlFor="phone">Telefon nomeri boýunça</label>
                                        <div className="form-group">
                                            <input 
                                               type="text" 
                                               name="phone" 
                                               placeholder="+993"
                                               onChange={(e) => setFilterMustpay({...filterMustpay, phone_number: e.target.value})} 
                                            />
                                            <SearchOutlined className="serachIconForFilter" />
                                        </div>
                                    </div>
                                    <div className="list">
                                        <label htmlFor="home">Ýaşaýan ýeri boýunça</label>
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                name="home" 
                                                placeholder="Öý salgysy" 
                                                onChange={(e) => setFilterMustpay({...filterMustpay, address: e.target.value})}
                                            />
                                            <SearchOutlined className="serachIconForFilter" />
                                        </div>
                                    </div>
                                    <div className="list">
                                        <label htmlFor="birthday">Doglan senesi boýunça</label>
                                        <input 
                                            type="date" 
                                            name="birthday" 
                                            placeholder="Sene" 
                                            required 
                                            onChange={(e) => setFilterMustpay({ ...filterMustpay, birthday: e.target.value})}
                                        />
                                    </div>
                                    <div className="clearButton">
                                        <button onClick={clearFilter}>Arassala</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {isLoading ? <div className="loaderOut"><span className="productsLoading"></span> </div> :
                <div className="dataTable">
                {mustpay.length ? (
                    <MustpayTable data={mustpay ?? []} rowsPerPage={10} />
                    ) : (
                        <div className="productNotFound"><h2>Gözlenilýän bölüm tapylmady...</h2></div>
                    )}
                </div>
               }
            </div>
        </div>
    )
}


export default Bergidarlar;