import { TokenAmount, JSBI } from "quickswap-sdk";
import { ethers, FixedNumber } from "ethers";
import { parseEther, formatEther } from "ethers/lib/utils";
import { IPool } from "../Models"

export const poolCardReducer = (state: IPool, action: any): IPool => {
    let {isPool, liquidityToken, balance, tokenA, tokenB, share, totalReserves} = state;

    // POOLS COMPONENT
    switch(action.type) {
        
        case "SET_ISPOOL":
            isPool = true
            liquidityToken = action.payload
            return {...state, liquidityToken: liquidityToken, isPool: isPool};
        
        case "SET_POOL_BALANCE":
           balance = action.payload.balance.toSignificant(3)
           tokenA.pooled = action.payload.amountA.toSignificant(3)
           tokenB.pooled = action.payload.amountB.toSignificant(3)
           share = action.payload.share
           totalReserves = action.payload.reserves
            //const TokenABalance = new TokenAmount(action.payload.token , ethers.utils.parseEther(action.payload.amount).toString())
            return {...state, balance: balance, tokenA: tokenA, tokenB: tokenB, share: share, totalReserves: totalReserves }
        
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
            tokenA.isApproved = action.payload.isApproved.tokenA
            tokenB.isApproved = action.payload.isApproved.tokenB
            return {...state, tokenA: tokenA, tokenB: tokenB}
        
        case "SET_APPROVED":
            if (action.payload === 0)
                tokenA.isApproved = true
            else
                tokenB.isApproved = true
            return {...state, tokenA: tokenA, tokenB: tokenB}

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
                    case "SLIDER":
                        const lpAmount = new TokenAmount(liquidityToken!, JSBI.BigInt(parseEther(balance ?? '0').mul(parseEther((action.payload.value / 100).toString()))))
                        tokenA.inputRemove = new TokenAmount(tokenA.token, lpAmount.divide(JSBI.BigInt(parseEther(balance!))).multiply(JSBI.BigInt(parseEther(tokenA.pooled))).quotient)
                        tokenB.inputRemove = new TokenAmount(tokenB.token,  lpAmount.divide(JSBI.BigInt(parseEther(balance!))).multiply(JSBI.BigInt(parseEther(tokenB.pooled))).quotient)
                        return {...state, lpRemoveInput: formatEther(lpAmount.toExact()), tokenA: tokenA, tokenB: tokenB}
                    case "LP_INPUT":
                        console.log(action.payload.value)
                        return {...state}
                    case "TOKEN_A_INPUT":
                        console.log(action.payload.value)
                        return {...state}
                    case "TOKEN_B_INPUT":
                        console.log(action.payload.value)
                        return {...state}
                    default:
                        throw new Error(`Unsupported action type ${action.type} in userReducer/HANDLE_REMOVE_INPUTS `)
                }
            } catch (error) {
                console.log(error)
                return {...state}
            }

        case "RESET":
            isPool = undefined
            balance = undefined
            tokenA.balance = undefined
            return {...state, isPool: isPool, balance: balance, tokenA: tokenA}

      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }