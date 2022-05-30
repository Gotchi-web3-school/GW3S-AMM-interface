/* eslint-disable no-multi-str */
import {Percent, JSBI} from "quickswap-sdk"

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
};

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