import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';
import { LoaderTypes } from '../../common/enums';

const Loader = (props: { type: LoaderTypes }) => {
  if (props.type === LoaderTypes.skeleton) {
    return (
      <Box>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <br />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <br />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <br />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <br />
      </Box>
    );
  }
  if (props.type === LoaderTypes.circle) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
