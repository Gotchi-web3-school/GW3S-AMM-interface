import { Token, TokenAmount, Pair, Route, Percent, JSBI} from "quickswap-sdk"

export enum TxnType {
  SWAP,
  ADD,
  REMOVE,
}

export const GlobalConst = {
  addresses: {
    ROUTER_ADDRESS: '0x140b59f7a73553CA044e7568E3130AF79C2Adc5e',
    FACTORY_ADDRESS: '0xfd550297e1875eA5C4ecc046c23E84CCa29FD437',
    ZERO_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
  utils: {
    QUICK_CONVERSION_RATE: 1000,
    ONEDAYSECONDS: 60 * 60 * 24,
    DQUICKFEE: 0.04,
    DQUICKAPR_MULTIPLIER: 0.01,
    ROWSPERPAGE: 10,
    FEEPERCENT: 0.003,
    BUNDLE_ID: '1',
    PROPOSAL_LENGTH_IN_DAYS: 7, // TODO this is only approximate, it's actually based on blocks
    NetworkContextName: 'NETWORK',
    INITIAL_ALLOWED_SLIPPAGE: 50, // default allowed slippage, in bips
    DEFAULT_DEADLINE_FROM_NOW: 60 * 20, // 20 minutes, denominated in seconds
    BIG_INT_ZERO: JSBI.BigInt(0),
    ONE_BIPS: new Percent(JSBI.BigInt(1), JSBI.BigInt(10000)), // one basis point
    BIPS_BASE: JSBI.BigInt(10000),
    // used to ensure the user doesn't send so much ETH so they end up with <.01
    MIN_ETH: JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)), // .01 ETH
    BETTER_TRADE_LINK_THRESHOLD: new Percent(
      JSBI.BigInt(75),
      JSBI.BigInt(10000),
    ),
  },
};

export const GlobalValue = {
  percents: {
    ALLOWED_PRICE_IMPACT_LOW: new Percent( // used for warning states
      JSBI.BigInt(100),
      GlobalConst.utils.BIPS_BASE,
    ), // 1%
    ALLOWED_PRICE_IMPACT_MEDIUM: new Percent(
      JSBI.BigInt(300),
      GlobalConst.utils.BIPS_BASE,
    ), // 3%
    ALLOWED_PRICE_IMPACT_HIGH: new Percent(
      JSBI.BigInt(500),
      GlobalConst.utils.BIPS_BASE,
    ), // 5%
    PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: new Percent( // if the price slippage exceeds this number, force the user to type 'confirm' to execute
      JSBI.BigInt(1000),
      GlobalConst.utils.BIPS_BASE,
    ), // 10%
    BLOCKED_PRICE_IMPACT_NON_EXPERT: new Percent( // for non expert mode disable swaps above this
      JSBI.BigInt(1500),
      GlobalConst.utils.BIPS_BASE,
    ), // 15%
  },
  tokens: {
    MATIC: new Token(80001, '0xc0FFee0000000000000000000000000000000000', 18, 'WMATIC', 'GW3S  Wrapped Matic'),
    AAVE: new Token(80001, '0x0000000000000000000000000000000000000000', 18, 'WMATIC', 'GW3S  Wrapped Matic'),
    GHST: new Token(80001, '0x0000000000000000000000000000000000000000', 18, 'WMATIC', 'GW3S  Wrapped Matic'),
    MATIC3: new Token(80001, '0x0000000000000000000000000000000000000000', 18, 'WMATIC', 'GW3S  Wrapped Matic'),
    MATIC4: new Token(80001, '0x0000000000000000000000000000000000000000', 18, 'WMATIC', 'GW3S  Wrapped Matic'),
    MATIC5: new Token(80001, '0x0000000000000000000000000000000000000000', 18, 'WMATIC', 'GW3S  Wrapped Matic'),
    MATIC6: new Token(80001, '0x0000000000000000000000000000000000000000', 18, 'WMATIC', 'GW3S  Wrapped Matic'),
  },
};

export const abis = {
  erc20: [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function transfer(address to, uint amount) returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
  ]
}

export const defaultToken = GlobalValue.tokens.MATIC
export const defaultTokenAmount: TokenAmount = new TokenAmount(defaultToken, "0")
export const defaultTokenAmount2: TokenAmount = new TokenAmount(GlobalValue.tokens.AAVE, "10")
export const defaultPair: Pair = new Pair(defaultTokenAmount, defaultTokenAmount2)
export const defaultRoute: Route = new Route([defaultPair], defaultToken)
//export const defaultTrade: Trade =  new Trade(defaultRoute, defaultTokenAmount, TradeType.EXACT_INPUT)
export const defaultPercent: Percent = new Percent("0", "100")

/*
export const defaultPrice: Price = new Price({
  baseAmount: CurrencyAmount.fromRawAmount(defaultToken, 1),
  quoteAmount: CurrencyAmount.fromRawAmount(defaultToken, 54321)
})

export const initialTradeState: Trade = {
    route: defaultRoute,
    amount: defaultTokenAmount,
    tradeType: TradeType.EXACT_INPUT,
    inputAmount: defaultTokenAmount,
    outputAmount: defaultTokenAmount,
    executionPrice: Price,
    nextMidPrice: Price,
    slippage: defaultPercent,
    priceImpact: Price,
    minimumAmountOut: defaultTokenAmount,
    maximumAmountIn: defaultTokenAmount,
}
*/