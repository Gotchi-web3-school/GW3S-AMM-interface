/* eslint-disable no-multi-str */
import {Percent, JSBI, Token} from "gotchiw3s-sdk"
import { Pool } from "../Models";

export enum TxnType {
  SWAP,
  ADD,
  REMOVE,
}

// Diamond GW3S
export const DIAMOND_ADDRESS = "0x0Ee37BeDf7FE3873DA77b0CF6Bc17dD8E76c6be7" 

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
    WMATIC: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
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
  new Token( 80001, `${GlobalConst.addresses.WMATIC}`, 18, "MATIC", "Matic native"),
  new Token( 80001, "0xd9f1F89Ee60F1D1B7E78F11641C1B1b7dAED2b39", 18, "GHST", "GW3S Aavegotchi GHST Token"),
  new Token( 80001, "0x6899A3f3120f1931EA7E6eECAa39C06cE6AbD0B7", 18, "DAI", "GW3S Dai Stablecoin"),
  new Token( 80001, "0xb91508934d655f54dC1D73F38b23d43d6Db99D8b", 18, "ETH", "GW3S Ether"),
  new Token( 80001, "0xB0931B18B42B7F47309Eeba8510345E0f76E75A5", 18, "FUD", "GW3S Aavegotchi FUD"),
  new Token( 80001, "0x46Ef0438a11B19F862AD620a4E3f56b43aEC7D2F", 18, "FOMO", "GW3S Aavegotchi FOMO"),
  new Token( 80001, "0x7c57071637AEd48D1Ba6c314d02292c191e9bBb1", 18, "ALPHA", "GW3S Aavegotchi ALPHA"),
  new Token( 80001, "0x0CD99CcA64ba23C41a721904dbED434507E49bE3", 18, "KEK", "GW3S Aavegotchi KEK"),
  new Token( 80001, "0xa32335BE3aC8404F8f0C154de3973300c3B4F72C", 18, "AAVE", "GW3S Aave"),
  new Token( 80001, "0xf53360819aCc346edaaa162B7d9bde1f94F75e73", 18, "UNI", "GW3S Uniswap"),
  new Token( 80001, "0xEA1108D014C4c3f50AA398399740Dc42345859BE", 18, "USDC", "GW3S USD Coin"),
  new Token( 80001, "0x046787F8470e4063f2658D82536521b8E50627A1", 18, "USDT", "GW3S Tether USD"),
  new Token( 80001, "0xa09286a5a2b788baAd6585bbd38aBDA120e61A20", 18, "WBTC", "GW3S Wrapped Bitcoin"),
  new Token( 80001, "0x4327fB634A82BdB310De0F0FDac2c937Dcc82127", 18, "LINK", "ChainLink Token"),
]

export const DEFAULT_LOGOS = [
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png",
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
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png",
]

export const DEFAULT_POOLS = [
  new Pool(0, "MATIC - GHST", DEFAULT_TOKENS[0], DEFAULT_TOKENS[1],  FACTORY_ADDRESS, INIT_CODE_HASH,  {tokenA: DEFAULT_LOGOS[0], tokenB: DEFAULT_LOGOS[1]}),
  new Pool(1, "GHST - DAI", DEFAULT_TOKENS[1], DEFAULT_TOKENS[2],  FACTORY_ADDRESS, INIT_CODE_HASH,  {tokenA: DEFAULT_LOGOS[1], tokenB: DEFAULT_LOGOS[2]}),
  new Pool(2, "GHST - WETH", DEFAULT_TOKENS[1], DEFAULT_TOKENS[3],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[1], tokenB: DEFAULT_LOGOS[3]}),
  new Pool(3, "GHST - FUD", DEFAULT_TOKENS[1], DEFAULT_TOKENS[4],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[1], tokenB: DEFAULT_LOGOS[4]}),
  new Pool(4, "GHST - FOMO", DEFAULT_TOKENS[1], DEFAULT_TOKENS[5],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[1], tokenB: DEFAULT_LOGOS[5]}),
  new Pool(5, "GHST - ALPHA", DEFAULT_TOKENS[1], DEFAULT_TOKENS[6],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[1], tokenB: DEFAULT_LOGOS[6]}),
  new Pool(6, "GHST - KEK", DEFAULT_TOKENS[1], DEFAULT_TOKENS[7],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[1], tokenB: DEFAULT_LOGOS[7]}),
  new Pool(7, "GHST - AAVE", DEFAULT_TOKENS[1], DEFAULT_TOKENS[8],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[1], tokenB: DEFAULT_LOGOS[8]}),
  new Pool(8, "GHST - UNI", DEFAULT_TOKENS[1], DEFAULT_TOKENS[9],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[1], tokenB: DEFAULT_LOGOS[9]}),
  new Pool(9, "GHST - USDC", DEFAULT_TOKENS[1], DEFAULT_TOKENS[10],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[1], tokenB: DEFAULT_LOGOS[10]}),
  new Pool(10, "GHST - USDT", DEFAULT_TOKENS[1], DEFAULT_TOKENS[11],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[1], tokenB: DEFAULT_LOGOS[11]}),
  new Pool(11, "GHST - WBTC", DEFAULT_TOKENS[1], DEFAULT_TOKENS[12],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[1], tokenB: DEFAULT_LOGOS[12]}),
  new Pool(12, "GHST - LINK", DEFAULT_TOKENS[1], DEFAULT_TOKENS[13],  FACTORY_ADDRESS, INIT_CODE_HASH, {tokenA: DEFAULT_LOGOS[1], tokenB: DEFAULT_LOGOS[13]}),
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

