import { Box } from "@chakra-ui/react"

export type Loots = {
  [index: string]: {
    name: string
    component: JSX.Element
  }
}
export const loots: Loots = {
  "0x6fA1e885743fc06c3f04ec3fc179769795FC93AB": {
    name: "John address",
    component: <Box></Box>
  },
}