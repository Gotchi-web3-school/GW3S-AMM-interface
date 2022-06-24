import { GlobalConst } from "../../Constants"
import { Token } from "gotchiw3s-sdk"
import { approveTx } from "../Smart-contracts/approve"
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