import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { ServicesContextProvider } from '@context/servicesContext'
import { OrderStateContextProvider } from '@context/orderStateContext'
import { ThemeProvider } from '@mui/material'
import lightTheme from '@styles/theme/lightTheme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ServicesContextProvider>
      <OrderStateContextProvider>
        <ThemeProvider theme={lightTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </OrderStateContextProvider>
    </ServicesContextProvider>
  )
}

export default MyApp
