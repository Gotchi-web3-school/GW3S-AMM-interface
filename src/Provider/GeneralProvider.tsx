import React, { createContext, useEffect, useState } from "react"
import { Token } from "gotchiw3s-sdk";
import { useWeb3React } from "@web3-react/core";
import { connectUser } from '../Lib/Connectors/connectors';
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { formatEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";

export const GeneralContext = createContext<{
    userTokens: Token[],
    setUserTokens: React.Dispatch<any>,
    signer?: Web3ReactContextInterface<any>,
    balance: string,
}>({
    userTokens: [],
    setUserTokens: () => {},
    balance: "0.00",
})

export const GeneralProvider = (props: any) => {
    const signer = useWeb3React()
    const {account, library, chainId} = signer
    const [userTokens, setUserTokens] = useState([])
    const [balance, setBalance] = useState<string>("")

    // If wallet detected, connect user
    useEffect(() => {
        const userWindow: any = window
        if (userWindow.ethereum && !signer.active) {
            connectUser(signer.activate)
        }
    }, [signer.activate, signer.active])

    // get the tokens created by the user in the local storage
    useEffect(() => {
        let tokens = undefined
        try {
            tokens = JSON.parse(localStorage.getItem("tokens") ?? "")
        } catch (error) {
            console.log("user has no tokens created")
        }
        setUserTokens(tokens)
    }, [])

    // get balance of user
    useEffect(() => {
        if (account && chainId === 80001) {
            try {
                library.getBalance(account)
                .then((result: BigNumber) => setBalance(formatEther(result)))
            } catch (error) {
                console.log(error)            
            }
        }
    }, [account, library, chainId])

  return (
    <GeneralContext.Provider value={{ userTokens, setUserTokens, signer, balance }}>
    {props.children}
    </GeneralContext.Provider>
  )
}
