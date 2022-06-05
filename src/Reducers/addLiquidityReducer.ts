import { AddLiquidity } from "../Models"
import { Token, TokenAmount, JSBI, Pair } from "quickswap-sdk"
import { ethers } from "ethers"

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
            const inputId = action.payload.id;
            const inputAmount = action.payload.amount;
            try {
                if (isPool && token1 && token0 && parseFloat(inputAmount) > 0) {
                    const amount = new TokenAmount(inputId ? token1 : token0, JSBI.BigInt(ethers.utils.parseEther(inputAmount)))
                    if (inputId) {
                        const pairedAmount = new TokenAmount(token0, amount.multiply(reserves.numerator).divide(reserves.denominator).quotient)
                        const pairedInputAmount = amount.multiply(reserves.numerator).divide(reserves.denominator).toSignificant(18)
                        return {
                            ...state,
                            token0Amount: {value: pairedInputAmount, bigAmount: pairedAmount},
                            token1Amount: {value: inputAmount, bigAmount: amount},
                        }
                    } else {
                        const pairedAmount = new TokenAmount(token1, JSBI.BigInt(ethers.utils.parseEther(amount.multiply(reserves.denominator).divide(reserves.numerator).quotient.toString())))
                        const pairedInputAmount = amount.multiply(reserves.denominator).divide(reserves.numerator).toSignificant(18)
                        return {
                            ...state,
                            token0Amount: {value: inputAmount, bigAmount: amount},
                            token1Amount: {value: pairedInputAmount, bigAmount: pairedAmount},
                        }
                    }
                } else if (inputAmount === "" && state.isPool) {
                return {
                    ...state,
                    token0Amount: undefined,
                    token1Amount: undefined,
                }
            } else {
               return inputId ? {...state, token1Amount: {value: inputAmount || undefined, bigAmount: undefined}} : {...state, token0Amount: {value: inputAmount || undefined, bigAmount: undefined}};
            }
            } catch (error) {
                return {...state}         
            }

        case "SET_PAIR":
            if (token0 && token1) {
                const pair = new Pair(
                    new TokenAmount(token0, ethers.utils.parseEther(token0Amount?.value ?? '0').toString()),
                    new TokenAmount(token1, ethers.utils.parseEther(token1Amount?.value ?? '0').toString()),
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