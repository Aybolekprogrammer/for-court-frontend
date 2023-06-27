import React, { useState } from "react";
import "../dataTable.scss";
import TableFooter from "../tableFooter";
import useTable from "../useTable";
import MustpayModal from "../../modal/mustpayModal/mustpayModal";

const InsolventsTable = ({ data, rowsPerPage}) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const [mustpayModal, setMustpayModal] = useState(false);
  const [id, setId] = useState();
  console.log(id);
  return (
    <>
      <table className='table'>
        <thead className='tableRowHeader'>
          <tr>
            <th className='tableHeader'>T/b</th>
            <th className='tableHeader'>Bergidaryň ady/familaýasy</th>
            <th className='tableHeader'>Doglan senesi</th>
            <th className='tableHeader'>Telefon nomeri</th>
            <th className='tableHeader'>Ýaşaýan ýeri</th>
            <th className='tableHeader'>Karary çykaran</th>
            <th className='tableHeader'>Bölüm</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el, id) => (
            <tr className='tableRowItems' key={el.id}>
              <td className='tableCell'>{id+1}</td>
              <td 
                  className='tableCell'
                  style={{cursor: 'pointer'}}
                  onClick={(e) => {
                    setId(el.id);
                    setMustpayModal(!mustpayModal)
                  }}   
              >
                {el.name_and_lastname}
              </td>
              <td className='tableCell'>{el.birthday}</td>
              <td className='tableCell'>{el.phone_number}</td>
              <td className='tableCell'>{el.address}</td>
              <td className='tableCell'>{el.document_scan}</td>
              <td className='tableCell'>{el.job_status}</td>              
            </tr>
          ))}
        
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
      <MustpayModal  activeModal={mustpayModal} setActiveModal={setMustpayModal} id={id}/>
    </>
  );
};

export default InsolventsTable;