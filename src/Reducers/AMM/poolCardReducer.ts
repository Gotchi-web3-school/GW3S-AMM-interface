import { TokenAmount, JSBI, Percent} from "gotchiw3s-sdk";
import { FixedNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { IPool } from "../../Models"

export const poolCardReducer = (state: IPool, action: any): IPool => {
    let {isPool, tokenA, tokenB, totalReserves, lpToken, loading, isFetchingPool } = state;

    // POOLS COMPONENT
    switch(action.type) {
        
        case "SET_ISPOOL":
            if (action.payload.isPool) {
                isPool = action.payload.isPool
                lpToken.token = action.payload.lp
            } else {
                isPool = action.payload.isPool
            }
            return {...state, lpToken: lpToken, isPool: isPool, isFetchingPool: action.payload.isFetchingPool};
        
        case "SET_POOL_BALANCE":
           lpToken.balance = action.payload.balance
           tokenA.pooled = action.payload.amountA
           tokenB.pooled = action.payload.amountB
           lpToken.share = action.payload.share
           totalReserves = action.payload.reserves
            //const TokenABalance = new TokenAmount(action.payload.token , ethers.utils.parseEther(action.payload.amount).toString())
            return {...state, lpToken: lpToken, tokenA: tokenA, tokenB: tokenB, totalReserves: totalReserves}

        case "FETCH_POOL_BALANCE":
            isFetchingPool = action.payload
            return {...state, isFetchingPool: isFetchingPool}
        
        case "SET_POOL_TOKEN_BALANCE":
            tokenA.balance = action.payload.tokenA
            tokenB.balance = action.payload.tokenB
        return {...state, tokenA: tokenA, tokenB: tokenB}

        case "LOADING":
            loading = action.payload
            return {...state, loading: loading}
        
        case "SEARCH_APPROVED":
            if (action.payload.id === 0) {
                tokenA.isApproved = action.payload.isApproved.tokenA
                tokenB.isApproved = action.payload.isApproved.tokenB
            } else {
                lpToken.isApproved = action.payload
            }
            return {...state, tokenA: tokenA, tokenB: tokenB, lpToken: lpToken}

        case "APPROVING":
            if (action.payload.address === tokenA.token.address)
            tokenA.loading = true
        else if (action.payload.address === tokenB.token.address)
            tokenB.loading = true
        else if (action.payload.address === lpToken.token?.address) {
            lpToken.loading = true
        }
        return {...state, tokenA: tokenA, tokenB: tokenB, lpToken: lpToken}
        
        case "APPROVED":
            if (action.payload.address === tokenA.token.address) {
                tokenA.isApproved = action.payload.state
                tokenA.loading = false
            }
            else if (action.payload.address === tokenB.token.address) {
                tokenB.isApproved = action.payload.state
                tokenB.loading = false
            }
            else if (action.payload.address === lpToken.token?.address) {
                lpToken.isApproved = action.payload.state
                lpToken.loading = false
            }
            return {...state, tokenA: tokenA, tokenB: tokenB, lpToken: lpToken}

        case 'HANDLE_INPUTS':
            const inputId = action.payload.id;
            try {
                // Take the entry of user and put it to a big Number
                const inputAmount = parseEther(FixedNumber.from(action.payload.amount, 18).toString());
                // If pool is already created
                if (isPool && inputAmount.gt('0')) {
                    if (inputId === 0) {
                        tokenA.inputAdd.amount = new TokenAmount(tokenA.token, JSBI.BigInt(inputAmount))
                        tokenA.inputAdd.input = action.payload.amount
                        // using the inputA, calcul the rate of the second token
                        const amount1 = JSBI.BigInt(inputAmount.mul(totalReserves.tokenB.raw.toString()).div(totalReserves.tokenA.raw.toString()).toString())
                        tokenB.inputAdd.amount = new TokenAmount(tokenB.token, amount1)
                        tokenB.inputAdd.input = tokenB.inputAdd.amount.toExact()
                        return {...state, tokenA: tokenA, tokenB: tokenB}
                    } else {
                        tokenB.inputAdd.amount = new TokenAmount(tokenB.token, JSBI.BigInt(inputAmount))
                        tokenB.inputAdd.input = action.payload.amount
                        // using the inputB: calcul the rate of the second token
                        const amount0 = JSBI.BigInt(inputAmount.mul(totalReserves.tokenA.raw.toString()).div(totalReserves.tokenB.raw.toString()).toString())
                        tokenA.inputAdd.amount = new TokenAmount(tokenA.token, amount0)
                        tokenA.inputAdd.input = tokenA.inputAdd.amount.toExact()
                        return {...state, tokenA: tokenA, tokenB: tokenB}
                    }
                // If pool in not created and there is no entries
                } else if (action.payload.length === 0) {
                    tokenA.inputAdd.input = undefined
                    tokenA.inputAdd.amount = undefined
                    tokenB.inputAdd.input = undefined
                    tokenB.inputAdd.amount = undefined
                    return {...state, tokenA: tokenA, tokenB: tokenB}
                } else {
                    if (inputId === 0) {
                        tokenA.inputAdd.amount =  new TokenAmount(tokenA.token, JSBI.BigInt(inputAmount))
                        tokenA.inputAdd.input = action.payload.amount
                        return {...state, tokenA: tokenA}
                    } else {
                        tokenB.inputAdd.amount =  new TokenAmount(tokenB.token, JSBI.BigInt(inputAmount))
                        tokenB.inputAdd.input = action.payload.amount
                        return {...state, tokenB: tokenB}
                    }
                }
            } catch (error) {
                console.log(error)
                if (inputId === 0) {
                    tokenA.inputAdd.input = action.payload.amount
                    tokenA.inputAdd.amount = undefined
                    return {...state, tokenA: tokenA}
                } else {
                    tokenB.inputAdd.input = action.payload.amount
                    tokenB.inputAdd.amount = undefined
                    return {...state, tokenB: tokenB}
                }
            }
        case 'HANDLE_REMOVE_INPUTS':
            try {
                if (lpToken.balance?.greaterThan("0")) {

                    switch(action.payload.type) {
                        case "MAX_BUTTON":
                            tokenA.inputRemove.amount = tokenA.pooled
                            tokenA.inputRemove.input = tokenA.pooled.toExact()
                            tokenB.inputRemove.amount = tokenB.pooled
                            tokenB.inputRemove.input = tokenB.pooled.toExact()
                            lpToken.lpRemoveInput.amount = lpToken.balance
                            lpToken.lpRemoveInput.input = lpToken.balance?.toExact()
                            return {...state, lpToken: lpToken, tokenA: tokenA, tokenB: tokenB}
                        case "SLIDER":
                            lpToken.lpRemoveInput.amount = new TokenAmount(lpToken.token!, lpToken.balance!.multiply(JSBI.BigInt(parseEther((action.payload.value / 100).toString()))).quotient)
                            lpToken.lpRemoveInput.input = lpToken.lpRemoveInput.amount.toExact()
                            tokenA.inputRemove.amount = new TokenAmount(tokenA.token, JSBI.BigInt(parseEther(lpToken.lpRemoveInput.amount.multiply(tokenA.pooled).divide(lpToken.balance!).toFixed(2))))
                            tokenA.inputRemove.input = tokenA.inputRemove.amount.toExact()
                            tokenB.inputRemove.amount = new TokenAmount(tokenB.token, JSBI.BigInt(parseEther(lpToken.lpRemoveInput.amount.multiply(tokenB.pooled).divide(lpToken.balance!).toFixed(2))))
                            tokenB.inputRemove.input = tokenB.inputRemove.amount.toExact()
                            return {...state, lpToken: lpToken, tokenA: tokenA, tokenB: tokenB}
                        case "LP_INPUT":
                            if (parseFloat(action.payload.value.amount) > 0) {
                                lpToken.lpRemoveInput.amount = new TokenAmount(lpToken.token!, JSBI.BigInt(parseEther(action.payload.value.amount)))
                                lpToken.lpRemoveInput.input = lpToken.lpRemoveInput.amount.toExact()
                                tokenA.inputRemove.amount = new TokenAmount(tokenA.token, JSBI.BigInt(parseEther(lpToken.lpRemoveInput.amount.multiply(tokenA.pooled).divide(lpToken.balance!).toSignificant(4))))
                                tokenA.inputRemove.input = tokenA.inputRemove.amount.toExact()
                                tokenB.inputRemove.amount = new TokenAmount(tokenB.token, JSBI.BigInt(parseEther(lpToken.lpRemoveInput.amount.multiply(tokenB.pooled).divide(lpToken.balance!).toSignificant(4))))
                                tokenB.inputRemove.input = tokenB.inputRemove.amount.toExact()
                            } else if (action.payload.value.amount.length === 0) {
                                lpToken.lpRemoveInput.amount = undefined
                                lpToken.lpRemoveInput.input = undefined
                                tokenA.inputRemove.amount = undefined
                                tokenA.inputRemove.input = undefined
                                tokenB.inputRemove.amount = undefined
                                tokenB.inputRemove.input = undefined
                            } else {
                                lpToken.lpRemoveInput.amount =  undefined
                                lpToken.lpRemoveInput.input = action.payload.value.amount
                            }
                            return {...state, lpToken: lpToken, tokenA: tokenA, tokenB: tokenB}
                            case "TOKEN_A_INPUT":
                                if (parseFloat(action.payload.value.amount) > 0) {
                                    lpToken.lpRemoveInput.amount = new TokenAmount(lpToken.token!, lpToken.balance!.multiply(JSBI.BigInt(parseEther(action.payload.value.amount))).divide(tokenA.pooled!).quotient)
                                    lpToken.lpRemoveInput.input = lpToken.lpRemoveInput.amount.toExact()
                                    tokenA.inputRemove.amount = new TokenAmount(tokenA.token, JSBI.BigInt(parseEther(action.payload.value.amount)))
                                    tokenA.inputRemove.input = tokenA.inputRemove.amount.toExact() 
                                    tokenB.inputRemove.amount = new TokenAmount(tokenB.token, JSBI.BigInt(parseEther(lpToken.lpRemoveInput.amount.multiply(tokenB.pooled).divide(lpToken.balance!).toSignificant(4))))
                                    tokenB.inputRemove.input =  tokenB.inputRemove.amount.toExact()
                                } else if (action.payload.value.amount.length === 0) {
                                    lpToken.lpRemoveInput.amount = undefined
                                    lpToken.lpRemoveInput.input = undefined
                                    tokenA.inputRemove.amount = undefined
                                    tokenA.inputRemove.input = undefined
                                    tokenB.inputRemove.amount = undefined
                                    tokenB.inputRemove.input = undefined
                                } else {
                                    tokenA.inputRemove.amount =  undefined
                                    tokenA.inputRemove.input = action.payload.value.amount
                                }
                            return {...state, lpToken: lpToken, tokenA: tokenA, tokenB: tokenB}
                        case "TOKEN_B_INPUT":
                            if (parseFloat(action.payload.value.amount) > 0) {
                                    lpToken.lpRemoveInput.amount = new TokenAmount(lpToken.token!, lpToken.balance!.multiply(JSBI.BigInt(parseEther(action.payload.value.amount))).divide(tokenB.pooled!).quotient)
                                    lpToken.lpRemoveInput.input = lpToken.lpRemoveInput.amount.toExact()
                                    tokenA.inputRemove.amount = new TokenAmount(tokenA.token, JSBI.BigInt(parseEther(lpToken.lpRemoveInput.amount.multiply(tokenA.pooled).divide(lpToken.balance!).toSignificant(4))))
                                    tokenA.inputRemove.input =  tokenA.inputRemove.amount.toExact()
                                    tokenB.inputRemove.amount = new TokenAmount(tokenB.token, JSBI.BigInt(parseEther(action.payload.value.amount)))
                                    tokenB.inputRemove.input = tokenB.inputRemove.amount.toExact()
                            } else if (action.payload.value.amount.length === 0) {
                                lpToken.lpRemoveInput.amount = undefined
                                lpToken.lpRemoveInput.input = undefined
                                tokenA.inputRemove.amount = undefined
                                tokenA.inputRemove.input = undefined
                                tokenB.inputRemove.amount = undefined
                                tokenB.inputRemove.input = undefined
                            } else {
                                tokenB.inputRemove.amount =  undefined
                                tokenB.inputRemove.input = action.payload.value.amount
                            }
                            return {...state, lpToken: lpToken, tokenA: tokenA, tokenB: tokenB}
                        default:
                            throw new Error(`Unsupported action type ${action.type} in userReducer/HANDLE_REMOVE_INPUTS `)
                    }
                } else {
                    return {...state}
                }
            } catch (error) {
                if (action.payload.id === 0) {
                    lpToken.lpRemoveInput.input = action.payload.value.amount
                    lpToken.lpRemoveInput.amount = undefined
                } else if (action.payload.id === 1) {
                    tokenA.inputRemove.input = action.payload.value.amount
                    tokenA.inputRemove.amount = undefined
                } else {
                    tokenB.inputRemove.input = action.payload.value.amount
                    tokenB.inputRemove.amount = undefined
                }
                return {...state, tokenA: tokenA, tokenB: tokenB, lpToken: lpToken}
            }

        case "REFRESH":
            lpToken.balance = undefined
            tokenA.balance = undefined
            tokenB.balance = undefined
            tokenA.inputAdd.amount = undefined
            tokenA.inputAdd.input = undefined
            tokenB.inputAdd.amount = undefined
            tokenB.inputAdd.input = undefined
            tokenA.inputRemove.amount = undefined
            tokenA.inputRemove.input = undefined
            tokenB.inputRemove.amount = undefined
            tokenB.inputRemove.input = undefined
            lpToken.lpRemoveInput.amount = undefined
            lpToken.lpRemoveInput.input = undefined
            lpToken.share = new Percent("0", "100")
            tokenA.pooled = new TokenAmount(tokenA.token, "0")
            tokenB.pooled = new TokenAmount(tokenA.token, "0")
            totalReserves = {
                tokenA: new TokenAmount(tokenA.token, "0"), 
                tokenB: new TokenAmount(tokenB.token, "0")
            }
            isPool = undefined
            isFetchingPool = true
            return {...state, isPool: isPool, lpToken: lpToken, tokenA: tokenA, tokenB: tokenB, totalReserves: totalReserves, isFetchingPool: isFetchingPool}

        case "RESET_ADD":
            tokenA.balance = undefined
            tokenB.balance = undefined
            tokenA.inputAdd.amount = undefined
            tokenA.inputAdd.input = undefined
            tokenB.inputAdd.amount = undefined
            tokenB.inputAdd.input = undefined
            lpToken.balance = undefined
            isPool = undefined
            return {...state, isPool: isPool, lpToken: lpToken, tokenA: tokenA}

        case "RESET_REMOVE":
            lpToken.balance = undefined
            tokenA.balance = undefined
            tokenB.balance = undefined
            tokenA.inputRemove.amount = undefined
            tokenA.inputRemove.input = undefined
            tokenB.inputRemove.amount = undefined
            tokenB.inputRemove.input = undefined
            lpToken.lpRemoveInput.amount = undefined
            lpToken.lpRemoveInput.input = undefined
            lpToken.balance = undefined
            isPool = undefined
            return {...state, isPool: isPool, lpToken: lpToken, tokenA: tokenA}

      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }