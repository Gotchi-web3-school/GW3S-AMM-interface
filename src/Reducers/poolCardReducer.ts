import { TokenAmount, JSBI} from "quickswap-sdk";
import { ethers, FixedNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { IPool } from "../Models"

export const poolCardReducer = (state: IPool, action: any): IPool => {
    let {isPool, tokenA, tokenB, totalReserves, lpToken} = state;

    // POOLS COMPONENT
    switch(action.type) {
        
        case "SET_ISPOOL":
            isPool = true
            lpToken.token = action.payload
            return {...state, lpToken: lpToken, isPool: isPool};
        
        case "SET_POOL_BALANCE":
           lpToken.balance = action.payload.balance
           tokenA.pooled = action.payload.amountA
           tokenB.pooled = action.payload.amountB
           lpToken.share = action.payload.share
           totalReserves = action.payload.reserves
            //const TokenABalance = new TokenAmount(action.payload.token , ethers.utils.parseEther(action.payload.amount).toString())
            return {...state, lpToken: lpToken, tokenA: tokenA, tokenB: tokenB, totalReserves: totalReserves }
        
        case "SET_POOL_TOKEN_BALANCE":
            tokenA.balance = action.payload.tokenA
            tokenB.balance = action.payload.tokenB
        return {...state, tokenA: tokenA, tokenB: tokenB}

        case "LOADING":
            if (action.payload.id === 0) {
                tokenA.loading = action.payload.isLoading
            } else {
                tokenB.loading = action.payload.isLoading
            } 
            return {...state, tokenA: tokenA, tokenB: tokenB}
        
        case "SEARCH_APPROVED":
            if (action.payload.id === 0) {
                tokenA.isApproved = action.payload.isApproved.tokenA
                tokenB.isApproved = action.payload.isApproved.tokenB
            } else {
                lpToken.isApproved = action.payload
            }
            return {...state, tokenA: tokenA, tokenB: tokenB, lpToken: lpToken}
        
        case "SET_APPROVED":
            if (action.payload === 0)
                tokenA.isApproved = true
            else if (action.payload === 1) {
                tokenB.isApproved = true
            } else {
                lpToken.isApproved = true
            }
            return {...state, tokenA: tokenA, tokenB: tokenB, lpToken: lpToken}

        case 'HANDLE_INPUTS':
            const inputId = action.payload.id;
            try {
                // Take the entry of user and put it to a big Number
                const inputAmount = ethers.utils.parseEther(FixedNumber.from(action.payload.amount, 18).toString());
                // If pool is already created
                if (isPool && ethers.utils.parseEther(inputAmount.toString()).gt("0")) {
                    if (inputId === 0) {
                        tokenA.inputAdd = new TokenAmount(tokenA.token, JSBI.BigInt(inputAmount))
                        // using the inputA, calcul the rate of the second token
                        const amount1 = JSBI.BigInt(inputAmount.mul(totalReserves.denominator.toString()).div(totalReserves.numerator.toString()).toString())
                        tokenB.inputAdd = new TokenAmount(tokenB.token, amount1)
                        return {...state, tokenA: tokenA, tokenB: tokenB}
                    } else {
                        tokenB.inputAdd = new TokenAmount(tokenB.token, JSBI.BigInt(inputAmount))
                        // using the inputB: calcul the rate of the second token
                        const amount0 = JSBI.BigInt(inputAmount.mul(totalReserves.numerator.toString()).div(totalReserves.denominator.toString()).toString())
                        tokenA.inputAdd = new TokenAmount(tokenA.token, amount0)
                        return {...state, tokenA: tokenA, tokenB: tokenB}
                    }
                // If pool in not created and there is no entries
                } else if (inputAmount.toString() === "" && state.isPool) {
                    tokenA.inputAdd = undefined
                    tokenB.inputAdd = undefined
                    return {...state, tokenA: tokenA, tokenB: tokenB}
                } else {
                    if (inputId === 0) {
                        tokenA.inputAdd =  new TokenAmount(tokenA.token, JSBI.BigInt(inputAmount))
                        return {...state, tokenA: tokenA}
                    } else {
                        tokenB.inputAdd =  new TokenAmount(tokenB.token, JSBI.BigInt(inputAmount))
                        return {...state, tokenB: tokenB}
                    }
            }
            } catch (error) {
                if (inputId === 0) {
                    tokenA.inputAdd = undefined
                    return {...state, tokenA: tokenA}
                } else {
                    tokenB.inputAdd = undefined
                    return {...state, tokenB: tokenB}
                }
            }
        case 'HANDLE_REMOVE_INPUTS':
            try {
                switch(action.payload.type) {
                    case "MAX_BUTTON":
                        tokenA.inputRemove = tokenA.pooled
                        tokenB.inputRemove = tokenB.pooled
                        lpToken.lpRemoveInput = lpToken.balance
                        return {...state, lpToken: lpToken, tokenA: tokenA, tokenB: tokenB}
                    case "SLIDER":
                        lpToken.lpRemoveInput = new TokenAmount(lpToken.token!, lpToken.balance!.multiply(JSBI.BigInt(parseEther((action.payload.value / 100).toString()))).quotient)
                        tokenA.inputRemove = new TokenAmount(tokenA.token, JSBI.BigInt(parseEther(lpToken.lpRemoveInput.multiply(tokenA.pooled).divide(lpToken.balance!).toFixed(2))))
                        tokenB.inputRemove = new TokenAmount(tokenB.token, JSBI.BigInt(parseEther(lpToken.lpRemoveInput.multiply(tokenB.pooled).divide(lpToken.balance!).toFixed(2))))
                        return {...state, lpToken: lpToken, tokenA: tokenA, tokenB: tokenB}
                    case "LP_INPUT":
                        if (parseInt(action.payload.value) > 0) {
                            lpToken.lpRemoveInput = new TokenAmount(lpToken.token!, JSBI.BigInt(parseEther(action.payload.value)))
                            tokenA.inputRemove = new TokenAmount(tokenA.token, JSBI.BigInt(parseEther(lpToken.lpRemoveInput.multiply(tokenA.pooled).divide(lpToken.balance!).toSignificant(4))))
                            tokenB.inputRemove = new TokenAmount(tokenB.token, JSBI.BigInt(parseEther(lpToken.lpRemoveInput.multiply(tokenB.pooled).divide(lpToken.balance!).toSignificant(4))))
                        } else {
                            lpToken.lpRemoveInput = undefined
                            tokenA.inputRemove = undefined
                            tokenB.inputRemove = undefined
                        }
                        return {...state, lpToken: lpToken, tokenA: tokenA, tokenB: tokenB}
                        case "TOKEN_A_INPUT":
                            if (parseInt(action.payload.value) > 0) {
                                lpToken.lpRemoveInput = new TokenAmount(lpToken.token!, lpToken.balance!.multiply(JSBI.BigInt(parseEther(action.payload.value))).divide(tokenA.pooled!).quotient)
                                tokenA.inputRemove = new TokenAmount(tokenA.token, JSBI.BigInt(parseEther(action.payload.value)))
                                tokenB.inputRemove = new TokenAmount(tokenB.token, JSBI.BigInt(parseEther(lpToken.lpRemoveInput.multiply(tokenB.pooled).divide(lpToken.balance!).toSignificant(4))))
                            } else {
                                lpToken.lpRemoveInput = undefined
                                tokenA.inputRemove = undefined
                                tokenB.inputRemove = undefined
                            }
                        return {...state, lpToken: lpToken, tokenA: tokenA, tokenB: tokenB}
                    case "TOKEN_B_INPUT":
                        if (parseInt(action.payload.value) > 0) {
                                lpToken.lpRemoveInput = new TokenAmount(lpToken.token!, lpToken.balance!.multiply(JSBI.BigInt(parseEther(action.payload.value))).divide(tokenB.pooled!).quotient)
                                tokenA.inputRemove = new TokenAmount(tokenA.token, JSBI.BigInt(parseEther(lpToken.lpRemoveInput.multiply(tokenA.pooled).divide(lpToken.balance!).toSignificant(4))))
                                tokenB.inputRemove = new TokenAmount(tokenB.token, JSBI.BigInt(parseEther(action.payload.value)))
                        } else {
                            lpToken.lpRemoveInput = undefined
                            tokenA.inputRemove = undefined
                            tokenB.inputRemove = undefined
                        }
                        return {...state, lpToken: lpToken, tokenA: tokenA, tokenB: tokenB}
                    default:
                        throw new Error(`Unsupported action type ${action.type} in userReducer/HANDLE_REMOVE_INPUTS `)
                }
            } catch (error) {
                lpToken.lpRemoveInput = undefined
                tokenA.inputRemove = undefined
                tokenB.inputRemove = undefined
                return {...state, lpToken: lpToken, tokenA: tokenA, tokenB: tokenB}
            }

        case "RESET":
            isPool = undefined
            lpToken.balance = undefined
            tokenA.balance = undefined
            return {...state, isPool: isPool, lpToken: lpToken, tokenA: tokenA}

      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }