import { AddLiquidity } from "../../Models"
import { Token, TokenAmount, JSBI, Pair } from "gotchiw3s-sdk"
import { ethers, FixedNumber } from "ethers"

export const addLiquidityReducer = (state: AddLiquidity, action: any): AddLiquidity => {
    const {
        token0,
        token0Amount,
        token1,
        token1Amount, 
        isPool, 
        reserves,
        factoryAddress,
        initCode,
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
            const inputId = action.payload.id;
            try {
                // Take the entry of user and put it to a big Number
                const inputAmount = ethers.utils.parseEther(FixedNumber.from(action.payload.amount, 18).toString());
                // If pool is already created
                if (isPool && token1 && token0 && inputAmount.gt('0')) {
                    const amount = new TokenAmount(inputId ? token1 : token0, JSBI.BigInt(inputAmount))
                    if (inputId === 0) {
                        // using the entry calcul the rate of the second token
                        const amount1 = JSBI.BigInt(inputAmount.mul(reserves!.tokenB.toString()).div(reserves!.tokenA.toString()).toString())
                        const pairedAmount = new TokenAmount(token1, amount1)
                        return {...state, token0Amount: amount, token1Amount: pairedAmount}
                    } else {
                        // using the entry calcul the rate of the second token
                        const amount0 = JSBI.BigInt(inputAmount.mul(reserves!.tokenA.toString()).div(reserves!.tokenB.toString()).toString())
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
                if (error instanceof Error) {
                    if (error.message.includes("underflow"))
                        return {...state}
                }
                console.log(error)
                return inputId ? {...state, token0Amount: action.payload.amount, token1Amount: undefined} : {...state, token0Amount: undefined, token1Amount: action.payload.amount};
            }

        case "SET_PAIR":
            if (token0 && token1) {
                const pair = new Pair(
                    new TokenAmount(token0, ethers.utils.parseEther(token0Amount?.toExact() ?? '0').toString()),
                    new TokenAmount(token1, ethers.utils.parseEther(token1Amount?.toExact() ?? '0').toString()),
                    factoryAddress!,
                    initCode!,
                    );
                return  {...state, pair: pair, isApproved: undefined}
            } else {
                return {...state}
            }
        
        case "SET_ISPOOL":
            return {...state, isPool: action.payload.isPool};
        
        case "SET_RESERVES":
            return {...state, reserves: action.payload.reserves};
        
        case "SET_APPROVED":
            return {...state, isApproved: action.payload.isApproved};

        case "RESET":
            const newToken0 = token0 && new Token(token0.chainId, token0.address, token0.decimals, token0.symbol, token0.name)
            const newToken1 = token1 && new Token(token1.chainId, token1.address, token1.decimals, token1.symbol, token1.name)
            return {...state, token0: newToken0, token1: newToken1}
            
      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }