import '../styles/globals.css'
import type { AppProps } from 'next/app';
/** @jsxImportSource theme-ui */
import { ThemeProvider } from 'theme-ui'
import { theme } from '../themes/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'
import Header from '../components/header'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 15000 // GC unused queries
    },
  },
})

if (typeof window !== 'undefined') {
  const localStoragePersistor = createWebStoragePersistor({
    storage: window.localStorage,
    // throttleTime: 0,
  })
  persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
  })
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
