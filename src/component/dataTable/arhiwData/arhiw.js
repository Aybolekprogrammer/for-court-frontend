// import React, { useState } from "react";
// import "../dataTable.scss";
// import TableFooter from "../tableFooter";
// import useTable from "../useTable";
// import Modal from '../../modal/modal';

// const ArchiveTable = ({ data, rowsPerPage}) => {
//   const [page, setPage] = useState(1);
//   const { slice, range } = useTable(data, page, rowsPerPage);
  
//   const [activeModal, setActiveModal] = useState(false)
//   return (
//     <>
//       <table className='table'>
//         <thead className='tableRowHeader'>
//           <tr>
//             <th className='tableHeader'>T/b</th>
//             <th className='tableHeader'>Bergidaryň ady/familaýasy</th>
//           </tr>
//         </thead>
//         <tbody>
//           {slice.map((el, id) => (
//             <tr className='tableRowItems' key={el.id}>
//               <td className='tableCell'>{id+1}</td>
//               <td 
//                   className='tableCell'
//                   style={{cursor: 'pointer'}}
//                   onClick={(e) => {setActiveModal(!activeModal)}}                  
//               >
//                 {el.name_and_lastname}
//               </td>
//               <td className='tableCell'>{el.birthday}</td>             
//             </tr>
//           ))}
        
//         </tbody>
//       </table>
//       <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
//       <Modal activeModal={activeModal} setActiveModal={setActiveModal}/>
//     </>
//   );
// };


// export default ArchiveTable;