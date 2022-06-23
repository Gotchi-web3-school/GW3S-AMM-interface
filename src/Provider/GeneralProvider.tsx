import React, { createContext, useEffect, useState } from "react"
import { Token } from "gotchiw3s-sdk";
import { useWeb3React } from "@web3-react/core";
import { connectUser } from '../Lib/Connectors/connectors';

export const GeneralContext = createContext<{
    userTokens: Token[],
    setUserTokens: React.Dispatch<any>
}>({
    userTokens: [],
    setUserTokens: (value: any) => {},
})

export const GeneralProvider = (props: any) => {
    const signer = useWeb3React()
    const [userTokens, setUserTokens] = useState([])

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

  return (
    <GeneralContext.Provider value={{ userTokens, setUserTokens }}>
    {props.children}
    </GeneralContext.Provider>
  )
}
