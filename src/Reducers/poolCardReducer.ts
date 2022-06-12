import { TokenAmount, JSBI } from "quickswap-sdk";
import { ethers, FixedNumber } from "ethers";
import { IPool } from "../Models"

export const poolCardReducer = (state: IPool, action: any): IPool => {
    let {isPool, liquidityToken, balance, tokenA, tokenB, share, totalReserves} = state;

    // POOLS COMPONENT
    switch(action.type) {
        
        case "SET_ISPOOL":
            isPool = true
            liquidityToken = action.payload
            return {...state, isPool: isPool, liquidityToken: liquidityToken};
        
        case "SET_POOL_BALANCE":
           balance = action.payload.balance.toSignificant(3)
           tokenA.pooled = action.payload.amountA.toSignificant(3)
           tokenB.pooled = action.payload.amountB.toSignificant(3)
           share = action.payload.share
            //const TokenABalance = new TokenAmount(action.payload.token , ethers.utils.parseEther(action.payload.amount).toString())
            return {...state, balance: balance, tokenA: tokenA, tokenB: tokenB, share: share }

        case "LOADING":
            action.payload === 0 ?tokenA.loading = !tokenA.loading : tokenB.loading = !tokenB.loading
            return {...state, tokenA: tokenA, tokenB: tokenB}
        
        case "APPROVED":
            action.payload === 0 ?tokenA.isApproved = true :tokenB.isApproved = true
            return {...state, tokenA: tokenA, tokenB: tokenB}

        case 'HANDLE_INPUTS':
            const inputId = action.payload.id;
            try {
                // Take the entry of user and put it to a big Number
                const inputAmount = ethers.utils.parseEther(FixedNumber.from(action.payload.amount, 18).toString());
                // If pool is already created
                if (isPool && ethers.utils.parseEther(inputAmount.toString()).gt("0")) {
                    if (inputId === 0) {
                        tokenA.input = new TokenAmount(tokenA.token, JSBI.BigInt(inputAmount))
                        // using the inputA, calcul the rate of the second token
                        const amount1 = JSBI.BigInt(inputAmount.mul(totalReserves.denominator.toString()).div(totalReserves.numerator.toString()).toString())
                        tokenB.input = new TokenAmount(tokenB.token, amount1)
                        return {...state, tokenA: tokenA, tokenB: tokenB}
                    } else {
                        tokenB.input = new TokenAmount(tokenB.token, JSBI.BigInt(inputAmount))
                        // using the inputB: calcul the rate of the second token
                        const amount0 = JSBI.BigInt(inputAmount.mul(totalReserves.numerator.toString()).div(totalReserves.denominator.toString()).toString())
                        tokenA.input = new TokenAmount(tokenA.token, amount0)
                        return {...state, tokenA: tokenA, tokenB: tokenB}
                    }
                // If pool in not created and there is no entries
                } else if (inputAmount.toString() === "" && state.isPool) {
                    tokenA.input = undefined
                    tokenB.input = undefined
                    return {...state, tokenA: tokenA, tokenB: tokenB}
                } else {
                    if (inputId === 0) {
                        tokenA.input =  new TokenAmount(tokenA.token, JSBI.BigInt(inputAmount))
                        return {...state, tokenA: tokenA}
                    } else {
                        tokenB.input =  new TokenAmount(tokenB.token, JSBI.BigInt(inputAmount))
                        return {...state, tokenB: tokenB}
                    }
            }
            } catch (error) {
                console.log(error)
                if (inputId === 0) {
                    tokenA.input = undefined
                    return {...state, tokenA: tokenA}
                } else {
                    tokenB.input = undefined
                    return {...state, tokenB: tokenB}
                }
            }

      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }