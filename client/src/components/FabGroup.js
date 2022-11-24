import React from 'react';
import Fab from '@mui/material/Fab';

function FabGroup() {
  return (
      <>
        <Fab color="primary" aria-label="add"></Fab>
        <Fab color="secondary" aria-label="edit"></Fab>
      </>
  )
}

export default FabGroup