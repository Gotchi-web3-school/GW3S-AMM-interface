import { CurrencyAmount, Token } from "gotchiw3s-sdk"

export const fetchRoutes = async(input: Token, output: Token) => {
    return undefined
}

export const calculFee = (amountIn: CurrencyAmount): string => {
    return amountIn.multiply("3").divide("1000").toSignificant(5)
}

export const getColorPriceImpact = (amount: string): string => {
    const impact = parseFloat(amount)

    if (impact < 1)
        return "green.500"
    else if (impact >= 1 && impact < 2)
        return "white"
    else if (impact >= 2 && impact < 5)
        return "orange"
    else if (impact >= 5)
        return "red.500"
    
    return "white"
}

