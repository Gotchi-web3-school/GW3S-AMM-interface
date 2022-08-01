export const interfaces = {
    IToken: [
        "function deployToken(string memory name, string memory ticker) external returns(address)",
        `function deployTokenWithFixedSupply(
            string memory name, 
            string memory ticker, 
            uint256 totalSupply, 
            address to
            ) external returns(address)`,
        "function mint(address to, uint256 amount) external",
        "function name() external view returns (string memory)",
        "function symbol() external view returns (string memory)",
        "function decimals() external view returns (uint8)",
        "function totalSupply() external view returns (uint)",
        "function balanceOf(address owner) external view returns (uint)",
        "function allowance(address owner, address spender) external view returns (uint)",
        "function approve(address spender, uint value) external returns (bool)",
        "function transfer(address to, uint value) external returns (bool)",
        "function transferFrom(address from, address to, uint value) external returns (bool)",
        "function transferOwnership(address newOwner) external"
    ],
    IFactory: [
        "function INIT_CODE_HASH() external returns(bytes32)",
        "function feeTo() external returns(address)",
        "function feeToSetter() external returns(address)",
        "function getPair(address, address) external returns(address)",
        "function allPairs(uint) external returns(address)",
        "function allPairsLength() external view returns (uint)", 
        "function deployFactory(address player) external returns(address)",
        "function createPair(address, address) external returns (address)",
        "function setFeeTo(address) external",
        "function setFeeToSetter(address) external"
    ],
    IPair: [
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
    IRouter: [
        `function addLiquidity(
            address tokenA,
            address tokenB,
            uint amountADesired,
            uint amountBDesired,
            uint amountAMin,
            uint amountBMin,
            address to,
            uint deadline,
            address factory
        ) external returns (uint amountA, uint amountB, uint liquidity)`,
        `function addLiquidityETH(
            address token,
            uint amountTokenDesired,
            uint amountTokenMin,
            uint amountETHMin,
            address to,
            uint deadline,
            address factory
        ) external payable returns (uint amountToken, uint amountETH, uint liquidity)`,
        `function removeLiquidity(
            address tokenA,
            address tokenB,
            uint liquidity,
            uint amountAMin,
            uint amountBMin,
            address to,
            uint deadline,
            address factory
        ) external returns (uint amountA, uint amountB)`,
        `function removeLiquidityETH(
            address token,
            uint liquidity,
            uint amountTokenMin,
            uint amountETHMin,
            address to,
            uint deadline,
            address factory
        ) external returns (uint amountToken, uint amountETH)`,
        `function removeLiquidityWithPermit(
            address tokenA,
            address tokenB,
            uint liquidity,
            uint amountAMin,
            uint amountBMin,
            address to,
            bool approveMax, uint8 v, bytes32 r, bytes32 s,
            address factory
        ) external returns (uint amountA, uint amountB)`,
        `function removeLiquidityETHWithPermit(
            address token,
            uint liquidity,
            uint amountTokenMin,
            uint amountETHMin,
            address to,
            uint deadline,
            bool approveMax, uint8 v, bytes32 r, bytes32 s,
            address factory
        ) external returns (uint amountToken, uint amountETH)`,
        `function removeLiquidityETHSupportingFeeOnTransferTokens(
            address token,
            uint liquidity,
            uint amountTokenMin,
            uint amountETHMin,
            address to,
            uint deadline,
            address factory
        ) external returns (uint amountETH)`,
        `function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
            address token,
            uint liquidity,
            uint amountTokenMin,
            uint amountETHMin,
            address to,
            uint deadline,
            bool approveMax, uint8 v, bytes32 r, bytes32 s,
            address factory
        ) external returns (uint amountETH)`,
        `function swapExactTokensForTokens(
            uint amountIn,
            uint amountOutMin,
            address[] calldata path,
            address to,
            uint deadline,
            address factory
        ) external returns (uint[] memory amounts)`,
        `function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline, address factory)
            external payable returns (uint[] memory amounts)`,
        `function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline, address factory)
            external returns (uint[] memory amounts)`,
        `function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline, address factory)
            external payable returns (uint[] memory amounts)`,
        `function swapExactTokensForTokensSupportingFeeOnTransferTokens(
            uint amountIn,
            uint amountOutMin,
            address[] calldata path,
            address to,
            uint deadline,
            address factory
        ) external`,
        `function swapExactETHForTokensSupportingFeeOnTransferTokens(
            uint amountOutMin,
            address[] calldata path,
            address to,
            uint deadline,
            address factory
        ) external payable`,
        `function swapExactTokensForETHSupportingFeeOnTransferTokens(
            uint amountIn,
            uint amountOutMin,
            address[] calldata path,
            address to,
            uint deadline,
            address factory
        ) external`,
        `function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB)`,
        `function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut)`,
        `function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn)`,
        `function getAmountsOut(uint amountIn, address[] memory path, address factory) external view returns (uint[] memory amounts)`,
        `function getAmountsIn(uint amountOut, address[] memory path, address factory) external view returns (uint[] memory amounts)`
    ],
    ILevel0Facet: [
        "function claim_l0() external"
    ],
    ILevel1Facet: [
        "function initLevel1() external",
        "function complete_l1() external",
        "function claim_l1() external",
    ],
    ILevel2Facet: [
        "function initLevel2() external",
        "function complete_l2() external",
        "function claim_l2() external",
        "function secretLevel() internal view returns(bool)"
    ],
    ILevel3Facet: [
        "function initLevel3() external",
        "function complete_l3() external",
        "function claim_l3() external",
    ],
    ILevel4Facet: [
        "function initLevel4() external",
        "function complete_l4() external",
        "function claim_l4() external",
    ],
    ILevel5Facet: [
        "function initLevel5() external",
        "function complete_l5() external",
        "function claim_l5() external",
    ],
    ILevel6Facet: [
        "function initLevel6() external",
        "function complete_l6() external",
        "function claim_l6() external",
        "function getTokens() external view returns(address[] memory)",
        "function getFactory() external view returns(address)",
        "function getPair(address token0, address token1) public returns(address pair)",
    ],
    ILevel7Facet: [
        "function initLevel7() external",
        "function complete_l7() external",
        "function claim_l7() external",
    ],
    ILevel8Facet: [
        "function initLevel8() external",
        "function complete_l8() external",
        "function claim_l8() external",
    ],
    ILevel9Facet: [
        "function initLevel9() external",
        "function complete_l9() external",
        "function claim_l9() external",
    ],
    ILevel10Facet: [
        "function initLevel10() external",
        "function complete_l10() external",
        "function claim_l10() external",
    ],
    ILevel11Facet: [
        "function initLevel11() external",
        "function complete_l11() external",
        "function claim_l11() external",
    ],
    ILevel12Facet: [
        "function initLevel12() external",
        "function complete_l12() external",
        "function claim_l12() external",
    ],
    ILevel13Facet: [
        "function initLevel13() external",
        "function complete_l13() external",
        "function claim_l13() external",
    ],
}