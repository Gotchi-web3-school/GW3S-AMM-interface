/*
import { Protocol } from '@uniswap/router-sdk'
import { Currency, Percent, TradeType } from '@uniswap/sdk-core'
import { Pair } from '@uniswap/v2-sdk'
import { FeeAmount } from '@uniswap/v3-sdk'
import AnimatedDropdown from '../../AnimatedDropdown'
import { SUPPORTED_GAS_ESTIMATE_CHAIN_IDS } from 'constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { memo, useState } from 'react'
import { Text, Box } from '@chakra-ui/react'
import { InterfaceTrade } from '../../../state/routing/types'


interface SwapRouteProps extends React.HTMLAttributes<HTMLDivElement> {
  trade: InterfaceTrade<Currency, Currency, TradeType>
  syncing: boolean
  fixedOpen?: boolean // fixed in open state, hide open/close icon
}

export default memo(function SwapRoute({ trade, syncing, fixedOpen = false, ...rest }: SwapRouteProps) {
  const autoRouterSupported = useAutoRouterSupported()
  const routes = getTokenPath(trade)
  const [open, setOpen] = useState(false)
  const { chainId } = useActiveWeb3React()


  const formattedGasPriceString = trade?.gasUseEstimateUSD
    ? trade.gasUseEstimateUSD.toFixed(2) === '0.00'
      ? '<$0.01'
      : '$' + trade.gasUseEstimateUSD.toFixed(2)
    : undefined

  return (
      <>
      <AnimatedDropdown open={open || fixedOpen}>
        <Box gap="4px" width="auto" style={{ paddingTop: '12px', margin: 0 }}>
          {syncing ? (
            <Text>
              <div style={{ width: '400px', height: '30px' }} />
            </Text>
          ) : (
            <RoutingDiagram
              currencyIn={trade.inputAmount.currency}
              currencyOut={trade.outputAmount.currency}
              routes={routes}
            />
          )}

          {autoRouterSupported && (
            <>
              {syncing ? (
                <Text>
                  Loading...
                  <div style={{ width: '250px', height: '15px' }} />
                </Text>
              ) : (
                <Box fontSize={12} width={400} margin={0}>
                  {trade?.gasUseEstimateUSD && chainId && SUPPORTED_GAS_ESTIMATE_CHAIN_IDS.includes(chainId) ? (
                    <Text>Best price route costs ~{formattedGasPriceString} in gas. </Text>
                  ) : null}{' '}
                  <Text>
                    This route optimizes your total output by considering split routes, multiple hops, and the gas cost
                    of each step.
                  </Text>
                </Box>
              )}
            </>
          )}
        </Box>
      </AnimatedDropdown>
    </>
  )
})

export interface RoutingDiagramEntry {
  percent: Percent
  path: [Currency, Currency, FeeAmount][]
  protocol: Protocol
}

const V2_DEFAULT_FEE_TIER = 3000
*/

/**
 * Loops through all routes on a trade and returns an array of diagram entries.
 */
/*
export function getTokenPath(trade: InterfaceTrade<Currency, Currency, TradeType>): RoutingDiagramEntry[] {
  return trade.swaps.map(({ route: { path: tokenPath, pools, protocol }, inputAmount, outputAmount }) => {
    const portion =
      trade.tradeType === TradeType.EXACT_INPUT
        ? inputAmount.divide(trade.inputAmount)
        : outputAmount.divide(trade.outputAmount)
    const percent = new Percent(portion.numerator, portion.denominator)
    const path: RoutingDiagramEntry['path'] = []
    for (let i = 0; i < pools.length; i++) {
      const nextPool = pools[i]
      const tokenIn = tokenPath[i]
      const tokenOut = tokenPath[i + 1]
      const entry: RoutingDiagramEntry['path'][0] = [
        tokenIn,
        tokenOut,
        nextPool instanceof Pair ? V2_DEFAULT_FEE_TIER : nextPool.fee,
      ]
      path.push(entry)
    }
    return {
      percent,
      path,
      protocol,
    }
  })
}
*/
export const i = () => {<></>}