import { Button } from '@material-ui/core';
import React from 'react';
import '../App';
const Home = (props) => { 
  const { account, balance, dd2, stake, handleApprove, totalStake, isApprove, handleDeposit, handleWithdraw, handleHarvest } = props;
  return (
    <div>
      <div className='dflex'>
        <h3>Wallet address:{account }</h3>
        <h3>Balance: {balance } WETH</h3>
      </div>
      
      <div className='dflex'>
        <h3>
          Token earned : { dd2} DD2
        </h3>
        <Button variant="contained" color="primary" onClick={handleHarvest}>Harvest</Button>
      </div>
      {isApprove ? <>
      
        <Button style={{ marginRight: 20}} variant="contained" color="primary" onClick={handleDeposit}>Deposit</Button>
         <Button variant="contained" color="primary" onClick={handleWithdraw}>Withdraw</Button>
      </> : <Button variant="contained" color="primary" onClick={handleApprove}>Appove</Button>}
        
      <h3 className='left'>Your stake:  {stake} WETH</h3>
      <h3 className='left'>Total stake: { totalStake} WETH</h3>
    </div>
  )
}
export default Home;