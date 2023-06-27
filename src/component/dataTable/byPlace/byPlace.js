import React, { useState } from "react";
import "../dataTable.scss";
import TableFooter from "../tableFooter";
import useTable from "../useTable";
import RecipientModal from '../../modal/recipientModal/recipientModal';
import MustpayModal from "../../modal/mustpayModal/mustpayModal";

const Byplace = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const [recipientModal, setRecipientModal] = useState(false);
  const [mustpayModal, setMustpayModal] = useState(false);
  const [id, setId] = useState();

  return (
    <>
      <table className='table'>
        <thead className='tableRowHeader'>
          <tr>
            <th className='tableHeader'>T/b</th>
            <th className='tableHeader'>Bergidaryň ady/familaýasy</th>
            <th className='tableHeader'>Algydaryň ady/familaýasy</th>
            <th className='tableHeader'>Alimenti töläp başlan wagty</th>
            <th className='tableHeader'>Işiň döredilen senesi</th>
            <th className='tableHeader'>Karary çykaran</th>
            <th className='tableHeader'>Bölüm</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el, id) => (
            <tr className='tableRowItems' key={el.id}>
              <td className='tableCell'>{id + 1}</td>
              <td
                className='tableCell'
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setId(el.id);
                  setMustpayModal(!mustpayModal)
                }}
              >
                {el.must_pay}
              </td>
              <td 
                 className='tableCell'
                 style={{ cursor: 'pointer' }} 
                 onClick={(e) => {
                  setId(el.id);
                  setRecipientModal(!recipientModal);
                }}
              >
                {el.recipient}
              </td>
              <td className='tableCell'>{el.began_paying}</td>
              <td className='tableCell'>{el.created_at}</td>
              <td className='tableCell'>{el.ruling}</td>
              <td className='tableCell'>{el.Category}</td>
            </tr>
          ))}

        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
      <RecipientModal activeModal={recipientModal} setActiveModal={setRecipientModal} id={id}/>
      <MustpayModal  activeModal={mustpayModal} setActiveModal={setMustpayModal} id={id}/>
    </>
  )
}

export default Byplace;