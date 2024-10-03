import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function WalletConnect({ setWalletConnected, setUserAddress, currChain}) {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    getCurrentWalletAccount();
    addWalletListener();
  }, []);

  useEffect(()=>{
    switchNetwork();
  },[currChain])

  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        setAccount(accounts[0]);
        setWalletConnected(true);

      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Install Metamask");
    }
  };

  const switchNetwork = async ()=>{
    
    const chainId = await window.ethereum.request({ method: "eth_chainId"});
    // console.log(currChain.toString(16));
    
    if(currChain!=parseInt(chainId,16)){
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${currChain.toString(16)}`}],
        });
      // console.log("You have succefully switched to Binance Test network")
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
         console.log("This network is not available in your metamask, please add it")
        }
        console.log("Failed to switch to the network")
      }
    }
  }

  const getCurrentWalletAccount = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setWalletConnected(true); 
          setUserAddress(accounts[0]);
        // Notify App of existing connection
        } else {
          setUserAddress('');
          setWalletConnected(false); // No account, no connection
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Install Metamask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
          setAccount(accounts[0]);
          setWalletConnected(true);  // Notify App of account change
          console.log(accounts[0]);
        } else {
          setUserAddress('')
          setAccount(null);
          setWalletConnected(false); // No account means no connection
        }
      });
    } else {
      setUserAddress('')
      setAccount(null);
      setWalletConnected(false); // If no Ethereum provider
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account.substring(0, 6)}...${account.substring(account.length - 4)}` : 'Connect Wallet'}
      </button>
    </div>
  );
}

export default WalletConnect;
