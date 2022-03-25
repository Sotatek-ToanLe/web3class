import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/b26d2de34d9d408780d6f35f170ec519",
  4: "https://rinkeby.infura.io/v3/b26d2de34d9d408780d6f35f170ec519"
};

const BRIDGE_URL = 'https://bridge.walletconnect.org';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4]
})

export const walletConnected = new WalletConnectConnector({ 
  rpc: RPC_URLS,
  supportedChainIds: [1, 4],
  bridge: BRIDGE_URL,
  qrcode: true
  
})