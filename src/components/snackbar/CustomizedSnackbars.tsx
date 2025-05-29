import * as React from 'react';

import Alert from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

import { CustomSnackbarProps } from './types';

export default function CustomizedSnackbars(props: CustomSnackbarProps) {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.setOpen(false);
  };

  return (
    <div>
      <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={props.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
