import React, { useContext, useState } from "react";
import './byplace.scss';
import { SearchOutlined } from '@mui/icons-material';
import { Context } from "../../context/context";
import Byplace from "../../component/dataTable/byPlace/byPlace";

const ByPlace = () => {

    const [isActiveModal, setIsActiveModal] = useState(false);
    const { placeSearch, setPlaceSearch } = useContext(Context)

    return (
        <div className="byplace">
            {!placeSearch.length ? (
                <div className="searchNotFound">
                    <h2>Gözlenilýän bölüm tapylmady...</h2>
                </div>
            ) : (
                <div className="placeContainer">
                    <h2>Ýeri boýunça gözleg</h2>
                    <div className="dataTableContainer">
                        <Byplace data={placeSearch ?? []} rowsPerPage={10} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ByPlace;