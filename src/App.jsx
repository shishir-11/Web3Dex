import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WalletConnect from './WalletConnect';
import Swap from './Swap';
import Admin from './Admin';

function App() {
  const [walletConnected, setWalletConnected] = useState(true);
  const [userAddress,setUserAddress] = useState('');
  const [currChain, setCurrChain] = useState(80002);  

  window.ethereum.on('chainChanged',(chainId)=>{
    console.log(parseInt(chainId));
    setCurrChain(parseInt(chainId,16));
  })

  return (
    <Router>
      <h1>Hello</h1>
      <WalletConnect setWalletConnected={setWalletConnected} setUserAddress={setUserAddress} currChain={currChain} />
      <Routes>
        <Route
          path='/'
          exact
          element = {walletConnected && <Swap userAddress={userAddress} setCurrChain={setCurrChain}/>}
        />
        <Route
          path='/admin'
          exact 
          element = {<Admin userAddress={userAddress} setCurrChain={setCurrChain} currChain={currChain}/>}
        />
      </Routes>
      </Router>
  );
}

export default App;
