import { Token } from "quickswap-sdk";
import { TokenAmount, JSBI, Pair, Route} from "quickswap-sdk";
import { ethers, FixedNumber } from "ethers";
//import { parseEther } from "ethers/lib/utils";
import { Swap } from "../Models/swap"

export const swapReducer = (state: Swap, action: any): Swap => {
    let {tokenA, input, tokenB, output, isPool, pair} = state;


    // POOLS COMPONENT
    switch(action.type) {
        case 'SET_TOKEN':
            const {id, token} = action.payload
            const newToken = new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)
            if (id === 0) {
                tokenA.token = newToken
                tokenA.logo = token.logoURI
            } else {
                tokenB.token = newToken
                tokenB.logo = token.logoURI
            }
            return {...state, tokenA: tokenA, tokenB: tokenB}

            case 'SET_TOKEN_BALANCE':
                if (action.payload.id === 0)
                    tokenA.balance.amount = new TokenAmount(tokenA.token!, ethers.utils.parseEther(action.payload.amount).toString())
                else
                    tokenB.balance.amount = new TokenAmount(tokenB.token!, ethers.utils.parseEther(action.payload.amount).toString())
                return {...state, tokenA: tokenA, tokenB: tokenB}

            case "SET_PAIR":
                return  {...state, pair: action.payload, route: new Route([action.payload], tokenA.token!, tokenB.token)}

            case "SET_ROUTE":
                return  {...state, route: action.payload}
            


            case 'HANDLE_INPUTS':
                const inputId = action.payload.id;
                try {
                    // Take the entry of user and put it to a big Number
                    const inputAmount = ethers.utils.parseEther(FixedNumber.from(action.payload.amount, 18).toString());
                    // If pool is already created
                    if (isPool && tokenB && tokenA && ethers.utils.parseEther(inputAmount.toString()).gt("0")) {
                        const amount = new TokenAmount(inputId ? tokenB.token! : tokenA.token!, JSBI.BigInt(inputAmount))
                        if (inputId === 0) {
                            // using the entry calcul the rate of the second token
                            const pairedAmount = new TokenAmount(tokenB.token!, "0")
                            return {...state, input: amount, output: pairedAmount}
                        } else {
                            // using the entry calcul the rate of the second token
                            const pairedAmount = new TokenAmount(tokenA.token!, "0")
                            return {...state, input: pairedAmount, output: amount}
                        }
                    // If pool in not created and there is no entries
                    } else if (inputAmount.toString() === "" && state.isPool) {
                        return {...state, input: undefined, output: undefined}
                    } else {
                        const amount = tokenB && tokenA && new TokenAmount(inputId ? tokenB.token! : tokenA.token!, JSBI.BigInt(inputAmount))
                        return inputId ? {...state, output: amount} : {...state, input: amount};
                }
                } catch (error) {
                    console.log(error)
                    return inputId ? {...state, output: undefined} : {...state, input: undefined};
                }
        
        case "RESET":
            tokenA.balance.amount = undefined
            tokenB.balance.amount = undefined
            return {...state, tokenA: tokenA, tokenB: tokenB}

      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }