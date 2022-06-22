import { CurrencyAmount, Token } from "gotchiw3s-sdk"

export const fetchRoutes = async(input: Token, output: Token) => {
    return undefined
}

export const calculFee = (amountIn: CurrencyAmount): string => {
    return amountIn.multiply("3").divide("1000").toSignificant(5)
}


