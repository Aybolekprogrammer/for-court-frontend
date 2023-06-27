import { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [placeSearch, setPlaceSearch] = useState([])
    const [filter,setFilter] = useState({
        must_pay: "",
        recipient: "",
        location:"",
        began_paying: "",
        created_at: "",
        ruling: '',
    })

    const [filterMustpay, setFilterMustpay] = useState({
        name_and_lastname: '',
        birthday: '',
        phone_number: '',
        address: ''
    })


    // const [filterInsolvents, setFilterInsolvents] = useState({

    // })

    return (
        <Context.Provider value={{
            placeSearch, setPlaceSearch,
            filter,setFilter,
            filterMustpay, setFilterMustpay
        }}>
            {children}
        </Context.Provider>
    );
};