import { Token } from "gotchiw3s-sdk"
import { Web3ReactContextInterface } from "@web3-react/core/dist/types"
import { GlobalConst } from "../../Constants"
import { approveTx } from "../Smart-contracts/approve"
import { addLiquidityETH, addLiquidityTx } from "../Smart-contracts/addLiquidity"
import { removeLiquidityETHTx, removeLiquidityTx} from "../Smart-contracts/removeLiquidity"
import { ContractContextType } from "../../Provider/ContractProvider"
import { SwapContextType } from "../../Provider/SwapProvider"
import { PoolContextType } from "../../Provider/PoolsProvider"
import { PoolCardContextType } from "../../Models"

export const handleApproveTx = async(token: Token, contract: ContractContextType, context: SwapContextType | PoolContextType | PoolCardContextType, toast: any) => {
    context.dispatch({type: "APPROVING", payload: {address: token.address}})
    approveTx({
        erc20: contract.ERC20!,
        spender: contract.router2!.address,
        amount: GlobalConst.utils.MAX_INT,
        token: token,
        toast: toast,
    })
    .then(() => context.dispatch({type: "APPROVED", payload: {address: token.address, state: true}}))
    .catch(() => context.dispatch({type: "APPROVED", payload: {address: token.address, state: false}}))
}

export const handleAddLiquidityTx = async (
    signer: Web3ReactContextInterface<any>, 
    contract: ContractContextType, 
    context: PoolCardContextType, 
    toast: any
    ) => {
    const {tokenA, tokenB, pair} = context.pool

    context.dispatch({type: "LOADING", payload: true})
    if (tokenA.token.address === GlobalConst.addresses.WMATIC || tokenB.token.address === GlobalConst.addresses.WMATIC) {
        await addLiquidityETH({
            router2: contract.router2!,
            tokenA: tokenA,
            tokenB: tokenB,
            to: signer.account!,
            toast: toast,
        }, signer.library)

        context.dispatch({type: "LOADING", payload: false})
        context.dispatch({type: "RESET_ADD"})
    } else {
        await addLiquidityTx({
            router2: contract.router2,
            pair: pair,
            amount0: tokenA.inputAdd.amount!,
            amount1: tokenB.inputAdd.amount!,
            userAddress: signer.account!,
            toast: toast,
        }, signer.library)

        context.dispatch({type: "LOADING", payload: false})
        context.dispatch({type: "RESET_ADD"})
    }
}

export const handleRemoveLiquidityTx = async(
    signer: Web3ReactContextInterface<any>, 
    contract: ContractContextType, 
    context: PoolCardContextType, 
    toast: any
    ) => {
    const {tokenA, tokenB, pair, lpToken} = context.pool

    context.dispatch({type: "LOADING", payload: true})
    if (tokenA.token.address === GlobalConst.addresses.WMATIC || tokenB.token.address === GlobalConst.addresses.WMATIC) {
        await removeLiquidityETHTx({
            router2: contract.router2!,
            lp: lpToken,
            tokenA: tokenA,
            tokenB: tokenB,
            to: signer.account!,
            toast: toast,
        }, signer.library)

        context.dispatch({type: "LOADING", payload: false})
        context.dispatch({type: "RESET_REMOVE"})
    } else {
        await removeLiquidityTx({
            router2: contract.router2!,
            pair: pair,
            liquidityAmount: lpToken.lpRemoveInput.amount!,
            amountAOut: tokenA.inputRemove.amount!,
            amountBOut: tokenB.inputRemove.amount!,
            userAddress: signer.account!,
            toast: toast,
        }, signer.library)

        context.dispatch({type: "LOADING", payload: false})
        context.dispatch({type: "RESET_REMOVE"})
    }
}
