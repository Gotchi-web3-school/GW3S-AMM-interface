import { ethers } from "ethers";
import { Token } from "gotchiw3s-sdk"
import { byteCode } from "../../Constants"
import { abis } from "../../Constants/Abis/abis";
import { IDeployErc20Tx } from "../../Models";

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
        
        // Keep new token created in storage
        let tokens: Array<Token>
        try {
            tokens = JSON.parse(localStorage.getItem("tokens") ?? "")
        } catch (error) {
            tokens = []
        }
        tokens.unshift(new Token(80001, transaction.address, 18, tx.ticker, tx.name))
        localStorage.setItem(`tokens`, JSON.stringify(tokens))
        tx.setUserTokens(tokens)

        tx.toast({
            title: `Deploy token: ${tx.name}`,
            description: `Token ${tx.ticker} added to your list.`,
            position: "bottom-left",
            status: "success",
            duration: 6000,
            isClosable: true,
        })
        
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