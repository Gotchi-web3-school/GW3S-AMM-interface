import { ethers } from "ethers";

export const EscapeGotchi1 = async(signer: any, toast: any): Promise<number> => {

    try {
        const Chest = new ethers.Contract("0x6e82D536a19057cE45B15505AE58d1cB75f3B06E", ["function loot() public returns(struct)", "function lootCounter() public returns(uint)"], signer.library?.getSigner(signer.account) ?? signer.library)
        console.warn("OPEN CHEST")
        console.log("///////////////////////////////////////////////")
        console.log("Escape gotchi 1")
        console.log("///////////////////////////////////////////////")
    
        //Estimation of the gas cost
        const gas = await Chest.estimateGas.loot()
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))

        const transaction = await Chest.loot()

    
        toast({
            title: `Open chest level 0`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        toast({
            title: `loot Escape gotchi 1`,
            description: `Reward claimed successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt.logs)
        return parseInt(ethers.utils.formatEther(await Chest.lootCounter()))
    } catch (error: any) {
        console.log("error")
        toast({
            position: "bottom-right",
            title: 'loot Escape gotchi 1',
            description: `${error.error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        throw new Error(error.error)
    }
}