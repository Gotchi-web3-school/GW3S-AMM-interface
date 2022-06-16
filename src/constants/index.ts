/* eslint-disable no-multi-str */
import {Percent, JSBI, Token} from "quickswap-sdk"
import { Pool } from "../Models";

export enum TxnType {
  SWAP,
  ADD,
  REMOVE,
}

// Test Factory
//export const FACTORY_ADDRESS = "0x47c293A0523a62afd22b4E29105E73F28d197892"

// MY Factory + Router (mumbai)
export const FACTORY_ADDRESS = '0x65899Dc47C2a9C91a06b055C58426d51cC0543BB' 
export const ROUTER_ADDRESS = '0xda45E58e16592ff992b338B65Ce315857dF1AB8A'

// QUICKSWAP Factory + Router (mumbai)
//export const FACTORY_ADDRESS = '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
//export const ROUTER_ADDRESS = '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
export const INIT_CODE_HASH = "0xaae7dc513491fb17b541bd4a9953285ddf2bb20a773374baecc88c4ebada0767"

export const GlobalConst = {
  addresses: {
    ZERO_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
  utils: {
    MAX_INT: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    QUICK_CONVERSION_RATE: 1000,
    ONEDAYSECONDS: 60 * 60 * 24,
    DQUICKFEE: 0.04,
    DQUICKAPR_MULTIPLIER: 0.01,
    ROWSPERPAGE: 10,
    FEEPERCENT: 0.003,
    BUNDLE_ID: '1',
    PROPOSAL_LENGTH_IN_DAYS: 7, // TODO this is only approximate, it's actually based on blocks
    NetworkContextName: 'NETWORK',
    INITIAL_ALLOWED_SLIPPAGE: "50", // default allowed slippage, in bips
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
};

export const DEFAULT_TOKENS = [
  new Token( 80001, "0x8086A8fC26e6305bAD05E9347fb14c993c840814", 18, "GHST", "GW3S Aavegotchi GHST Token"),
  new Token( 80001, "0x9E3bcc9CB64f808cD9F771978D591a15625625E6", 18, "DAI", "GW3S Dai Stablecoin"),
  new Token( 80001, "0x71D6Ec51a5FB485A6Cdf67dC6D3f1e92D6b89bf1", 18, "ETH", "GW3S Ether"),
  new Token( 80001, "0x5619C0127CFF69FA1c371B81CcD7BC19423AB886", 18, "FUD", "GW3S Aavegotchi FUD"),
  new Token( 80001, "0x084a0dD72D769d6f015590D29D125f0884DefC41", 18, "FOMO", "GW3S Aavegotchi FOMO"),
  new Token( 80001, "0xC9258d7c67eEbD9490f352B04E211fD2D8999e2c", 18, "ALPHA", "GW3S Aavegotchi ALPHA"),
  new Token( 80001, "0x08B3933C662B1ea64f8A1B0465ceBEbb53C4d564", 18, "KEK", "GW3S Aavegotchi KEK"),
  new Token( 80001, "0x240c7dc7C2Fb064f0852289F0b756a46FA0fc335", 18, "AAVE", "GW3S Aave"),
  new Token( 80001, "0xAb11F2308db8ac43703A4d1846c56030E6b61AE1", 18, "UNI", "GW3S Uniswap"),
  new Token( 80001, "0x1080E133779343e7Cb90bB94a750A7067304791A", 18, "USDC", "GW3S USD Coin"),
  new Token( 80001, "0x5D116F9aAe59b7c35be7a377E7140fb7C337F285", 18, "USDT", "GW3S Tether USD"),
  new Token( 80001, "0xC49b0Dd13aa87640Bfa9DCB6B5E84B0453CECBF8", 18, "WMATIC", "GW3S Wrapped Matic"),
  new Token( 80001, "0xa5F7fBF20922185aDcF07c68e30994959e0CB361", 18, "WBTC", "GW3S Wrapped Bitcoin"),
  new Token( 80001, "0x6E074085f4f3030cfb0D4E29789233Dac84a2a3B", 18, "LINK", "ChainLink Token"),
]

export const DEFAULT_LOGOS = [
  "https://wiki.aavegotchi.com/ghst/ghst.gif",
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  "https://assets.coingecko.com/coins/images/24736/small/fud.png?1648769512",
  "https://assets.coingecko.com/coins/images/24737/small/fomo.png?1648769659",
  "https://assets.coingecko.com/coins/images/24738/small/alpha.png?1648769768",
  "https://assets.coingecko.com/coins/images/24739/small/kek.png?1648769879",
  "https://etherscan.io/token/images/aave_32.png",
  "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=022",
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png",
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png",
]

export const DEFAULT_POOLS = [
  new Pool(0, "GHST - DAI", DEFAULT_TOKENS[0], DEFAULT_TOKENS[1],  FACTORY_ADDRESS, INIT_CODE_HASH,  {tokenA: DEFAULT_LOGOS[0], tokenB: DEFAULT_LOGOS[1]}),
  new Pool(1, "GHST - WETH", DEFAULT_TOKENS[0], DEFAULT_TOKENS[2],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[0], tokenB: DEFAULT_LOGOS[2]}),
  new Pool(2, "GHST - FUD", DEFAULT_TOKENS[0], DEFAULT_TOKENS[3],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[0], tokenB: DEFAULT_LOGOS[3]}),
  new Pool(3, "GHST - FOMO", DEFAULT_TOKENS[0], DEFAULT_TOKENS[4],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[0], tokenB: DEFAULT_LOGOS[4]}),
  new Pool(4, "GHST - ALPHA", DEFAULT_TOKENS[0], DEFAULT_TOKENS[5],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[0], tokenB: DEFAULT_LOGOS[5]}),
  new Pool(5, "GHST - KEK", DEFAULT_TOKENS[0], DEFAULT_TOKENS[6],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[0], tokenB: DEFAULT_LOGOS[6]}),
  new Pool(6, "GHST - AAVE", DEFAULT_TOKENS[0], DEFAULT_TOKENS[7],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[0], tokenB: DEFAULT_LOGOS[7]}),
  new Pool(7, "GHST - UNI", DEFAULT_TOKENS[0], DEFAULT_TOKENS[8],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[0], tokenB: DEFAULT_LOGOS[8]}),
  new Pool(8, "GHST - USDC", DEFAULT_TOKENS[0], DEFAULT_TOKENS[9],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[0], tokenB: DEFAULT_LOGOS[9]}),
  new Pool(9, "GHST - USDT", DEFAULT_TOKENS[0], DEFAULT_TOKENS[10],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[0], tokenB: DEFAULT_LOGOS[10]}),
  new Pool(10, "GHST - WMATIC", DEFAULT_TOKENS[0], DEFAULT_TOKENS[11],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[0], tokenB: DEFAULT_LOGOS[11]}),
  new Pool(11, "GHST - WBTC", DEFAULT_TOKENS[0], DEFAULT_TOKENS[12],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[0], tokenB: DEFAULT_LOGOS[12]}),
  new Pool(12, "GHST - LINK", DEFAULT_TOKENS[0], DEFAULT_TOKENS[13],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[0], tokenB: DEFAULT_LOGOS[13]}),
]

