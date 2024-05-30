import React from 'react';
import {CircularProgress} from '@mui/material';

const LoadingBar = ({progress}) => {
  return (
    <div>
      <CircularProgress value={progress && progress}/>
      {progress && <p>{progress}%</p>}
    </div>
  )
}

export default LoadingBar