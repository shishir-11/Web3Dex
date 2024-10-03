import React, { useEffect, useState } from 'react';
import { senderAddressAmoy, senderAddressFuji,setCrossReceiverForAmoy,setCrossReceiverForFuji } from './utils/context';



const Admin = ({setCurrChain,currChain}) => {
    const [sepoliaLink,setSepoliaLink] = useState('');
    const [amoyLink,setAmoyLink] = useState('');
    const [sepoliaReceiver,setSepoliaReceiver] = useState('');
    const [amoyReceiver,setAmoyReceiver] = useState('');
    
    async function setFujiSender() {
        const address = await senderAddressFuji();
        setSepoliaLink(address);
    }

    async function setAmoySender() {
        const address = await senderAddressAmoy();
        setAmoyLink(address);
    }

    async function setCrossReceiverAmoy(){
        await setCrossReceiverForAmoy(sepoliaReceiver)        
    }


    async function setCrossReceiverFuji(){
        await setCrossReceiverForFuji(amoyReceiver)
    }


    return (
        <div className='admin-page'>
            <h1>Sender Funding</h1>
            <div className='sender-funding'>
                <p onClick={setFujiSender}>Fund Sepolia to Amoy Sender</p>
                {sepoliaLink}
                <p onClick={setAmoySender}>Fund Amoy to Sepolia Sender</p>
                {amoyLink}
            </div>
            
            <div className='receiver-address'>
                <h1>Address for receiver</h1>
                
                <p>Give address for receiver on Sepolia</p>
                <input placeholder='address' value={sepoliaReceiver} onChange={(e)=>setSepoliaReceiver(e.target.value)}></input>
                <button onClick={setCrossReceiverAmoy}>Set</button>

                <p>Give address for receiver on Amoy</p>
                <input placeholder='address' value={amoyReceiver} onChange={(e)=>setAmoyReceiver(e.target.value)}></input>
                <button onClick={setCrossReceiverFuji}>Set</button>
            </div>
        </div>
    );
}

export default Admin;
