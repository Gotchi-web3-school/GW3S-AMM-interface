import React from 'react';
import ReactDOM from 'react-dom/client';
import { ColorModeScript } from '@chakra-ui/react'
import { Web3ReactProvider } from '@web3-react/core';
import { ChakraProvider } from '@chakra-ui/react';
import { getLibrary } from './lib/utils';
import App from './App';
import theme from './theme'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);
