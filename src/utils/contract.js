import {ethers} from "ethers";
import DexFuji from "../utils/DexFuji.json";
import CustomToken from "../utils/CustomToken.json";
import DexAmoy from "../utils/DexAmoy.json";

export const tokenContract = async(address) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const {ethereum} = window;

    if(ethereum) {
        const signer = await provider.getSigner();

        const contractReader = new ethers.Contract(
            address,
            CustomToken.abi,
            signer
        );

        return contractReader;
    }
};

export const contractFuji = async() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const {ethereum} = window;

    if(ethereum) {
        const signer = await provider.getSigner();
        
        const contractReader = new ethers.Contract(
            "0x74711F56Feb0226CA1e12a014FC33CeD5d6C3147",
            DexFuji.abi,
            signer
        );
        
        return contractReader;
    }

}

export const contractAmoy = async() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const {ethereum} = window;

    if(ethereum) {
        const signer = await provider.getSigner();
        
        const contractReader = new ethers.Contract(
            "0xf73048DE4C0508A6571820B1BE7adc494fF6F15B",
            DexAmoy.abi,
            signer
        );
        
        return contractReader;
    }

}