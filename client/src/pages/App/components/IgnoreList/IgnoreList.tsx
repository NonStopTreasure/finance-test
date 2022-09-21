import React, { useState } from 'react';
import { Chip } from '@mui/material';
import socket from '../../../../api/socket';

// const IgnoreList = ({ setSocketConnectStatus }) => {
//   const [ignoreList, setIgnoreList] = useState<string[]>([]);
//
//   const onDeleteIgnoreList = (ticker: string) => {
//     socket.disconnect();
//     setSocketConnectStatus(false);
//     const newIgnoreList = ignoreList.filter(
//       (ignoreTicker) => ignoreTicker !== ticker
//     );
//     setIgnoreList(newIgnoreList);
//   };
//   return (
//     <div className={'d-flex mt-4 align-items-center'}>
//       <h1 className={'w-auto text-nowrap'}>Ignore List</h1>
//       {!ignoreList.length ? (
//         <h3 className={'me-2 w-100 text-end'}>No Item</h3>
//       ) : (
//         <div className={'w-100 d-flex justify-content-evenly me-auto'}>
//           {ignoreList.map((ticker) => (
//             <Chip
//               className="me-1"
//               key={ticker + '_ignore'}
//               label={ticker}
//               variant="outlined"
//               onDelete={() => onDeleteIgnoreList(ticker)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default IgnoreList;
