import React from 'react';
import {
  Button,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import socket from '../../../../api/socket';
import Loader from '../../../../shared/Loader';
import { LoaderTypes } from '../../../../common/enums';
import Row from '../Row/Row';

// const TableHeader = ({
//   isSocketLoading,
//   socketConnectStatus,
//   setSocketConnectStatus,
//   tableData,
//   updateIgnoreList,
//   socketTimer,
//   setSocketTimer,
// }: {
// }) => (
//   <>
//     <>
//       <h1>Socket Data</h1>
//     </>
//     <div className={'d-flex justify-content-between'}>
//       {socketConnectStatus ? (
//         <Button
//           onClick={() => {
//             setSocketConnectStatus(false);
//             socket.disconnect();
//           }}
//         >
//           Turn Off
//         </Button>
//       ) : (
//         <Button
//           onClick={() => {
//             setSocketConnectStatus(true);
//             socket.connect();
//             socket.emit('start');
//           }}
//         >
//           Turn On
//         </Button>
//       )}
//
//       <div>
//         <Input
//           type="number"
//           disabled={socketConnectStatus}
//           className="pe-2"
//           value={socketTimer}
//           onChange={(e) => {
//             setSocketTimer(e.target.value);
//           }}
//         />
//         <Button
//           disabled={socketConnectStatus}
//           onClick={() => {
//             socket.connect();
//             setSocketConnectStatus(true);
//             socket.emit('start', { timer: Number(socketTimer) * 1000 });
//           }}
//         >
//           Set Timer and Turn On
//         </Button>
//       </div>
//     </div>
//
//     {isSocketLoading ? (
//       <Loader type={LoaderTypes.skeleton} />
//     ) : (
//       <TableContainer component={Paper}>
//         <Table aria-label="collapsible table">
//           <TableHead>
//             <TableRow>
//               <TableCell />
//               <TableCell align="center">Ticker</TableCell>
//               <TableCell className={'pe-5'} align="right">
//                 Price
//               </TableCell>
//               <TableCell align="right">Change</TableCell>
//               <TableCell align="right">Change Percent</TableCell>
//               <TableCell align="center">More</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {tableData.map((row) => (
//               <Row
//                 key={row.ticker}
//                 row={row}
//                 updateIgnoreList={() => updateIgnoreList(row.ticker)}
//               />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     )}
//   </>
// );
//
// export default TableHeader;
