import { contractFuji,contractAmoy,tokenContract } from "./contract";
import { toEth, toWei } from "./utils";

export async function swapEthToTokenFuji(tokenName, amount) {
    try{
        let tx = {value: toWei(amount)};
 
        const contractObj = await contractFuji();
        const swapEthToToken = contractObj.getFunction("swapEthToToken");
        const data = await swapEthToToken(tokenName,tx);

        const receipt = await data.wait();
        console.log(receipt);
        
        return receipt;
    }catch(e){
        console.log(e);
        return parseErrorMsg(e);
        // return parseErrorMsg(e);
    }
}

export async function swapEthToTokenAmoy(tokenName, amount) {
    try{
        let tx = {value: toWei(amount)};
 
        const contractObj = await contractAmoy();
        const swapEthToToken = contractObj.getFunction("swapEthToToken");
        const data = await swapEthToToken(tokenName,tx)

        const receipt = await data.wait();
        console.log(receipt);
        
        return receipt;
    }catch(e){
        console.log(e);
        return parseErrorMsg(e);
        // return parseErrorMsg(e);
    }
}

export async function getContractOwnerFuji(){
    try{
        const contractObj = await contractFuji();
        const ownerfunc = contractObj.getFunction("owner");
        const ownerAddress = await ownerfunc();
        console.log(ownerAddress);
        
        return ownerAddress;
    }catch(e){
        console.log(e);
        return parseErrorMsg(e);
    }
}


export async function getContractOwnerAmoy(){
    try{
        const contractObj = await contractAmoy();
        const ownerfunc = contractObj.getFunction("owner");
        const ownerAddress = await ownerfunc();
        console.log(ownerAddress);
        
        return ownerAddress;
    }catch(e){
        console.log(e);
        return parseErrorMsg(e);
    }
}

