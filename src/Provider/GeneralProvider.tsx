import React, { createContext, useEffect, useState } from "react"
import { Token } from "gotchiw3s-sdk";

export const GeneralContext = createContext<{
    userTokens: Token[],
    setUserTokens: React.Dispatch<any>
}>({
    userTokens: [],
    setUserTokens: (value: any) => {},
})

export const GeneralProvider = (props: any) => {
    const [userTokens, setUserTokens] = useState([])

    // get the tokens created by the user
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