export const abis = {
  erc20: [
    "function balanceOf(address owner) view returns (uint256)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function totalSupply() view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function transfer(address to, uint amount) returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
  ],
  pair: [
    "function name() external pure returns (string memory)",
    "function symbol() external pure returns (string memory)",
    "function decimals() external pure returns (uint8)",
    "function totalSupply() external view returns (uint)",
    "function balanceOf(address owner) external view returns (uint)",
    "function allowance(address owner, address spender) external view returns (uint)",
    "function approve(address spender, uint value) external returns (bool)",
    "function transfer(address to, uint value) external returns (bool)",
    "function transferFrom(address from, address to, uint value) external returns (bool)",
    "function DOMAIN_SEPARATOR() external view returns (bytes32)",
    "function PERMIT_TYPEHASH() external pure returns (bytes32)",
    "function nonces(address owner) external view returns (uint)",
    "function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external",
    "function MINIMUM_LIQUIDITY() external pure returns (uint)",
    "function factory() external view returns (address);",
    "function token0() external view returns (address)",
    "function token1() external view returns (address)",
    "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
    "function price0CumulativeLast() external view returns (uint)",
    "function price1CumulativeLast() external view returns (uint)",
    "function kLast() external view returns (uint)",
    "function mint(address to) external returns (uint liquidity)",
    "function burn(address to) external returns (uint amount0, uint amount1)",
    "function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external",
    "function skim(address to) external",
    "function sync() external",
    "function burn(address to) external returns (uint amount0, uint amount1)",
  ],
  factory: [
    "function getPair(address, address) public view returns (address)",
    "function allPairs(uint) external view returns (address)",
    "function allPairsLength() external view returns (uint)",
    "function feeTo() external view returns (address)",
    "function feeToSetter() external view returns (address)",
    "function createPair(address, address) external returns (address)",
  ],
  router2: [
    "function factory() external pure returns (address)",
    "function WETH() external pure returns (address)",

    "function addLiquidity(\
        address tokenA,\
        address tokenB,\
        uint amountADesired,\
        uint amountBDesired,\
        uint amountAMin,\
        uint amountBMin,\
        address to,\
        uint deadline\
    ) external returns (uint amountA, uint amountB, uint liquidity)",

    "function addLiquidityETH(\
        address token,\
        uint amountTokenDesired,\
        uint amountTokenMin,\
        uint amountETHMin,\
        address to,\
        uint deadline\
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity)",

    "function removeLiquidity(\
        address tokenA,\
        address tokenB,\
        uint liquidity,\
        uint amountAMin,\
        uint amountBMin,\
        address to,\
        uint deadline\
    ) external returns (uint amountA, uint amountB)",

    "function removeLiquidityETH(\
        address token,\
        uint liquidity,\
        uint amountTokenMin,\
        uint amountETHMin,\
        address to,\
        uint deadline\
    ) external returns (uint amountToken, uint amountETH)",

    "function removeLiquidityWithPermit(\
        address tokenA,\
        address tokenB,\
        uint liquidity,\
        uint amountAMin,\
        uint amountBMin,\
        address to,\
        uint deadline,\
        bool approveMax, uint8 v, bytes32 r, bytes32 s\
    ) external returns (uint amountA, uint amountB)",

    "function removeLiquidityETHWithPermit(\
        address token,\
        uint liquidity,\
        uint amountTokenMin,\
        uint amountETHMin,\
        address to,\
        uint deadline,\
        bool approveMax, uint8 v, bytes32 r, bytes32 s\
    ) external returns (uint amountToken, uint amountETH)",

    "function swapExactTokensForTokens(\
        uint amountIn,\
        uint amountOutMin,\
        address[] calldata path,\
        address to,\
        uint deadline\
    ) external returns (uint[] memory amounts)",

    "function swapTokensForExactTokens(\
        uint amountOut,\
        uint amountInMax,\
        address[] calldata path,\
        address to,\
        uint deadline\
    ) external returns (uint[] memory amounts)",

    "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable\
        returns (uint[] memory amounts)",
    "function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) external\
        returns (uint[] memory amounts)",
    "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external\
        returns (uint[] memory amounts)",
    "function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline) external payable\
        returns (uint[] memory amounts)",

    "function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB)",
    "function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut)",
    "function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn)",
    "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)",
    "function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts)",

    // Uniswap Router 2
    "function removeLiquidityETHSupportingFeeOnTransferTokens(\
      address token,\
      uint liquidity,\
      uint amountTokenMin,\
      uint amountETHMin,\
      address to,\
      uint deadline\
  ) external returns (uint amountETH)",

  "function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(\
      address token,\
      uint liquidity,\
      uint amountTokenMin,\
      uint amountETHMin,\
      address to,\
      uint deadline,\
      bool approveMax, uint8 v, bytes32 r, bytes32 s\
  ) external returns (uint amountETH)",

  "function swapExactTokensForTokensSupportingFeeOnTransferTokens(\
      uint amountIn,\
      uint amountOutMin,\
      address[] calldata path,\
      address to,\
      uint deadline\
  ) external",

  "function swapExactETHForTokensSupportingFeeOnTransferTokens(\
      uint amountOutMin,\
      address[] calldata path,\
      address to,\
      uint deadline\
  ) external payable",

  "function swapExactTokensForETHSupportingFeeOnTransferTokens(\
      uint amountIn,\
      uint amountOutMin,\
      address[] calldata path,\
      address to,\
      uint deadline\
  ) external"
  ],
}