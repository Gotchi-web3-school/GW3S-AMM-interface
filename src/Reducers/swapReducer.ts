import { TokenAmount, JSBI, Route, TradeType, Token, Trade, CurrencyAmount } from "gotchiw3s-sdk";
import { ethers, FixedNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { Swap } from "../Models/swap"

export const swapReducer = (state: Swap, action: any): Swap => {
    let {tokenA, tokenB, route, pair, input, output} = state;

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
            return  {...state, pair: action.payload, route: new Route([action.payload], tokenA.token!, tokenB.token), error: false, isPool: true}

        case "SET_ROUTE":
            return  {...state, route: action.payload}

        case "SET_TRADE":
            try {
                const inputCurrency: CurrencyAmount = input.amount!
                return {...state, trade: new Trade(route!, inputCurrency, TradeType.EXACT_INPUT)}
            } catch (error) {
                return {...state}
            }
        
        case "SEARCH_APPROVE":
            tokenA.approve.loading = true
            return {...state, tokenA: tokenA, tokenB: tokenB}

        case "APPROVED":
            tokenA.approve.isApproved = action.payload.token0
            tokenA.approve.loading = false
            tokenB.approve.isApproved = action.payload.token1
            tokenB.approve.loading = false
            return {...state, tokenA: tokenA, tokenB: tokenB}

        case "LOADING":
            return {...state, loading: action.payload}
        
        case "HANDLE_INPUT_A":
            try {
                // Check that we don't go over 18 decimals
                const bigAmount =  parseEther(FixedNumber.from(action.payload, 18).toString());
                if (route && bigAmount.gt('0')) {
                    input.amount = new TokenAmount(tokenA.token!, JSBI.BigInt(bigAmount))
                    input.input = action.payload
                    output.amount = pair!.getOutputAmount(input.amount!)[0]
                    output.input = output.amount.toExact()
                    return {...state, input: input, output: output, error: false}
                }
                else if (action.payload.length === 0)
                    return {...state, input: {amount: undefined, input: undefined}, output: {amount: undefined, input: undefined}, error: false}
                else {
                    input.amount = new TokenAmount(tokenA.token!, JSBI.BigInt("0"))
                    input.input = action.payload
                    return {...state, input: input , output: {amount: undefined, input: undefined}, error: false}
                }

            } catch (error) {
                if (error instanceof Error) {
                    if (error.message.includes("underflow"))
                        return {...state}
                }
                return {...state, input: {amount: undefined, input: action.payload}, output: {amount: undefined, input: undefined}, error: false}
            }

        case "HANDLE_INPUT_B":
            try {
                // Check that we don't go over 18 decimals
                const bigAmount =  parseEther(FixedNumber.from(action.payload, 18).toString());
                if (route && bigAmount.gt('0')) {
                    output.amount = new TokenAmount(tokenB.token!, JSBI.BigInt(bigAmount))
                    output.input = action.payload
                    input.amount = pair!.getInputAmount(output.amount)[0]
                    input.input = input.amount.toExact()
                    return {...state, input: input, output: output, error: false}
                }
                else if (action.payload.length === 0)
                    return {...state, input: {amount: undefined, input: undefined}, output: {amount: undefined, input: undefined}, error: false}
                else {
                    output.amount = new TokenAmount(tokenA.token!, JSBI.BigInt("0"))
                    output.input = action.payload
                    return {...state, input: {amount: undefined, input: undefined}, output: output, error: false}
                }
                
            } catch (error) {
                if (error instanceof Error) {
                    if (error.name === "InsufficientReservesError") {
                        const bigAmount = parseEther(FixedNumber.from(action.payload, 18).toString())
                        output.amount = new TokenAmount(tokenB.token!,  JSBI.BigInt(bigAmount))
                        output.input = output.amount.toExact()
                        return {...state, input: {amount: undefined, input: undefined}, output: output, error: true}
                    }
                    if (error.message.includes("underflow"))
                        return {...state}
                }
                return {...state, input: {amount: undefined, input: undefined}, output: {amount: undefined, input: action.payload}, error: false}
            }

        case "SWAP":
            if (pair && input.amount && output.amount) {
                input.amount = new TokenAmount(tokenB.token!, input.amount.raw)
                try {
                    output.amount = pair.getOutputAmount(input.amount)[0]
                    output.input = output.amount?.toExact()
                } catch (error) {
                    return {...state, tokenA: tokenB, tokenB: tokenA, input: input, output: output, pair: undefined, route: undefined, trade: undefined, error: true}
                }
            }
            return {...state, tokenA: tokenB, tokenB: tokenA, input: input, output: output, pair: undefined, route: undefined, trade: undefined, error: false}
        
        case "SET_PAIR_FAILURE":
            return {...state, error: true, isPool: false, route: undefined, trade: undefined}

        case "EMPTY_INPUT":
            input = {amount: undefined, input: undefined}
            output = {amount: undefined, input: undefined}
            return {...state, input: input, output: output}
        
        case "RESET":
            tokenA.token = new Token(tokenA.token!.chainId, tokenA.token!.address, tokenA.token!.decimals, tokenA.token!.symbol, tokenA.token!.name)
            tokenB.token = new Token(tokenB.token!.chainId, tokenB.token!.address, tokenB.token!.decimals, tokenB.token!.symbol, tokenB.token!.name)
            return {...state, tokenA: tokenA, tokenB: tokenB}

      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }