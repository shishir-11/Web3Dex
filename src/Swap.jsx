import React,{useState} from 'react';
import { ETH, POL, Token1, Token2, Token3, Token4 } from './utils/saleToken';
import { getTokenAddressAmoy,getTokenAddressFuji, getTokenBalanceAmoy, getTokenBalanceFuji, hasvalidAllowanceAmoy,hasvalidAllowanceFuji, increaseAllowanceAmoy,increaseAllowanceFuji, swapEthToTokenAmoy,swapEthToTokenFuji,swapTokenToEthAmoy, swapTokenToEthFuji,swapTokenToTokenAmoy, swapTokenToTokenFuji } from './utils/context';

const Swap = ({userAddress,setCurrChain}) => {
    const [swapFrom, setSwapFrom] = useState('');
    const [chain1, setChain1] = useState('');
    const [swapTo,setSwapTo] = useState('');
    const [chain2, setChain2] = useState('');
    const [amount1, setAmount1] = useState('');
    const [amount2, setAmount2] = useState('');
    const [currCoinAddress, setCurrCoinAddress] = useState('');
    // List of options for the dropdown
    const [coins,setCoins] = useState([ETH,Token1,Token2,Token3,Token4,POL]);
    const options = [ETH.name,Token1.name,Token2.name,Token3.name,Token4.name,POL.name];
    
    // Function to handle changes when selecting an option
    const handleSwapFrom = (event) => {
        setSwapFrom(event.target.value); // Update selected option in state
        const chainFrom = coins.find(coin=>coin.name===event.target.value).chainId;
        setChain1(chainFrom);
        setCurrChain(chainFrom);
    };

    const handleSwapTo = async (event) => {
        setSwapTo(event.target.value);
        // Update selected option in state
        const chainTo = coins.find(coin=>coin.name===event.target.value).chainId;
        setChain2(chainTo);
        let coinAdd;
        if(chainTo!==chain1){
            setCurrCoinAddress('');
            return;
        }
        if(chainTo===80002){
            if(event.target.value!=="Pol"){ 
                coinAdd = await getTokenAddressAmoy(event.target.value);
                console.log(coinAdd);
                setCurrCoinAddress(coinAdd);
            }
            else setCurrCoinAddress('')
        }else{
            if(event.target.value!=="Eth"){
                coinAdd = await getTokenAddressFuji(event.target.value);
                setCurrCoinAddress(coinAdd);
            }
            else setCurrCoinAddress('')
        }
    };

    const handleSetAmount = (event) => {
        setAmount1(event.target.value);
        setAmount2(event.target.value);
    }
    
    
    const handleSwap = async() =>{
        if(swapFrom===swapTo){
            alert("swap must be between different tokens");
            return;
        }

        if(chain1==80002 && chain2==80002){
            if(swapFrom==="Pol"){
                await swapEthToTokenAmoy(swapTo,amount1);
            }else{
                const balance = await getTokenBalanceAmoy(swapFrom);
                    if(balance<amount1){
                        alert("Not enough tokens in your account");
                        return;
                    }
        
                    const res = await hasvalidAllowanceAmoy(userAddress,swapFrom,amount1);
                    
                    if(!res){
                        await increaseAllowanceAmoy(swapFrom,amount1);
                    }
                    
                    if(swapTo==="Pol"){
                        await swapTokenToEthAmoy(swapFrom,amount1);
                    }else{
                        await swapTokenToTokenAmoy(swapFrom,swapTo,amount1);
                    }
            }
        }else if(chain1==43113 && chain2==43113){
            if(swapFrom==="Eth"){
                await swapEthToTokenFuji(swapTo,amount1);
            }else{
                const balance = await getTokenBalanceFuji(swapFrom,userAddress);
                    if(balance<amount1){
                        alert("Not enough tokens in your account");
                        return;
                    }
        
                    const res = await hasvalidAllowanceFuji(userAddress,swapFrom,amount1);
                    
                    if(!res){
                        await increaseAllowanceFuji(swapFrom,amount1);
                    }
                    
                    if(swapTo==="Eth"){
                        await swapTokenToEthFuji(swapFrom,amount1);
                    }else{
                        await swapTokenToTokenFuji(swapFrom,swapTo,amount1);
                    }
            }
        }
    }


    return (
      <div className='swap-box'>
        <div className='choose-area'>
            <div className='swap-from-area'>
                <select id="dropdown" value={swapFrom} onChange={handleSwapFrom}>
                <option value="">-- Swap From --</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                    {option}
                    </option>
                ))}
                </select>

                <input value={amount1} placeholder={'Enter value'}onChange={handleSetAmount}></input>
            </div>

            <div className='swap-from-area'>
                <select id="dropdown" value={swapTo} onChange={handleSwapTo}>
                <option value="">-- Swap To --</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}

                </select>
                {/* {amount2} */}
                {currCoinAddress}

            </div>
        </div>

        <button onClick={handleSwap}>Swap</button>

      </div>
    );
}

export default Swap;