export const byteCode = {
  gw3sErc20: "60806040523480156200001157600080fd5b5060405162000cb538038062000cb583398101604081905262000034916200022b565b828260036200004483826200032c565b5060046200005382826200032c565b5050506200006833826200007160201b60201c565b5050506200041f565b6001600160a01b038216620000cc5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620000e09190620003f8565b90915550506001600160a01b038216600090815260208190526040812080548392906200010f908490620003f8565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200018657600080fd5b81516001600160401b0380821115620001a357620001a36200015e565b604051601f8301601f19908116603f01168101908282118183101715620001ce57620001ce6200015e565b81604052838152602092508683858801011115620001eb57600080fd5b600091505b838210156200020f5785820183015181830184015290820190620001f0565b83821115620002215760008385830101525b9695505050505050565b6000806000606084860312156200024157600080fd5b83516001600160401b03808211156200025957600080fd5b620002678783880162000174565b945060208601519150808211156200027e57600080fd5b506200028d8682870162000174565b925050604084015190509250925092565b600181811c90821680620002b357607f821691505b602082108103620002d457634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200015957600081815260208120601f850160051c81016020861015620003035750805b601f850160051c820191505b8181101562000324578281556001016200030f565b505050505050565b81516001600160401b038111156200034857620003486200015e565b62000360816200035984546200029e565b84620002da565b602080601f8311600181146200039857600084156200037f5750858301515b600019600386901b1c1916600185901b17855562000324565b600085815260208120601f198616915b82811015620003c957888601518255948401946001909101908401620003a8565b5085821015620003e85787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600082198211156200041a57634e487b7160e01b600052601160045260246000fd5b500190565b610886806200042f6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461012357806370a082311461013657806395d89b411461015f578063a457c2d714610167578063a9059cbb1461017a578063dd62ed3e1461018d57600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b66101a0565b6040516100c391906106c4565b60405180910390f35b6100df6100da366004610735565b610232565b60405190151581526020016100c3565b6002545b6040519081526020016100c3565b6100df61010f36600461075f565b61024a565b604051601281526020016100c3565b6100df610131366004610735565b61026e565b6100f361014436600461079b565b6001600160a01b031660009081526020819052604090205490565b6100b6610290565b6100df610175366004610735565b61029f565b6100df610188366004610735565b61031f565b6100f361019b3660046107bd565b61032d565b6060600380546101af906107f0565b80601f01602080910402602001604051908101604052809291908181526020018280546101db906107f0565b80156102285780601f106101fd57610100808354040283529160200191610228565b820191906000526020600020905b81548152906001019060200180831161020b57829003601f168201915b5050505050905090565b600033610240818585610358565b5060019392505050565b60003361025885828561047c565b6102638585856104f6565b506001949350505050565b600033610240818585610281838361032d565b61028b919061082a565b610358565b6060600480546101af906107f0565b600033816102ad828661032d565b9050838110156103125760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6102638286868403610358565b6000336102408185856104f6565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166103ba5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610309565b6001600160a01b03821661041b5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610309565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000610488848461032d565b905060001981146104f057818110156104e35760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610309565b6104f08484848403610358565b50505050565b6001600160a01b03831661055a5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610309565b6001600160a01b0382166105bc5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610309565b6001600160a01b038316600090815260208190526040902054818110156106345760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610309565b6001600160a01b0380851660009081526020819052604080822085850390559185168152908120805484929061066b90849061082a565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106b791815260200190565b60405180910390a36104f0565b600060208083528351808285015260005b818110156106f1578581018301518582016040015282016106d5565b81811115610703576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461073057600080fd5b919050565b6000806040838503121561074857600080fd5b61075183610719565b946020939093013593505050565b60008060006060848603121561077457600080fd5b61077d84610719565b925061078b60208501610719565b9150604084013590509250925092565b6000602082840312156107ad57600080fd5b6107b682610719565b9392505050565b600080604083850312156107d057600080fd5b6107d983610719565b91506107e760208401610719565b90509250929050565b600181811c9082168061080457607f821691505b60208210810361082457634e487b7160e01b600052602260045260246000fd5b50919050565b6000821982111561084b57634e487b7160e01b600052601160045260246000fd5b50019056fea26469706673582212208d7eb18a7222f1fa532fbf9189b79d72c5bd7b8e7e9706235294391a4e5a9edf64736f6c634300080f0033"
}