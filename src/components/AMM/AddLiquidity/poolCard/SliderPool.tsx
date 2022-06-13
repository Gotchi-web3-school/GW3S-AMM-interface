import React, { useCallback, useState } from 'react'

import { Tooltip, Box, Text } from '@chakra-ui/react'
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from '@chakra-ui/react'

const SliderPool: React.FC<{dispatch: React.Dispatch<any>}> = ({dispatch}) => {
    const [sliderValue, setSliderValue] = useState(5)
    const [showTooltip, setShowTooltip] = useState(false)

    const handleSlider = useCallback((e: number) => {
      setSliderValue(e)
      dispatch({type: "HANDLE_REMOVE_INPUTS", payload: {type: "SLIDER", value: e}})
    }, [dispatch])
    return (
      <Box px="5" alignContent={"left"}>
        <Text>Amount</Text>
        <Slider
          id='slider'
          defaultValue={0}
          min={0}
          max={100}
          onChange={handleSlider}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
            25%
          </SliderMark>
          <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
            50%
          </SliderMark>
          <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
            75%
          </SliderMark>
          <SliderTrack boxShadow={"1px 1px 12px white"}>
            <SliderFilledTrack  />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg='transparent'
            color='white'
            placement='top'
            isOpen={showTooltip}
            label={`${sliderValue}%`}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </Box>
    )
  }

  export default SliderPool