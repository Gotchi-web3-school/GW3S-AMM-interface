export type TokenList = {
    name: string
    address: string
    symbol: string
    decimals: number
    chainId: number
    logoURI?: string
}

export const DEFAULT_TOKEN_LIST: TokenList[] = [
    {
    "name": "Wrapped Matic",
    "address": "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
    "symbol": "MATIC",
    "decimals": 18,
    "chainId": 80001,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png"
    },
    {
    "name": "GW3S Dai Stablecoin",
    "address": "0x6899A3f3120f1931EA7E6eECAa39C06cE6AbD0B7",
    "symbol": "DAI",
    "decimals": 18,
    "chainId": 80001,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
    },
    {
    "name": "GW3S Aavegotchi GHST Token",
    "address": "0xd9f1F89Ee60F1D1B7E78F11641C1B1b7dAED2b39",
    "symbol": "GHST",
    "decimals": 18,
    "chainId": 80001,
    "logoURI": "https://wiki.aavegotchi.com/ghst/ghst.gif"
    },
    {
        "name": "GW3S Aavegotchi FUD",
        "address": "0xB0931B18B42B7F47309Eeba8510345E0f76E75A5",
        "symbol": "FUD",
        "decimals": 18,
        "chainId": 80001,
        "logoURI": "https://assets.coingecko.com/coins/images/24736/small/fud.png?1648769512"
    },
    {
        "name": "GW3S  Aavegotchi FOMO",
        "address": "0x46Ef0438a11B19F862AD620a4E3f56b43aEC7D2F",
        "symbol": "FOMO",
        "decimals": 18,
        "chainId": 80001,
        "logoURI": "https://assets.coingecko.com/coins/images/24737/small/fomo.png?1648769659"
    },
    {
        "name": "GW3S Aavegotchi ALPHA",
        "address": "0x7c57071637AEd48D1Ba6c314d02292c191e9bBb1",
        "symbol": "ALPHA",
        "decimals": 18,
        "chainId": 80001,
        "logoURI": "https://assets.coingecko.com/coins/images/24738/small/alpha.png?1648769768"
    },
    {
        "name": "GW3S Aavegotchi KEK",
        "address": "0x0CD99CcA64ba23C41a721904dbED434507E49bE3",
        "symbol": "KEK",
        "decimals": 18,
        "chainId": 80001,
        "logoURI": "https://assets.coingecko.com/coins/images/24739/small/kek.png?1648769879"
    },
    {
    "name": "GW3S Aave",
    "address": "0xa32335BE3aC8404F8f0C154de3973300c3B4F72C",
    "symbol": "AAVE",
    "decimals": 18,
    "chainId": 80001,
    "logoURI": "https://etherscan.io/token/images/aave_32.png"
    },
    {
    "name": "GW3S  Uniswap",
    "address": "0xf53360819aCc346edaaa162B7d9bde1f94F75e73",
    "symbol": "UNI",
    "decimals": 18,
    "chainId": 80001,
    "logoURI": "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=022"
    },
    {
    "name": "GW3S  USD Coin",
    "address": "0xEA1108D014C4c3f50AA398399740Dc42345859BE",
    "symbol": "USDC",
    "decimals": 18,
    "chainId": 80001,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
    },
    {
    "name": "GW3S Ether",
    "address": "0xb91508934d655f54dC1D73F38b23d43d6Db99D8b",
    "symbol": "ETH",
    "decimals": 18,
    "chainId": 80001,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
    },
    {
    "name": "GW3S Tether USD",
    "address": "0x046787F8470e4063f2658D82536521b8E50627A1",
    "symbol": "USDT",
    "decimals": 18,
    "chainId": 80001,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
    },
    {
        "name": "GW3S Wrapped Bitcoin",
        "address": "0xa09286a5a2b788baAd6585bbd38aBDA120e61A20",
        "symbol": "WBTC",
        "decimals": 18,
        "chainId": 80001,
        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png"
    },
    {
        "name": "ChainLink Token",
        "address": "0x4327fB634A82BdB310De0F0FDac2c937Dcc82127",
        "symbol": "LINK",
        "decimals": 18,
        "chainId": 80001,
        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png"
    },
]