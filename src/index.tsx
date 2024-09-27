import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// Supports weights 100-900
import '@fontsource-variable/inter';
// Supports weights 200-800
import '@fontsource-variable/bricolage-grotesque';
import { FirebaseServiceProvider } from './context/FirebaseServiceContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const appTheme = extendTheme({
  fonts: {
    heading: `'Bricolage Grotesque Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
  }
})

root.render(
  <React.StrictMode>
    <ChakraProvider theme={appTheme}>
      <FirebaseServiceProvider>
        <App />
      </FirebaseServiceProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
