import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Typography, Button } from '@material-ui/core';

const ModalDialog = (props) => { 
  const { type, balance, handleSubmit , handleClose, open, stake} = props;
  const [value, setValue] = useState();
  const handleOnchange = (e) => {
    setValue(e.target.value)
  }
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{ type==='deposit' ? 'Stake': 'Withdraw' }</DialogTitle>
      <DialogContent>
        <form style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <TextField id="outlined-basic"  variant="outlined" placeholder='Input your amount' value={value} onChange={handleOnchange} fullWidth />
        
          <Typography  style={{ margin: 20 }}>
            { type === 'deposit' ? `Your WETH balance: ${balance} WETH` : `Your WETH deposited: ${stake} WETH`}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
            <Button fullWidth style={{marginRight: 10}}   variant="contained" color="primary" onClick={() => handleSubmit(value)}>{type === 'deposit' ? 'Stake' : 'Withdraw'}</Button>
            <Button fullWidth  variant="contained" color="secondary" onClick={handleClose}>Cancle</Button>
          </div>
         
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default ModalDialog;