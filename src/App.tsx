import React, { useContext } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Box, useColorModeValue } from "@chakra-ui/react"
import { GeneralContext } from "./Provider/GeneralProvider"
import Navbar from "./Components/Navbar/Navbar"
import MaticFaucet from "./Components/Faucet/MaticFaucet"
import LevelPills from "./Components/Levels/LevelPills"
import Playground from "./Pages/Playground"
import Levels from "./Pages/Levels"

const App: React.FC = () => {
  const {balance} = useContext(GeneralContext)
  
   return (
    <Box
     bgGradient={useColorModeValue(
       "linear-gradient(to-br, rgba(235,235,235,1) 0%, rgba(179,200,255,1) 100%)",
        "linear(gray.800, purple.900, purple.800, purple.900, gray.800)"
      )}>
      <Router>
        <Navbar />
        <LevelPills />
        {parseFloat(balance) < 0.01 && <MaticFaucet />}
        <Routes>
          <Route path="/" element={<Playground />} />
          <Route path="/level/:id" element={<Levels />} />
        </Routes>
      </Router>
    </Box>
   )
}

export default App