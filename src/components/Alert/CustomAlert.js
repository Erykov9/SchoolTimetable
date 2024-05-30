import React from 'react';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

const CustomAlert = ({status, message}) => {
  const generateAlert = () => {
    switch (status) {
      case 'success':
        return <Alert severity="success" icon={<CheckIcon />}>{message}</Alert>;
      case 'error':
        return <Alert severity="error" icon={<ErrorIcon />} >{message}</Alert>;
      case 'warning':
        return <Alert severity="warning" icon={<WarningIcon />} >{message}</Alert>;
      default:
        return <Alert>{message}</Alert>;
    }
  }
  return (
    <>
      {generateAlert()}
    </>
  )
}

export default CustomAlert