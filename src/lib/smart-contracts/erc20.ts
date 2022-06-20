import { ethers } from "ethers";
import { byteCode } from "../../Constants"
import { abis } from "../../Constants/abis/abis";

export interface IDeployErc20Tx {
    signer: any,
    name: string,
    ticker: string,
    supply: string,
    toast: any,
}

export const deployErc20Tx = async(tx: IDeployErc20Tx) => {
    try {
        console.warn("DEPLOY ERC20")
        console.log("//////////////////////////////////////////////////////////")
        console.log("Name: " + tx.name)
        console.log("Ticker: " + tx.ticker)
        console.log("Supply: " + tx.supply)
        console.log("//////////////////////////////////////////////////////////")
        
        const erc20 = new ethers.ContractFactory(abis.gw3sErc20, byteCode.gw3sErc20, tx.signer)

        const transaction = await erc20.deploy(tx.name, tx.ticker, ethers.utils.parseEther(tx.supply))
    
        tx.toast({
            title: `Deploy token: ${tx.name}`,
            description: `transaction pending at: ${transaction.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.deployed()
    
        tx.toast({
            title: `Deploy token: ${tx.name}`,
            description: `Token deployed successfully !\ntoken address: ${transaction.address}`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)
        
    } catch (error: any) {
        console.log(error)
        tx.toast({
            position: "bottom-right",
            title: 'An error occurred.',
            description: `Deploy token: ${error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    }
}