export async function hasvalidAllowanceFuji(owner, tokenName, amount){
    try{
        const contractObj = await contractFuji();
        const address = await contractObj.getTokenAddress(tokenName);

        const tokenContractObj = await tokenContract(address);
        const data = await tokenContractObj.allowance(
            owner,
            "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        )

        const allowance = BigInt(data.toString());
        const reqAmount = toWei(amount);
        const result = allowance >= reqAmount;
        return result;
    }catch(e){
        return parseErrorMsg(e);
    }
}


export async function hasvalidAllowanceAmoy(owner, tokenName, amount){
    try{
        const contractObj = await contractFuji();
        const address = await contractObj.getTokenAddress(tokenName);

        const tokenContractObj = await tokenContractAmoy(address);
        const data = await tokenContractObj.allowance(
            owner,
            "0xf73048DE4C0508A6571820B1BE7adc494fF6F15B"
        )

        const allowance = BigInt(data.toString());
        const reqAmount = toWei(amount);
        const result = allowance >= reqAmount;
        return result;
    }catch(e){
        return parseErrorMsg(e);
    }
}


export async function swapTokenToEthFuji(tokenName, amount) {
    try{
       const contractObj = await contractFuji();
       const data = await contractObj.swapTokentoEth(tokenName,toWei(amount));

       const receipt = await data.wait();
       return receipt;
    }catch(e){
        // return parseErrorMsg(e);
        return parseErrorMsg(e);
    }
}

export async function swapTokenToEthAmoy(tokenName, amount) {
    try{
       const contractObj = await contractAmoy();
       const data = await contractObj.swapTokentoEth(tokenName,toWei(amount));

       const receipt = await data.wait();
       return receipt;
    }catch(e){
        // return parseErrorMsg(e);
        return parseErrorMsg(e);
    }
}


export async function swapTokenToTokenFuji(srcToken, destToken, amount){
    try{
        const contractObj = await contractFuji();
        const data = await contractObj.swapTokenToToken(
            srcToken,
            destToken,
            toWei(amount)
        );
        

        const receipt = await data.wait();
        return receipt;
    }catch (e){
        return parseErrorMsg(e);;
    }
}

export async function swapTokenToTokenAmoy(srcToken, destToken, amount){
    try{
        const contractObj = await contractAmoy();
        const data = await contractObj.swapTokenToToken(
            srcToken,
            destToken,
            toWei(amount)
        );
        const receipt = await data.wait();
        return receipt;
    }catch (e){
        return parseErrorMsg(e);;
    }
}


export async function getTokenBalanceFuji(tokenName, address) {
    const contractObj  = await contractFuji();
    const balance  = await contractObj.getBalance(tokenName,address);
    return toEth(balance.toString()); 
}


export async function getTokenBalanceAmoy(tokenName) {
    const contractObj  = await contractAmoy();
    const balance  = await contractObj.getBalance(tokenName);
    return toEth(balance.toString()); 
}


export async function getTokenAddressFuji(tokenName) {
    try{
        const contractObj = await contractFuji();
        const address = await contractObj.getTokenAddress(tokenName);
        return address;
    }catch(e){
        return parseErrorMsg(e);
    }
}

export async function getTokenAddressAmoy(tokenName) {
    try{
        const contractObj = await contractAmoy();
        const address = await contractObj.getTokenAddress(tokenName);
        return address;
    }catch(e){
        return parseErrorMsg(e);
    }
}

export async function increaseAllowanceFuji(tokenName, amount) {
    try{
        const contractObj = await contractFuji();
        const address = await contractObj.getTokenAddress(tokenName);
        console.log(address);
        
        const tokenContractObj = await tokenContract(address);
        const data = await tokenContractObj.approve(
            "0x5FbDB2315678afecb367f032d93F642f64180aa3",
            toWei(amount)
        );

        const receipt = await data.wait();
        
        return receipt;
    }catch(e){
        return parseErrorMsg(e);
    }
}

export async function increaseAllowanceAmoy(tokenName, amount) {
    try{
        const contractObj = await contractAmoy();
        const address = await contractObj.getTokenAddress(tokenName);
        console.log(address);
        
        const tokenContractObj = await tokenContract(address);
        const data = await tokenContractObj.approve(
            "0xf73048DE4C0508A6571820B1BE7adc494fF6F15B",
            toWei(amount)
        );

        const receipt = await data.wait();
        
        return receipt;
    }catch(e){
        return parseErrorMsg(e);
    }
}


export async function getAllHistory() {
    try{
        const contractObj = await contract();
        const getAllHistory = await contractObj.getAllHistory();

        const historyTransaction = getAllHistory.map((history,i)=>({
            historyId: history.historyId.toNumber(),
            tokenA: history.tokenA,
            tokenB: history.tokenB,
            inputValue: toEth(history?.inputValue), 
            outputValue: toEth(history?.outputValue),
            userAddress: history.userAddress,
        }))

        return historyTransaction;
    }catch(e){
        return parseErrorMsg(e);
    }
}

export async function senderAddressFuji(){
    try{
        const contractObj = await contractFuji();
        const senderAddressFunc = contractObj.getFunction("getSenderAddress");
        const address = await senderAddressFunc();
        
        return address;
    }catch(e){
        return parseErrorMsg(e);
    }
}

export async function senderAddressAmoy(){
    try{
        const contractObj = await contractAmoy();
        const senderAddressFunc = contractObj.getFunction("getSenderAddress");
        const address = await senderAddressFunc();
        
        return address;
    }catch(e){
        return parseErrorMsg(e);
    }
}

export async function setCrossReceiverForFuji(receiver){
    try{
        const contractObj = await contractFuji();
        const funcNeeded = contractObj.getFunction("setReceiverCross");
        await funcNeeded(receiver);
    }catch(e){
        parseErrorMsg(e);
    }
}

export async function setCrossReceiverForAmoy(receiver){
    try{
        console.log(receiver);
        
        const contractObj = await contractAmoy();
        const funcNeeded = await contractObj.setReceiverCross(receiver);
        funcNeeded.wait();
        console.log(funcNeeded);
        
    }catch(e){
        parseErrorMsg(e);
    }
}

export async function sendTokenCrossAmoyToFuji(srcToken,destToken,amount) {
    try{
        const contractObj = await contractAmoy();
        const data = await contractObj.swapTokenChainReceive(
            srcToken,
            destToken,
            toWei(amount)
        );
        const receipt = await data.wait();
        return receipt;
    }catch (e){
        return parseErrorMsg(e);;
    }
}


function parseErrorMsg(e){
    const json = JSON.parse(JSON.stringify(e));
    return json?.reason || json?.error?.message;
}