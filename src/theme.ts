// For dark mode.
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const theme = extendTheme({ config,})

/*************** TAB COMPONENTS *****************/
export const darkTab = {
  transition: ".5s",
  borderRadius: "xl", 
  _selected: {boxShadow: "0px 0px, 0px 4px 5px white", 
              textShadow: "0px 0px 20px white",
              fontWeight: "bold",
              color: "white"},
  border:"none"
}

export const lightTab = {
  background: "gray.200",
  borderRadius: "xl", 
  _selected: {boxShadow: "2px 2px 10px black", 
              textShadow: "0px 0px 10px black",
              fontWeight: "bold",
              color: "black"},
  border: "none"
}

export default theme