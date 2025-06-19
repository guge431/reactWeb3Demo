import { ExchangeETH,ExchangeETH__factory } from '@/types/ethers-contracts'
// import { InfoContract, InfoContract__factory } from '@/types/ethers-contracts';
import ExchangeETHAPI from '@abis/ExchangeETH.json';
import { BrowserProvider,Contract,ethers } from 'ethers';
// import { Contract } from 'ethers';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}
const CONTRACT_ADDRESS = ExchangeETHAPI.networks['11155111'].address;

// console.log('🌺🌺🌺🌺🌺🌺🌺🌺🌺 ', CONTRACT_ADDRESS);
const DappPage = () => {
  const [contract, setContract] = useState<ExchangeETH | null>(null);
   
  useEffect( () => {
    const provider = new BrowserProvider(window.ethereum);
    provider
      .getSigner()
      .then(signer => {
        const contractInstance = ExchangeETH__factory.connect(CONTRACT_ADDRESS, signer);
        setContract(contractInstance);
      })
      .catch(error => {
        console.error('Error connecting to contract:', error);
      });
  }, []);
  useEffect(() => {
    if (contract) {
    //   contract.setInfo('Hello, DappTest!', 2);
    }
  }, [contract]);

  return (
    <>
      <h1>Dapptest</h1>
    </>
  );
};
export default DappPage;
