import './App.css';
import { useEffect, useState } from 'react';
import { injected, walletConnected } from './connector';
import { useWeb3React } from '@web3-react/core';
import Home from './component/home';
import Masterchef from './ERC20.json';
import WETH from './WETH.json';
import Web3 from 'web3';
import { Multicall } from 'ethereum-multicall';
import  ModalDialog from './component/dialog';
import { Button } from '@material-ui/core';
function App() {
  const { activate, account, library, chainId } = useWeb3React();
  const [balanceWeth, setBalance] = useState();
  const [balanceDD2, setBalanceDD2] = useState();
  const [stake, setStake] = useState();
  const [isApprove, setApprove] = useState(0);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState();
  
  const connectMetamask = () => { 
    activate(injected);
  }
  const walletConnect = () => { 
    activate(walletConnected, undefined, true).catch(e => console.log('ee', e));
  }
  
  const getInfo = async () => {
  try {
      const multiAddress = { 
      1: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      2: '0x9da687e88b0A807e57f1913bCD31D56c49C872c2'
    }
    const web3 = new Web3(library.provider);
    const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });
    const contractCallContext = [ multiAddress[1], multiAddress[2] ].map((address, index) => {
      if (address === multiAddress[1]) {
        return { 
          reference: 'Weth',
          contractAddress: multiAddress[1],
          abi: WETH,
          calls: [{ reference: 'wethMethods', methodName: 'balanceOf', methodParameters: [account] },
             { reference: 'allowance', methodName: 'allowance', methodParameters: [account, multiAddress[2]] }
         ]
        }
      } else { 
         return { 
          reference: 'MasterChef',
            contractAddress: multiAddress[2],
            abi: Masterchef,
           calls: [{ reference: 'penddingDD2', methodName: 'pendingDD2', methodParameters: [account] },
             { reference: 'userInfo', methodName: 'userInfo', methodParameters: [account] },
           
           ]
          }
      }

    
    })
    const result = await multicall.call(contractCallContext);
    setBalance(web3.utils.toBN(result.results.Weth.callsReturnContext[0].returnValues[0].hex).toString());
    setBalanceDD2(web3.utils.toBN(result.results.MasterChef.callsReturnContext[0].returnValues[0].hex).toString())
    setStake(web3.utils.toBN(result.results.MasterChef.callsReturnContext[1].returnValues[0].hex).toString())
    setApprove(web3.utils.toBN(result.results.Weth.callsReturnContext[1].returnValues[0].hex).toString())
    console.log('result:', result.results)
    } catch (error) {
      console.log('error:', error)
    }
}


  // const getBalanceWeth = async () => {
  //   const web3 = new Web3(library.provider);
  //   const wethContract = new web3.eth.Contract(WETH, '0xc778417E063141139Fce010982780140Aa0cD5Ab');
  //   const wethbalance = await wethContract.methods.balanceOf(account).call();
  //   setBalance(wethbalance);
  // }

  // const getBalanceDD2 = async () => { 
  //   const web3 = new Web3(library.provider);
  //   const masterChefContract = new web3.eth.Contract(Masterchef, '0x9da687e88b0A807e57f1913bCD31D56c49C872c2');
  //   const balance = await masterChefContract.methods.pendingDD2(account).call();
  //   setBalanceDD2(balance);
  // }

  // const getUserInfo = async () => { 
  //   const web3 = new Web3(library.provider);
  //   const masterChefContract = new web3.eth.Contract(Masterchef, '0x9da687e88b0A807e57f1913bCD31D56c49C872c2');
  //   await masterChefContract.methods.userInfo(account).call((err, result) => {
  //     setStake(result.amount);
  //   });
   
  // }

  // const checkApprove = async () => { 
  //   const web3 = new Web3(library.provider);
  //   const weth = new web3.eth.Contract(WETH, '0xc778417E063141139Fce010982780140Aa0cD5Ab');
  //   const isApprove = await weth.methods.allowance(account, '0x9da687e88b0A807e57f1913bCD31D56c49C872c2').call();
  //   setApprove(isApprove);
  // }

  // const getStaticInfo = async () => {
  //   await getBalanceWeth();
  //   await checkApprove();
  //   await getBalanceDD2();
  //   await getUserInfo();
  // };

  const handleApprove = async () => { 
    const web3 = new Web3(library.provider);
    const weth = new web3.eth.Contract(WETH, '0xc778417E063141139Fce010982780140Aa0cD5Ab');
    await weth.methods.approve('0x9da687e88b0A807e57f1913bCD31D56c49C872c2', web3.utils.toWei('0.8')).send({ from: account }).on('error', (error, receipt) => {
      console.log('error:', error)
    })
   
  }

  const handleWithdraw = async () => { 
    setOpen(true);
    setType('withdraw');

  }

  const handleDeposit = async () => { 
    setOpen(true);
    setType('deposit');
    
  }

  useEffect(() => {
    if (account) {
      // getStaticInfo();
      getInfo();
    }

  }, [account, library, chainId])


  const handleClose = () => { 
    setOpen(false)
  }

  const handleSubmit = async (value) => { 
    const web3 = new Web3(library.provider);
    const masterchefContract = new web3.eth.Contract(Masterchef, '0x9da687e88b0A807e57f1913bCD31D56c49C872c2');

    try {
      if (type === 'deposit') {
        await masterchefContract.methods.deposit(value).send({ from: account });  
      } else {
        await masterchefContract.methods.withdraw(value).send({ from: account });
    }
    } catch (error) {
      console.log(error)
    }
    setOpen(false);
     console.log(`${type} success`);
   
  }
  const handleHarvest = async () => { 
    const web3 = new Web3(library.provider);
    const masterchefContract = new web3.eth.Contract(Masterchef, '0x9da687e88b0A807e57f1913bCD31D56c49C872c2');
    await masterchefContract.methods.deposit(0).send({ from: account });
    console.log(`harvest success`);
  }
  return (
    <div className="App">
      <h1>Web3 React</h1>  
      {
        account ? <Home
          account={account}
          balance={balanceWeth}
          handleApprove={handleApprove}
          handleWithdraw={handleWithdraw}
          isApprove={isApprove}
          dd2={balanceDD2}
          stake={stake}
          handleDeposit={handleDeposit}
          handleHarvest={handleHarvest}
        /> : <>
          <Button  style={{marginRight: 10}}  variant="contained" color="primary" onClick={connectMetamask}>Connect Metamask </Button>
          <Button  variant="contained" color="primary" onClick={walletConnect}>Connect WalletConnect </Button></>
      }

      <ModalDialog
        open={open}
        type={type}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        balance={balanceWeth}
        stake={stake}
      />
       
    </div>
  );
}

export default App;
