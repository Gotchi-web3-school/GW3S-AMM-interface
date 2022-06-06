import { AddLiquidity } from "../Models"
import { Token, TokenAmount, JSBI, Pair } from "quickswap-sdk"
import { ethers, FixedNumber } from "ethers"

export const addLiquidityReducer = (state: AddLiquidity, action: any): AddLiquidity => {
    const {
        token0,
        token0Amount,
        token1,
        token1Amount, 
        isPool, 
        reserves,
    } = state;

    switch(action.type) {
        case 'SET_TOKEN':
            const {id, token} = action.payload
            const newToken = new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)
            if (id === 0)
                return {...state, token0: newToken, token0Logo: token.logoURI}
            else
                return {...state, token1: newToken, token1Logo: token.logoURI}

        case 'SET_TOKEN_BALANCE':
            if (action.payload.id === 0)
                return {...state, token0Balance: new TokenAmount(action.payload.token , ethers.utils.parseEther(action.payload.amount).toString())}
            else
                return {...state, token1Balance: new TokenAmount(action.payload.token, ethers.utils.parseEther(action.payload.amount).toString())}

        case 'HANDLE_INPUTS':
            try {
                const inputId = action.payload.id;
                // Take the entry of user and put it to a big Number
                const inputAmount = ethers.utils.parseEther(FixedNumber.fromString(action.payload.amount, 18).toString());
                console.log(inputAmount)
                console.log(ethers.utils.parseEther(inputAmount.toString()).gt("0"))
                // If pool is already created
                if (isPool && token1 && token0 && ethers.utils.parseEther(inputAmount.toString()).gt("0")) {
                    const amount = new TokenAmount(inputId ? token1 : token0, JSBI.BigInt(inputAmount))
                    if (inputId === 0) {
                        // using the entry calcul the rate of the second token
                        const amount1 = JSBI.BigInt(inputAmount.mul(reserves.denominator.toString()).div(reserves.numerator.toString()).toString())
                        console.log(amount1)
                        const pairedAmount = new TokenAmount(token1, amount1)
                        return {...state, token0Amount: amount, token1Amount: pairedAmount}
                    } else {
                        // using the entry calcul the rate of the second token
                        const amount0 = JSBI.BigInt(inputAmount.mul(reserves.numerator.toString()).div(reserves.denominator.toString()).toString())
                        const pairedAmount = new TokenAmount(token0, amount0)
                        return {...state, token0Amount: pairedAmount, token1Amount: amount}
                    }
                // If pool in not created and there is no entries
                } else if (inputAmount.toString() === "" && state.isPool) {
                    return {...state, token0Amount: undefined, token1Amount: undefined}
                } else {
                    const amount = token1 && token0 && new TokenAmount(inputId ? token1 : token0, JSBI.BigInt(inputAmount))
                    return inputId ? {...state, token1Amount: amount} : {...state, token0Amount: amount};
            }
            } catch (error) {
                console.log(error)
                return {...state, token1Amount: undefined, token0Amount: undefined}         
            }

        case "SET_PAIR":
            if (token0 && token1) {
                const pair = new Pair(
                    new TokenAmount(token0, ethers.utils.parseEther(token0Amount?.toExact() ?? '0').toString()),
                    new TokenAmount(token1, ethers.utils.parseEther(token1Amount?.toExact() ?? '0').toString()),
                    );
                return  {...state, pair: pair}
            } else {
                return {...state}
            }
        
        case "SET_ISPOOL":
            return {...state, isPool: action.payload.isPool};
        
        case "SET_RESERVES":
            return {...state, reserves: action.payload.reserves};
        
        case "SET_APPROVED":
            return {...state, isApproved: action.payload.isApproved};
            
      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }