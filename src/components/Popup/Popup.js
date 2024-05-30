import React from 'react';
import { Box, Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const Popup = ({title, children, handleClose, isOpen}) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2>{title}</h2><Button onClick={handleClose}><CloseIcon/></Button>
        </div>
        {children}
      </Box>
    </Modal>
  )
}

export default Popup;